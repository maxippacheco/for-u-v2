import { db } from '.';
import { Community } from '../models';


export const getAllCommunities = async() => {
	await db.connect();
	const communities = await Community.find().populate([
		{
			path: 'posts',
			model: 'Post',
			populate: [
				{
					path: 'user',
					select: '_id name email role status'
				},
				{
					path: 'community',
					model: 'Community'
				}
			],
		},
		{
			path: 'owner',
			model: 'User',
			select: '_id name'
		}

	]).lean()
	await db.disconnect();

	return communities;
}

export const getCommunityById = async( id: string ) => {
	await db.connect();
	const community = await Community.findById( id ).populate([
		{
			path: 'posts',
			model: 'Post',
			populate: [
				{
					path: 'user',
					select: '_id name email role status'
				},
				{
					path: 'community',
					model: 'Community'
				},
			]
		},
		{
			path: 'owner',
			model: 'User',
			select: '_id name'
		}
		
		]).lean()

	await db.disconnect();

	if( !community ){
		return null
	}

	return JSON.parse( JSON.stringify( community ) );
}