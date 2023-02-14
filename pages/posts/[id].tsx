import { GetStaticProps, GetStaticPaths } from 'next'
import { useForm } from 'react-hook-form';
import { usePostStore } from '../../hooks/usePostStore';
import { AppLayout } from "../../layouts";
import { dbPosts } from "../../database";
import { IPost } from '../../interfaces';
import { Post } from '../../components/posts';
import { Comment } from '../../components/comment';


interface Props {
	post: IPost;
}

interface ICommentData{
	text: string;
}

export default function handler({ post }: Props){

	// todo => post functionalities doesnt work idk why
	
	const { register, handleSubmit, formState: { errors } } = useForm<ICommentData>();
	const { createComment } = usePostStore();
	

	const onSubmit = ({ text }: ICommentData) => {		

		createComment( post._id, text);
		
	}

	return(
		<AppLayout title="Hola">
			<div className="w-full md:h-auto h-[calc(100vh-5rem)] flex flex-row">
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
					{
						post.comments.map( comment => (
							<Comment comment={ comment } key={ comment._id } />
						))
					}	
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
		revalidate: 1
	}
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from 'next'
// import forUApi from '../../api/config';

// export const getServerSideProps: GetServerSideProps = async ( req) => {

// 	const { id } = req.query as { id: string };

// 	// const post = await dbPosts.getPostById( id ); // your fetch function here 

// 	return {
// 		props: {
// 			id	
// 		}
// 	}
// }