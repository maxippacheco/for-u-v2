
export interface IUser{
	name: string;
	email: string;
	password: string;
	image?: string;
	status: 'online' | 'offline';
	role?: 'client' | 'admin';
	_id: string;
}

export interface ILoggedUser{
	
}