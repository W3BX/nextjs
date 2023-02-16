import User from "@/databse/models/user"
import conMongo from "@/databse/conn"
import { getCookie, setCookie, getCookies, deleteCookie, hasCookie } from "cookies-next"
import mongoose from "mongoose";
export default async function handler(req: any, res: any) {
    conMongo()

    res.setHeader('Access-Control-Allow-Origin', '*');

    let response: any = {
        msg: '',
        uid: '',
        status: 200,
        data: [],
        name: '',
        chatID:''
    }

    const { opType } = req.query
    const { value, un, pss, uID, token } = req.body

    //searchUsers
    if (opType == 'searchUser') {

        try {
            const getcookie = getCookie('usertoken', { req, res })
            const findUser = await User.find({ $or: [{ 'uID': { '$nin': getcookie }, 'name': { $regex: value, $options: "i" } }, { 'uID': { $regex: value, $options: "i" } }] }, { 'uID': 1, 'name': 1, 'chatID':1 })
            response.data = findUser
        } catch (e) {
            console.log(e)
        }

    }

    //Login users if token avaliable
    if (opType == 'tokenLogin') {
        if (token) {
            const userfind = await User.findOne({ "uID": token })
            if (userfind) {
                const tokenUpdated = await User.updateOne({ "uID": token },
                    {
                        $set: {
                            loggedIn: true
                        }
                    })
                response.user = userfind.name
                response.uid = userfind.uID
                response.chatID = userfind.chatID
            } else {
                response.status = 400
                response.msg = 'User not logged in/ Another device log in'
            }

        } else {
            response.status = 400
            response.msg = 'User not logged in'
        }
    }

    //LogoutUsers
    if (opType == 'tokenLogout') {

        if (hasCookie('usertoken'), { req, res }) {
            const getcookie = getCookie('usertoken', { req, res })
            const tokenUpdated = await User.updateOne({ "uID": getcookie },
                {
                    $set: {
                        loggedIn: false
                    }
                })

            if (tokenUpdated) {
                deleteCookie('usertoken', { req, res })
            }
        }
        res.msg = 'userloggedout'
    }

    //autologout
    if (opType == 'autoLogout') {
        if (hasCookie('usertoken'), { req, res }) {
            const getcookie = getCookie('usertoken', { req, res })
            const tokenUpdated = await User.updateOne({ "uID": getcookie },
                {
                    $set: {
                        loggedIn: false
                    }
                })
            if (tokenUpdated) {
                res.msg = 'userloggedout'
            }
        }
    }

    //login user if not exits register and then login
    if (opType == 'loginUser') {

        const userfind = await User.findOne({ "name": un })
        const uID = (Math.floor(Math.random() * 99999999) + 100)
        if (!un && !pss) {

            response.msg = 'Username or password missing',
                response.status = 400

        } else {
            if (!userfind) {

                const usersave = new User({ name: un, password: pss, uID: uID, loggedIn: true, chatID: uID })
                const save = await usersave.save()
                response.name = save.name
                response.uid = save.uID
                response.chatID = save.chatID
                response.msg = 'User registered and ready to login'
                setCookie('usertoken', uID, { req, res, maxAge: 1000 * 60 * 15, httpOnly: true })

            } else if (userfind.password == pss) {
                if (userfind.loggedIn) {
                    response.status = 400
                    response.msg = 'Sorry this user is aleary logged-in'
                } else {
                    response.msg = 'Ready to login'
                    setCookie('usertoken', uID, { req, res, maxAge: 1000 * 60 * 15, httpOnly: true })
                    const tokenUpdated = await User.updateOne({ "name": userfind.name },
                        {
                            $set: {
                                uID: uID,
                                loggedIn: true
                            }
                        })
                    response.name = userfind.name
                    response.uid = userfind.uID
                    response.chatID = userfind.chatID
                }
            }
        }
    }

    res.send({ ...response })
}
