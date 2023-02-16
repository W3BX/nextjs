import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from "react-redux"
import { GiBatWing } from "react-icons/gi"

type Props = {}

const Chatbox = (props: Props) => {

    const activeChat = useSelector((state: any) => state.user.activeChat)
    const sender = useSelector((state: any) => state.user)
    const dispatch = useDispatch()

    //sender
    const [msginput, setmsginput] = useState('')
    const [recivedMsg, setrecivedMsg] = useState('')


    return (
        <>
            <div className='container'>
                {Object.keys(activeChat).length === 0 ?
                    <div className='flex items-center justify-center h-[80vh]'>
                        <div className='text-center'>
                            <span className='flex text-[3rem] '>
                                Welcome to  <GiBatWing />Chatbat<GiBatWing style={{ transform: "scaleX(-1)" }} />
                            </span>
                            <span className='text-center' >This is a NEXTjs project with basic implemation.</span><br />
                            <span>Click on any user to chat</span>
                        </div>
                    </div>
                    :
                    <div className='border h-[80vh]  relative'>
                        <div className='border py-5 capitalize px-2 font-mono text-2xl font-bold '>
                            {activeChat.name}
                        </div>
                        <div className='h-[3rem] mx-2 absolute border border-2 bottom-[1vh] w-[98%] flex'>
                            <input
                                className='w-full h-full px-3 focus:outline-none focus:border-sky-500 placeholder:text-slate-400'
                                placeholder='Type...'
                                value={msginput}
                                onChange={(e) => setmsginput(e.target.value)}
                            />
                            <span className='border p-2' onClick={() => null } >Submit</span>
                        </div>
                    </div>
                }
            </div>
        </>

    )
}

export default Chatbox