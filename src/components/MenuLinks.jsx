import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function MenuLinks({ device = 'desktop' }) {
	const location = useLocation()
	const links = [
		{ title: 'Кросовки', to: 'crosses' },
		{ title: 'Одежда', to: 'clothes' },
		{ title: 'Аксессуары', to: 'accesories' },
		{ title: 'Блог', to: 'blog' },
		{ title: 'Отзывы', to: 'reviews' },
	]

	const menuData = {
		Кросовки: {
			columns: [
				{
					title: 'Обувь',
					items: [
						'Сапоги',
						'Ботинки',
						'Сандалии и сланцы',
						'Спортивный стиль',
						'Бег',
						'Баскетбол',
						'Скейтборд',
						'Футбол',
						'Кроссовки смехом',
					],
				},
			],
		},
		Одежда: {
			columns: [
				{
					title: 'Одежда',
					items: ['Детские', 'Женские', 'Мужские'],
				},
			],
		},
		Аксессуары: {
			columns: [
				{
					title: 'Аксессуары',
					items: ['Сумки', 'Ремни', 'Головные уборы', 'Часы', 'Украшения'],
				},
			],
		},
		Блог: {
			columns: [
				{
					title: 'Блог',
					items: ['наша страница', 'новости'],
				},
			],
		},
		Отзывы: {
			columns: [
				{
					title: 'Отзывы',
					items: ['пустой', 'пустой'],
				},
			],
		},
	}

	const getDefaultAccordionValue = () => {
		const currentPath = location.pathname
		const activeLink = links.find(link => currentPath.includes(link.to))
		return activeLink ? activeLink.title : links[0].title // Fallback to first item
	}

	// Desktop version with individual popovers for each link
	if (device === 'desktop') {
		return (
			<div className='flex items-center gap-7'>
				{links.map((link, index) => {
					const [linkOpen, setLinkOpen] = useState(false)

					return (
						<Popover key={index} open={linkOpen} onOpenChange={setLinkOpen}>
							<PopoverTrigger asChild>
								<div
									onMouseEnter={() => setLinkOpen(true)}
									onMouseLeave={() => setLinkOpen(false)}
									className='cursor-pointer'
								>
									<NavLink
										to={link.to}
										className={({ isActive }) =>
											isActive
												? 'text-red-500 font-montserrat text-2xl font-bold'
												: 'font-montserrat text-2xl font-bold hover:text-red-500 transition-colors'
										}
									>
										{link.title}
									</NavLink>
								</div>
							</PopoverTrigger>

							<PopoverContent
								align='start'
								side='bottom'
								sideOffset={5}
								className='w-max bg-white rounded-xl shadow-xl p-8 border-0'
								onMouseEnter={() => setLinkOpen(true)}
								onMouseLeave={() => setLinkOpen(false)}
							>
								<div className='flex gap-8'>
									{menuData[link.title]?.columns.map((column, colIndex) => (
										<div key={colIndex} className='flex flex-col gap-4'>
											<div className='font-bold text-lg text-black mb-0'>
												{column.title}
											</div>
											<div className='flex flex-col gap-3'>
												{column.items.map((item, idx) => (
													<Link
														to={link.to}
														className='text-[15px] text-gray-700 hover:text-red-500 cursor-pointer transition-colors'
														onClick={() => setLinkOpen(false)}
													>
														{item}
													</Link>
												))}
											</div>
										</div>
									))}
								</div>
							</PopoverContent>
						</Popover>
					)
				})}
			</div>
		)
	}

	// Mobile version - original button style
	return (
		<Popover>
			<PopoverTrigger asChild>
				<button className='w-[100px] h-[35px] text-white bg-[#FF1818] flex items-center justify-between gap-0.5 rounded-r-full text-[13px] font-bold font-montserrat px-4'>
					Меню <IoIosMenu className='w-4 h-4' />
				</button>
			</PopoverTrigger>

			<PopoverContent
				align='start'
				side='bottom'
				className='w-60 rounded-2xl shadow-xl p-5'
				onInteractOutside={e => {
					// Prevent closing when interacting with accordion content
					if (e.target.closest('.accordion-content')) {
						e.preventDefault()
					}
				}}
			>
				<Accordion
					type='multiple'
					collapsible='true'
					defaultValue={getDefaultAccordionValue()}
					className='w-full'
				>
					<div className='flex flex-col gap-2 text-[16px]'>
						{links.map((item, index) => (
							<AccordionItem
								key={index}
								value={item.title}
								className='border-none'
							>
								<AccordionTrigger className='py-2 hover:no-underline'>
									<NavLink
										to={item.to}
										className={({ isActive }) =>
											isActive
												? 'font-bold text-red-500'
												: 'font-bold text-black'
										}
									>
										{item.title}
									</NavLink>
								</AccordionTrigger>
								<AccordionContent className='pt-2'>
									{menuData[item.title]?.columns?.[0]?.items && (
										<div className='flex flex-col pl-4 gap-2'>
											{menuData[item.title].columns[0].items.map(
												(child, idx) => (
													<div
														key={idx}
														className={`text-[15px] ${
															idx === 0 ? 'text-red-500' : 'text-gray-700'
														} hover:text-red-500 cursor-pointer transition-colors`}
														onClick={e => e.stopPropagation()}
														onMouseEnter={e => e.stopPropagation()}
													>
														{child}
													</div>
												)
											)}
										</div>
									)}
								</AccordionContent>
							</AccordionItem>
						))}
					</div>
				</Accordion>
			</PopoverContent>
		</Popover>
	)
}
