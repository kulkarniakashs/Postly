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
    
    <div className='flex flex-col md:flex-row justify-between items-center py-4 px-6 md:px-8 sticky top-0 bg-slate-50/90 backdrop-blur-md z-10 border-b border-slate-200 mb-6'>
      <div className='text-3xl font-outfit font-extrabold text-slate-800 tracking-tight'>Feed</div>
      <div className="mt-4 md:mt-0 bg-slate-200/60 p-1.5 rounded-full flex gap-1 shadow-inner">
          <button className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${allpostshow ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`} onClick={()=>{
              setAllpostshow(true)
              }}>All Posts</button>
          <button className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${!allpostshow ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`} onClick={()=>{
              setAllpostshow(false)
          } }>Following</button>
      </div>
    </div>
  
    
    <div  className='w-full  flex flex-col items-start justify-center px-4 md:px-8 pb-4 md:overflow-y-auto'>
      {allpostshow && (posts.length>=1? posts.map(post => {
        return <Blog key={post.id} id={post.id} title={post.title} content={post.content} username={post.username} fullname={post.fullname} authorid={post.authorid} date={post.date} size='overflow-hidden text-ellipsis line-clamp-4' />
      }) : <div className='text-xl text-slate-400 font-inter font-medium text-center w-full mt-10'>No Blogs Available</div>)}
      { !allpostshow && (followingPosts.length>=1 ? followingPosts.map(post => {
        return <Blog key={post.id} id={post.id} title={post.title} content={post.content} username={post.author.username} fullname={post.author.fullname} authorid={post.author.id} date={post.date} size='overflow-hidden text-ellipsis line-clamp-4' />
      }) : <div className='text-xl text-slate-400 font-inter font-medium text-center w-full mt-10'>No Blogs Available</div>)}
    </div>
    <div className='flex justify-around items-center m-2 '>
      {/* <button className='py-2 px-8 border-2  border-gray-500 foucs:border-black md:hidden'onClick={
        ()=>{
          const targetDiv = document.getElementById("create");
          if (targetDiv) {
            targetDiv.scrollIntoView({ behavior: "smooth" });
          }
      }}>Create Post</button> */}
      <button className='px-6 py-2 rounded-xl font-inter font-medium transition-all duration-200 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 shadow-sm' onClick={
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
      <button className='px-6 py-2 rounded-xl font-inter font-medium transition-all duration-200 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 shadow-sm'
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