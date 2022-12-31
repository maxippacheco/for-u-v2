import React from 'react'
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from 'react-icons/ai'


interface Props{
	post: any;
}

export const Post = () => {
	
	return (
			<div className='grow m-2 h-auto bg-gray-100 rounded-lg'>
				<div className='p-2 flex items-center'>
					<div className='w-16 h-16 bg-gray-300 rounded-full' />
					<div className='flex grow justify-between'>
						<div className='flex sm:flex-row flex-col'>
							<span className='mx-2 text-gray-800'>@testuser</span>
							<span className='mx-2 text-gray-800 text-sm md:text-base'>Posted in <span className='text-sky-700'>RealGamers_arg</span></span>
						</div>
						<span className='mx-2 text-gray-800 text-sm'>12/02/23</span>
					</div>
				</div>
				<div className='md:px-11 px-5 py-3 text-justify bg-gray-100 rounded-b-xl mb-2'>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure dicta pariatur molestiae mollitia, laborum odit tempora veniam accusantium, perspiciatis illum dolor, eum autem delectus provident! Vitae ea molestiae doloribus dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, obcaecati accusantium, amet enim ipsam repellat omnis nam commodi eum quo porro rerum blanditiis? Ex porro tenetur enim possimus voluptates veritatis.
				</div> 
				<div className='w-full flex flex-row justify-between px-11 pb-3'>
					<div className='flex flex-row'>
						<AiOutlineLike className="text-3xl mr-3 text-gray-800 hover:bg-red-500 rounded-full" />
						<AiOutlineDislike className="text-3xl text-gray-800 hover:bg-red-500 rounded-full" />
					</div>
					<div>
						<AiOutlineComment className="text-3xl text-gray-800" />
					</div>
				</div>
			</div>
	)
}
