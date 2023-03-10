// Generated by https://quicktype.io
import { IUser } from "./user";
import { ICommunity } from './community';
import { IComment } from "./comment";

export interface IPost {
	_id:         string;
	title:       string;
	description: string;
	user:        IUser;
	community:   ICommunity;
	comments:    IComment[];
	likes: IUser[];
	dislikes: IUser[];
	status:     boolean;
	createdAt:   string;
	updatedAt:   string;
}
