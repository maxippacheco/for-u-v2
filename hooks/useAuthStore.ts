import { IUser } from "../interfaces";
import { setUser, startChecking } from "../store/auth";
import { useAppDispatch } from "./appHooks"

export const useAuthStore = () => { 

	const dispatch = useAppDispatch();

	const startRegister = async(email: string, username: string, password: string ) => { 

		
	}

	const startSetttingUser = (user: IUser) => {
		dispatch(startChecking())
		dispatch(setUser(user))
	}

	return {
		startSetttingUser
	}

}