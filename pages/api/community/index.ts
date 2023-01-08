import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';
import { Community } from '../../../models';
import { ICommunity } from '../../../interfaces/community';
import { db } from "../../../database";

type Data =
| { message: string; }
| ICommunity
| ICommunity[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

	switch (req.method) {
		case "POST":
			return createCommunity(req, res);
		
		case "GET":
			return getAllCommunities( req, res);

		default:
			return res.status(400).json({
				message: "BAD REQUEST - COMMUNITY"
			});
	}

}

const createCommunity = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
	
	// todo session
	const session: any = await getSession({ req })

	if(!session) {
		return res.status(400).json({
			message: 'You need to login to access this endpoint'
		})
	}

		

	const { name } = req.body as { name: string; };

	
	const data = {
		name: `f/${ name.toLowerCase().split(' ').join('_') }`,
		owner: session?.user
	}

	const newCommunity = new Community( data );

	await db.connect();
	await newCommunity.save()
	await db.disconnect();

	res.json( newCommunity )



}


const getAllCommunities = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
	await db.connect();
	// TODO POPULATE
	const communities = await Community.find().lean()
	await db.disconnect();

	return res.json(communities)
}