import { useRef } from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useProducts from '../hooks/useProducts'
import ProductCard from './ProductCard'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function ViewProductsSlider({ forPr, theme }) {
	const { products, loading, error } = useProducts({ forPr: forPr })
	const prevRef = useRef(null)
	const nextRef = useRef(null)
	const mobile = useMediaQuery('(max-width:760px)')

	if (error) {
		return <div className='text-center py-20 text-red-500'>{error}</div>
	}

	const slides = loading
		? [...Array(4)].map((_, i) => ({ id: i, loading: true })) // 4 skeletons
		: products.products

	return (
		<div className='w-full container mx-auto'>
			<div className='px-8 lg:px-16 xl:px-24 py-12'>
				<h1 className='text-[#002C6A] text-lg 2xl:text-5xl font-bold mb-3 2xl:mb-8'>{theme}</h1>

				<div className='w-full container mx-auto relative'>
					{/* LEFT ARROW */}
					<button
						ref={prevRef}
						className='hidden 2xl:block swiper-prev absolute -left-8 top-1/2 -translate-y-1/2 z-50
        [&.swiper-button-disabled>svg]:text-[#B3C0D2]
        [&>svg]:text-[#FF1818] cursor-pointer'
					>
						<FaCaretLeft className='h-12 w-6 transition-colors' />
					</button>

					<button
						ref={nextRef}
						className='hidden 2xl:block swiper-next absolute -right-8 top-1/2 -translate-y-1/2 z-50
        [&.swiper-button-disabled>svg]:text-[#B3C0D2]
        [&>svg]:text-[#FF1818] cursor-pointer'
					>
						<FaCaretRight className='h-12 w-6 transition-colors' />
					</button>

					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={mobile ? 10 : 30}
						slidesPerView={mobile ? 2 : 4}
						allowTouchMove={true}
						pagination={{
							clickable: true,
							renderBullet: (index, className) =>
								`<button class="${className} custom-dot w-2.5 h-2.5 not-last:mr-10! 2xl:not-last:mr-20!  "></button>`,
						}}
						navigation={mobile ? false : true}
						className='w-full overflow-visible h-[310px] 2xl:h-[520px]'
						onBeforeInit={swiper => {
							swiper.params.navigation.prevEl = prevRef.current
							swiper.params.navigation.nextEl = nextRef.current
						}}
					>
						{slides.map(p => (
							<SwiperSlide
								key={p.id}
								className='flex justify-center items-start'
							>
								<ProductCard product={p} loading={p.loading} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	)
}
