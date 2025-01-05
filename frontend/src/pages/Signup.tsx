import Quote from '../components/Quote';
import SignUpForm from '../components/SignUpForm';
function Signup() {
  return (
    <div className='flex h-screen flex-col md:flex-row w-screen min-h-screen'>
    <SignUpForm type={"SignUp"}/>
    <Quote />
  </div>
  );
}

export default Signup;