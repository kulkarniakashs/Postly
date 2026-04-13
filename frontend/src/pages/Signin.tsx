import SignUpForm from '../components/SignUpForm'
import Quote from '../components/Quote'
function Signin() {
  return (
    <div className='flex h-screen flex-col md:flex-row w-full min-h-screen'>
      <div className='w-full md:w-1/2 h-full'>
        <SignUpForm type={"Signin"}/>
      </div>
      <div className='w-full md:w-1/2 h-full'>
        <Quote />
      </div>
    </div>
  )
}

export default Signin