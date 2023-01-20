import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../interfaces/post';
import { IComment } from '../../interfaces/comment';


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
		createPost( state, { payload }: PayloadAction<IPost> ){
			state.posts.push(payload)
			state.loadingPosts = false;
		},
		loadPosts(state, { payload }: PayloadAction<IPost[]>){
			state.loadingPosts = false;
			state.posts = payload;
		},
		commentPost(state, { payload }: PayloadAction<IComment>){
			state.posts.map( post => {
				if( post._id === payload._id ) {
					post.comments.push(payload);					
				};

			})
		}	
  },

})

// Action creators are generated for each case reducer function
export const { createPost, checkPosts, loadPosts, commentPost } = postSlice.actions

export default postSlice.reducer

