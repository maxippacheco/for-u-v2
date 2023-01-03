import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces'

export interface AuthState {
  user: IUser | null,
	token: string | null,
  isChecking: boolean
}

const initialState: AuthState = {
  user: null,
	token: null,
  isChecking: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startChecking(state){
      state.isChecking = true;
    },
		setUser(state, { payload }: PayloadAction<IUser>){
      state.user = payload;
      state.isChecking = false;
		}
  },
})

// Action creators are generated for each case reducer function
export const { startChecking, setUser } = authSlice.actions

export default authSlice.reducer



