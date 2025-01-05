import React from 'react'
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
interface BlogProps {
    id: string;
    title: string;
    content: string;
    username: string,
    fullname:string,
    authorid:string,
    date: string,
    size : string
  }
  const Blog: React.FC<BlogProps> = ({ id, title, content,username,fullname,authorid ,date,size=""}) => {
    const handleClicked = (id: string) => {
        navigate(`/blog/${id}`);
    }
    const navigate= useNavigate();
    
    return (
      <div className="flex flex-col justify-start w-full items-start shadow-md rounded-lg px-5 gap-2 py-2 md:py-6 mb-5 h-full">
        <div className="font-serif text-xl font-semibold hover:cursor-pointer flex justify-between items-center w-full"  >
          <div className='font-bold sm:text-3xl text-start font-serif w-full text-xl 'onClick={() => handleClicked(id)} >{title || 'Untitled Blog'}</div>
          <div className='w-full md:w-[30vw] max-w-md'><Profile username={username} fullname={fullname} id={authorid}  /></div>
        </div>
        <div className={`font-serif text-gray-600 ${size}`} onClick={() => handleClicked(id)}>{content || ""}</div>
        <div className='text-xs text-right text-gray-500 font-sans '>{date && `${date.split("T")[0]} ${date.split("T")[1].slice(0,5)}` }</div>
      </div>
    );
  };
  
  export default Blog;