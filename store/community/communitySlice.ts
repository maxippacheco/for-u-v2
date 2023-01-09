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
		},
		updateCommunityUsers(state, { payload }: PayloadAction<ICommunity>){
			state.communities = state.communities.map( community => {
				// SI EL PAYLOAD ES IGUAL A LA COMUNIDAD QUE SE ACTUALIZA RETORNALA
				if( community._id === payload._id ){
					return payload;
				}

				return community;
			})
		}
	}
})

// Action creators are generated for each case reducer function
export const { checkingCommunities, loadCommunities, createCommunity, updateCommunityUsers } = communitySlice.actions

export default communitySlice.reducer

