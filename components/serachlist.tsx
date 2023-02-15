import { addChat } from "@/redux/slice/userslice"
import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

const SerchList = (props: any) => {

    const { users, setmodal, setsearchresult, setsearchedUser } = props
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const adduser = (uid: any) => {

        if (user.userloggedin) {
            dispatch(addChat(uid))
            setsearchresult(false)
            setsearchedUser([])
        } else {
            setmodal(true)
            setsearchedUser([])
            setsearchresult(false)
        }

        let doc: any = document.getElementById('search')
        doc.value = ''
    }
    return (
        <div className="bg-white shadow-lg w-auto grid grid-cols-3 text-lg font-light">
            {
                users
                    .filter((bat: any, index: any) => { return !user.chats.some((value: any, index: any) => { return bat.uID === value.uID }) })
                    .map((bats: any, index: any) => {
                        return (
                            <Fragment key={index}>
                                <div className="col-span-2 p-3">{bats.name}</div>
                                <div className="col-span-1 text-right p-2">
                                    <button className="bg-black text-white px-5 py-1 font-light" onClick={(e) => { adduser(bats) }}>
                                        Chat
                                    </button>
                                </div>
                                <div className="col-span-3 border-b-2 px-0 mx-0"></div>
                            </Fragment>
                        )
                    })
            }
        </div>
    )
}

export default SerchList