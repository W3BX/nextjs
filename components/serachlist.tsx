import { addChat } from "@/redux/slice/userslice"
import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"

const SerchList = (props: any) => {

    const { users } = props
    const usersadded = useSelector((state: any) => state.user)
    console.log(usersadded)
    const dispatch = useDispatch()

    const adduser = (uid: any) => {
        dispatch(addChat(uid))
    }

    return (
        <div className="bg-white z-index-20 shadow-lg w-auto grid grid-cols-3 text-lg font-light">
            {
                users.map((bats: any, index: any) => {
                    return (
                        <Fragment key={index}>
                            <div className="col-span-2 p-3">{bats.name}</div>
                            <div className="col-span-1 text-right p-2">
                                <button className="bg-black text-white px-5 py-1 font-light" onClick={(e) => { adduser(bats.uID) }}>
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