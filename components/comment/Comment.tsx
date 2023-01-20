import React from 'react'
import { IComment } from '../../interfaces/comment';
import { formatTime } from '../../utils';

interface Props{
	comment: IComment;
}

export const Comment = ({ comment }: Props) => {
	return (
		<div className='mx-9 flex flex-row w-full gap-x-4 items-center my-3'>
			<div className='h-16 w-16 bg-gray-300 rounded-full' />	
			<div className='flex flex-col bg-gray-300 p-3 rounded-3xl'>
				<div className="flex flex-row gap-x-1">
					<span className='font-bold'>{ comment.text }</span>
					<span>{ formatTime( comment.createdAt ) }</span>
				</div>
				<span className='text-sm'>Test comment test</span>
			</div>
		</div>
	)
}
