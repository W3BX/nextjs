import User from "@/databse/models/user"
import { getCookie, setCookie, getCookies, deleteCookie } from "cookies-next"
export default async function handler(req: any, res: any) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    
    let response: any = {
        msg: '',
        status: 200,
        data: [],
        user: ''
    }

    const { opType } = req.query
    const { value, un, pss, uID, token } = req.body

    if (opType == 'searchUser') {
        const findUser = await User.find({ $or: [{ 'name': { $regex: value, $options: "i" } }, { 'uID': { $regex: value, $options: "i" } }] })
        response.data = findUser
    }

    if (opType == 'tokenLogin') {
        if (token) {
            const userfind = await User.findOne({ "uID": token })
            response.user = userfind.name
        } else {
            response.status = 400
            response.msg = 'User not logged in'
        }
    }

    if (opType == 'tokenLogout') {
        deleteCookie('usertoken', { req, res })
        res.msg = 'userloggedout'
    }

    if (opType == 'loginUser') {

        const userfind = await User.findOne({ "name": un })
        const uID = (Math.floor(Math.random() * 99999999) + 100)
        if (!un && !pss) {

            response.msg = 'Username or password missing',
                response.status = 400

        } else {
            if (!userfind) {

                const usersave = new User({ name: un, password: pss, uID: uID })
                const save = await usersave.save()
                response.user = save.name
                response.msg = 'User registered and ready to login'
                setCookie('usertoken', uID, { req, res, maxAge: 1000 * 60 * 15, httpOnly: true })

            } else if (userfind.password == pss) {
                response.msg = 'Ready to login'
                setCookie('usertoken', uID, { req, res, maxAge: 1000 * 60 * 15, httpOnly: true })
                const tokenUpdated = await User.updateOne({ "name": userfind.name },
                    {
                        $set: {
                            uID: uID
                        }
                    })
                response.name = userfind.name
            }
        }
    }

    res.send({ ...response })

}
