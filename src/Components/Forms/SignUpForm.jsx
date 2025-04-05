import React, { useState } from 'react'
import { signUpWithEmailAndPassword } from '../../services/login.service'
import { Link, useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",

    })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        signUpWithEmailAndPassword(signUpData.email, signUpData.password)
        setSignUpData({

            email: "",
            password: "",
        })
        navigate("/")

    }
    return (
        <div className='bg-gradient-to-tl from-purple-300 to-indigo-400 h-screen flex justify-center '>
            <div className=' bg-inherit backdrop-blur-md flex flex-col justify-center h-3/4 w-3/4 shadow-2xl rounded-lg my-auto'>
                <h1
                    className='font-bold text-5xl text-center font- text-white mb-5'>
                    Create an account
                </h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className='grid grid-rows-2 mx-9 my-3 lg:mx-[100px] transition-all duration-200 '>
                        <label
                            className='font-semibold text-gray-100 text-lg'
                            htmlFor="email">
                            Email
                        </label>
                        <input
                            placeholder='example@email.com'
                            type="email"
                            id='email'
                            name='email'
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                            className='rounded-md  p-1 active:outline-offset-2 focus:outline-gray-600'
                        />
                    </div>
                    <div className='grid grid-rows-2 mx-9 my-5 lg:mx-[100px] transition-all duration-200'>
                        <label
                            className='font-semibold text-gray-100 text-lg'
                            htmlFor="password">
                            Password
                        </label>
                        <input
                            placeholder='******'
                            type="password"
                            id='password'
                            name='password'
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                            className='rounded-md p-1 active:outline-offset-2 focus:outline-gray-600'
                        />
                    </div>
                    <div
                        className='flex justify-center lg:mx-[100px] transition-all duration-200'>
                        <button
                            className='bg-[#c2abfd] text-white font-medium  w-screen mt-5 mx-9 p-2 rounded-lg hover:bg-[#9485be] hover:shadow-md focus:outline-offset-5'
                            type='submit'>
                            Sign In
                        </button>
                    </div>
                </form>
                <div className='text-center mt-8'>
                    <Link to="/" className='font-normal text-white hover:text-gray-300'>Already have an account</Link>
                    </div>
            </div>
        </div>
    )
}

export default SignUpForm
