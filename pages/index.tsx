import Link from "next/link"
import Chatbox from "@/components/chatbox"
import Userlist from "@/components/userlist"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatbat</title>
      </Head>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 m-10 h-[90vh]">
          <span className="col-span-3">
            <span className="my-0 py-0">
              <p className="capitalize font-bold text-[3rem] mx-2">Chatbat</p>
            </span>
          </span>
          <span className="md:col-span-1 col-span-3 border  overflow-y-scroll scrollbar-hide bg-zinc-100"><Userlist /></span>
          <span className="col-span-2 border hidden md:block   bg-slate-100"><Chatbox /></span>
        </div>
      </div>
    </>
  )
}
