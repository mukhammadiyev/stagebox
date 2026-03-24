import { useEffect, useState } from 'react'
import { BsFillBasketFill } from 'react-icons/bs'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { v4 as uuidv4 } from 'uuid'
function Basket() {
	const [cart, setCart] = useState([])

	// User info state
	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		middleName: '',
		email: '',
		phone: '',
		region: '',
		city: '',
		street: '',
		house: '',
	})

	const months = [
		'Январь',
		'Февраль',
		'Mарт',
		'Апрель',
		'Mая',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]

	const getData = new Date()
	const nowMonth = months[getData.getMonth()]

	// Load cart and user data from localStorage when component mounts
	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem('cart')) || []
		setCart(storedCart)

		const storedUser = JSON.parse(localStorage.getItem('userData')) || {}
		setUserData(prev => ({ ...prev, ...storedUser }))
	}, [])

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	// Save user data to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem('userData', JSON.stringify(userData))
	}, [userData])

	// Handle user input changes
	const handleInputChange = e => {
		const { name, value } = e.target
		setUserData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	// Handle order submission
	const handleConfirmOrder = () => {
		if (Object.values(userData).some(v => v.trim() === '')) return // extra safety

		const order = {
			cart,
			userData,
			total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
			date: new Date().toISOString(),
			orderedDay: new Date().getDate(),
			year: new Date().getFullYear().toString(),
			month: nowMonth,
			orderId: uuidv4(),
		}

		// Get existing orders
		const existingOrders = JSON.parse(localStorage.getItem('orders')) || []

		// Add new order
		localStorage.setItem('orders', JSON.stringify([...existingOrders, order]))

		// Clear cart only (keep userData saved for next time)
		setCart([])

		alert('Заказ успешно оформлен!')
	}

	const isFormIncomplete = Object.values(userData).some(
		value => value.trim() === '',
	)

	return (
		<div className='container w-full mx-auto'>
			{cart.length === 0 ? (
				<div className='flex flex-col items-center justify-center w-full py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-25 2xl:px-30'>
					<BsFillBasketFill className='text-gray-400 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48' />
					<p className='mt-4 sm:mt-6 text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-700 font-medium text-center'>
						Корзина пуста.
					</p>
					<p className='mt-2 text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 text-center'>
						Добавьте товары, чтобы начать покупки!
					</p>
				</div>
			) : (
				<div className='w-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-16 xl:px-25 2xl:px-30 py-8 sm:py-12 md:py-16 lg:py-20'>
					{/* Cart Items */}
					<div className='w-full flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
						{cart.map((p, idx) => (
							<div
								key={idx}
								className='w-full h-auto md:h-[310px] rounded-3xl md:rounded-[70px] bg-white flex flex-col md:flex-row items-stretch relative drop-shadow-2xl overflow-hidden'
							>
								<div
									className='absolute top-2 right-2 sm:top-3 sm:right-3 md:top-0 md:right-0 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-[#29292D] cursor-pointer z-10'
									onClick={() => setCart(cart.filter((_, i) => i !== idx))}
								>
									<IoCloseSharp className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white' />
								</div>
								<img
									src={p.image}
									alt={p.title}
									className='w-full h-[250px] sm:h-[280px] md:w-[45%] md:h-full object-cover md:rounded-l-[70px]'
								/>
								<div className='w-full md:w-[55%] py-4 sm:py-6 md:py-10 px-4 sm:px-6 md:pl-8 md:pr-20 flex flex-col justify-between'>
									<div>
										<h1 className='text-xl sm:text-2xl md:text-4xl font-semibold line-clamp-2'>
											{p.title}
										</h1>
										<p className='text-[#B3C0D2] text-sm sm:text-base md:text-lg mb-2 md:mb-3'>
											Артикул {p.id}
										</p>
										<div className='w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4'>
											<div className='text-sm sm:text-base md:text-lg flex items-center gap-2 sm:gap-3'>
												Размер:
												<p className='text-[#002C6A] font-semibold'>
													{p.size} EUR{' '}
													<span className='font-normal'>
														({p.size - 15} см)
													</span>
												</p>
											</div>
											<p className='text-[#FF1818] text-2xl sm:text-3xl md:text-4xl font-semibold'>
												{Math.round(p.price * p.quantity)} ₽
											</p>
										</div>
									</div>
									<div className='w-32 h-9 sm:w-40 sm:h-10 md:w-40 md:h-10 flex items-center justify-between rounded-full'>
										<button
											className='flex-1 h-full rounded-l-full bg-[#FF1818] flex items-center justify-center text-white text-sm sm:text-base'
											onClick={() =>
												setCart(
													cart.map((item, i) =>
														i === idx
															? {
																	...item,
																	quantity: Math.max(1, item.quantity - 1),
																}
															: item,
													),
												)
											}
										>
											<FaMinus className='text-xs sm:text-sm' />
										</button>
										<p className='text-lg sm:text-xl font-semibold flex-1 text-center'>
											{p.quantity}
										</p>
										<button
											className='flex-1 h-full rounded-r-full bg-[#FF1818] flex items-center justify-center text-white text-sm sm:text-base'
											onClick={() =>
												setCart(
													cart.map((item, i) =>
														i === idx
															? { ...item, quantity: item.quantity + 1 }
															: item,
													),
												)
											}
										>
											<FaPlus className='text-xs sm:text-sm' />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Checkout Form */}
					<div className='w-full mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl flex flex-col gap-6 sm:gap-8'>
						<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center'>
							<input
								type='text'
								placeholder='Введите промокод'
								className='flex-1 border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-3 pl-0 text-sm sm:text-base'
							/>
							<button className='bg-[#FF1818] border-2 border-[#FF1818] hover:bg-transparent hover:text-[#FF1818] text-white px-6 py-2 rounded-full cursor-pointer text-sm sm:text-base whitespace-nowrap'>
								Применить
							</button>
						</div>

						<div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-6 sm:my-8 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4'>
							Сумма к оплате:
							<span className='text-blue-900'>
								{Math.round(
									cart.reduce(
										(sum, item) => sum + item.price * item.quantity,
										0,
									),
								)}{' '}
								₽
							</span>
						</div>

						<div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
							<input
								type='text'
								name='lastName'
								placeholder='Фамилия'
								value={userData.lastName}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-2 pl-0 text-sm sm:text-base'
							/>
							<input
								type='text'
								name='region'
								placeholder='область/регион'
								value={userData.region}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-2 pl-0 text-sm sm:text-base'
							/>
							<input
								type='text'
								name='firstName'
								placeholder='Имя'
								value={userData.firstName}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-2 pl-0 text-sm sm:text-base'
							/>
							<input
								type='text'
								name='city'
								placeholder='Город'
								value={userData.city}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-2 pl-0 text-sm sm:text-base'
							/>
							<input
								type='text'
								name='middleName'
								placeholder='Отчество'
								value={userData.middleName}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-2 pl-0 text-sm sm:text-base'
							/>
							<input
								type='text'
								name='street'
								placeholder='Улица'
								value={userData.street}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-2 pl-0 text-sm sm:text-base'
							/>
							<input
								type='email'
								name='email'
								placeholder='Email'
								value={userData.email}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-2 pl-0 text-sm sm:text-base'
							/>
							<input
								type='text'
								name='house'
								placeholder='дом'
								value={userData.house}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-2 pl-0 text-sm sm:text-base'
							/>
							<input
								type='tel'
								name='phone'
								placeholder='Телефон'
								value={userData.phone}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-2 pb-2 pr-2 pl-0 text-sm sm:text-base'
							/>
						</div>

						<button
							className={`bg-[#FF1818] text-lg sm:text-xl md:text-2xl text-white px-8 sm:px-10 md:px-13 py-3 sm:py-5 md:py-7 rounded-full transition w-full sm:w-max ${
								isFormIncomplete
									? 'opacity-50 cursor-not-allowed'
									: 'hover:text-[#FF1818] hover:bg-transparent border-2 border-[#FF1818] cursor-pointer'
							}`}
							onClick={handleConfirmOrder}
							disabled={isFormIncomplete}
						>
							Подтвердить заказ
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Basket
