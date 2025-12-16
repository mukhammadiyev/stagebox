import { useRef } from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import newBalance from '../icons/new_balance.svg'
import nike from '../icons/nike.svg'
import porsche from '../icons/porsche.svg'
import puma from '../icons/puma.svg'
import reebook from '../icons/reebook.svg'
import vance from '../icons/vance.svg'
function BrandSlider() {
	const prevRef = useRef(null)
	const nextRef = useRef(null)
	const brands = [
		nike,
		puma,
		porsche,
		newBalance,
		reebook,
		vance,
		nike,
		puma,
		porsche,
		newBalance,
		reebook,
		vance,
	]
	return (
		<div className='container mx-auto w-full'>
			<div className='w-full py-6 xl:py-8 2xl:py-16  px-8 lg:px-16 xl:px-25 2xl:px-30'>
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
						slidesPerView={6}
						allowTouchMove={false}
						navigation={true}
						className='w-full flex items-center! px-4'
						onBeforeInit={swiper => {
							swiper.params.navigation.prevEl = prevRef.current
							swiper.params.navigation.nextEl = nextRef.current
						}}

					>
						{brands.map((p,idx) => (
							<SwiperSlide
								key={idx}
								className='flex justify-center items-start self-center!'
							>
								<img src={p} alt="" />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	)
}

export default BrandSlider
