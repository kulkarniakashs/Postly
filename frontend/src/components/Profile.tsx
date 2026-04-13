import { useNavigate } from "react-router-dom"

function Profile({ username, fullname, id }: {
    username: string,
    fullname: string,
    id: string
}) {
    const navigate = useNavigate()
    return (
        <>
            <div className='hidden sm:flex max-w-md h-full justify-end items-center gap-4 pl-1 md:pr-3 cursor-pointer group' onClick={() => navigate(`/profile/${id}`)}>
                <div className='flex justify-center items-center'>
                    <div className='h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-center font-bold text-xl text-white shadow-inner group-hover:shadow-md transition-shadow duration-200'>
                        {username && username[0].toUpperCase()}
                    </div>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <div className='text-lg font-outfit font-bold text-slate-800 m-0 group-hover:text-primary-600 transition-colors'>{fullname}</div>
                    <div className='text-sm font-inter font-medium m-0 text-slate-500'>{`@${username}`}</div>
                </div>
            </div>
            <div className='text-end font-inter font-medium m-0 text-slate-500 block sm:hidden text-sm cursor-pointer' onClick={() => navigate(`/profile/${id}`)}>{`@${username}`}</div>
        </>
    )
}

export default Profile