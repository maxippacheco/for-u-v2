import { closeModal, openModal } from "../store/ui";
import { useAppSelector, useAppDispatch } from './appHooks';


export const useUiStore = () => {

	const { isModalOpen } = useAppSelector( state => state.ui );
	const dispatch = useAppDispatch();


	const handleCloseModal = () => dispatch(closeModal())
	
	const handleOpenModal = () => dispatch(openModal())
	
	return{
		isModalOpen,
		
		handleOpenModal,
		handleCloseModal,
	}

}