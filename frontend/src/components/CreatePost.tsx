import LabelledInput from "./LabelledInput"
import { CreateBlogType } from "../types"
import axios from "axios"
import { useState } from "react"
import { backend } from '../apikeys'


function CreatePost() {
   const [msg, setMsg] = useState(null)
  const [blog,setBlog] = useState<CreateBlogType>({
    title : '',
    content : ''
  })
  return (
    <div className="w-full h-screen md:h-full flex flex-col justify-start items-center">
    <div className="w-full flex justify-center items-center px-4 bg-white h-full max-h-full ">
        <div className="flex flex-col items-start justify-center max-w-md w-full md:shadow-lg rounded-md md:px-8 py-4 px-2">
            <div className="text-3xl font-serif font-semibold mb-4">Create New Blog</div>
            <LabelledInput label="Title" placeholder="Title" onchange={(e)=>{
                setBlog({
                    ...blog,
                    title : e.target.value
                })
            }} />
            <textarea  placeholder="content" className="w-full border-2 px-4 py-2 border-gray-300 focus:outline-none rounded-md focus:border-blue-500 mb-4 h-[25vh]" onChange={(e)=>{
                setBlog({
                    ...blog,
                    content : e.target.value
                })
            }} />
            <button className='w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white font-mono font-semibold text-2xl transition-colors duration-15 mb-3' onClick={async()=>{
                let token = localStorage.getItem('mediumtoken')
                let res = await axios.post(`${backend}/blog`,blog,{
                    headers : {
                        Authorization : token
                    }
                })
                console.log(res.data);
                setMsg(res.data.msg)
                setTimeout(()=>{setMsg(null)},10000)
            }}>Create Post</button>
            {msg && <div className="text-green-500">{msg}</div>}
            {msg &&<button  onClick={()=>{
                const targetDiv = document.getElementById("posts");
                if (targetDiv) {
                targetDiv.scrollIntoView({ behavior: "smooth" });
                }
            }}
             className=" md:hidden px-4 py-2 border-2 border-gray-300 bg-blue-400 hover:bg-blue-500 w-full text-center text-xl font-semibold text-white">See posts</button>}
        </div>

    </div>
    </div>
  )
}


export default CreatePost

