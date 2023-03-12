import { useAppDispatch, useAppSelector } from "./appHooks";
import { forUApi } from "../api";
import { 
	checkPosts,
	loadPosts,
	createPost,
	commentPost,
	likePost,
	unlikePost,
	dislikePost,
	undislikePost,
	setActivePost,
} from "../store/post";
import { IPost } from "../interfaces";
import { dbPosts } from "../database";

export const usePostStore = () => {
	
	const { posts, loadingPosts, activePost } = useAppSelector( state => state.post );
	const dispatch = useAppDispatch();

	const startCreatingPost = async(title: string, description: string, community: string) => {
		dispatch( checkPosts() )
		const post = await forUApi.post('/post', { title, description, community });
		dispatch( createPost( post.data ) )	
	}

	const startLoadingAllPosts = (posts: IPost[]) => {
		dispatch( checkPosts() );
		dispatch( loadPosts( posts ) )
	}

	const createComment = async( postId: string, text:string ) => {
		dispatch( checkPosts() );		
		const { data: comment } = await forUApi.post(`/comment/${ postId }`, { text });
		dispatch( commentPost( comment ) );
		
		return comment;
		
	}

	const startLikingPost = async(postId:string) => {

		dispatch( checkPosts() );
		try {
			const { data: post } = await forUApi.put(`/interactions/like/${ postId }`)
			dispatch( likePost( post ) );
			
		} catch (error) {
			console.log(error);
			
		}
	
	}

	const startUnlikingPost = async( postId: string ) => {
	
		dispatch( checkPosts() );
		try {
			const { data: post } = await forUApi.put(`/interactions/unlike/${ postId }`)

			dispatch( unlikePost( post ) );
			
		} catch (error) {
			console.log(error);
			
		}	
	}


	const startDislikingPost = async( postId: string ) => {
		dispatch( checkPosts() );
		try {
			const { data: post } = await forUApi.put(`/interactions/dislike/${ postId }`)

			dispatch( dislikePost( post ) );
			console.log(post);
			
		} catch (error) {
			console.log(error);
			
		}	
	}

	const startUndislikingPost = async( postId: string ) => {
	
		dispatch( checkPosts() );
		try {
			const { data: post } = await forUApi.put(`/interactions/undislike/${ postId }`)

			dispatch( undislikePost( post ) );
			
		} catch (error) {
			console.log(error);
			
		}	
	}


	const setPostById = async(id: string) => {
		dispatch( checkPosts() );

		try {
			
			const { data: post } = await forUApi.get(`/post/${ id }`)
			console.log(post);
			

			dispatch( setActivePost( post ) );

		} catch (error) {
			console.log(error);	
		}
	}

	return {
		posts,
		activePost,
		
		// * methods
		loadingPosts,
		startCreatingPost,
		startLoadingAllPosts,
		createComment,
		startLikingPost,
		startUnlikingPost,
		startDislikingPost,
		startUndislikingPost,
		setPostById

	}
}