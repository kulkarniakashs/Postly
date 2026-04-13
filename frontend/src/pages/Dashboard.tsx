import Posts from '../pages/Posts'
import CreatePost from '../components/CreatePost';
import Navbar from '../components/Navbar';
function Dashboard() {
  console.log("in Dashboard");
  return (
    <div className='w-full h-screen max-h-screen flex flex-col justify-start bg-slate-50 overflow-hidden'>
      <Navbar/>
    <div className='w-full h-full flex flex-col justify-start items-start md:grid md:grid-cols-3 gap-0'>
    <div className='md:col-span-1 w-full h-[90vh] md:h-[90vh] border-r border-slate-200 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10' id='create'><CreatePost/></div>
    <div className='md:col-span-2 w-full h-[90vh] pb-10 overflow-hidden' id='posts'><Posts/></div>
    </div>
    </div>
  )
}
export default Dashboard