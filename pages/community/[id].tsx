import { useSession } from 'next-auth/react';
import { Post } from "../../components/posts";
import { useAuthStore, usePostStore } from "../../hooks";
import { AppLayout } from "../../layouts";
import { useEffect } from 'react';

export default function handler(){

	const { data: session} = useSession()
	const { posts, startLoadingAllPosts } = usePostStore();



	if( !posts || !session ) return <>Loading</>

	return (
		<AppLayout title="Community">
      <div className='w-full md:h-auto h-auto flex flex-row'>
				<div className='hidden lg:flex w-1/4 bg-gray-100 h-home sticky'></div>

				<div className='grow md:w-2/4 h-screen overflow-y-scroll'>
					<div className="w-full h-52 bg-gray-900" />
					<div className="w-40 h-40 rounded-full bg-sky-500 absolute top-48 translate-x-4 translate-y-5" />
					<div className="w-full h-44 border-b ">
						<div className="flex flex-col h-full justify-end ml-3">
							<div className="flex flex-row">
								<div>432 Users</div>
								<div>132 Posts</div>
							</div>
							<div className="text-lg pb-3">Owner: @testtest123</div>
						</div>
					</div>

					//TODO
					{/* {
						posts.map( post => (
							<Post post={post} />
						))
					} */}
				</div>

				<div className='hidden lg:flex w-1/4 bg-gray-100 h-home sticky'></div>


			</div>

		</AppLayout>
	)
}