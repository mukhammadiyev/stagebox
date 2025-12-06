import { useState } from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoIosArrowRoundForward, IoMdSearch } from 'react-icons/io'
import { IoMail } from 'react-icons/io5'
import { MdFilterList } from 'react-icons/md'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import shoppingBag from '../../icons/bag.svg'
import heart from '../../icons/heart.svg'
import ProfilePic from '../../icons/profile.svg'
import MenuLinks from '../MenuLinks'
function index() {
	const { category } = useParams()
	const navigate = useNavigate()
	console.log(category)
	const [notify, setNotify] = useState(false)
	const [isFindActive, setIsFindActive] = useState(false)
	const [searchterm, setSearchterm] = useState('')
	const location = useLocation()
	const isMobile = useMediaQuery('(max-width:760px)')
	isMobile ? console.log('mobile') : console.log('desktop')

	const categories = ['crosses', 'clothes', 'accesories']
	return !isMobile ? (
		<nav className='w-full flex flex-col items-center'>
			{/* AD Discount banner */}
			<div className='w-full bg-[#29292D] text-white  py-1.5 text-xs lg:text-base xl:text-xl 2xl:text-2xl font-bold font-montserrat'>
				<h1 className='w-full container mx-auto flex justify-center'>
					Только три дня скидка - <span className='text-red-500'>30%</span> на
					всё!
				</h1>
			</div>
			{/* Navbar main */}
			<div className='w-full container mx-auto px-8 lg:px-16 xl:px-25 2xl:px-30'>
				<div className='w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center py-4 xl:py-6 2xl:py-8'>
					{/* LEFT SIDE */}
					<div className='flex flex-col gap-3.5 justify-self-start'>
						<div className='flex gap-2.5 items-center'>
							<BsFillTelephoneFill className='text-[#002C6A] w-5 h-5' />
							<a className='text-lg text-[#29292D]' href='tel:+998990999999'>
								+7 951 999 28 34
							</a>
						</div>
						<div className='flex gap-2.5 items-center'>
							<IoMail className='text-[#002C6A] w-5 h-5' />
							<a
								className='text-lg text-[#29292D]'
								href='mailto:info@stageboxbrand.ru'
							>
								info@stageboxbrand.ru
							</a>
						</div>
					</div>

					{/* CENTER LOGO */}
					<div
						className='justify-self-center'
						onClick={() => navigate('/crosses')}
					>
						<div className='flex justify-center items-center w-10 h-10 lg:w-18 lg:h-18 2xl:w-22 2xl:h-22 bg-black rounded-full'>
							<div className='flex flex-col items-center justify-center border border-red-500 w-7/12 h-7/12'>
								<p className='text-white text-xs font-molengo'>STAGE</p>
								<p className='text-white text-xs font-molengo'>STAGE</p>
								<p className='text-white text-xs font-molengo'>STAGE</p>
							</div>
						</div>
					</div>

					{/* RIGHT SIDE */}
					<div className='flex items-center gap-5 justify-self-end'>
						<Link
							to={`${location.pathname}/filter`}
							className='w-11 h-11 rounded-full bg-[#29292D] flex items-center justify-center'
						>
							<MdFilterList className='w-7 h-8 text-white' />
						</Link>

						<Link
							to='basket'
							className='w-11 h-11 rounded-full bg-[#29292D] relative flex items-center justify-center'
						>
							<img src={shoppingBag} alt='shopping bag' className='w-5 h-6' />
							{!notify && (
								<div className='min-w-5 h-5 flex items-center justify-center rounded-full absolute -top-1.5 -right-1.5 bg-[#FF1818] text-white px-1 text-xs'>
									3
								</div>
							)}
						</Link>

						<Link to='faworites' className='relative'>
							<img src={heart} alt='favorites' className='w-11 h-11' />
							{notify && (
								<div className='min-w-5 h-5 flex items-center justify-center rounded-full absolute -top-1.5 -right-1.5 bg-[#FF1818] text-white px-1 text-xs'>
									3
								</div>
							)}
						</Link>

						<Link to='profile' className='relative'>
							<img src={ProfilePic} alt='profile' className='w-11 h-11' />
						</Link>
					</div>
				</div>
			</div>

			{/* Navbar down links */}
			<div className='w-full container mx-auto px-8 lg:px-16 xl:px-25 2xl:px-30 flex justify-between items-center pb-4'>
				{/* Links */}
				<MenuLinks device='desktop' />
				{/* Search form */}
				<form className='flex items-center w-[350px]'>
					<input
						about='Поиск'
						placeholder='Поиск'
						type='text'
						className='bg-[#FFFFFF] border border-[#29292D1A] w-full max-w-[255px] h-10 rounded-l-full px-6 py-2'
						onChange={e => setSearchterm(e.target.value)}
						value={searchterm}
					/>
					<button className='w-[95px] h-10 rounded-r-full bg-[#29292D] flex items-center justify-center '>
						<IoMdSearch className='text-white w-[27px] h-[27px] font-bold' />
					</button>
				</form>
			</div>
		</nav>
	) : (
		<nav className='w-full flex flex-col'>
			{/* Mobile Navbar can be implemented here */}
			<div className='w-full bg-[#29292D] text-white  py-1.5 text-[13px] font-bold font-montserrat'>
				<h1 className='w-full container mx-auto flex justify-center'>
					Только три дня скидка - <span className='text-red-500'>30%</span> на
					всё!
				</h1>
			</div>
			{/* Navbar-main */}
			<div className='w-full flex relative px-5'>
				<div className=' absolute -top-6'>
					<div className='flex justify-center items-center w-12 h-12  bg-black rounded-full'>
						<div className='flex flex-col items-center justify-center border border-red-500 w-7/12 h-7/12'>
							<p className='text-white text-[5px] font-molengo'>STAGE</p>
							<p className='text-white text-[5px] font-molengo'>STAGE</p>
							<p className='text-white text-[5px] font-molengo'>STAGE</p>
						</div>
					</div>
				</div>
				<div className='w-full flex items-center justify-center gap-5 py-1'>
					<a href='#' className='text-[10px] font-ruda'>
						+7 951 999 28 34
					</a>
					<a href='#' className='text-[10px] font-ruda'>
						info@stageboxbrand.ru
					</a>
				</div>
			</div>
			{/* Navbar links + control */}
			{isFindActive === false ? (
				<div className='w-full py-4 flex items-center justify-between'>
					<MenuLinks device='mobile' />
					<div className='flex items-center justify-between gap-2'>
						<Link
							to={`${location.pathname}/filter`}
							className='w-[35px] h-[35px] rounded-full bg-[#29292D] flex items-center justify-center'
						>
							<MdFilterList className='w-5 h-6 text-white' />
						</Link>

						<Link
							to='basket'
							className='w-[35px] h-[35px] rounded-full bg-[#29292D] relative flex items-center justify-center'
						>
							<img src={shoppingBag} alt='shopping bag' className='w-4 h-5' />
							{!notify && (
								<div className='min-w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2 bg-[#FF1818] text-white px-1 text-xs'>
									3
								</div>
							)}
						</Link>

						<Link to='faworites' className='relative'>
							<img src={heart} alt='favorites' className='w-[35px] h-[35px]' />
							{notify && (
								<div className='min-w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2 bg-[#FF1818] text-white px-1 text-xs'>
									3
								</div>
							)}
						</Link>

						<Link to='profile' className='relative'>
							<img
								src={ProfilePic}
								alt='profile'
								className='w-[35px] h-[35px]'
							/>
						</Link>
					</div>
					<button
						onClick={() => setIsFindActive(true)}
						className='w-[100px] h-[35px] text-white bg-[#FF1818] flex items-center justify-between gap-0.5 rounded-l-full text-[13px] font-bold font-montserrat px-4'
					>
						<IoMdSearch className='w-4 h-4 ' /> Найти
					</button>
				</div>
			) : (
				<div className='w-full py-4 flex items-center justify-center'>
					<input
						type='text'
						className='bg-[#FFFFFF] border border-[#2222241a] w-full max-w-[255px] h-[35px] rounded-l-full px-6 py-2'
						placeholder='введите слова для поиска'
						onChange={e => setSearchterm(e.target.value)}
						value={searchterm}
					/>
					<button
						onClick={() => {
							if (searchterm) {
								navigate('search')
							} else {
								setIsFindActive(false)
							}
						}}
						className='w-[55px] h-[35px] text-white bg-[#FF1818] flex items-center justify-between gap-0.5 rounded-r-full text-[13px] font-bold font-montserrat px-4'
					>
						{searchterm ? (
							<IoMdSearch className='w-4 h-4 ' />
						) : (
							<IoIosArrowRoundForward className='w-6 h-6' />
						)}
					</button>
				</div>
			)}
		</nav>
	)
}

export default index
