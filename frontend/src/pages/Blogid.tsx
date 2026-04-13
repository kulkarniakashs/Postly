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
    <div className='min-h-screen w-full flex justify-center items-start pt-12 md:pt-20 p-4 bg-slate-50'>
    <div className='flex justify-center h-full w-full md:max-w-4xl'>
      {blog &&
      <Blog id={blog.id} title={blog.title} content={blog.content} username={blog.username} fullname={blog.fullname} authorid={blog.authorid} date={blog.date} size='text-lg leading-loose'/>
      }
    </div>  
    </div>
  )
}

export default Blogid