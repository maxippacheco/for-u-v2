import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import { useSession } from 'next-auth/react';
import { dbCommunities } from '../../database';
import { AppLayout } from "../../layouts";
import { ICommunity } from '../../interfaces/community';
import { Post } from '../../components/posts';

interface Props{
	community: ICommunity;
}

export default function handler({ community }: Props){

	const { data: session} = useSession()

	console.log(community);
	

	if( !session ) return <>Loading</>

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
							<div className="text-lg pb-3">Owner: { community.owner.name }</div>
						</div>
					</div>

					{
						community.posts.map( post => {
							console.log(post);
							
							return <></>
						})
					}
				</div>

				<div className='hidden lg:flex w-1/4 bg-gray-100 h-home sticky'></div>


			</div>

		</AppLayout>
	)
}


// static paths => get all paths
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async () => {
	const allCommunities = await  dbCommunities.getAllCommunities()// your fetch function here 

	return {
		paths: allCommunities.map( ({ _id }) => ({
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

	const { id = '' } = params as { id: string };

	const community = await dbCommunities.getCommunityById( id ); // your fetch function here 

	if( !community ) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {
			community
		},
		revalidate: 60 * 60 * 24
	}
}