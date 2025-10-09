"use client"

import Link from 'next/link'
import React from 'react'
import { LuAsterisk } from 'react-icons/lu'

const Register = () => {
  return (
    <div className='px-9 py-4 bg-white'>
        {/* heading */}
        <div>
            <h1 className='font-medium tracking-[0.03em] text-[#fc6435] text-xl mb-5'>EVENTLOOP</h1>
            <h1 className='text-black text-[30px] font-[700] font-[Plus Jakarta Sans", sans-serif]'>Create an account</h1>
            <p className='text-[16px] font-[400] font-[Plus Jakarta Sans", sans-serif]'>It's free to create an account and get started with Eventloop!</p>
        </div>
        {/* form */}
        <div>
            <form>
                <div>
                    <div className='flex items-center gap-0.5 text-center'>
                        <LuAsterisk className='text-[#fc6435] text-xs' />
                        <label className='block text-[14px] font-[500] mb-2 mt-4' htmlFor="firstname">First Name</label>
                    </div>
                    <input className='w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]' type="text" name='firstname' placeholder='Enter your first name' />
                </div>
                 <div>
                   <div className='flex items-center gap-0.5 text-center'>
                        <LuAsterisk className='text-[#fc6435] text-xs' />
                        <label className='block text-[14px] font-[500] mb-2 mt-4' htmlFor="lastname">Last Name</label>
                   </div>
                    <input className='w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]' type="text" name='lastname' placeholder='Enter your last name' />
                </div>
                 <div>
                    <div className='flex items-center gap-0.5 text-center'>
                        <LuAsterisk className='text-[#fc6435] text-xs' />
                        <label className='block text-[14px] font-[500] mb-2 mt-4' htmlFor="email">Email</label>
                    </div>
                    <input className='w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]' type="email" name='email' placeholder='Enter your email' />
                </div>
                 <div>
                   <div className='flex items-center gap-0.5 text-center'>
                     <LuAsterisk className='text-[#fc6435] text-xs' />
                    <label className='block text-[14px] font-[500] mb-2 mt-4' htmlFor="password">Password</label>
                   </div>
                    <input className='w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]' type="password" name='password' placeholder='Enter your password' />
                </div>

                <div className='flex gap-4'>
                    <button type='button' className='w-full bg-[#ffefea] text-[#fc6435] py-3 rounded-md mt-6 transition duration-300 ease-in-out'>
                       <Link href={"/"}>Back to login</Link>
                    </button>
                    <button className='w-full bg-[#fc6435] text-white py-3 rounded-md mt-6 hover:bg-[#e5533d] transition duration-300 ease-in-out' type='submit'>
                        sign up
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register