import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../interfaces/post';


export interface PostState {
	loadingPosts: boolean;
	// todo add type
	posts: IPost[];
}

const initialState: PostState = {
	loadingPosts: false,
	posts: []
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
		checkPosts(state){
			state.loadingPosts = true;
		},
		// todo add IPost type
		createPost( state, { payload }: PayloadAction<IPost> ){
			state.posts.push(payload)
			state.loadingPosts = false;
		},
		loadPosts(state, { payload }: PayloadAction<IPost[]>){
			state.loadingPosts = false;
			state.posts = payload;
		}
  },

})

// Action creators are generated for each case reducer function
export const { createPost, checkPosts, loadPosts } = postSlice.actions

export default postSlice.reducer

