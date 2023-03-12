
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UiState {
	isModalOpen: boolean;
}

const initialState: UiState = {
	isModalOpen: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
		openModal( state ){
			state.isModalOpen = true;
		},
		closeModal( state ){
			state.isModalOpen = false;
		}

	}
})

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = uiSlice.actions

export default uiSlice.reducer
