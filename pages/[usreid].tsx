import { useRouter } from "next/router"
import { useEffect, useState } from "react"
type Props = {}

const usreid = (props: Props) => {

  const router = useRouter()
  const [id, setid] = useState()

  useEffect(() => {
    if (router.isReady) {
      setid(router.query.usreid)
    }
  }, [router])


  return (
    <h1 style={{ color: 'black' }}>my {id}</h1>
  )
}

export default usreid