import { useState,useEffect } from "react"
import axios from "axios"
import { backend } from "../apikeys"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import ProfileWithFollow from "../components/ProfileWithFollow"
import Blog from "../components/BlogForProfile"
function Profile() {
    interface Post {
        id: string;
        title: string;
        content: string;
      }
      
      interface Profile {
        id: string;
        username: string;
        fullname: string;
      }
      
    const [showFollower, setShowFollower] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    const [showPost, setshowPost] = useState(true)
    const [allPost, setAllPost] = useState<Post[]>([])
    const [following, setfollowing] = useState<Profile[]>([])
    const [Follower, setFollower] = useState<Profile[]>([])
    const [isfollow,setisfollow] = useState(false)
    const [queryUser,setqu] = useState("")
    // const [queryUser,setqueryUser] = useState("")
    let params = useParams() 

    const fetchRelation = async()=>{
        let token = localStorage.getItem('mediumtoken')
        let res = await axios.post(`${backend}/user/checkrelation`,{
            queryUser : params.authorquery
        },{
            headers : {
                Authorization : token
            }
        })
        let data = await res.data;
        console.log(data);
        setisfollow(data.isFollowed)
        setqu(queryUser)
    }
    useEffect(() => {
      fetchRelation()
      return () => {
      }
    }, [isfollow])
    

    const fetchData =async ()=>{
        let token = localStorage.getItem('mediumtoken');
        let queryUser = params.authorquery
        console.log(queryUser);
        
        let res = await axios.post(`${backend}/user/allposts`,{
           queryUser: queryUser
        },
         {
        headers:{
            Authorization:token
        }
        })
        let data = await res.data;
        console.log(data)
        setAllPost(data.allposts)
        setFollower(data.followers)
        setfollowing(data.following)
    }
    useEffect(() => {
    fetchData()
     let func = setInterval(() => {
        fetchData()
     }, 10000);
      return () => {
      clearInterval(func)  
      }
    }, [showFollower,showFollowing,showPost])
    
    
  return (
    <div className="flex max-w-screen min-h-screen justify-center items-start bg-slate-50 pt-8 pb-16">
        <div className="md:max-w-4xl w-full h-full flex flex-col justify-start px-4">
            <div className="w-full flex justify-center mb-8 animate-fade-in"> 
              <ProfileWithFollow queryUser={queryUser}/>
            </div>
            <div className="mb-8 w-full border-b border-slate-200">
                <div className="flex justify-start sm:justify-center items-center gap-8 px-2 overflow-x-auto no-scrollbar">
                    <button className={`pb-3 text-lg font-inter font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${showPost ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`} onClick={()=>{
                        setshowPost(true)
                        setShowFollower(false)
                        setShowFollowing(false)
                    } }>Posts</button>
                    <button className={`pb-3 text-lg font-inter font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${showFollower ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`} onClick={()=>{
                        setShowFollower(true)
                        setShowFollowing(false)
                        setshowPost(false)
                        }}>Followers</button>
                    <button className={`pb-3 text-lg font-inter font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${showFollowing ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`} onClick={()=>{
                        setShowFollower(false)
                        setShowFollowing(true)
                        setshowPost(false)
                    }} >Following</button>
                </div>
            </div>
            <div className="w-full h-full animate-slide-up">
            <div className="flex flex-col gap-4 w-full">
        {(showPost && allPost) && 
           allPost.map((item) => (
        <div key={item.id} className="w-full">
          <Blog content={item.content} id={item.id} title={item.title}/>
        </div>
        ))}
        {
            (showPost&& allPost.length ===0)?<div className="text-slate-400 font-inter text-center mt-10">No Posts to show</div>:""
        }
        {
            (showFollower&& Follower.length ===0)?<div className="text-slate-400 font-inter text-center mt-10">No Followers to show</div>:""
        }
        {
            (showFollowing&& following.length ===0)?<div className="text-slate-400 font-inter text-center mt-10">No Following to show</div>:""
        }

        {(showFollower && Follower) &&
        Follower.map(item=><ProfileCard key={item.id} username={item.username} fullname={item.fullname} id={item.id}/>)
        }
       
        {(showFollowing && following) &&
        following.map(item=><ProfileCard  key={item.id} username={item.username} fullname={item.fullname} id={item.id}/>)
        }
       
</div>

            </div>
        </div>
    </div>
  )
}

export default Profile



const ProfileCard = ({ username, fullname ,id}:{
    username : string,
    fullname : string,
    id : string
}) => {
    const navigate = useNavigate()
    return (
      <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl w-full p-6 flex items-center space-x-4 hover:cursor-pointer hover:-translate-y-0.5" onClick={() =>{ 
        navigate(`/profile/${id}`)
        }}>
        {/* Profile Picture */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-inner">
          {username[0].toUpperCase()}
        </div>
  
        {/* Profile Details */}
        <div>
          <h3 className="text-lg font-outfit font-bold text-slate-800">{fullname}</h3>
          <p className="text-sm font-inter font-medium text-slate-500">@{username}</p>
        </div>
      </div>
);}