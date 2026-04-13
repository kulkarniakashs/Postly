import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { backend } from "../apikeys";

const ProfileWithFollow = (queryUser:
   { queryUser : string}
) => {
    console.log(queryUser ,"proButton");
    let params = useParams() 
    const [username,setusername] = useState("")
    const [fullname,setfullname] = useState("")
    const [isFollowing, setIsFollowing] = useState(false);
    const [bio, setBio] = useState("");
    const [draftBio, setDraftBio] = useState("");
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [isSelf, setIsSelf] = useState(false);

    const handleFollowClick = async () => {
    if(isFollowing===true){
        let res = await axios.post(`${backend}/user/unfollow`,{
            followingid : params.authorquery ,

        },
    {
        headers:{
            Authorization : localStorage.getItem('mediumtoken')
        }
    })
   let data = await res.data;
   console.log(data,"unfollow")
}
    else {
        let res = await axios.post(`${backend}/user/follow`,{
            followingid : params.authorquery ,

        },
    {
        headers:{
            Authorization : localStorage.getItem('mediumtoken')
        }
    })
   let data = await res.data;
   console.log(data,"follow")
    }
    setIsFollowing(!isFollowing)
    
    };
  
   async function fetchUserDeatil(){
    let token =localStorage.getItem('mediumtoken')

    let res = await axios.post(`${backend}/user/detail`,{
        queryUser : params.authorquery
    },{
        headers : {
            Authorization : token
        }
    })
    let data = await res.data;
    console.log(data);

    setusername(data.username)
    setfullname(data.fullname)
    setBio(data.bio || "")
    setDraftBio(data.bio || "")

    let selfRes = await axios.get(`${backend}/user/detail`, {
        headers : {
            Authorization : token
        }
    })
    let selfData = await selfRes.data;
    if (selfData.id === params.authorquery) {
        setIsSelf(true)
    } else {
        setIsSelf(false)
    }
    }

    const handleSaveBio = async () => {
        let token = localStorage.getItem('mediumtoken')
        try {
            let res = await axios.put(`${backend}/user/bio`, { bio: draftBio }, {
                headers: { Authorization: token }
            })
            if (res.data.bio !== undefined) {
                setBio(res.data.bio)
            }
            setIsEditingBio(false)
        } catch (e) {
            console.error("Failed to save bio")
        }
    };

    useEffect(() => {
     
      fetchUserDeatil()
     console.log("done");
    
      return () => {
        
      }
    }, [queryUser])
    
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
        setIsFollowing(data.isFollowed)
        
    }
    useEffect(() => {
      fetchRelation()
      return () => {
      }
    }, [isFollowing])


  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start p-8 bg-white border border-slate-100 rounded-3xl shadow-sm gap-6 justify-between w-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-400 to-indigo-500 opacity-10"></div>
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 z-10 w-full">
        {/* Profile Picture */}
        <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500 to-indigo-600 text-white rounded-full text-4xl font-bold shadow-md border-4 border-white object-cover">
          {username && username.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div className="text-center sm:text-left flex-1">
          <h2 className="text-3xl font-outfit font-bold text-slate-800 tracking-tight">{fullname}</h2>
          <p className="text-primary-600 font-inter font-medium text-lg mb-1">@{username}</p>
          {isEditingBio ? (
             <div className="w-full mt-3 max-w-lg">
                 <textarea value={draftBio} onChange={(e) => setDraftBio(e.target.value)} maxLength={250} className="w-full border border-slate-300 rounded-lg p-3 text-sm font-inter text-slate-700 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all resize-none shadow-sm" rows={3} placeholder="Write something about yourself..." />
                 <div className="flex gap-2 mt-2">
                     <button onClick={handleSaveBio} className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">Save</button>
                     <button onClick={() => { setIsEditingBio(false); setDraftBio(bio); }} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Cancel</button>
                 </div>
             </div>
          ) : (
             <p className="text-slate-600 font-inter mt-3 text-sm sm:text-base leading-relaxed max-w-2xl whitespace-pre-wrap">{bio || (isSelf ? "Click 'Edit Bio' to add a description." : "No bio available.")}</p>
          )}
        </div>

        {/* Follow/Unfollow/Edit Button */}
        {!isSelf ? (
            <button
            onClick={handleFollowClick}
            className={`mt-4 sm:mt-0 px-8 py-3 rounded-xl font-inter font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                isFollowing
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-red-500"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
            >
            {isFollowing ? "Unfollow" : "Follow"}
            </button>
        ) : (
            !isEditingBio && (
                <button
                onClick={() => setIsEditingBio(true)}
                className="mt-4 sm:mt-0 px-6 py-2.5 rounded-xl font-inter font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                >
                  Edit Bio
                </button>
            )
        )}
      </div>
    </div>
  );
};

export default ProfileWithFollow;

