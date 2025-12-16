import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { IoMdHeart } from 'react-icons/io'
export default function ProductCard({ product }) {
	const sizes = [36, 37, 38, 39, 40, 41, 42, 43,]
	const [liked, setLiked] = useState(false)
	return (
		<div className='group relative h-[350px] w-full flex justify-center'>
			{/* BASE CARD */}
			<Card
				className={cn(
					'relative rounded-[20px] cursor-pointer',
					'transition-all ease-linear duration-500 w-full max-w-[280px]',
					'h-[350px] overflow-hidden z-10 p-0!'
				)}
			>
				<CardContent className='flex flex-col justify-between p-0!'>
					<img
						src={product.images[0]}
						alt=''
						className='w-full h-[180px] rounded-t-[20px] object-contain '
					/>
					<div className='w-full p-6 flex flex-col'>
						<h1 className='w-full h-11 text-[16px] font-semibold font-montserrat leading-[100%] flex flex-wrap overflow-hidden'>
							{product.title.length > 40
								? product.title.slice(0, 40) + '…'
								: product.title}
						</h1>
						<h2 className='font-ruda text-[#B3C0D2] text-xs mb-3.5 '>
							Артикул 19666
						</h2>
						<div className=' w-full flex justify-between items-center'>
							<p className='text-[#FF1818] font-montserrat text-2xl font-semibold '>
								{product.price} ₽
							</p>
							<IoMdHeart
								onClick={() => {
									setLiked(!liked)
								}}
								className={`w-8 h-7 ${
									liked === true ? 'text-[#FF1818]' : 'text-[#B3C0D2]'
								}`}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* HOVER EXPANSION CARD */}
			<Card
				className={cn(
					'absolute top-2! rounded-[20px] cursor-pointer',
					'transition-all duration-500 w-full max-w-[280px]',
					'opacity-0 group-hover:opacity-100 group-hover:scale-[1.03]',
					'z-30 pointer-events-auto py-0!',
					'h-max max-h-[470px]'
				)}
			>
				<CardContent className='flex flex-col justify-between p-0!'>
					<img
						src={product.images[1]}
						alt=''
						className='w-full h-[220px] rounded-t-[20px] object-contain object-center '
					/>
					<div className='w-full p-6 flex flex-col'>
						<h1 className='w-full h-11 text- font-semibold font-montserrat leading-[120%]'>
							{product.title.length > 40
								? product.title.slice(0, 40) + '…'
								: product.title}
						</h1>
						<h2 className='font-ruda text-[#B3C0D2] text-xs mb-3.5 '>
							Артикул 19666
						</h2>
						<div className=' w-full flex justify-between items-center'>
							<p className='text-[#FF1818] font-montserrat text-2xl font-semibold '>
								{product.price} ₽
							</p>
							<IoMdHeart
								onClick={() => {
									setLiked(!liked)
								}}
								className={`w-8 h-7 ${
									liked === true ? 'text-[#FF1818]' : 'text-[#B3C0D2]'
								}`}
							/>
						</div>
						<div className='flex flex-wrap gap-2 mt-2'>
							{sizes.map(s => (
								<span
									key={s}
									className='w-16 h-5.5 flex items-center justify-center text-sm rounded-[5px] font-ruda text-[#002C6A] hover:text-white hover:bg-[#002C6A] transition duration-500'
								>
									{s} EUR
								</span>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
