import Link from 'next/link'
import React from 'react'
import userData from "userdata.json"
import { useDispatch } from "react-redux"
import { startChat } from "@/redux/slice/userslice"

type Props = {}

const userlist = (props: Props) => {
  const dispatch = useDispatch()
  return (
    <>
      {
        userData.users.map((data, index) => {
          return (
            <div className='border container cursor-pointer' key={index}  onClick={() => dispatch(startChat(data.id))}>
              <div className='my-4 mx-3 w-[fit-content] flex'>
                <div className='px-3 py-1 border border-4 rounded-full uppercase m-auto'>{data.name.charAt(0)}</div>
                <div className='mx-4 my-auto capitalize text-[1.3rem]'>{data.name}</div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default userlist