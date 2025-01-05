import axios from "axios"
import Profile from "./Profile"
import { useState,useEffect } from "react"
import { backend } from "../apikeys"
import { useNavigate } from "react-router-dom"
function Navbar() {
  const navigate = useNavigate()
  const [username,setusername] = useState("")
  const [fullname,setfullname] = useState("")
  const [id,setid] = useState("")
  async function fetchUserDeatil(){
    let token =localStorage.getItem('mediumtoken')
    let res = await axios.get(`${backend}/user/detail`,{
        headers : {
            Authorization : token
        }
    })
    let data = await res.data;
    console.log(data);

    setusername(data.username)
    setfullname(data.fullname)
    setid(data.id)
    if(data.msg==="user does not exits"){
      navigate('/signin')
    }  
    }

    useEffect(() => {
     fetchUserDeatil()
     console.log("navbar done");
      return () => {  
      }
    }, [])
  return (
    <div className='py-4 w-full flex justify-between items-center bg-gray-200 h-[10vh] md:px-4 px-2 '>
    <div className='log text-3xl font-bold font-sans text-center'>Blogging</div>
    <div className="flex justify-end items-center">
   <div className="hidden sm:block"> <Profile username={username} fullname={fullname} id={id} /></div>
    <button className='w-full bg-blue-500 hover:bg-blue-600 p-1 rounded-md md:px-4 md:py-2 text-white font-mono font-semibold text-xl transition-colors duration-150' onClick={()=>{
      localStorage.removeItem('mediumtoken')
      navigate('/signin')
    }}>Log out</button>
    </div>
    </div>
  )
}

export default Navbar