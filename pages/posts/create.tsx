import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { AppLayout } from "../../layouts";
import { usePostStore } from '../../hooks/usePostStore';
import { useCommunityStore } from '../../hooks/useCommunityStore';
import { IUser } from '../../interfaces';
import Swal from 'sweetalert2';

interface IPostData{
	title: string;
	description: string;
	communityId: string;
}

export default function create(){

	const { data: session} = useSession();

	const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<IPostData>();
	const { startCreatingPost } = usePostStore();
	const { communities, isCommunityReady, startLoadingCommunities } = useCommunityStore();
	
	useEffect(() => {
		startLoadingCommunities()
	}, [])

	if( isCommunityReady ) return <></>
	
	const onSubmit = ({ title, description, communityId }: IPostData) => {
		startCreatingPost( title, description, communityId );
		// todo check error
		Swal.fire('Post created', `${ title }`, 'success');

		reset();
	}


	return(
		<AppLayout title={"Create your posts here"}>
			<div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center">
					<form className='lg:w-2/5 w-11/12' onSubmit={ handleSubmit(onSubmit) }>
						<div className='flex flex-col justify-center items-center'>
							<h1 className='sm:text-5xl text-4xl text-center mb-7'>Create your post</h1>
							
							<div className='flex flex-col w-full mb-10'>
								<label htmlFor="email" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Title</label>
								<input 
									type="text"
									className='p-5 border-2 border-black rounded-full focus:border-sky-500 focus:outline-none' 
									{ ...register('title')} 
								/>
							</div>
							
							<div className='flex flex-col w-full mb-10'>
								<label htmlFor="password" className='absolute translate-x-7 -translate-y-3 px-2 bg-white'>Description</label>
								<textarea 
									className='p-5 border-2 border-black rounded-lg focus:border-sky-500 focus:outline-none resize-none'
									rows={5}
									{ ...register('description')} 
								></textarea>
							</div>
							
							<div className='flex flex-col w-full mb-10'>
								<label htmlFor="password" className='absolute translate-x-7 -translate-y-3 px-2 bg-white'>Comunidad</label>
								<select 
									className='p-3 border-2 border-black rounded-lg focus:border-sky-500 focus:outline-none resize-none'
								>
									{
										communities.filter( community => community.users.includes( session?.user?._id as any)).map( community => (
											<option value={ community._id } key={ community._id } { ...register('communityId')}>{community.name}</option>
										))
									} 
								</select>
							</div>

							<div className='w-full flex justify-center mt-5'>
								<input type="submit" value="Create post" className='
									bg-gradient-to-r from-blue-600 to-sky-400 w-full 
									p-2.5 rounded-full text-white text-lg hover:cursor-pointer hover:brightness-95' 
								/>
							</div>
							</div>
					</form>
			</div>
		</AppLayout>
	)
}

