import LabelledInput from './LabelledInput'
import ButtonSubmit from './ButtonSubmit'
import { SignUpType } from '../types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { backend } from '../apikeys'
import { useNavigate } from 'react-router-dom'
function SignUpForm({type}: {type: string}) {
    const [signUp, setSignUp] = useState<SignUpType>({
        fullname: '',
        username: '',
        password: ''
    })
    const [msg,setMsg] = useState(null)
    const navigate = useNavigate()
  return (
    <div className='w-full h-full flex justify-center items-center p-4 md:p-10 bg-slate-50'>
        <div className='flex flex-col items-center justify-center max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-10 w-full border border-slate-100 animate-fade-in'>
            <div className='mb-3 text-3xl font-outfit font-bold text-center text-slate-800'>
              {type === "SignUp" ? "Create an account" : "Welcome back"}
            </div> 
            <div className='text-slate-500 font-inter text-center mb-8 flex justify-center items-center gap-1'>
              {type === "SignUp" ? "Already have an account?" : "Don't have an account?"}
              <Link className='text-primary-600 hover:text-primary-700 font-semibold transition-colors' to={type === "SignUp" ? '/signin' : '/signup'}>
                {type === "SignUp" ? 'Sign in' : 'Sign up'}
              </Link>
            </div>
          { type === "SignUp" &&  <LabelledInput label='fullname' placeholder='John Doe' onchange={e => {
                setSignUp({
                    ...signUp,
                    fullname: e.target.value
                })
            }}
            />}
            <LabelledInput label='username' placeholder='johndoe' onchange={(e) => {
                setSignUp({
                    ...signUp,
                    username: e.target.value
                })
            }}/>
            <LabelledInput label='password' placeholder='••••••••' type='password' onchange={(e) => {
                setSignUp({
                    ...signUp,
                    password: e.target.value
                })
            }}/>
            <div className="w-full mt-2">
              <ButtonSubmit label={type === "SignUp" ? "Sign Up" : "Sign In"} onclick={async() => {
                  console.log(`${backend }/${type.toLowerCase()}`);
                  
                  let res = await axios.post(`${backend}/${type.toLowerCase()}`, signUp)
                  let data = await res.data
                  console.log(data);
                  
                  if(data.msg){
                      setMsg(data.msg)
                  }
                  localStorage.setItem('mediumtoken', `Bearer ${data.token}`)
                  if(data.token){
                  navigate('/')
              }
              
              }}/>
            </div>
            {msg && <div className={`text-sm mt-4 text-center font-medium ${msg === "Inputs are incorrect" ? "text-red-500" : "text-amber-500"}`}>{msg}</div>}
        </div>
    </div>
  )
}

export default SignUpForm