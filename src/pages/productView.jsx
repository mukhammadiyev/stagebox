import { useEffect, useState } from 'react'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { NavLink, useParams } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ViewProductsSlider from '../components/ViewProductsSlider'
export default function productView() {
	const { id, category } = useParams()
	const [product, setProduct] = useState(null)
	const sizes = [36, 37, 38, 39, 40, 41, 42, 43]
	const [selectedSize, setSelectedSize] = useState(null)
	const specs = [
		{ label: 'Категория', value: 'Спортивный' },
		{ label: 'Модель', value: 'Air Presto' },
		{ label: 'Сезон', value: 'Лето' },
		{ label: 'Цвет', value: 'Разноцветный' },
	]
	// for thumbs
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [liked, setLiked] = useState(false)

	useEffect(() => {
		const likedProducts =
			JSON.parse(localStorage.getItem('likedProducts')) || []
		const isLiked = likedProducts.some(p => p.id === product?.id)
		setLiked(isLiked)
	}, [product])

	useEffect(() => {
		fetch(`https://dummyjson.com/products/${id}`)
			.then(res => res.json())
			.then(data => setProduct(data))
	}, [id])

	if (!product) return <p>Loading...</p>

	const addToCart = () => {
		if (!selectedSize) {
			alert('Пожалуйста, выберите размер')
			return
		}

		try {
			const cart = JSON.parse(localStorage.getItem('cart')) || []

			// Check if product with the same size exists
			const existingIndex = cart.findIndex(
				item => item.id === product.id && item.size === selectedSize,
			)

			if (existingIndex !== -1) {
				// Increase quantity
				cart[existingIndex].quantity += 1
			} else {
				cart.push({
					id: product.id,
					title: product.title,
					price: product.price,
					image: product.images[0],
					size: selectedSize,
					quantity: 1,
				})
			}

			localStorage.setItem('cart', JSON.stringify(cart))
			console.log('Cart updated', cart)
			alert('Товар добавлен в корзину')
		} catch (e) {
			console.error('Error saving to localStorage', e)
		}
	}

	const categoryMap = {
		clothes: 'mens-shirts',
		crosses: 'mens-shoes',
		accesories: 'womens-bags',
	}

	const currentCategory = categoryMap[category] || 'mens-shoes'

	const toggleLike = () => {
		const likedProducts =
			JSON.parse(localStorage.getItem('likedProducts')) || []

		if (!liked) {
			if (!likedProducts.find(p => p.id === product.id))
				likedProducts.push(product)
			setLiked(true)
		} else {
			const index = likedProducts.findIndex(p => p.id === product.id)
			if (index !== -1) likedProducts.splice(index, 1)
			setLiked(false)
		}

		localStorage.setItem('likedProducts', JSON.stringify(likedProducts))
	}

	return (
		<div className='container w-full mx-auto'>
			<div className='w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-25 2xl:px-30 py-6 sm:py-10 md:py-18 flex flex-col'>
				<div className='flex flex-col w-full gap-1.5 mb-6 md:mb-5'>
					<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-montserrat text-[#29292D] uppercase'>
						{product.title}
					</h1>
					<p className='text-[#B3C0D2] text-base sm:text-lg font-ruda'>
						Артикул 19666
					</p>
				</div>

				<div className='w-full flex flex-col md:flex-row gap-5 md:gap-6 lg:gap-8'>
					<div className='w-full md:max-w-[700px]'>
						{/* MAIN IMAGE */}
						<Swiper
							modules={[Navigation, Thumbs]}
							thumbs={{ swiper: thumbsSwiper }}
							className='rounded-xl sm:rounded-2xl'
						>
							{product.images?.map((img, i) => (
								<SwiperSlide key={i}>
									<div className='w-full h-[300px] sm:h-[350px] md:h-[440px] bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center'>
										<img
											src={img}
											alt=''
											className='w-full h-full object-contain rounded-xl sm:rounded-2xl'
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						{/* THUMBNAILS */}
						<Swiper
							modules={[Thumbs]}
							onSwiper={setThumbsSwiper}
							slidesPerView={3}
							breakpoints={{
								576: {
									slidesPerView: 4,
								},
							}}
							spaceBetween={8}
							className='mt-2 sm:mt-4'
						>
							{product.images?.map((img, i) => (
								<SwiperSlide key={i}>
									<div className='cursor-pointer border rounded-lg sm:rounded-xl overflow-hidden bg-gray-50'>
										<img
											src={img}
											alt=''
											className='w-full h-full object-cover'
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className='w-full flex flex-col items-center justify-between md:pt-15'>
						<h2 className='text-3xl sm:text-4xl md:text-5xl text-[#FF1818] font-semibold font-montserrat'>
							{product.price} ₽
						</h2>
						<div className='w-full bg-white p-6 sm:p-8 md:p-10 flex flex-col gap-6 sm:gap-8 rounded-2xl sm:rounded-3xl'>
							<p className='text-lg sm:text-xl md:text-2xl font-montserrat text-[#29292D] font-bold text-center'>
								ВЫБЕРИТЕ РАЗМЕР
							</p>
							<div className='w-full flex flex-wrap gap-3 sm:gap-4 md:gap-5.5 items-center justify-center'>
								{sizes.map((s, i) => (
									<button
										key={i}
										onClick={() => setSelectedSize(s)}
										className={`flex-1 min-w-[70px] h-14 sm:h-16 flex items-center justify-center rounded-[5px] font-ruda text-xs sm:text-sm flex-col transition duration-500 cursor-pointer
      ${
				selectedSize === s
					? 'bg-[#002C6A] text-white' // selected style
					: 'text-[#002C6A] hover:text-white hover:bg-[#002C6A]' // normal hover style
			}`}
									>
										<span
											key={s}
											className='text-base sm:text-lg md:text-xl font-bold'
										>
											{s}
										</span>
										<span className='text-xs'>{s - 15} cm</span>
									</button>
								))}
							</div>
						</div>
						<div className='w-full flex flex-col gap-3 sm:gap-4 justify-center items-center'>
							<button
								className='text-lg sm:text-xl md:text-2xl font-montserrat border-2 flex gap-2.5 items-center justify-center w-full md:w-max py-3 sm:py-4 md:py-5 px-6 sm:px-10 md:px-16 rounded-full border-[#FF1818] bg-[#FF1818] text-white hover:text-[#FF1818] hover:bg-white cursor-pointer transition'
								onClick={toggleLike}
							>
								{liked ? 'Не нравится' : 'Нравится'} <FiHeart />
							</button>
							<button
								className={`text-lg sm:text-xl md:text-2xl font-montserrat border-2 flex gap-2.5 items-center justify-center w-full md:w-max py-3 sm:py-4 md:py-5 px-6 sm:px-10 md:px-16 rounded-full border-[#002C6A] bg-[#002C6A] text-white 
    hover:text-[#002C6A] hover:bg-white 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#002C6A] disabled:hover:text-white transition`}
								onClick={addToCart}
								disabled={!selectedSize}
							>
								В корзину <FiShoppingCart />
							</button>
						</div>
					</div>
				</div>

				<div className='w-full mt-8 md:mt-10'>
					{/* Tabs */}
					<div className='flex flex-wrap gap-4 sm:gap-6 md:gap-10 text-sm sm:text-base md:text-xl font-semibold mb-6'>
						<NavLink
							to='description'
							className={({ isActive }) =>
								isActive ? 'text-red-500 border-b-2 border-red-500' : ''
							}
						>
							Описание
						</NavLink>
						<NavLink
							to='payment'
							className={({ isActive }) =>
								isActive ? 'text-red-500 border-b-2 border-red-500' : ''
							}
						>
							Оплата и доставка
						</NavLink>
						<NavLink
							to='exchange'
							className={({ isActive }) =>
								isActive ? 'text-red-500 border-b-2 border-red-500' : ''
							}
						>
							Обмен и возврат
						</NavLink>
						<NavLink
							to='warranty'
							className={({ isActive }) =>
								isActive ? 'text-red-500 border-b-2 border-red-500' : ''
							}
						>
							Гарантии
						</NavLink>
						<NavLink
							to='about'
							className={({ isActive }) =>
								isActive ? 'text-red-500 border-b-2 border-red-500' : ''
							}
						>
							О товаре
						</NavLink>
					</div>

					{/* Tab content */}
					<div className='w-full flex flex-col md:flex-row gap-6 md:gap-10'>
						<div className='w-full md:flex-1 text-base sm:text-lg font-ruda text-[#29292D]'>
							Кроссовки Nike Air Presto – обувь, которая создана с учетом
							максимальной вентиляции стопы и комфорта при ношении и занятиях
							спортом. Верхняя часть кроссовок изготовлена из материала, который
							обеспечивает идеальный микроклимат внутри обуви и комфорт при
							ношении. Подошва эластичная и в пяточной части имеет вставки «Air
							Sole» для лучшей амортизации. Глубокий рельеф протектора
							обеспечивает мягкость хода и удобство при ношении. Для фиксации
							стопы предусмотрена шнуровка через специальный каркас, который при
							затягивании образует жесткую и эластичную конструкцию. -
							Комфортный микроклимат - Легкий вес - Амортизация стопы
						</div>
						<div className='w-full md:w-[260px] md:grow text-[#0B2B6A] text-base sm:text-lg font-medium'>
							<div className='w-full grid grid-cols-2 md:grid-cols-2 gap-y-3 gap-x-6 md:gap-x-0'>
								{specs.map(item => (
									<div key={item.label} className='contents'>
										<span className='text-left md:text-right md:pr-6'>
											{item.label}
										</span>
										<span className='font-bold'>{item.value}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<ViewProductsSlider
				key={location.pathname}
				forPr={currentCategory}
				theme={'Вам может понравится'}
				nonUse={id}
			/>
		</div>
	)
}
