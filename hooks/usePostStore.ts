import { forUApi } from "../api";
import { IPost } from "../interfaces";
import { checkPosts, createPost, loadPosts } from "../store/post";
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

	return {
		posts,
		loadingPosts,

		
		startCreatingPost,
		startLoadingAllPosts,

	}
}