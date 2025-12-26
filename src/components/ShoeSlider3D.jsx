import { useRef, useState } from 'react' // ⬅️ ADDED
import { GrLinkNext } from 'react-icons/gr'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import AirMax2D from '../assets/air_max_2d.png'
import bgDec from '../assets/bg_dec.png'
import NiteJogger2D from '../assets/nite_jogger_2d.png'
import yeezyr2D from '../assets/yeezy_2d.png'
import View3D from './View3D'

function ShoeSlider3D() {
	const slides = [
		{
			id: 1,
			theme: 'Nite Jogger',
			inactivePic: NiteJogger2D,
			brand: 'Adidas',
			activated3D: 'models/adidas_nite_jogger2.glb',
		},
		{
			id: 2,
			theme: 'Yeezy Boost ',
			inactivePic: yeezyr2D,
			brand: 'Adidas',
			activated3D: 'models/adidas_yeezy_boost.glb',
		},
		{
			id: 3,
			theme: 'Air Max',
			inactivePic: AirMax2D,
			brand: 'Nike',
			activated3D: 'models/nike_air_max.glb',
		},
	]

	const swiperRef = useRef(null) // ⬅️ ADDED
	const [activeIndex, setActiveIndex] = useState(0) // ⬅️ ADDED

	return (
		<div className='w-full min-h-full relative'>
			<img
				src={bgDec}
				alt='background decoration'
				className='absolute right-0 top-8 z-0 w-[220px] h-40 2xl:w-[800px] 2xl:h-[550px] '
			/>
			<div className='w-full container mx-auto'>
				<div className='w-full px-8 lg:px-16 xl:px-25 2xl:px-30'>
					<Swiper
						modules={[Autoplay]}
						spaceBetween={20}
						slidesPerView={1}
						allowTouchMove={false}
						loop={false}
						autoplay={{ delay: 50000 }}
						className='rounded-xl'
						// ⬅️ ADDED
						onSwiper={s => (swiperRef.current = s)}
						onSlideChange={s => setActiveIndex(s.activeIndex)}
					>
						{slides.map(slide => {
							return (
								<SwiperSlide key={slide.id}>
									<div className='w-full h-[220px] 2xl:h-[650px] flex items-center justify-between'>
										<div className='w-1/2 max-w-[540px] flex flex-col gap-0 items-start justify-center'>
											<div className='flex flex-col font-montserrat uppercase text-[#002C6A] font-extrabold text-xl 2xl:text-7xl '>
												<span>{slide.brand}</span> {slide.theme}
											</div>
											<h2 className='w-10/12 font-ruda text-xs 2xl:text-4xl font-normal my-3 2xl:my-9 text-[#29292D] '>
												Городские кроссовки в ярком стиле 80-х
											</h2>
											<button className='hidden xl:block cursor-pointer bg-[#FF1818] rounded-full border-2 border-[#FF1818] text-white font-montserrat font-medium text-2xl px-13 py-7 hover:bg-transparent hover:text-[#FF1818] transition'>
												Смотреть все
											</button>
										</div>
										<View3D object={slide.activated3D} sizes={[2, 1, 1]} />
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>

					{/* ⬅️ CUSTOM PAGINATION ADDED HERE */}
					<div className='w-full mt-0 mb-10 flex items-center justify-end gap-10 2xl:gap-40 cursor-pointer'>
						{slides.map((slide, index) => (
							<div
								key={slide.id}
								onClick={() => swiperRef.current.slideTo(index)}
								className={`relative w-40 2xl:w-[280px] h-9 2xl:h-21.5
										items-center gap-4 px-8 2xl:px-6 py-1 2xl:py-5.5 flex justify-end 2xl:justify-center rounded-[40px]
											shadow-[0_4px_25px_rgba(0,0,0,0.1)]
											transition
											${activeIndex === index ? 'hidden' : 'bg-white'}
										`}
							>
								<img
									src={slide.inactivePic}
									className='absolute w-15 2xl:w-[140px] h-15  2xl:h-[120px] bottom-0 2xl:bottom-2.5 -left-6 2xl:-left-18'
								/>
								<div className='text-left uppercase text-[9px] 2xl:text-xl font-extrabold text-[#1C1C1E]'>
									{slide.brand} <br /> {slide.theme}
								</div>
								{/* SMALL RED CIRCLE ARROW */}
								<div className='hidden absolute -right-6 -top-6 w-12.5 h-12.5 rounded-full bg-[#FF1818] 2xl:flex items-center justify-center'>
									<span className='text-white text-xl font-bold'>
										<GrLinkNext />
									</span>
								</div>
							</div>
						))}
					</div>
					{/* END CUSTOM PAGINATION */}
				</div>
			</div>
		</div>
	)
}

export default ShoeSlider3D
