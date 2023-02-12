import { useEffect, useState } from "react"
import Chatbox from "@/components/chatbox"
import Userlist from "@/components/userlist"
import Head from "next/head"
import client from "@/databse/axious"
import fetchapi from "@/pages/api/fetch"
import Modal from "@/components/modal"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, logoutUser } from "@/redux/slice/userslice"
import cookie from "cookie"


export default function Home(props: any) {


  const { loguser } = props
  const { user } = loguser
  const userlogin = useSelector((state: any) => state.userid)
  const dispatch = useDispatch()

  const [modal, setmodal] = useState(false)
  let wait: any

  useEffect(() => {
    if (user) {
      dispatch(loginUser(user))
    }
  }, [user])


  const userStopped = (e: any) => {
    clearTimeout(wait);
    wait = setTimeout(() => { serachUser(e) }, 1000)
  }

  const serachUser = async (e: any) => {
    let value = e.target.value

    if (value.length >= 2) {
      const fetUsers = await fetchapi(`searchUser`, { value: value })
      clearTimeout(wait);
    }
  }

  const logout = async () => {

    const logouttUsers = await fetchapi(`tokenLogout`, { value: "" })
    if (logouttUsers.status == 200) {
      dispatch(logoutUser({ set: false }))
    }


  }


  return (
    <>
      <Head>
        <title>Chatbat</title>
      </Head>
      <div className="container mx-auto">
        {modal && <Modal isopen={modal} setmodal={setmodal} />}
        <div className="grid grid-cols-3 mx-10 h-[90vh]">
          <span className="col-span-3 mb-[0.5rem]">
            <span className="my-0 py-0 flex grid grid-cols-3 ">
              <p className="capitalize font-bold text-[3rem] mx-2 col-span-3 md:col-span-1">Chatbat</p>
              <div className="col-span-3 md:col-span-2 static md:relative">
                <span className="grid grid-cols-3 static md:absolute bottom-[0vh] w-full">
                  <div className="col-span-3 md:col-span-2 flex w-auto border">
                    <input name="search" placeholder="Enter name or Userid" onKeyUp={(e) => userStopped(e)} className="px-4 border-4 border-indigo-50 w-full" />
                    <button className="bg-indigo-50 hidden md:block w-20">Search</button>
                  </div>
                  <div className="col-span-3 hidden md:col-span-1 md:block cursor-pointer ">
                    <span className="border float-right px-7 py-4 bg-black text-white" onClick={() => !userlogin.userloggedin ? setmodal(true) : logout()} >{userlogin.userloggedin ? "Logout" : "Login"}</span>
                  </div>
                </span>
              </div>
            </span>
          </span>
          <span className="md:col-span-1 col-span-3 border  overflow-y-scroll scrollbar-hide bg-zinc-100 h-[80vh]"><Userlist users={userlogin} setmodal={setmodal} /></span>
          <span className="col-span-2 border hidden md:block   bg-slate-100 h-[80vh]"><Chatbox /></span>
        </div>
      </div>
    </>
  )
}



export async function getServerSideProps(context: any) {

  const cookies = cookie.parse(context.req.headers.cookie || '');
  //Esatablishing mongo connection

  let fetUsers: any = {}
  //checkauth
  if (cookies) {
    fetUsers = await client.post('/tokenLogin', { token: cookies.usertoken })
  }


  return { props: { loguser: fetUsers.data } }
}

