import { forUApi } from '../api';
import { ICommunity } from '../interfaces/community';
import { checkingCommunities, createCommunity, loadCommunities } from '../store/community/communitySlice';
import { useAppDispatch, useAppSelector } from './appHooks';

export const useCommunityStore = () => {

	const dispatch = useAppDispatch();
	const { communities, isCommunityReady } = useAppSelector(state => state.community);

	const startCreattingCommunity = async(name: string ) => {
		dispatch( checkingCommunities() );
		const { data: community } = await forUApi.post('http://localhost:3000/api/community/', { name });
		dispatch( createCommunity(community ) )
	}

	const startLoadingCommunities = (com: ICommunity[]) => {
		dispatch(checkingCommunities());
		dispatch(loadCommunities(com));
	}


	return{
		startCreattingCommunity,
		startLoadingCommunities
	}
}
