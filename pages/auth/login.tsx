import Image from 'next/image'
import NextLink from 'next/link';
import Google from '../../public/google.svg'
import Github from '../../public/github.svg'

export default function login(){
	return (
	<div className='w-screen h-screen bg-sky-500 flex flex-col'>


		<div className='h-screen lg:w-1/2 w-full bg-white lg:rounded-tr-3xl lg:rounded-br-3xl flex flex-col items-center justify-center'>
			
			<div className='mb-10'>
				<h1 className='sm:text-5xl text-4xl text-center mb-7'>Welcome to For U!</h1>
				<span className='text-gray-500'>The best site to know about the community</span>
			</div>

			<form className='md:w-3/5 w-11/12'>
				<div className='flex flex-col justify-center items-center'>
					
					<div className='flex flex-col w-full mb-10'>
						<label htmlFor="email" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Enter your email</label>
						<input type="email" className='p-5 border-2 border-black rounded-full focus:border-sky-500 focus:outline-none' />
					</div>
{/* 					
					<div className='flex flex-col w-full mb-10'>
						<label htmlFor="username" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Enter your name</label>
						<input type="text" className='p-5 border-2 border-black rounded-full focus:border-sky-500 focus:outline-none' />
					</div> */}

					
					<div className='flex flex-col w-full mb-10'>
						<label htmlFor="password" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Enter your password</label>
						<input type="password" className='p-5 border-2 border-black rounded-full focus:border-sky-500 focus:outline-none' />
					</div>

					<div className='w-full'>
						<div className='pl-5 flex items-center'>
							<input type="checkbox" className='h-5 w-5 accent-sky-700 cursor-pointer' />
							<label htmlFor="checkbox" className='translate-x-1 text-gray-500'>Remember Me</label>
						</div>
					</div>

					<div className='w-full flex justify-center mt-5'>
						<input type="submit" value="Sign In" className='
							bg-gradient-to-r from-blue-600 to-sky-400 w-full 
							p-2.5 rounded-full text-white text-lg hover:cursor-pointer hover:brightness-95' 
						/>
					</div>
					<div className='w-full flex flex-row justify-center mt-9'>
						<div className='w-1/2 flex justify-end mr-2'>
							<button className='flex flex-row items-center border-2 border-black p-3 rounded-full w-full'>
								<Image src={ Google } alt="google" className='w-8 h-8 mr-2' /> Google
							</button>
						</div>

						<div className='w-1/2 flex justify-start'>
							<button className='flex flex-row items-center border-2 border-black p-3 rounded-full w-full'>
								<Image src={ Github } alt="github" className='w-8 h-8 mr-2' /> Github
							</button>
						</div>
					</div>

					<div className='mt-5 underline text-gray-500'>
						<NextLink href={'/auth/register'}>Don't you have an account?</NextLink>
					</div>


				</div>

			</form>
		</div>

	</div>
	)
}
