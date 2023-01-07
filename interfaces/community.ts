import { IPost } from "./post";
import { IUser } from "./user";

export interface ICommunity{
	name: string;
	owner: IUser;
	posts: IPost[];
	users: IUser[];
}