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
    <div className='py-4 w-full flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 h-[10vh] md:px-8 px-4'>
    <div className='text-3xl font-extrabold font-outfit text-primary-600 tracking-tight text-center cursor-pointer' onClick={() => navigate('/')}>Postly</div>
    <div className="flex justify-end items-center gap-4">
    <div className="hidden sm:block"> <Profile username={username} fullname={fullname} id={id} /></div>
    <button className='bg-slate-100 hover:bg-slate-200 hover:text-red-500 rounded-full px-5 py-2 text-slate-700 font-inter font-medium text-sm transition-all duration-200' onClick={()=>{
      localStorage.removeItem('mediumtoken')
      navigate('/signin')
    }}>Log out</button>
    </div>
    </div>
  )
}

export default Navbar