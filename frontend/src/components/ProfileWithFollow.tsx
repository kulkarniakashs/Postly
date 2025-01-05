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
    }

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
    <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-md gap-4 justify-center w-full">
      {/* Profile Picture */}
      <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full text-2xl font-bold">
        {username && username.charAt(0).toUpperCase()}
      </div>

      {/* User Info */}
      <div>
        <h2 className="text-lg font-semibold">{fullname}</h2>
        <p className="text-gray-500">@{username}</p>
      </div>

      {/* Follow/Unfollow Button */}
      <button
        onClick={handleFollowClick}
        className={`ml-auto px-4 py-2 rounded ${
          isFollowing
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default ProfileWithFollow;

