import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { User } from '../../../models';
import { IUser } from '../../../interfaces';
import { db } from '../../../database';

type Data = 
| { message: string }
| IUser

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
	if(req.method !== "POST"){
		return res.status(400).json({
			message: 'Bad Request'
		})
	}

	const { name, email, password } = req.body;


	await db.connect()
	const userExists = await User.findOne({ email })

	if( userExists ) {
		return res.status(400).json({
			message: 'Bad Request - [EMAIL]'
		})
	}

	const newUser = {
		email: email.toLowerCase(),
		name: name.toLowerCase(),
		password: bcrypt.hashSync( password ),
		role: 'client'
	}

	const user = new User({ ...newUser });

	await user.save();
	await db.disconnect()

	res.json( user )
}