import { forUApi } from "../api";
import { IPost } from "../interfaces";
import { checkPosts, commentPost, createPost, likePost, loadPosts } from "../store/post";
import { useAppDispatch, useAppSelector } from "./appHooks";

export const usePostStore = () => {
	
	const { posts, loadingPosts } = useAppSelector( state => state.post );
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
	}

	const startLikingPost = async(postId:string) => {

		dispatch( checkPosts() );
		const { data: post } = await forUApi.put(`/interactions/like/${ postId }`);
		dispatch( likePost( post ) );
	
	}

	return {
		posts,
		
		// * methods
		loadingPosts,
		startCreatingPost,
		startLoadingAllPosts,
		createComment,
		startLikingPost

	}
}