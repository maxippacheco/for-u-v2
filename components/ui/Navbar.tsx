import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import defaultUser from '../../assets/default_user.png'

export const Navbar = () => {
	

	const [isMenuOpened, setToggleMenu] = useState(true);
	const router = useRouter();
	const { data: session } = useSession();

  const handleToggleMenu = () => setToggleMenu(!isMenuOpened);
	
	return (
		<header className="w-full bg-sky-600">
			<nav className="h-20">
				<div className="flex flex-row h-20 grow w-full justify-end">
					<div className='w-28 h-full hidden md:flex items-center justify-center'>
						<h1 className='text-white text-3xl'>For U</h1>
					</div>
					<ul 
						className={`absolute left-0 top-20 bg-sky-700 md:bg-sky-600 w-full text-center md:top-0 p-3 
						md:relative md:flex md:items-center md:grow ${ isMenuOpened ? 'hidden' : 'absolute' }`}
					>
						<li className="md:px-3 md:py-0 py-6 text-white text-lg">
							<Link href={'/'}>Home</Link>
						</li>
						<li className="md:px-3 md:py-0 py-6 text-white text-lg">
							<Link href={'/posts/create'}>Create Posts</Link>
						</li>
						<li className="md:px-3 md:py-0 py-6 text-white text-lg">
							<Link href={'/community/create'}>Create Community</Link>
						</li>
					</ul>

					<div className='flex md:hidden w-full items-center ml-3'>
						{
							isMenuOpened 
							?
							<AiOutlineMenu className='text-2xl text-white cursor-pointer' onClick={handleToggleMenu} />
							:
							<AiOutlineClose className='text-2xl text-white cursor-pointer' onClick={handleToggleMenu} />
						}
					</div>
					
					<div className="flex items-center w-20 h-20 mr-3 justify-end">
						<Image
							src={ defaultUser }
							alt='Default user'
							className="w-14 h-14 rounded-full bg-gray-100 cursor-pointer"
							onClick={ () => router.push(`/user/${ session?.user?._id! }`) }
						/>
					</div>

				</div>
			</nav>
		</header>
	)
}
