import React from 'react'
import userData from "userdata.json"
import { useDispatch } from "react-redux"
import { startChat } from "@/redux/slice/userslice"

type Props = { users: any, setmodal: any }

const Userlist = (props: Props) => {

  const { users, setmodal } = props

  const dispatch = useDispatch()

  return (
    <>
      {

        <div className='flex items-center justify-center h-[79vh]'>
          <div className='text-center'>
            {users.userloggedin ?
              <>
                Hey {users.username} try searching for users.
              </>
              :
              <>
                No users yet
                <p>you might want to <span className='text-cyan-500 cursor-pointer font-semibold' onClick={() => setmodal(true)}>Login </span>.</p>
              </>}
          </div>
        </div>

        //  users.map((data:any, index:any) => {
        //   return (
        //     <div className='border container cursor-pointer' key={index} onClick={() => dispatch(startChat(data.uID))}>
        //       <div className='my-4 mx-3 w-[fit-content] flex'>
        //         <div className='px-3 py-1 border border-4 rounded-full uppercase m-auto'>{data.name.charAt(0)}</div>
        //         <div className='mx-4 my-auto capitalize text-[1.3rem]'>{data.name}</div>
        //       </div>
        //     </div>
        //   )
        // })
      }
    </>
  )
}



export default Userlist