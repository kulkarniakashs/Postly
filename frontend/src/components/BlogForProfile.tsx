import React from 'react'
import { useNavigate } from 'react-router-dom';
interface BlogProps {
    id: string;
    title: string;
    content: string
  }
  const Blog: React.FC<BlogProps> = ({ id, title, content }) => {
    const handleClicked = (id: string) => {
        navigate(`/blog/${id}`);
    }
    const navigate= useNavigate();
    return (
      <div className="flex flex-col justify-start w-full items-start bg-white shadow-sm hover:shadow-md border border-slate-100 rounded-2xl p-6 mb-4 hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in" onClick={() => handleClicked(id)} >
        <div className="flex justify-between items-start w-full mb-3" >
          <div className='font-bold text-2xl text-start font-outfit w-full text-slate-800' >{title || 'Untitled Blog'}</div>
        </div>
        <div className="font-inter text-slate-600 overflow-hidden text-ellipsis line-clamp-3 leading-relaxed w-full">{content}</div>
      </div>
    );
  };
  
  export default Blog;