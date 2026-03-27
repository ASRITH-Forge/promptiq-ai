import React, { useContext, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Login = () => {
   
  // State for form mode and inputs
  const [state, setState] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Access axios and token setter from context
  const {axios, setToken} = useAppContext()

  // Handle login/register form submission
  const handleSubmit = async(e) => {
    e.preventDefault()  

    // Choose API endpoint based on mode
    const url = state === "login" ? '/api/user/login' : '/api/user/register'

    try {
        const {data} = await axios.post(url, {name, email, password})

        if(data.success){
            setToken(data.token) // store token in state
            localStorage.setItem('token', data.token) // persist token
        }else{
            toast.error(data.message)
        }
        
    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
  <form onSubmit={handleSubmit} className='flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white'>
            
            {/* Title */}
            <p className='text-2xl font-medium m-auto'>
                <span className='text-purple-700'>User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>

            {/* Name field (only for register) */}
            {state === "register" && (
                <div className='w-full'>
                    <p>Name</p>
                    <input 
                      onChange={(e) => setName(e.target.value)} 
                      value={name} 
                      placeholder="Your Name" 
                      className='border border-gray-200 rounded w-full p-2 mt-1 outline-purple-500' 
                      type="text" 
                      required 
                    />
                </div>
            )}

            {/* Email input */}
            <div className="w-full ">
                <p>Email</p>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                  placeholder="Email" 
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" 
                  type="email" 
                  required 
                />
            </div>

            {/* Password input */}
            <div className="w-full ">
                <p>Password</p>
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                  placeholder="password" 
                  className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" 
                  type="password" 
                  required 
                />
            </div>

            {/* Toggle between login and register */}
            {state === "register" ? (
                <p>
                    Already have account? 
                    <span 
                      onClick={() => setState("login")} 
                      className="text-purple-700 cursor-pointer"
                    >
                      click here
                    </span>
                </p>
            ) : (
                <p>
                    Create an account? 
                    <span 
                      onClick={() => setState("register")} 
                      className="text-purple-700 cursor-pointer"
                    >
                      click here
                    </span>
                </p>
            )}

            {/* Submit button */}
            <button 
              type='submit' 
              className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer"
            >
                {state === "register" ? "Create Account" : "Login"}
            </button>

        </form>
  )
}

export default Login