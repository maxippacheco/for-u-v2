import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import Post from '../../../models/post';
import { IPost } from '../../../interfaces';

type Data = 
| { message: string }
| IPost
| IPost[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

	switch (req.method) {
		case "POST":
			return createPost(req, res);
		
		case "GET":
			return getAllPosts( req, res )

		default:
			return res.status(400).json({
				message: "BAD REQUEST - POST"
			});
	}

}

const createPost = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

	const { title, description } = req.body;

	const session: any = await getSession({ req })

	if(!session) {
		return res.status(400).json({
			message: 'You need to login to access this endpoint'
		})
	}

	const data = {
		title,
		description,
		user: session?.user
	}

	const newPost = new Post( data )
	newPost.populate('user', '__v, password')

	await db.connect();
 	await newPost.save()
	await db.disconnect();


	res.json( newPost )

}

const getAllPosts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
	await db.connect();
	// TODO POPULATE
	const posts = await Post.find()
	await db.disconnect();

	return res.json(posts)
}