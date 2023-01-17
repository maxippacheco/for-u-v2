import { IPost } from "./post";
import { IUser } from "./user";

export interface IComment {
	_id?: string;
	text: string;
	user_comment: IUser;
	created_at: string;
	post_comment: IPost;
	community_name: string;
}