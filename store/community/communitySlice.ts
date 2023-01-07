import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICommunity } from '../../interfaces/community'


export interface CommunityState {
	isCommunityReady: boolean;
  communities: ICommunity[];
}

const initialState: CommunityState = {
  communities: [],
	isCommunityReady: false
}

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    checkingCommunities(state){
			state.isCommunityReady = true;
    },
		createCommunity(state, { payload }: PayloadAction<ICommunity>){
			state.isCommunityReady = false;
			state.communities = [ payload, ...state.communities ]
		},
		loadCommunities(state, { payload }: PayloadAction<ICommunity[]>){
			state.isCommunityReady = false;
			state.communities = payload;
		}
	}
})

// Action creators are generated for each case reducer function
export const { checkingCommunities, loadCommunities, createCommunity } = communitySlice.actions

export default communitySlice.reducer

