import { forUApi } from "../api";
import { useAppDispatch } from "./appHooks";

export const usePostStore = () => {
	
	const dispatch = useAppDispatch();

	const startCreatingPost = async(title: string, description: string) => {
		const post = await forUApi.post('/post', { title, description });

		console.log(post.data);
		
	}

	return {
		startCreatingPost
	}
}