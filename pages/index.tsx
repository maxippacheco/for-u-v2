import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import { AiOutlineComment, AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { AppLayout } from '../layouts';
import { Post } from '../components/posts';
import { useAuthStore, useCommunityStore, usePostStore } from '../hooks';
import { IUser } from '../interfaces/user';
import { forUApi } from '../api';
import { IPost } from '../interfaces';
import { useEffect } from 'react';

interface Props {
  postsSSR: IPost[];
}

export default function Home({ postsSSR }: Props) {

  const { data: session, status } = useSession()
  const { startSetttingUser, isChecking } = useAuthStore();
  const { startLoadingCommunities, communities, isCommunityReady } = useCommunityStore();
  const { startLoadingAllPosts, posts  } = usePostStore();
  
  useEffect(() => {
    startLoadingAllPosts( postsSSR );
  }, [])
    
  if( isChecking ) return <>Holaaa</>

  useEffect(() => {
    startSetttingUser( session?.user as IUser)
  }, [])

  useEffect(() => {
    startLoadingCommunities()
  }, [])
  
  


  return (
    <AppLayout title="Welcome to For U">


      <div className='w-full md:h-auto h-auto flex flex-row'>

        <div className='hidden lg:flex w-1/4 bg-gray-100 h-home sticky'>
          <div className='h-1/2 w-full flex flex-col justify-center items-center'>
            <div className='w-11/12 h-auto bg-white p-3 rounded-lg my-3'>
              <h2 className='text-center'>Your chats</h2>
              <div className='flex flex-row items-center justify-between'>
                {/* IMAGE */}
                <div className='flex flex-row items-center'>
                  <div className='w-10 h-10 bg-gray-600 mr-2 rounded-full' />
                  <span>@thereal_geek</span>
                </div>
                <AiOutlineComment className='xl:flex hidden text-2xl' />
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
    		<div className='grow md:w-2/4 h-screen overflow-y-scroll'>
            {
              posts.map( post => (
                <Post post={ post } key={ post._id } />
              ))
            }

        </div>
        
        <div className='hidden lg:flex w-1/4 bg-gray-100 h-home sticky'>
          <div className='h-1/2 w-full flex flex-col justify-center items-center'>
            <div className='w-11/12 h-auto bg-white p-3 rounded-lg my-3'>
              <h2 className='text-center'>Online Users</h2>
              <div className='flex flex-row items-center justify-between'>
                {/* IMAGE */}
                <div className='flex flex-row items-center'>
                  <div className='w-10 h-10 bg-gray-600 mr-2 rounded-full' />
                  <span>@thereal_geek</span>
                </div>
                <AiOutlineUserAdd className='xl:flex hidden text-2xl' />
              </div>
            </div>

            <div className='w-11/12 h-auto bg-white p-3 rounded-lg'>
              <h2 className='text-center'>Recommended foros</h2>
                {/* IMAGE */}

                {
                  communities.slice(0, 3).map( community => (
                    <div className='flex flex-row items-center justify-between my-4'>
                      <div className='flex flex-row items-center'>
                        <div className='w-10 h-10 bg-gray-600 mr-2 rounded-full' />
                        <span>{community.name}</span>
                      </div>
                      <AiOutlineUsergroupAdd className='xl:flex hidden text-2xl' />
                    </div>
                  ))
                }

                <div className='text-center text-sky-500 cursor-pointer'>See more...</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await forUApi.get('/post'); // your fetch function here 
    
  if (!data) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
        // statusCode: 301
      },
    }
  }

  return {
    props: {
      postsSSR: data
    }
  }
}