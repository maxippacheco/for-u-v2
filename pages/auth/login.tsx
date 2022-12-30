import Image from 'next/image'
import React from 'react'
import Person from '../../public/person.jpg'

export default function login(){
	return (
	<div className='w-screen h-screen bg-sky-500 flex flex-col'>
	

		<div className='h-screen w-1/2 bg-white rounded-tr-3xl rounded-br-3xl flex flex-col items-center justify-center'>
			
			<div className='mb-10'>
				<h1 className='text-5xl text-center mb-7'>Welcome to For U!</h1>
				<span className='text-gray-500'>The best site to know about the community</span>
			</div>

			<form className='w-2/3'>
				<div className='flex flex-col justify-center items-center'>
					
					<div className='flex flex-col w-full mb-10'>
						<label htmlFor="email" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Enter your email</label>
						<input type="email" className='p-5 border-2 border-black rounded-full' />
					</div>
					
					<div className='flex flex-col w-full mb-10'>
						<label htmlFor="username" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Enter your name</label>
						<input type="text" className='p-5 border-2 border-black rounded-full' />
					</div>

					
					<div className='flex flex-col w-full mb-10'>
						<label htmlFor="password" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Enter your password</label>
						<input type="password" className='p-5 border-2 border-black rounded-full' />
					</div>

					<div className='w-full'>
						<div>
							<input type="checkbox" />
							<label htmlFor="checkbox">Remeber Me</label>
						</div>
					</div>

					<div>
						<input type="submit" value="Sign In" />
					</div>

				</div>

			</form>
		</div>

	</div>
	)
}
