"use client"
import Link from 'next/link'
import React from 'react'
import { LuAsterisk } from 'react-icons/lu'
import { useLogin } from '../hook/useLogin'

const Login = () => {

    const {errors, isLoading, formdata, handleChange, handleSubmit} = useLogin()
  return (
     <div className='px-9 py-4 bg-white'>
            {/* heading */}
            <div>
                <h1 className='font-medium tracking-[0.03em] text-[#fc6435] text-xl mb-5'>EVENTLOOP</h1>
                <h1 className='text-black text-[23px] md:text-[30px] font-[700] font-[Plus Jakarta Sans", sans-serif]'>Welcome Back!</h1>
                <p className='text-[16px] font-[400] font-[Plus Jakarta Sans", sans-serif]'>Continue with the email address used to create your account</p>
            </div>
            {/* form */}
            <div>
                <form onSubmit={handleSubmit} className='mt-6'>

                    {/* email */}
                     <div>
                        <div className='flex items-center gap-0.5 text-center'>
                            <LuAsterisk className='text-[#fc6435] text-xs' />
                            <label className='block text-[14px] font-[500] mb-2 mt-4' htmlFor="email">Email</label>
                        </div>
                        <input value={formdata.email} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]' type="email" name='email' placeholder='Enter your email' />
                                             {errors.message && <p className='text-red-500 text-sm'>{errors.message}</p>}
                    </div>
                    {/* password */}
                     <div>

                       <div className='flex items-center gap-0.5 text-center'>
                         <LuAsterisk className='text-[#fc6435] text-xs' />
                        <label className='block text-[14px] font-[500] mb-2 mt-4' htmlFor="password">Password</label>
                       </div>
                        <input value={formdata.password} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]' type="password" name='password' placeholder='Enter your password' />
                                             {errors.message && <p className='text-red-500 text-sm'>{errors.message}</p>}
                    </div>
    
                  
                        <button className='w-full bg-[#fc6435] text-white py-3 rounded-md mt-6 hover:bg-[#e5533d] transition duration-300 ease-in-out' type='submit'>
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    <p className='text-center mt-4'>Don't have an account? <Link className='text-[#fc6435] font-[500]' href={"/auth/login"}>Create one</Link></p>
                </form>
            </div>
        </div>
  )
}

export default Login