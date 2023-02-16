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
import SearchList from "@/components/serachlist"
import { CgSpinner } from "react-icons/cg"

export default function Home(props: any) {

  const { loguser } = props
  const { user, uid } = loguser
  const userlogin = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const [modal, setmodal] = useState(false)
  const [searchedUser, setsearchedUser] = useState([])
  const [loading, setloading] = useState(false)
  const [searchresult, setsearchresult] = useState(false)
  const [logoutLoading, setlogoutLoading] = useState(false)

  let wait: any

  useEffect(() => {

    const autologout = async () => {
      const fetchUsers = await fetchapi(`autoLogout`, { value: '' })
    }

    window.addEventListener('beforeunload', autologout);
    return () => {
      window.removeEventListener('beforeunload', autologout);
    };
  }, []);


  useEffect(() => {
    if (user && uid) {
      dispatch(loginUser(loguser))
    }
  }, [user])


  const userStopped = (e: any) => {
    let value = e.target.value
    setsearchresult(true)
    clearTimeout(wait)

    if (value.length >= 2) {
      setloading(true)
      wait = setTimeout(() => { serachUser(e) }, 500)
    } else if (value.length < 2) {
      setsearchedUser([])
      setsearchresult(false)
    }

  }

  const serachUser = async (e: any) => {
    let value = e.target.value
    const fetchUsers = await fetchapi(`searchUser`, { value: value })
    if (fetchUsers.data.length) {
      setsearchedUser(fetchUsers.data)
    }
    clearTimeout(wait);
    setloading(false)
  }

  const logout = async () => {
    setlogoutLoading(true)
    const logouttUsers = await fetchapi(`tokenLogout`, { value: "" })
    if (logouttUsers.status == 200) {
      dispatch(logoutUser({ set: false }))
      setlogoutLoading(false)
    }


  }

  return (
    <>
      <Head>
        <title>Chatbat</title>
      </Head>
      <div className="container mx-auto">
        {modal && <Modal isopen={modal} setmodal={setmodal} setsearchresult={setsearchresult} />}
        <div className="grid grid-cols-3 mx-10 h-[90vh]">
          <span className="col-span-3 mb-[0.5rem]">
            <span className="my-0 py-0 flex grid grid-cols-3 ">
              <p className="capitalize font-bold text-[3rem] mx-2 col-span-3 md:col-span-1">Chatbat</p>
              <div className="col-span-3 md:col-span-2 static md:relative">
                <span className="grid grid-cols-3 static md:absolute bottom-[0vh] w-full ">
                  <div className="col-span-3 md:col-span-2 flex w-auto border">
                    <span className="border-3 md:border-4 border-indigo-50 w-full flex">
                      <input name="search" id='search' placeholder={`Enter name or Userid`} autoComplete="off" onKeyUp={(e) => userStopped(e)} className="w-full px-4 focus:outline-none" />
                      {loading && <CgSpinner size={30} className="animate-spin self-center mx-2" />}
                    </span>
                    <button className="bg-indigo-50 hidden md:block w-20">Search</button>
                  </div>
                  <div className="col-span-3 hidden md:col-span-1 md:block cursor-pointer ">
                    <span className="border float-right px-7 py-4 bg-black text-white" onClick={() => !userlogin.userloggedin ? setmodal(true) : logout()} >
                      {userlogin.userloggedin ? logoutLoading ? "..." : "Logout" : "Login"}
                    </span>
                  </div>
                  {searchresult && <div className="col-span-3 md:col-span-2  w-auto relative">
                    <div className="absolute w-full z-100 searchList">
                      <SearchList
                        users={searchedUser}
                        setsearchedUser={setsearchedUser}
                        setmodal={setmodal}
                        setsearchresult={setsearchresult} />
                    </div>
                  </div>}
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

  let fetUsers: any = {}

  //checkauth
  if (cookies) {
    fetUsers = await client.post('/tokenLogin', { token: cookies.usertoken })
  }

  return { props: { loguser: fetUsers.data } }
}

