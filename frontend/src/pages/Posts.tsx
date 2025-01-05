import { useState ,useEffect} from 'react'
import { backend } from '../apikeys';
import axios from 'axios';
import Blog from '../components/Blog';

function Dashboard() {
  type Post = {
    id: string;
    title: string;
    content: string;
    username: string;
    fullname: string;
    authorid: string;
    date : string
  };
  type authortype = {
    username : string,
    fullname : string,
    id : string
  };
  type followingPost = {
    id: string;
    title: string;
    content: string;
    date : string;
    author : authortype;
  };
  const [posts, setPosts] = useState<Post[]>([])
  const [followingPosts, setFollowingPosts] = useState<followingPost[]>([])
  const [followingPage, setfollowingPage] = useState(1)
  const [page, setPage] = useState(1)
  const [allpostshow, setAllpostshow] = useState(true)
  const fetchData = async ()=>{
    if(allpostshow){
    let token = localStorage.getItem('mediumtoken')
    let response = await axios.get(`${backend}/blog?page=${page}`,{
      headers :{
        Authorization : token
      }
    })
    let data = await response.data
    setPosts(data)
    console.log('respnse.data',data);   
    console.log(posts);
  }
  }
  useEffect(() => {
    fetchData()
    var effectFetch = setInterval(fetchData,5000)
    return () => {
      console.log("interval cleared");
      
      clearInterval(effectFetch)
    }
  }, [page,allpostshow])
  // useEffect(() => {
  //   fetchData()
  //   setInterval(fetchData,20000)
  // }, [page])
  async function fetchFollwingPosts() {
    if(!allpostshow){

      console.log("following fetch");
      
      let token = localStorage.getItem('mediumtoken')
      let response = await axios.get(`${backend}/blog/followingposts?page=${followingPage}`,{
        headers :{
          Authorization : token
        }
      })
      let data = await response.data
      setFollowingPosts(data)
      console.log('respnse.data',data);   
      console.log(posts);
  }
  }
   useEffect(() => {
    console.log(allpostshow);
    
     fetchFollwingPosts()
     let fe = setInterval(() => {
       fetchFollwingPosts()
     }, 5000);
     return () => {
      clearInterval(fe)
      console.log("cleared fetch follwoing");
      
     }
   }, [followingPage,allpostshow])
   



  return (
    <div className='w-full h-full md:max-h-[90vh] overflow-auto bg-gray-100'>
    
    <div className='text-3xl font-serif font-bold text-center py-2 sticky top-0 bg-gray-100'>
      <div>Blogs</div>
      <div className="mt-0 text-xs font-normal">
                <div className="flex justify-center items-center p-1 gap-3">
                    <button className="focus:border-blue-400 border-b-2 transition-colors duration-200" onClick={()=>{
                        setAllpostshow(true)
                        }}>All</button>
                    <button className="focus:border-blue-400 border-b-2 transition-colors duration-200" onClick={()=>{
                        setAllpostshow(false)
                       // console.log(allpostshow);   
                    } }>Following</button>
                </div>
            </div>
    </div>
  
    
    <div  className='w-full  flex flex-col items-start justify-center p-4 md:overflow-y-auto'>
      {allpostshow && (posts.length>=1? posts.map(post => {
        return <Blog key={post.id} id={post.id} title={post.title} content={post.content} username={post.username} fullname={post.fullname} authorid={post.authorid} date={post.date} size='overflow-hidden text-ellipsis line-clamp-4' />
      }) : <div className='text-2xl font-serif font-semibold text-center'>No Blogs</div>)}
      { !allpostshow && (followingPosts.length>=1 ? followingPosts.map(post => {
        return <Blog key={post.id} id={post.id} title={post.title} content={post.content} username={post.author.username} fullname={post.author.fullname} authorid={post.author.id} date={post.date} size='overflow-hidden text-ellipsis line-clamp-4' />
      }) : <div className='text-2xl font-serif font-semibold text-center'>No Blogs</div>)}
    </div>
    <div className='flex justify-around items-center m-2 '>
      {/* <button className='py-2 px-8 border-2  border-gray-500 foucs:border-black md:hidden'onClick={
        ()=>{
          const targetDiv = document.getElementById("create");
          if (targetDiv) {
            targetDiv.scrollIntoView({ behavior: "smooth" });
          }
      }}>Create Post</button> */}
      <button className='py-2 px-8 border-2 border-gray-500 foucs:border-black' onClick={
        ()=>{
          if(allpostshow) {if(page>2){
            setPage(page-1)
          }}
          else{
            if(followingPage>2){
              setfollowingPage(followingPage-1)            
            }
          }
        }
      }>Previous</button>
      <button className='py-2 px-8 border-2 border-gray-500 focus:border-black'
      onClick={
        ()=>{
          if(allpostshow){
            setPage(page+1)
          }else{
            setfollowingPage(followingPage+1)
          }     
      }}>Next</button>
    </div>
    </div>
  )
}

export default Dashboard