
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCamera, AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import defaultUser from '../../assets/default_user.png'
import { useUiStore } from '../../hooks';
import { CustomInput } from './CustomInput';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
		width: '90vw',
		height: '90vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
  },
};

export const EditUserModal = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const { handleCloseModal, handleOpenModal, isModalOpen } = useUiStore();

	const openFile = () => {
		inputRef.current?.click();
	}


	// TODO: add types
	const { register, handleSubmit, setValue } = useForm();

	// TODO sent file from form
  const onSubmit = (data: any) => {
    console.log(data);
  };
	
	return (
		<Modal
				isOpen={isModalOpen}
				onRequestClose={handleCloseModal}
				style={customStyles}
				contentLabel="Example Modal"
				ariaHideApp={ false }
			>
				<form onSubmit={ handleSubmit(onSubmit) } className='p-5 w-full md:w-3/4 h-full'>
					{/* FILE */}

					<div className='flex justify-center'>
						<div className='absolute h-10 w-10 right-1 top-1 flex justify-center items-center'>
							<AiOutlineClose 
								className='text-3xl hover:cursor-pointer'
								onClick={ handleCloseModal }
							/>
						</div>

						<input 
							type="file" 
							className='hidden'
							{ ...register('file') }
							ref={ inputRef }
						/>

						{/* Icon */}
						<div className='w-40 h-40'>
							<Image
								className="w-40 h-40 rounded-full bg-sky-500 shadow-md" 
								src={ defaultUser }
								alt='default user'
							/>

							<div className='h-10 w-10 absolute bg-sky-500 hover:bg-sky-600 cursor-pointer top-12 translate-x-1 rounded-full flex items-center justify-center'>
								<AiOutlineCamera className='text-2xl' />
							</div>
						</div>

					</div>
					<h2 className='text-center text-2xl my-5'>Edit user</h2>
					
					<CustomInput 
						id='email'
						label='Put your new email'
						register={ register }
						type='email'
						padding="3"	
					/>

					<CustomInput 
						id='name'
						label='Put your new email'
						register={ register }
						type='text'
						padding="3"	
					/>
					
					<input type="submit" value="Submit" className='w-full bg-sky-500 py-2 rounded-xl text-lg text-white cursor-pointer' />

				</form>
		</Modal>

	)
}
