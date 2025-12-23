import { useEffect, useState } from 'react'
import { BsFillBasketFill } from 'react-icons/bs'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'

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
		value => value.trim() === ''
	)

	return (
		<div className='container w-full mx-auto'>
			{cart.length === 0 ? (
				<div className='flex flex-col items-center justify-center w-full py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40'>
					<BsFillBasketFill className='text-gray-400 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56' />
					<p className='mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium text-center'>
						Корзина пуста.
					</p>
					<p className='mt-2 text-sm sm:text-base md:text-lg text-gray-500 text-center'>
						Добавьте товары, чтобы начать покупки!
					</p>
				</div>
			) : (
				<div className='w-full flex flex-col px-8 lg:px-16 xl:px-25 2xl:px-30 py-20 '>
					{/* Cart Items */}
					<div className='w-full flex flex-col gap-10'>
						{cart.map((p, idx) => (
							<div
								key={idx}
								className='w-full h-[310px] rounded-[70px] bg-white flex items-center relative drop-shadow-2xl'
							>
								<div
									className='absolute top-0 right-0 w-11 h-11 rounded-full flex items-center justify-center bg-[#29292D] cursor-pointer'
									onClick={() => setCart(cart.filter((_, i) => i !== idx))}
								>
									<IoCloseSharp className='w-7 h-7 text-white' />
								</div>
								<img
									src={p.image}
									alt={p.title}
									className='w-[45%] h-full object-cover rounded-l-[70px]'
								/>
								<div className='w-[55%] py-10 pl-8 pr-20 flex flex-col'>
									<h1 className='text-4xl font-semibold'>{p.title}</h1>
									<p className='text-[#B3C0D2] text-lg mb-3'>Артикул {p.id}</p>
									<div className='w-full flex items-center justify-between'>
										<div className='text-lg flex items-center gap-5 mb-4'>
											Размер:
											<p className='text-[#002C6A] font-semibold'>
												{p.size} EUR{' '}
												<span className='font-normal'>({p.size - 15} см)</span>
											</p>
										</div>
										<p className='text-[#FF1818] text-4xl font-semibold'>
											{Math.round(p.price * p.quantity)} ₽
										</p>
									</div>
									<div className='w-40 h-10 flex items-center justify-between rounded-full'>
										<button
											className='w-11 h-full rounded-l-full bg-[#FF1818] flex items-center justify-center text-white'
											onClick={() =>
												setCart(
													cart.map((item, i) =>
														i === idx
															? {
																	...item,
																	quantity: Math.max(1, item.quantity - 1),
															  }
															: item
													)
												)
											}
										>
											<FaMinus />
										</button>
										<p className='text-2xl font-semibold'>{p.quantity}</p>
										<button
											className='w-11 h-full rounded-r-full bg-[#FF1818] flex items-center justify-center text-white'
											onClick={() =>
												setCart(
													cart.map((item, i) =>
														i === idx
															? { ...item, quantity: item.quantity + 1 }
															: item
													)
												)
											}
										>
											<FaPlus />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Checkout Form */}
					<div className='w-full mt-16 p-8 rounded-2xl flex flex-col gap-8'>
						<div className='flex gap-4 items-center'>
							<input
								type='text'
								placeholder='Введите промокод'
								className='w-md border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
							<button className='bg-[#FF1818] border-2 border-[#FF1818] hover:bg-transparent hover:text-[#FF1818] text-white px-6 py-2 rounded-full cursor-pointer'>
								Применить
							</button>
						</div>

						<div className='text-5xl font-semibold my-8'>
							Сумма к оплате:
							<span className='text-blue-900 ml-10'>
								{Math.round(
									cart.reduce(
										(sum, item) => sum + item.price * item.quantity,
										0
									)
								)}{' '}
								₽
							</span>
						</div>

						<div className='w-full grid grid-cols-2 gap-x-14 gap-y-8'>
							<input
								type='text'
								name='lastName'
								placeholder='Фамилия'
								value={userData.lastName}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
							<input
								type='text'
								name='region'
								placeholder='область/регион'
								value={userData.region}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
							<input
								type='text'
								name='firstName'
								placeholder='Имя'
								value={userData.firstName}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
							<input
								type='text'
								name='city'
								placeholder='Город'
								value={userData.city}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
							<input
								type='text'
								name='middleName'
								placeholder='Отчество'
								value={userData.middleName}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
							<input
								type='text'
								name='street'
								placeholder='Улица'
								value={userData.street}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
							<input
								type='email'
								name='email'
								placeholder='Email'
								value={userData.email}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
							<input
								type='text'
								name='house'
								placeholder='дом'
								value={userData.house}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
							<input
								type='tel'
								name='phone'
								placeholder='Телефон'
								value={userData.phone}
								onChange={handleInputChange}
								className='border-b-2 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0'
							/>
						</div>

						<button
							className={`bg-[#FF1818] text-2xl text-white px-13 py-7 rounded-full transition w-max ${
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
