import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../interfaces/post';
import { IComment } from '../../interfaces/comment';


export interface PostState {
	loadingPosts: boolean;
	posts: IPost[];
	activePost: IPost | null;
}

const initialState: PostState = {
	loadingPosts: false,
	posts: [],
	activePost: null
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
			state.loadingPosts = false;
			state.activePost?.comments.push(payload);
		},
		likePost(state, { payload }: PayloadAction<IPost>){
			state.loadingPosts = false;
			state.posts.map( post => {
				if( post._id === payload._id){
					post.likes.push( payload.user )
				}

				return post;
			})
		},
		unlikePost( state, { payload }: PayloadAction<IPost> ){
			state.loadingPosts = false;
			state.posts.map( post => {
				if( post._id === payload._id ){
					post.likes = post.likes.filter( user => user._id !== payload.user._id );
				}

				return post;
			})
		},
		dislikePost(state, { payload }: PayloadAction<IPost>){
			state.loadingPosts = false;
			state.posts.map( post => {
				if( post._id === payload._id){
					post.dislikes.push( payload.user )
				}

				return post;
			})
		},
		undislikePost( state, { payload }: PayloadAction<IPost> ){
			state.loadingPosts = false;
			state.posts.map( post => {
				if( post._id === payload._id ){
					post.dislikes = post.dislikes.filter( user => user._id !== payload.user._id );
				}

				return post;
			})
		},
		setActivePost( state, { payload }: PayloadAction<IPost> ){
			state.loadingPosts = false;
			state.activePost = payload;
		},


  },

})

// Action creators are generated for each case reducer function
export const { 
	checkPosts, 
	loadPosts, 
	createPost, 
	commentPost, 
	likePost,
	unlikePost,
	dislikePost,
	undislikePost,
	setActivePost

} = postSlice.actions

export default postSlice.reducer

