import { useForm } from 'react-hook-form';
import { useCommunityStore } from '../../hooks';
import { AppLayout } from "../../layouts";

interface ICommunityData{
	name: string;
}

export default function create(){

	const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<ICommunityData>();
	const { startCreattingCommunity } = useCommunityStore();

	const onSubmit = ({ name }: ICommunityData) => {
		startCreattingCommunity( name );
		reset()
	}

	return(
		<AppLayout title={"Create your posts here"}>
			<div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center">
					<form className='lg:w-2/5 w-11/12' onSubmit={ handleSubmit(onSubmit) }>
						<div className='flex flex-col justify-center items-center'>
							<h1 className='sm:text-5xl text-4xl text-center mb-7'>Create a community</h1>
							
							<div className='flex flex-col w-full mb-10'>
								<label htmlFor="email" className='absolute translate-x-7 -translate-y-2 px-2 bg-white'>Name</label>
								<input 
									type="text"
									className='p-5 border-2 border-black rounded-full focus:border-sky-500 focus:outline-none' 
									{ ...register('name')} 
								/>
							</div>
							

							<div className='w-full flex justify-center mt-5'>
								<input type="submit" value="Create community" className='
									bg-gradient-to-r from-blue-600 to-sky-400 w-full 
									p-2.5 rounded-full text-white text-lg hover:cursor-pointer hover:brightness-95' 
								/>
							</div>
							</div>
					</form>
			</div>
		</AppLayout>
	)
}

