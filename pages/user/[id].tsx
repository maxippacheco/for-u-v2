import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { MdPhotoCamera } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { AppLayout } from '../../layouts/AppLayout';
import defaultUser from '../../assets/default_user.png'


export default function handler(){

	const inputRef = useRef<HTMLInputElement>(null);

	const openFile = () => {
		inputRef.current?.click();
		
		
	}


	// TODO: add types
	const { register, handleSubmit, setValue } = useForm();

	// TODO sent file from form
  const onSubmit = (data: any) => {
    console.log(data);
  };



	useEffect(() => {
	}, [])
	

	return(
		<AppLayout title="Community">
      <div className='w-full md:h-auto h-[calc(100vh-5rem)] flex flex-row'>
				<div className='hidden lg:flex w-1/4 bg-gray-100 h-[calc(100vh-5rem)] sticky'></div>

				<div className='grow md:w-2/4 h-[calc(100vh-5rem)] relative'>
					<div className="w-full h-56 bg-gray-900" />
					<div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-10'>
						{/* TODO: handle */}
						{/* <form onSubmit={ handleSubmit(onSubmit) }>
							<input 
								type="file" 
								className='hidden'
								{ ...register('file') }
								onChange={(ev) => {
									setValue('file', ev.target.value);
								}} 
								ref={ inputRef }
							/>
						</form> */}

						<Image 
							className="w-40 h-40 rounded-full bg-sky-500 shadow-md" 
							src={ defaultUser }
							alt='default user'
						/>
						
					</div>
					<div className="w-full h-48 border-b">
						<div className='flex justify-end mt-2 mr-3'>
							<button className='border border-gray-900 px-2.5 py-1 rounded-lg cursor-pointer'>Edit profile</button>
						</div>


						<div className="flex flex-col h-full justify-end ml-3">
								{/*  */}
						</div>
					</div>
						<div>
							
						</div>

				</div>

				<div className='hidden lg:flex w-1/4 bg-gray-100 h-[calc(100vh-5rem)] sticky'></div>


			</div>

		</AppLayout>

	)
}