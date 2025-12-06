import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import bgDec from '../assets/bg_dec.png'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import AirMax2D from '../assets/air_max_2d.png'
import NiteJogger2D from '../assets/nite_jogger_2d.png'
import yeezyr2D from '../assets/yeezy_2d.png'

function ShoeSlider3D() {
	const slides = [
		{ id: 1, theme: 'Nite Jogger', inactivePic: NiteJogger2D, brand: 'Adidas' },
		{ id: 2, theme: 'Yeezy Boost ', inactivePic: yeezyr2D, brand: 'Adidas' },
		{ id: 3, theme: 'Air Max', inactivePic: AirMax2D, brand: 'Nike' },
	]

	return (
		<div className='w-full min-h-screen relative'>
			<img
				src={bgDec}
				alt='background decoration'
				className='absolute right-0 top-8 z-0'
			/>
			<div className='w-full container mx-auto'>
				<div className='w-full px-8 lg:px-16 xl:px-25 2xl:px-30'>
					<Swiper
						modules={[Autoplay]}
						spaceBetween={20}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						loop={false}
						autoplay={{ delay: 2500 }}
						className='rounded-xl'
					>
						{slides.map(slide => {
							return (
								<SwiperSlide key={slide.id}>
									<div className='w-full h-[760px] flex items-center justify-between'>
										<div className='w-1/2 flex flex-col items-start justify-center'>
											<div className='flex flex-col font-montserrat uppercase text-[#002C6A] font-extrabold text-7xl '><span>{slide.brand}</span> {slide.theme}</div>
										</div>
										<img
											className='w-[550px] h-[500px] '
											src={slide.inactivePic}
											alt=''
										/>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
				</div>
			</div>
		</div>
	)
}

export default ShoeSlider3D
