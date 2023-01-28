import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from 'react-icons/ai';
import { IPost, IUser } from '../../interfaces';
import { usePostStore } from '../../hooks';
import { useSession } from 'next-auth/react';

interface Props{
	post: IPost;
}


// todo optimize with design pattern
export const Post = ({ post }: Props) => {
	
	const [like, setLike] = useState( false );
	const [dislike, setDislike] = useState(false);

	const router = useRouter();
	const { data: session } = useSession();

	const { startLikingPost } = usePostStore();
	
	if(!session){
		return <></>;
	}
	
	// useEffect(() => {
	// 	if( post.likes.includes( session.user?._id as any ) ){
	// 		setLike( true )
	// 		console.log(like);
	// 	}
	// }, [post, session])
	
	const toggleInteractionButton = ( action: string ) => {
		if( action === 'like' ){
			setLike(!like);
			startLikingPost(post._id)
		}

		if( action === 'dislike' ){
			setDislike(!dislike)
		}
	}
		
	return (
			<div className='grow m-2 h-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-4 rounded-lg'>
				<div className='p-2 flex items-center'>
					<div className='w-16 h-16 bg-gray-300 rounded-full' />
					<div className='flex grow justify-between'>
						<div className='flex lg:flex-row flex-col gap-x-3'>
							<span className='ml-3 text-gray-800 font-semibold'>{ post.user.name }</span>
							<span 
								className='text-gray-800 ml-3 lg:ml-0 text-sm md:text-base cursor-pointer'
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
						<div className='flex flex-row items-center gap-x-1'>
							<AiOutlineLike 
								className={`text-3xl rounded-full cursor-pointer hover:text-sky-500 ${ like ? 'text-sky-500' : 'text-gray-800' }`} 
								onClick={() => toggleInteractionButton('like')} 
							/>
							<span>1</span>

						</div>
						<div className='flex flex-row items-center gap-x-1'>
							<AiOutlineDislike 
								className={`text-3xl ml-3 rounded-full cursor-pointer hover:text-sky-500 ${ dislike ? 'text-sky-500' : 'text-gray-800' }`} 
								onClick={() => toggleInteractionButton('dislike')} 
							/>
							<span>1</span>

						</div>
					</div>
					<div>
						<AiOutlineComment 
							className="text-3xl text-gray-800 cursor-pointer hover:text-sky-500" 
							onClick={() => router.push(`/posts/${ post._id }`)} 
						/>
					</div>
				</div>
			</div>
	)
}
