import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { IoMail } from 'react-icons/io5'
import { MdFilterList } from 'react-icons/md'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import shoppingBag from '../../icons/bag.svg'
import InstagramIcon from '../../icons/instagram.svg'
import ProfilePic from '../../icons/user_v2.svg'
import WhatsappIcon from '../../icons/whatsapp.svg'
import VkIcon from '../../icons/wk_logo.svg'
import CompanyLogo from '../../icons/stagebox_logo.svg'
function index() {
	const ifMobile = useMediaQuery('(max-width: 768px)')
	const location = useLocation()
	const notify = false
	const links = [
		'Доставка',
		'Гарантии',
		'Таблица размеров',
		'Обмен и возврат',
		'Вопросы и ответы',
	]
	return (
		<footer className='w-full bg-[#29292D] align-self-end'>
			<div className='container mx-auto px-6 lg:px-16 xl:px-25 2xl:px-30 text-[#B3C0D2] py-5 lg:py-6 xl:py-8 2xl:py-10 grid grid-cols-[1fr_1fr_auto] items-center '>
				<div className='flex items-center gap-16'>
					{!ifMobile && (
						<div className='flex justify-center items-center w-10 h-10 lg:w-18 lg:h-18 2xl:w-44 2xl:h-44 bg-black rounded-full select-none'>
							<div className='flex flex-col items-center justify-center border xl:border-4 border-red-500 w-7/12 h-7/12'>
								<p className='text-white text-[4px] md:text-2xl font-molengo'>
									STAGE
								</p>
								<p className='text-white text-[4px] md:text-2xl font-molengo'>
									STAGE
								</p>
								<p className='text-white text-[4px] md:text-2xl font-molengo'>
									STAGE
								</p>
							</div>
						</div>
					)}
					<div className='flex flex-col gap-4 lg:gap-8'>
						<div className='flex items-center gap-2.5  lg:gap-7'>
							{ifMobile && (
								<img src={CompanyLogo} alt='company logo' className='w-11 h-11 cursor-pointer mr-2'/>
							)}
							<img
								className='w-6 h-6 lg:w-9 lg:h-9 cursor-pointer '
								src={InstagramIcon}
								alt='Instagram icon'
							/>
							<img
								className='w-6 h-6 lg:w-9 lg:h-9 cursor-pointer '
								src={VkIcon}
								alt='Vk icon'
							/>
							<img
								className='w-6 h-6 lg:w-9 lg:h-9 cursor-pointer '
								src={WhatsappIcon}
								alt='Whatsapp icon'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<div className='flex gap-2.5 items-center'>
								<BsFillTelephoneFill className='text-[#B3C0D2] w-3.5 lg:w-5 h-3.5 lg:h-5' />
								<a className='text-[9px] lg:text-lg text-[#B3C0D2]' href='tel:+998990999999'>
									+7 951 999 28 34
								</a>
							</div>
							<div className='flex gap-2.5 items-center'>
								<IoMail className='text-[#B3C0D2] w-3.5 lg:w-5 h-3.5 lg:h-5' />
								<a
									className='text-[9px] lg:text-lg text-[#B3C0D2]'
									href='mailto:info@stageboxbrand.ru'
								>
									info@stageboxbrand.ru
								</a>
							</div>
						</div>
					</div>
				</div>
				<ul className='flex md:flex flex-col gap-0 xl:gap-2  justify-self-center'>
					{links.map((link, idx) => (
						<li key={idx}>
							<NavLink
								to={`/${link.replace(/\s+/g, '-').toLowerCase()}`}
								className={({ isActive }) =>
									isActive
										? 'text-white font-montserrat text-xs lg:text-sm'
										: 'font-montserrat  hover:text-white transition-colors text-xs lg:text-sm'
								}
							>
								{link}
							</NavLink>
						</li>
					))}
				</ul>
				<div className='hidden md:flex flex-col gap-9 justify-self-end items-end'>
					<div className='flex items-center gap-5'>
						<Link
							to={`${location.pathname}/filter`}
							className='w-11 h-11 rounded-full bg-[#191919] flex items-center justify-center'
						>
							<MdFilterList className='w-7 h-8 text-white' />
						</Link>
						<Link
							to='basket'
							className='w-11 h-11 rounded-full bg-[#191919] relative flex items-center justify-center'
						>
							<img src={shoppingBag} alt='shopping bag' className='w-5 h-6' />
							{!notify && (
								<div className='min-w-5 h-5 flex items-center justify-center rounded-full absolute -top-1.5 -right-1.5 bg-[#FF1818] text-white px-1 text-xs'>
									3
								</div>
							)}
						</Link>
						<Link
							to='faworites'
							className='relative w-11 h-11 rounded-full bg-[#191919] flex items-center justify-center'
						>
							<FaHeart className='w-5 h-5 text-white' />
							{notify && (
								<div className='min-w-5 h-5 flex items-center justify-center rounded-full absolute -top-1.5 -right-1.5 bg-[#FF1818] text-white px-1 text-xs'>
									3
								</div>
							)}
						</Link>
						<Link
							to='profile'
							className='relative w-11 h-11 rounded-full bg-[#191919] flex items-center justify-center'
						>
							<img src={ProfilePic} alt='profile' className='w-5 h-5' />
						</Link>
					</div>
					<form className='flex items-center w-[350px]'>
						<input
							about='Поиск'
							placeholder='Поиск'
							type='text'
							className='bg-[#B3C0D233] border  text-white border-[#29292D1A] w-full max-w-[255px] h-10 rounded-l-full px-6 py-2'
						/>
						<button className='w-[95px] h-10 rounded-r-full bg-[#191919] flex items-center justify-center cursor-pointer '>
							<IoMdSearch className='text-white w-[27px] h-[27px] font-bold' />
						</button>
					</form>
				</div>
			</div>
		</footer>
	)
}

export default index
