import React from 'react'
import { useRouter } from 'next/router';
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from 'react-icons/ai'
import { IPost } from '../../interfaces';


interface Props{
	post: IPost;
}

export const Post = ({ post }: Props) => {
	
	const router = useRouter()

	return (
			<div className='grow m-2 h-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-4 rounded-lg'>
				<div className='p-2 flex items-center'>
					<div className='w-16 h-16 bg-gray-300 rounded-full' />
					<div className='flex grow justify-between'>
						<div className='flex lg:flex-row flex-col'>
							<span className='mx-1.5 text-gray-800 font-semibold'>{ post.user.name }</span>
							<span 
								className='mx-1.5 text-gray-800 text-sm md:text-base cursor-pointer'
								onClick={ () => router.push(`/community/${ post.community._id }`)}
							>Compartio un post</span>
						</div>
						<span className='mx-2 text-gray-800 text-sm'>12/02/23</span>
					</div>
				</div>
				<div className='md:px-11 px-5 py-3 text-justify rounded-b-xl mb-2'>
					{ post.description }
				</div> 
				<div className='w-full flex flex-row justify-between px-11 pb-3'>
					<div className='flex flex-row'>
						<AiOutlineLike className="text-3xl mr-3 text-gray-800 hover:bg-red-500 rounded-full" />
						<AiOutlineDislike className="text-3xl text-gray-800 hover:bg-red-500 rounded-full" />
					</div>
					<div>
						<AiOutlineComment className="text-3xl text-gray-800 cursor-pointer hover:text-sky-500" />
					</div>
				</div>
			</div>
	)
}
