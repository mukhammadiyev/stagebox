import { useState } from 'react'
import { FaShoppingBag, FaUser } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
function UserPersonal() {
	const [active, setActive] = useState('profile')
	return (
		<div className='w-full container mx-auto '>
			<div className='w-full py-5 2xl:py-20 px-4 lg:px-16 xl:px-25 2xl:px-30 '>
				<div className='w-full flex 2xl:flex-row flex-col '>
					<div className='flex 2xl:flex-col flex-row justify-center 2xl:justify-start gap-2'>
						<NavLink
							to={'profile'}
							onClick={() => setActive('profile')}
							className={({ isActive }) =>
								isActive
									? 'flex items-center justify-center h-14  md:h-20  aspect-square rounded-full bg-white drop-shadow-2xl  drop-shadow-[#165CBF1A]'
									: 'flex items-center justify-center h-14  md:h-20  aspect-square rounded-full'
							}
						>
							<FaUser
								className={`md:w-8 w-6 md:h-8 h-6`}
								style={{ color: active == 'profile' ? '#FF1818' : '#002C6A' }}
							/>
						</NavLink>
						<NavLink
							to={'orders'}
							onClick={() => setActive('orders')}
							className={({ isActive }) =>
								isActive
									? 'flex items-center justify-center h-14  md:h-20  aspect-square rounded-full bg-white drop-shadow-2xl drop-shadow-[#165CBF1A]'
									: 'flex items-center justify-center h-14  md:h-20  aspect-square rounded-full'
							}
						>
							<FaShoppingBag
								className='md:w-8 w-6 md:h-8 h-6'
								style={{ color: active == 'orders' ? '#FF1818' : '#002C6A' }}
							/>
						</NavLink>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default UserPersonal
