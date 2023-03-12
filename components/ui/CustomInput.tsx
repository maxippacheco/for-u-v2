import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form';

//extends InputHTMLAttributes<HTMLInputElement> 
interface Props{
	id: string;
	label: string;
	type: 'email' | 'text' | 'password';
	padding?: string;
	register: UseFormRegister<FieldValues>;
}

export const CustomInput = ({ register, label, type='text', padding = "5", id }: Props) => {
	return (
		<div className='flex flex-col w-full mb-10'>
			<label htmlFor={ id } className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>{ label }</label>
				<input 
					type={ type }
					autoComplete='off'
					className={`p-${ padding } border-2 border-black rounded-full focus:border-sky-500 focus:outline-none`}
					{...register( id ) }					
					// { ...register('email')} 
				/>
		</div>
	)
}
