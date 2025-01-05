import { useNavigate } from "react-router-dom"

function Profile({username,fullname,id}:{username:string,
    fullname : string,
    id : string
}) 
{ 
    const navigate = useNavigate()
  return (
    <>
   <div className=' hidden sm:flex max-w-md   h-full  justify-end items-center gap-5 pl-1 md:pr-5  rounded-md hover:shadow-2xl' onClick={() => navigate(`/profile/${id}`)}>
        <div className=' flex justify-center items-start'>
            <div className='h-11 w-11 rounded-full bg-green-400 flex justify-center items-start  text-center font-semibold text-3xl text-white'>{username && username[0].toUpperCase()}</div>
        </div>
        <div className='flex flex-col justify-end items-start'>
            <div className='text-xl font-serif font-semibold m-0'>{fullname}</div>
            <div className='text-base font-serif font-extralight m-0 text-gray-400'>{`@${username}`}</div>
        </div>
    </div>
     <div className='text-end font-serif font-extralight m-0 text-gray-400 blcok sm:hidden text-sm' onClick={() => navigate(`/profile/${id}`)}>{`@${username}`}</div>
    </>
  )
}

export default Profile