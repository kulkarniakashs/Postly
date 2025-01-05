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
    <div className="flex max-w-screen min-h-screen justify-center items-start bg-gray-100 ">
        <div className="md:max-w-[70vw] w-full shadow-sm h-full flex flex-col justify-start">
            <div className="w-full flex justify-center"> 
              <ProfileWithFollow queryUser={queryUser}/>
            </div>
            <div className="mt-0">
                <div className="flex justify-center items-center p-1 gap-2">
                    <button className="focus:border-blue-400 border-b-2 transition-colors duration-200" onClick={()=>{
                        setShowFollower(true)
                        setShowFollowing(false)
                        setshowPost(false)
                        }}>Follower</button>
                    <button className="focus:border-blue-400 border-b-2 transition-colors duration-200" onClick={()=>{
                                  setShowFollower(false)
                                  setShowFollowing(true)
                                  setshowPost(false)
                    }} >Following</button>
                    <button className="focus:border-blue-400 border-b-2 transition-colors duration-200" onClick={()=>{
                        setshowPost(true)
                        setShowFollower(false)
                        setShowFollowing(false)
                    } }>Posts</button>
                </div>
            </div>
            <div className="thisismain w-full h-full">
            <div className="flex flex-wrap gap-6 justify-center">
        {(showPost&& allPost) && 
           allPost.map((item) => (
          
        <div key={item.id}>
          <Blog content={item.content} id={item.id} title={item.title}/>
        </div>
       
        ))}
        {
            (showPost&& allPost.length ===0)?<div>Nothing to show</div>:""
        }
        {
            (showFollower&& Follower.length ===0)?<div>Nothing to show</div>:""
        }
        {
            (showFollowing&& following.length ===0)?<div>Nothing to show</div>:""
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
      <div className="bg-gray-100 mx-3 mb-2 shadow-md rounded-lg w-full p-6 flex items-center  space-x-4 hover:cursor-pointer" onClick={() =>{ 
        navigate(`/profile/${id}`)
        
        }}>
        {/* Profile Picture */}
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-semibold">
          {username[0].toUpperCase()}
        </div>
  
        {/* Profile Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800">{username}</h3>
          <p className="text-sm text-gray-600">{fullname}</p>
        </div>
      </div>
);}