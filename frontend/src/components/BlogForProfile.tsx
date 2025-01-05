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
      <div className="flex flex-col   justify-start mx-2 items-start shadow-md rounded-lg px-3 gap-2 md:py-6 mb-5 h-full max-h-[35vh] " onClick={() => handleClicked(id)} >
        <div className="font-serif text-xl font-semibold hover:cursor-pointer flex justify-between items-center w-full" >
          <div className='font-bold text-3xl text-start font-serif w-full' >{title || 'Untitled Blog'}</div>
        </div>
        <div className="font-serif text-gray-600 overflow-hidden text-ellipsis line-clamp-5 ">{content}</div>
      </div>
    );
  };
  
  export default Blog;