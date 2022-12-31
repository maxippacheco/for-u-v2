import { getSession } from "next-auth/react"
import { useEffect } from "react"


export default function Home() {

  const loadSession = async() => { 
    const session = await getSession();

    console.log({ session });
    
  }

  useEffect(() => {
   loadSession()
  }, [])
  

  return (
    <div>
      <h1>HomePage</h1> 
    </div>
  )
}
