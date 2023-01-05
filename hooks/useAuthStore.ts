import { IUser } from "../interfaces";
import { setUser, startChecking } from "../store/auth";
import { useAppDispatch, useAppSelector } from "./appHooks"

export const useAuthStore = () => { 

	const { isChecking, user } = useAppSelector( state => state.auth );
	const dispatch = useAppDispatch();

	const startRegister = async(email: string, username: string, password: string ) => { 

		
	}

	const startSetttingUser = (user: IUser) => {
		dispatch(startChecking())
		dispatch(setUser(user))
	}

	return {
		user,
		isChecking,
		startSetttingUser,
	}

}