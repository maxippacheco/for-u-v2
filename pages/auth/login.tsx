import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import Image from 'next/image'
import NextLink from 'next/link';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Google from '../../public/google.svg'
import Github from '../../public/github.svg'
import { ILoginData } from '../../interfaces/auth';


export default function login(){

	
	const [providers, setProviders] = useState<any>({});

	useEffect(() => {
		getProviders().then( provider => {
			setProviders(provider)
			
		})
		
	}, [])
	

	const { register, setValue, handleSubmit, formState: { errors } } = useForm<ILoginData>();
 
	const onSubmit = async({ email, password }: ILoginData) => {
		signIn('credentials', { email, password })
	}




	return (
	<div className='w-screen h-screen bg-sky-500 flex flex-col'>


		<div className='h-screen lg:w-1/2 w-full bg-white lg:rounded-tr-3xl lg:rounded-br-3xl flex flex-col items-center justify-center'>
			
			<div className='mb-10'>
				<h1 className='sm:text-5xl text-4xl text-center mb-7'>Welcome to For U!</h1>
				<span className='text-gray-500'>The best site to know about the community</span>
			</div>

			<form className='md:w-3/5 w-11/12' onSubmit={ handleSubmit(onSubmit) }>
				<div className='flex flex-col justify-center items-center'>
					
					<div className='flex flex-col w-full mb-10'>
						<label htmlFor="email" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Enter your email</label>
						<input 
							type="email"
							autoComplete='off'
							className='p-5 border-2 border-black rounded-full focus:border-sky-500 focus:outline-none' 
							{ ...register('email')} 
						/>
					</div>
					
					<div className='flex flex-col w-full mb-10'>
						<label htmlFor="password" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Enter your password</label>
						<input 
							type="password" 
							className='p-5 border-2 border-black rounded-full focus:border-sky-500 focus:outline-none' 
							{ ...register('password')} 
						/>
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

					{
						Object.values( providers ).map( (provider: any) => {
							if( provider.id === 'credentials' ) return (<div id="credentials" key={'credentials'}></div>)
							
							return(
								<div className='w-1/2 flex justify-end mr-2' key={ provider.id }>
									<button 
										className='flex flex-row items-center border-2 border-black p-3 rounded-full w-full' 
										// TODO FIX
										onClick={ () => signIn( provider.id ) }
									>
										<Image 
											src={ provider.id === 'google' ? Google : Github } 
											alt="social-media" 
											className='w-8 h-8 mr-2' 
										/> { provider.name }
									</button>
								</div>
							)
						})
					}
						{/* <div className='w-1/2 flex justify-end mr-2'>
							<button className='flex flex-row items-center border-2 border-black p-3 rounded-full w-full' onClick={ () => signIn('google') }>
								<Image src={ Google } alt="google" className='w-8 h-8 mr-2' /> Google
							</button>
						</div>

						<div className='w-1/2 flex justify-start'>
							<button className='flex flex-row items-center border-2 border-black p-3 rounded-full w-full'>
								<Image src={ Github } alt="github" className='w-8 h-8 mr-2' onClick={ () => signIn('github') } /> Github
							</button>
						</div> */}
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req}) => {
	const session = await getSession({ req }) // your fetch function here 

	if( session ) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}


	return {
		props: {
			
		}
	}
}