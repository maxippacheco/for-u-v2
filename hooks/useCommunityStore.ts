import { forUApi } from '../api';
import { checkingCommunities, createCommunity, loadCommunities, updateCommunityUsers } from '../store/community/communitySlice';
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

	const addUserToCommunity = async(id: string) => {
		dispatch( checkingCommunities() );
		const { data: community } = await forUApi.put(`/community/${ id }`);
		dispatch( updateCommunityUsers( community ) )
	}


	return{
		communities,
		isCommunityReady,

		// methods
		startLoadingCommunities,
		startCreattingCommunity,
		addUserToCommunity
	}
}
