import Posts from '../pages/Posts'
import CreatePost from '../components/CreatePost';
import Navbar from '../components/Navbar';
function Dashboard() {
  console.log("in Dashboard");
  return (
    <div className='w-full h-screen max-h-screen flex flex-col justify-start'>
      <Navbar/>
    <div className='w-full h-full flex flex-col justify-start items-start md:grid md:grid-cols-3'>
    <div className='md:col-span-1 w-full h-[90vh] md:h-full' id='create'><CreatePost/></div>
    <div className='md:col-span-2 w-full h-full' id='posts'><Posts/></div>
    </div>
    </div>
  )
}
export default Dashboard