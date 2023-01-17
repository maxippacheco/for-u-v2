import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import Comment from '../../../models/comment';
import Post from '../../../models/post';
import { IComment } from '../../../interfaces/comment';

type Data = 
| { message: string }
| IComment;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "POST":
			return createComment( req, res )
	
		// TODO Delete comment

		default:
			return res.status(400).json({
				message: "BAD REQUEST - METHOD"
			})
	}

}

const createComment = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { postId } = req.query as { postId: string };
	const { text } = req.body;

	const user = await getSession({ req });
	const post = await Post.findById( postId );

	if( !user || !post || !text ){
		return res.status(400).json({
			message: 'BAD REQUEST - VALIDATIONS'
		})
	}

	const data = { 
		user_comment: user,
		text,
		post_comment: post,
		community_name: post?.community.name
	}

	const comment = new Comment(data);

	res.json( comment );

}