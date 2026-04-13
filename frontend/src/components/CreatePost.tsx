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
    <div className="w-full h-full min-h-screen md:min-h-full flex flex-col justify-start items-center pt-8 bg-slate-50">
    <div className="w-full flex justify-center items-start px-4 h-full max-h-full ">
        <div className="flex flex-col items-start justify-center max-w-lg w-full bg-white md:shadow-xl rounded-2xl md:px-8 py-8 px-4 border border-slate-100 animate-slide-up">
            <div className="text-3xl font-outfit font-bold mb-6 text-slate-800">Create New Blog</div>
            <LabelledInput label="Title" placeholder="What's your post about?" onchange={(e)=>{
                setBlog({
                    ...blog,
                    title : e.target.value
                })
            }} />
            <div className="w-full relative mb-5">
              <label className='font-inter text-sm text-slate-500 font-medium mb-1 block'>Content</label>
              <textarea  placeholder="Write your thoughts here..." className="w-full border border-slate-300 px-4 py-3 focus:outline-none rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 text-slate-800 bg-slate-50 focus:bg-white placeholder:text-slate-400 mb-2 h-[25vh] resize-none" onChange={(e)=>{
                  setBlog({
                      ...blog,
                      content : e.target.value
                  })
              }} />
            </div>
            <button className='w-full bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 px-6 py-3 rounded-xl text-white font-inter font-semibold text-lg transition-all duration-200 mb-4' onClick={async()=>{
                let token = localStorage.getItem('mediumtoken')
                let res = await axios.post(`${backend}/blog`,blog,{
                    headers : {
                        Authorization : token
                    }
                })
                console.log(res.data);
                setMsg(res.data.msg)
                setTimeout(()=>{setMsg(null)},10000)
            }}>Publish Post</button>
            {msg && <div className="text-emerald-500 font-medium text-center w-full mb-4 animate-fade-in">{msg}</div>}
            {msg &&<button  onClick={()=>{
                const targetDiv = document.getElementById("posts");
                if (targetDiv) {
                targetDiv.scrollIntoView({ behavior: "smooth" });
                }
            }}
             className="md:hidden px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 w-full text-center font-medium text-slate-700 shadow-sm transition-all">See posts</button>}
        </div>

    </div>
    </div>
  )
}


export default CreatePost

