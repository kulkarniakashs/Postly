import SignUpForm from '../components/SignUpForm'
import Quote from '../components/Quote'
function Signin() {
  return (
    <div className='flex h-screen flex-col md:flex-row w-screen min-h-screen'>
    <SignUpForm type={"Signin"}/>
    <Quote />
  </div>
  )
}

export default Signin