import { useSession } from 'next-auth/react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { MdPeopleOutline } from 'react-icons/md';
import { useCommunityStore } from '../../hooks';
import { ICommunity } from '../../interfaces/community'

interface Props{
	community: ICommunity;
}

export const RecommendedCommunities = ({ community }: Props) => {

  const { data: session } = useSession()
	const { addUserToCommunity } = useCommunityStore();

	return (
		<div className='flex flex-row items-center justify-between my-4'>
			<div className='flex flex-row items-center'>
				<div className='w-10 h-10 bg-gray-600 mr-2 rounded-full' />
				<span>{community.name}</span>
			</div>
			{
				
				community.users.find( user => user._id !== session?.user?._id ) 
				? <MdPeopleOutline className='xl:flex hidden text-2xl cursor-pointer text-sky-500' />
				: <AiOutlineUsergroupAdd className='xl:flex hidden text-2xl cursor-pointer' onClick={ () => addUserToCommunity( community._id )} />
			}
		</div>
	)
}
