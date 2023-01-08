import { forUApi } from '../api';
import { ICommunity } from '../interfaces/community';
import { checkingCommunities, createCommunity, loadCommunities } from '../store/community/communitySlice';
import { useAppDispatch, useAppSelector } from './appHooks';

export const useCommunityStore = () => {

	const dispatch = useAppDispatch();
	const { communities, isCommunityReady } = useAppSelector(state => state.community);

	const startCreattingCommunity = async(name: string ) => {
		dispatch( checkingCommunities() );
		const { data: community } = await forUApi.post('/community', { name });
		dispatch( createCommunity(community ) )
	}

	const startLoadingCommunities = async() => {
		dispatch(checkingCommunities());
		const { data: communities } = await forUApi.get('/community');
		dispatch(loadCommunities(communities));
	}


	return{
		startCreattingCommunity,
		startLoadingCommunities,
		communities,
		isCommunityReady
	}
}
