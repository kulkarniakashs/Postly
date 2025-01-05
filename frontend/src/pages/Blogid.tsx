import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { backend } from '../apikeys'
import Blog from '../components/Blog'
function Blogid() {
  type Blog = {
    id: string;
    title: string;
    content: string;
    username: string;
    fullname: string;
    authorid: string;
    date : string
  };
  const [blog, setBlog] = useState<Blog>({
    id: '',
    title: '',
    content: '',
    username: '',
    fullname: '',
    authorid: '',
    date : ''
  })
  let inputdata = useParams()
  useEffect(() => {
    async function fetchData() {
      let data = await axios.get(`${backend}/blog/${inputdata.id}`,{
        headers:{
          authorization : localStorage.getItem('mediumtoken')
        }
      })
      let blogdata = await data.data
      setBlog(blogdata)
    }
    fetchData()
    return () => {
      
    }
  }, [])
  
  return (
    <div className='h-screen w-screen flex justify-center items-center p-4'>
    <div className=' flex justify-center h-full w-full md:max-w-[70vw] shadow-md md:shadow-sm'>{blog &&
      <Blog id={blog.id} title={blog.title} content={blog.content} username={blog.username} fullname={blog.fullname} authorid={blog.authorid} date = {blog.date} size=''/>
      }
    </div>  
    </div>
  )
}

export default Blogid