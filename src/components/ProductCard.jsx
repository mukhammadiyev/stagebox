import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { IoMdHeart } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductCard({ product, loading }) {
	const { category } = useParams()
	const navigate = useNavigate()
	const sizes = [36, 37, 38, 39, 40, 41, 42, 43]

	// Initialize liked state from localStorage
	const [liked, setLiked] = useState(() => {
		const storedProducts =
			JSON.parse(localStorage.getItem('likedProducts')) || []
		return storedProducts.some(p => p.id === product.id)
	})

	if (loading) {
		return (
			<div className='group relative h-[200px] 2xl:h-[350px] w-full flex justify-center'>
				<Card className='relative rounded-[20px] w-full max-w-[280px] h-[200px] 2xl:h-[350px] overflow-hidden p-0!'>
					<CardContent className='flex flex-col justify-between p-0!'>
						<Skeleton className='w-full h-[120px] 2xl:h-[140px] rounded-t-[20px] bg-gray-300 animate-pulse' />
						<div className='w-full p-2.5 2xl:p-6 flex flex-col gap-0 2xl:gap-2'>
							<Skeleton className='h-4 2xl:h-6 w-full rounded-md bg-gray-300 animate-pulse mb-1' />
							<Skeleton className='h-3 2xl:h-6 w-1/2 rounded-md bg-gray-300 animate-pulse' />
							<Skeleton className=' mt-2 h-5 2xl:h-8 w-full rounded-md bg-gray-300 animate-pulse' />
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	// Handle like toggle and localStorage update
	const handleLike = () => {
		const newLiked = !liked
		setLiked(newLiked)

		const storedProducts =
			JSON.parse(localStorage.getItem('likedProducts')) || []

		if (newLiked) {
			if (!storedProducts.find(p => p.id === product.id)) {
				storedProducts.push(product)
			}
		} else {
			const index = storedProducts.findIndex(p => p.id === product.id)
			if (index !== -1) storedProducts.splice(index, 1)
		}

		localStorage.setItem('likedProducts', JSON.stringify(storedProducts))
	}

	return (
		<div className='group relative h-[204px] 2xl:h-[350px] w-full flex justify-center'>
			<Card
				className={cn(
					'relative rounded-[20px] cursor-pointer',
					'transition-all ease-linear duration-500 w-full max-w-[280px]',
					'h-[204px] 2xl:h-[350px] overflow-hidden z-10 p-0!'
				)}
			>
				<CardContent className='flex flex-col justify-between p-0!'>
					<div
						className='w-full'
						onClick={() => navigate(`/${category}/${product.id}`)}
					>
						<img
							src={product.images[0]}
							alt=''
							className='w-full h-[120px] 2xl:h-[180px] rounded-t-[20px] object-contain bg-[#E2DAD8] '
						/>
					</div>
					<div className='w-full p-2.5 py-3 2xl:p-6 flex flex-col'>
						<h1 className='w-full h-[22px] 2xl:h-11 text-[10px] 2xl:text-[16px] font-semibold font-montserrat leading-[100%] flex flex-wrap overflow-hidden'>
							{product.title.length > 40
								? product.title.slice(0, 40) + '…'
								: product.title}
						</h1>
						<h2 className='font-ruda text-[#B3C0D2] text-[8px] 2xl:text-xs mb-1 2xl:mb-3.5 '>
							Артикул 19666
						</h2>
						<div className='w-full flex justify-between items-end 2xl:items-center'>
							<p className='text-[#002C6A] font-montserrat text-lg 2xl:text-2xl font-semibold '>
								{product.price} ₽
							</p>
							<IoMdHeart
								onClick={handleLike}
								className={`w-8 h-7 ${
									liked ? 'text-[#FF1818]' : 'text-[#B3C0D2]'
								}`}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card
				className={cn(
					'absolute top-0! rounded-[20px] cursor-pointer',
					'transition-all duration-500 w-full max-w-[280px]',
					'opacity-0 group-hover:opacity-100 group-hover:scale-[1]',
					'z-30 pointer-events-auto py-0!',
					'h-[270px] 2xl:h-[420px]'
				)}
			>
				<CardContent className='flex flex-col justify-between p-0!'>
					<div
						className='w-full'
						onClick={() => navigate(`/${category}/${product.id}`)}
					>
						<img
							src={product.images[0]}
							alt=''
							className='w-full h-[120px] 2xl:h-[180px] rounded-t-[20px] object-contain bg-[#E2DAD8] '
						/>
					</div>
					<div className='w-full p-2.5 2xl:p-6 flex flex-col h-[150px] 2xl:h-max'>
						<h1 className='w-full h-[22px] 2xl:h-11 text-[10px] 2xl:text-[16px] font-semibold font-montserrat leading-[100%] flex flex-wrap overflow-hidden'>
							{product.title.length > 40
								? product.title.slice(0, 40) + '…'
								: product.title}
						</h1>
						<h2 className='font-ruda text-[#B3C0D2] text-[8px] 2xl:text-xs mb-1 2xl:mb-3.5 '>
							Артикул 19666
						</h2>
						<div className='w-full flex justify-between items-end 2xl:items-center'>
							<p className='text-[#002C6A] font-montserrat text-lg 2xl:text-2xl font-semibold '>
								{product.price} ₽
							</p>
							<IoMdHeart
								onClick={handleLike}
								className={`w-8 h-7 ${
									liked ? 'text-[#FF1818]' : 'text-[#B3C0D2]'
								}`}
							/>
						</div>
						<div className='w-full flex flex-wrap gap-2 gap-y-4 2xl:gap-y-2 mt-3'>
							{sizes.map(s => (
								<div
									key={s}
									className='w-9 2xl:w-16 h-0 2xl:h-5.5 flex items-center justify-center text-[10px] 2xl:text-sm rounded-[5px] font-ruda text-[#002C6A] 2xl:hover:text-white 2xl:hover:bg-[#002C6A] transition duration-500 text-center'
								>
									{s} EUR
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
