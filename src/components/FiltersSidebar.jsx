import { Slider } from '@/components/ui/slider'
import { useState } from 'react'
export default function FiltersSidebar({ filters, setFilters }) {
	const [selectedSeason, setSelectedSeason] = useState(null)
	const [selectedColor, setSelectedColor] = useState(null)
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [selectedBrand, setSelectedBrand] = useState(null)
	const [selectedSize, setSelectedSize] = useState(null)

	const [value, setValue] = useState([3000])

	const filterDb = {
		sizes: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
		seasons: [' Демисезон', 'Лето', 'Зима'],
		colors: ['green', 'red', 'blue', 'black', 'white', 'yellow', 'gray'],
		categories: [
			'Баскетбол',
			'Бег',
			'Ботинки',
			'Кроссовки с мехом',
			'Сандалии  и сланцы',
			'Сапоги',
		],
		brands: ['Adidas', 'Nike', 'Puma', 'Reebok', 'New Balance', 'Asics'],
	}

	const handleApply = () => {
		setFilters(prev => ({
			...prev,
			size: selectedSize,
			season: selectedSeason,
			price: value[0],
			color: selectedColor,
			category: selectedCategory,
			brand: selectedBrand,
		}))
	}

	return (
		<div className='w-[360px]'>
			<form className='w-full flex flex-col gap-[70px]'>
				<div className='flex flex-col items-start gap-9'>
					<h1 className='text-[#002C6A] font-montserrat text-2xl font-semibold '>
						Размер
					</h1>
					<div className='w-full flex flex-wrap gap-2'>
						{filterDb.sizes.map(size => {
							return (
								<button
									type='button'
									key={size}
									onClick={() => {
										setSelectedSize(prev => (prev == size ? null : size))
									}}
									className={
										selectedSize == size
											? 'w-20 h-9 rounded-sm bg-red-500 text-white text-sm font-montserrat border'
											: 'text-[#002C6A] text-sm font-montserrat border border-transparent w-20 h-9 rounded-sm hover:bg-red-500 transition cursor-pointer hover:text-white'
									}
								>
									{size} EUR
								</button>
							)
						})}
					</div>
				</div>
				<div className='flex flex-col items-start gap-9'>
					<h1 className='text-[#002C6A] font-montserrat text-2xl font-semibold '>
						Размер
					</h1>
					<div className='flex flex-col gap-2'>
						{filterDb.seasons.map(season => {
							return (
								<label
									key={season}
									className='text-[#002C6A] text-lg font-montserrat flex items-center gap-3 cursor-pointer'
								>
									<input
										type='checkbox'
										checked={selectedSeason === season}
										onChange={() =>
											setSelectedSeason(prev =>
												prev === season ? null : season
											)
										}
										name='season'
										className='w-4 h-4 accent-red-500'
									/>
									{season}
								</label>
							)
						})}
					</div>
				</div>
				<div className='flex flex-col items-start gap-6'>
					<h1 className='text-[#002C6A] font-montserrat text-2xl font-semibold '>
						Цена
					</h1>
					<div className='w-50 flex flex-col gap-3'>
						<div className='flex w-full items-center justify-between'>
							<span>0</span>
							<span>{value}</span>
						</div>
						<Slider
							value={value}
							onValueChange={setValue}
							min={0}
							max={5000}
							step={10}
							className='w-full
    *:data-radix-slider-track:bg-gray-300
    *:data-radix-slider-range:bg-black
    *:data-radix-slider-thumb:bg-red-500
    *:data-radix-slider-thumb:border-none
  '
						/>
					</div>
				</div>
				<div className='flex flex-col items-start gap-6'>
					<h1 className='text-[#002C6A] font-montserrat text-2xl font-semibold '>
						Цвет
					</h1>
					<div className='w-full flex flex-wrap gap-4'>
						{filterDb.colors.map(color => {
							return (
								<button
									key={color}
									onClick={e => {
										setSelectedColor(prev => (prev === color ? null : color))
									}}
									type='button'
									className={
										selectedColor === color
											? 'w-8 h-8 rounded-full border scale-150 border-gray-500'
											: 'w-8 h-8 rounded-full border hover:scale-150 border-gray-500 transition cursor-pointer'
									}
									style={{ backgroundColor: color }}
								></button>
							)
						})}
					</div>
				</div>
				<div className='flex flex-col items-start gap-9'>
					<h1 className='text-[#002C6A] font-montserrat text-2xl font-semibold '>
						Категория
					</h1>
					<div className='flex flex-col gap-2'>
						{filterDb.categories.map(category => {
							return (
								<label
									key={category}
									className='text-[#002C6A] text-lg font-montserrat flex items-center gap-3 cursor-pointer'
								>
									<input
										type='checkbox'
										name='category'
										checked={selectedCategory === category}
										onChange={() =>
											setSelectedCategory(prev =>
												prev === category ? null : category
											)
										}
										className='w-4 h-4 accent-red-500'
									/>
									{category}
								</label>
							)
						})}
					</div>
				</div>
				<div className='flex flex-col items-start gap-9'>
					<h1 className='text-[#002C6A] font-montserrat text-2xl font-semibold '>
						Бренд
					</h1>
					<div className='flex flex-col gap-2'>
						{filterDb.brands.map(brand => {
							return (
								<label
									key={brand}
									className='text-[#002C6A] text-lg font-montserrat flex items-center gap-3 cursor-pointer'
								>
									<input
										type='checkbox'
										name='category'
										checked={selectedBrand === brand}
										onChange={() =>
											setSelectedBrand(prev => (prev === brand ? null : brand))
										}
										className='w-4 h-4 accent-red-500'
									/>
									{brand}
								</label>
							)
						})}
					</div>
				</div>
				<button
					type='button'
					onClick={handleApply}
					className='bg-[#FF1818] text-white rounded-full font-montserrat text-lg font-semibold py-4 px-4 cursor-pointer'
				>
					Применить
				</button>
			</form>
		</div>
	)
}
