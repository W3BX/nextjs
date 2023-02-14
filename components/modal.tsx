import { useState, useEffect } from "react"
import fetchapi from "@/pages/api/fetch"
import { loginUser } from "@/redux/slice/userslice"
import { useDispatch, useSelector } from "react-redux"
import {GiBatMask} from "react-icons/gi"

type Props = {
    isopen: boolean,
    setmodal: Function
}

const Modal = (props: Props) => {

    const { isopen, setmodal } = props
    const dispatch = useDispatch()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [errorMsg, seterrorMsg] = useState('')
    const [loading, setloading] = useState(false)

    useEffect(() => {
        seterrorMsg('')
    }, [username, password])


    const submit = async (e: any) => {
        setloading(true)
        seterrorMsg('')
        const saveUser = await fetchapi(`loginUser`, { un: username, pss: password })
        if (saveUser.status == 200) {

            if (saveUser.name) {
                dispatch(loginUser(saveUser.name))
            }
            setusername('')
            setpassword('')
            setmodal(false)

        } else if (saveUser.status == 400) {
            seterrorMsg(saveUser.msg)
        }
        setloading(false)
    }

    const autogenrate = () => {

        let randomString = 'Bat' + Math.random().toString(36).substring(2, 8);
        const pass = 'Pass' + (Math.floor(Math.random() * 100000) + 10)
        setusername(randomString)
        setpassword(pass)
    }

    return (
        <div id="modalBody" className="conatiner border z-40 absolute translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] bg-white w-[90%] md:w-auto rounded-lg text-center">

            <div className="float-right	mx-1 rounded-lg border-4 cursor-pointer font-bold border px-2 py-1 mt-1" onClick={() => setmodal(false)}>X</div>
            <div className="p-4">
                <input name="uname" value={username} className="border-2 border-sky-100 w-full p-3 rounded-lg my-1" onChange={(e) => setusername(e.target.value)} placeholder="Enter username" />
                <br />
                <input name="pass" value={password} className="border-2 border-sky-100  w-full p-3 rounded-lg my-1" onChange={(e) => setpassword(e.target.value)} placeholder="Enter password" />
                <br />
                <button name="submit" type="submit" disabled={!username || !password || loading} className={`${loading ? `animate-pulse` : ``} border px-4 py-2 mx-auto my-4 w-[30%] cursor-pointer bg-black text-white text-center ${!username || !password ? 'opacity-50 cursor-not-allowed' : 'opacity-1'}`} onClick={(e) => submit(e)} >
                    {loading ? <GiBatMask size={20} className="mx-auto" /> : `Submit`}
                </button>
                <br />
                {errorMsg && <><span className="text-rose-700">{errorMsg}</span><br /></>}

                <span className="font-sans text-sm select-none">
                    No need to register just enter any username & password
                    <br />
                    <span className="font-semibold">OR</span>
                    <br />
                    AutoGenerate username/password. <span className="font-mono font-semibold text-blue-500 cursor-pointer" onClick={() => autogenrate()} >Click here</span>
                </span>
            </div>
        </div>
    )

}

export default Modal