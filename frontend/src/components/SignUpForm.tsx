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
    <div className='w-full h-full flex justify-center items-center p-4'>
        <div className='flex flex-col items-start justify-center max-w-lg rounded-md shadow-md md:shadow-lg p-10 px-4 w-full'>
            <div className='mb-2 text-3xl font-semibold text-center'>{type ==="SignUp"?"Create a free Account":"Login in Existing Account"}</div> 
            <div className='text-gray-500 font-thin text-center mb-6 '>{type ==="SignUp"?"Already have an account?":"Create new one"}
            <Link className='underline ml-2' to={type==="SignUp"?'/signin':'/signup'}>{type==="SignUp"?'signin':'signup'}</Link>            </div>
         { type=="SignUp" &&  <LabelledInput label='fullname' placeholder='fullname' onchange={e => {
                setSignUp({
                    ...signUp,
                    fullname: e.target.value
                })
            }}
            />}
            <LabelledInput label='username' placeholder='username' onchange={(e) => {
                setSignUp({
                    ...signUp,
                    username: e.target.value
                })
            }}/>
            <LabelledInput label='password' placeholder='password' type='password' onchange={(e) => {
                setSignUp({
                    ...signUp,
                    password: e.target.value
                })
            }}/>
            <ButtonSubmit label='Sign Up' onclick={async() => {
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
            {msg && <div className={msg==="Inputs are incorrect"? "text-red-300 text-center":"text-gray-400 text-center"}>{msg}</div>}
        </div>
    </div>
  )
}

export default SignUpForm