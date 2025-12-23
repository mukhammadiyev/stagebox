import { FaShoppingBag, FaUser } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
function UserPersonal() {
	return (
		<div className='w-full container mx-auto '>
			<div className='w-full py-20 px-8 lg:px-16 xl:px-25 2xl:px-30 '>
				<div className='w-full flex'>
					<div className='flex flex-col gap-2'>
						<NavLink
							to={'profile'}
							className={({ isActive }) =>
								isActive
									? 'flex items-center justify-center h-20 aspect-square rounded-full bg-white drop-shadow-2xl drop-shadow-[#165CBF1A]'
									: 'flex items-center justify-center h-20 aspect-square rounded-full'
							}
						>
							<FaUser className='w-8 h-8' />
						</NavLink>
						<NavLink
							to={'orders'}
							className={({ isActive }) =>
								isActive
									? 'flex items-center justify-center h-20 aspect-square rounded-full bg-white drop-shadow-2xl drop-shadow-[#165CBF1A]'
									: 'flex items-center justify-center h-20 aspect-square rounded-full'
							}
						>
							<FaShoppingBag className='w-8 h-8' />
						</NavLink>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default UserPersonal
