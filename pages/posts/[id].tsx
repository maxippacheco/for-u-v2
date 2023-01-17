import { GetStaticProps, GetStaticPaths } from 'next'
import { AppLayout } from "../../layouts";
import { dbPosts } from "../../database";
import { IPost } from '../../interfaces';
import { Post } from '../../components/posts';
import { useForm } from 'react-hook-form';
import { usePostStore } from '../../hooks/usePostStore';


interface Props {
	post: IPost;
}

interface ICommentData{
	text: string;
}

export default function handler({ post }: Props){

	
	const { register, setValue, handleSubmit, formState: { errors } } = useForm<ICommentData>();
	const { createComment } = usePostStore();

	const onSubmit = ({ text }: ICommentData) => {
		createComment(post._id, text);
			
	}

	return(
		<AppLayout title="">
			<div className="w-full md:h-auto h-auto flex flex-row">
				<div className='hidden lg:flex w-1/4 bg-gray-100 h-home sticky'/>
				<div className='grow md:w-2/4 h-screen'>
					<Post post={ post } key={ post._id } />

					<div className='m-5 flex flex-row w-full gap-x-4 items-center'>
						<div className='h-16 w-16 bg-gray-300 rounded-full' />
						<form className='grow' onSubmit={ handleSubmit(onSubmit)}>
							<input 
								type="text" 
								className='w-4/5 border border-gray-300 rounded-full p-3.5' 
								placeholder='leave a comment'
								{ ...register('text') }
							/>
						</form>

					</div>
					{/* //TODO comment component */}
						<div className='mx-9 flex flex-row w-full gap-x-4 items-center'>
							<div className='h-16 w-16 bg-gray-300 rounded-full' />	
							<div className='flex flex-col bg-gray-300 p-3 rounded-3xl'>
								<div className="flex flex-row gap-x-1">
									<span className='font-bold'>John Doe</span>
									<span>18 minutes ago</span>
								</div>
								<span className='text-sm'>Test comment test</span>
							</div>
						</div>
				</div>
				<div className='hidden lg:flex w-1/4 bg-gray-100 h-home sticky' />
			</div>
		</AppLayout>
	)
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async () => {
	const data  = await dbPosts.getAllPosts();

	return {
		paths: data.map(({ _id }) => ({
			params: { 
				id: _id.toString()
			}
		})),
		fallback: "blocking"
	}
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {

	const { id } = params as { id: string }

	console.log( id );
	

	const post = await dbPosts.getPostById( id ) // your fetch function here 

	if( !post ){
		return{
			redirect:{
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {
			post
		},
		revalidate: 60 * 60 * 24
	}
}