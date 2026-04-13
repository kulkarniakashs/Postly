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
      <div className="flex flex-col justify-start w-full items-start bg-white shadow-sm hover:shadow-xl md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-2xl p-6 md:p-8 mb-6 h-full hover:-translate-y-1 transition-all duration-300 animate-slide-up group">
        <div className="flex flex-col md:flex-row justify-between items-start w-full mb-4 gap-4"  >
          <div className='font-bold sm:text-2xl text-xl text-start font-outfit w-full text-slate-800 hover:text-primary-600 transition-colors cursor-pointer' onClick={() => handleClicked(id)} >{title || 'Untitled Blog'}</div>
          <div className='w-full md:w-auto'><Profile username={username} fullname={fullname} id={authorid}  /></div>
        </div>
        <div className={`font-inter text-slate-600 leading-relaxed cursor-pointer mb-6 ${size}`} onClick={() => handleClicked(id)}>{content || ""}</div>
        <div className='text-sm text-right text-slate-400 font-inter font-medium w-full mt-auto pt-4 border-t border-slate-50'>{date && `${date.split("T")[0]} · ${date.split("T")[1].slice(0,5)}` }</div>
      </div>
    );
  };
  
  export default Blog;