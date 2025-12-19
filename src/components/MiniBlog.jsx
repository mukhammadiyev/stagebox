import { HiEye } from 'react-icons/hi2'
import airMax270 from '../assets/airmax_270.png'
import airMax720 from '../assets/airmax_720.png'

function MiniBlog() {
	return (
		<div className='container w-full mx-auto'>
			<div className='w-full py-6 xl:py-8 2xl:py-16  px-8 lg:px-16 xl:px-25 2xl:px-30 flex flex-col gap-9 '>
				<h1 className='font-montserrat text-5xl text-[#002C6A] font-semibold '>
					Блог
				</h1>
				<div className='w-ful flex gap-3 justify-between '>
					<div className='w-1/2 flex flex-col gap-4'>
						<div className='w-9/10 h-42 bg-[#FFFFFF] rounded-[20px] drop-shadow-2xl drop-shadow-[#165CBF26] flex items-center'>
							<img
								src={airMax270}
								alt=''
								className='h-full aspect-square rounded-l-[20px]'
							/>
							<div className='w-full h-full pt-4.25 pl-4.25 pb-8 pr-8  flex flex-col justify-between gap-2.25'>
								<h2 className='w-full font-montserrat text-xl text-[#002C6A] font-semibold'>
									КРОССОВКИ NIKE AIR MAX 270
								</h2>
								<p className='w-full font-ruda text-sm '>
									Nike Air Max 720 Saturn представлен в совершенно новой
									цветовой гамме Black / Team Orange.
								</p>
								<div className='w-full flex items-center justify-between'>
									<p className='text-sm text-[#B3C0D2] font-ruda '>
										15 августа 2019
									</p>
									<span className='text-sm text-[#B3C0D2] font-ruda flex items-center gap-2'>
										<HiEye /> 4 416
									</span>
								</div>
							</div>
						</div>
						<div className='w-full h-52 bg-[#FFFFFF] rounded-[20px] drop-shadow-2xl drop-shadow-[#165CBF26] flex items-center'>
							<img
								src={airMax720}
								alt=''
								className='h-full w-6/10 rounded-l-[20px]'
							/>
							<div className='w-full h-full pt-4.25 pl-4.25 pb-8 pr-8  flex flex-col justify-between gap-2.25'>
								<h2 className='w-full font-montserrat text-xl text-[#002C6A] font-semibold'>
									КРОССОВКИ NIKE AIR MAX 270
								</h2>
								<p className='w-full font-ruda text-sm '>
									Nike Air Max 720 Saturn представлен в совершенно новой
									цветовой гамме Black / Team Orange.
								</p>
								<div className='w-full flex items-center justify-between'>
									<p className='text-sm text-[#B3C0D2] font-ruda '>
										15 августа 2019
									</p>
									<span className='text-sm text-[#B3C0D2] font-ruda flex items-center gap-2'>
										<HiEye /> 4 416
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='w-1/2 h-[340px] bg-[#29292D] rounded-[20px] drop-shadow-2xl drop-shadow-[#165CBF26] flex flex-col items-center justify-between'>
						<h1 className='w-full py-8 px-16 text-white text-2xl font-semibold uppercase font-montserrat'>
							Подпишись на рассылку и получи скидку до 10 %{' '}
						</h1>
						<form className='w-full bg-white rounded-[20px] py-8 px-16 flex flex-col gap-9' >
							<input type="email" className='w-full border-b-2 border-[#002C6A] text-2xl font-ruda p-0 pb-2 outline-none placeholder:text-[#B3C0D2]' placeholder='Введите Ваш email' />
							<button className='py-4 px-13 rounded-full bg-[#FF1818] text-white w-max text-xl font-montserrat font-semibold'>Подписаться</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MiniBlog
