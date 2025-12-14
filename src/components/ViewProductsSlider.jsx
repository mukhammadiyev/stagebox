import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useRef } from 'react'
import ProductCard from './ProductCard'

export default function ViewProductsSlider({ theme }) {
	const prevRef = useRef(null)
	const nextRef = useRef(null)
	const products = [
		{
			id: 1,
			name: 'КРОССОВКИ ADIDAS EQT SUPPORT ADV PK',
			price: 3290,
			image: '/assets/air_max_2d.png',
			sizes: [35, 36, 37, 38, 39, 40, 41],
		},
		{
			id: 2,
			name: 'СЛАНЦЫ ADIDAS YEEZY SLIDE',
			price: 3460,
			image: '/assets/nite_jogger_2d.png',
			sizes: [35, 36, 37, 38, 39, 40, 41],
		},
		{
			id: 3,
			name: 'ADIDAS ALPHABOUNCE INSTINCT',
			price: 2680,
			image: '/assets/yeezy_2d.png',
			sizes: [35, 36, 37, 38, 39, 40, 41],
		},
		{
			id: 4,
			name: 'ADIDAS ALPHABOUNCE INSTINCT',
			price: 3290,
			image: '../assets/yeezy_2d.png',
			sizes: [35, 36, 37, 38, 39, 40, 41],
		},
		{
			id: 5,
			name: 'ADIDAS ALPHABOUNCE INSTINCT',
			price: 2200,
			image: '/assets/yeezy_2d.png',
			sizes: [37, 38, 39, 40, 41],
		},
		{
			id: 6,
			name: 'СЛАНЦЫ ADIDAS YEEZY SLIDE',
			price: 3460,
			image: '/assets/nite_jogger_2d.png',
			sizes: [35, 36, 37, 38, 39, 40, 41],
		},
		{
			id: 7,
			name: 'ADIDAS ALPHABOUNCE INSTINCT',
			price: 2680,
			image: '/assets/yeezy_2d.png',
			sizes: [35, 36, 37, 38, 39, 40, 41],
		},
		{
			id: 8,
			name: 'ADIDAS ALPHABOUNCE INSTINCT',
			price: 3290,
			image: '../assets/yeezy_2d.png',
			sizes: [35, 36, 37, 38, 39, 40, 41],
		},
		{
			id: 9,
			name: 'ADIDAS ALPHABOUNCE INSTINCT',
			price: 2200,
			image: '/assets/yeezy_2d.png',
			sizes: [37, 38, 39, 40, 41],
		},
	]

	return (
		<div className='w-full container mx-auto'>
			<div className='px-8 lg:px-16 xl:px-24 py-12'>
				<h1 className='text-[#002C6A] text-5xl font-bold mb-8'>{theme}</h1>

				<div className='w-full container mx-auto relative'>
					{/* LEFT ARROW */}
					<button
						ref={prevRef}
						className='swiper-prev absolute -left-8 top-1/2 -translate-y-1/2 z-50
        [&.swiper-button-disabled>svg]:text-[#B3C0D2]
        [&>svg]:text-[#FF1818] cursor-pointer'
					>
						<FaCaretLeft className='h-12 w-6 transition-colors' />
					</button>

					<button
						ref={nextRef}
						className='swiper-next absolute -right-8 top-1/2 -translate-y-1/2 z-50
        [&.swiper-button-disabled>svg]:text-[#B3C0D2]
        [&>svg]:text-[#FF1818] cursor-pointer'
					>
						<FaCaretRight className='h-12 w-6 transition-colors' />
					</button>

					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={30}
						slidesPerView={4}
						allowTouchMove={false}
						pagination={{
							clickable: true,
							renderBullet: (index, className) =>
								`<button class="${className} custom-dot w-2.5 h-2.5 not-last:mr-20!  "></button>`,
						}}
						navigation={true}
						className='w-full overflow-visible h-[520px]'
						onBeforeInit={swiper => {
							swiper.params.navigation.prevEl = prevRef.current
							swiper.params.navigation.nextEl = nextRef.current
						}}
					>
						{products.map(p => (
							<SwiperSlide
								key={p.id}
								className='flex justify-center items-start'
							>
								<ProductCard product={p} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	)
}
