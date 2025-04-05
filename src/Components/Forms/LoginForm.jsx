import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { loginWithEmailAndPassword } from '../../services/login.service'
const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",

    })
    const [error, setError]=useState("")
    const navigate= useNavigate()
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try{
            await loginWithEmailAndPassword(loginData.email, loginData.password)
            setLoginData({ email: "", password: "" })
            setTimeout(() => {
                navigate("/home")
            }, 100); 
        }catch(err){
            setError("Incorrect email or password")
        }
        
    }

    return (
        <div className='bg-gradient-to-tl from-purple-300 to-indigo-400 h-screen flex justify-center '>
            <div className=' bg-inherit backdrop-blur-md flex flex-col justify-center h-3/4 w-3/4 shadow-2xl rounded-lg my-auto'>
                <h1
                    className='font-bold text-5xl text-center font- text-white mb-5'
                >Login</h1>
                
                <form
                    onSubmit={handleSubmit}
                >
                    {error && <p className="text-red-500 text-center mb-4">"Incorrect email or password"</p>}
                    <div
                        className='grid grid-rows-2 mx-9 my-5 lg:mx-[100px] transition-all duration-200'
                    >
                        <label
                            className='font-semibold text-gray-100 text-lg'
                            htmlFor="email">
                            Email :
                        </label>
                        <input
                            placeholder='example@email.com'
                            type="email"
                            id='email'
                            name='email'
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className='rounded-md  p-1 active:outline-offset-2 focus:outline-gray-600'
                        />
                    </div>
                    <div className='grid grid-rows-2 mx-9 my-5 lg:mx-[100px] transition-all duration-200'>
                        <label
                            className='font-semibold text-gray-100 text-lg'
                            htmlFor="password">
                            Password :
                        </label>
                        <input
                            placeholder='******'
                            type="password"
                            id='password'
                            name='password'
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className='rounded-md p-1 active:outline-offset-2 focus:outline-gray-600'
                        />
                    </div>
                    <div className='flex justify-center lg:mx-[100px] transition-[width] duration-200'>
                        <button
                            type="submit"
                            value="Login"
                            className='bg-[#c2abfd] text-white font-medium  w-screen mt-5 mx-9 p-2 rounded-lg hover:bg-[#9485be] hover:shadow-md focus:outline-offset-5'
                        >
                            Login
                        </button>
                    </div>
                    <div className='text-center mt-8'>
                    <Link to="/sign-up" className='font-normal text-white hover:text-gray-300'>Create new account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
