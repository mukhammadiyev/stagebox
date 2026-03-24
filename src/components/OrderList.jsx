import { useEffect, useState } from 'react'

function OrderList() {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		const storedOrders = JSON.parse(localStorage.getItem('orders')) || []
		setOrders(storedOrders)
	}, [])

	return (
		<div className='p-4 sm:p-6 md:p-8 lg:p-8 2xl:p-8 flex-1'>
			{/* Desktop Table View */}
			<div className='overflow-x-auto hidden lg:block'>
				<table className='w-full text-left border-collapse'>
					<thead>
						<tr className='bg-gray-100 text-blue-900 font-semibold text-sm md:text-base'>
							<th className='px-3 sm:px-4 py-2'>Номер заказа</th>
							<th className='px-3 sm:px-4 py-2'>Дата</th>
							<th className='px-3 sm:px-4 text-center py-2'>Предметов</th>
							<th className='px-3 sm:px-4 text-center py-2'>Сумма</th>
							<th className='px-3 sm:px-4 text-center py-2'>Доставлено</th>
							<th className='px-3 sm:px-4 text-center py-2'>Оплачено</th>
						</tr>
					</thead>
					<tbody>
						{orders.map(order => {
							const totalItems = order.cart.length
							const totalPrice = order.cart
								.reduce((sum, item) => sum + item.price, 0)
								.toFixed(0)

							return (
								<tr
									key={order.orderId}
									className='w-full border-b hover:bg-gray-50 transition text-sm md:text-base'
								>
									<td className='px-3 sm:px-4 py-3 font-medium text-blue-900 cursor-pointer no-underline truncate'>
										{order.orderId.slice(0, 20)}
									</td>
									<td className='px-3 sm:px-4 py-3 flex items-center lowercase gap-1 sm:gap-2'>
										{order.orderedDay}
										<span className='mx-1'>{order.month}</span>
										{order.year}
									</td>
									<td className='px-3 sm:px-4 py-3 text-center'>
										{totalItems}
									</td>
									<td className='px-3 sm:px-4 text-center py-3'>
										{totalPrice} ₽
									</td>
									<td className='px-3 sm:px-4 flex justify-center py-3'>
										<div
											className={`w-6 h-6 flex items-center justify-center rounded text-sm ${
												order.delivered
													? 'bg-red-600 text-white'
													: 'bg-gray-200'
											}`}
										>
											{order.delivered ? '✓' : ''}
										</div>
									</td>
									<td className='px-3 sm:px-4 py-3'>
										<div className='flex justify-center'>
											<div className='w-6 h-6 flex items-center justify-center rounded bg-red-600 text-white text-sm'>
												✔️
											</div>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			{/* Mobile Card View */}
			<div className='lg:hidden flex flex-col gap-4 sm:gap-5 md:gap-6'>
				<h1 className='text-xl sm:text-2xl md:text-2xl text-[#002C6A] font-montserrat font-semibold'>
					Заказы
				</h1>
				{orders.length === 0 ? (
					<div className='flex items-center justify-center py-12 text-gray-500 text-center'>
						<p className='text-base sm:text-lg'>У вас пока нет заказов</p>
					</div>
				) : (
					<div className='w-full flex flex-col gap-4 sm:gap-5 md:gap-6'>
						{orders.map(order => {
							const totalItems = order.cart.length
							const totalPrice = order.cart
								.reduce((sum, item) => sum + item.price, 0)
								.toFixed(0)

							return (
								<div
									key={order.orderId}
									className='w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 drop-shadow-md hover:drop-shadow-lg transition'
								>
									{/* Order ID and Date */}
									<div className='flex flex-col gap-2 mb-4 sm:mb-5'>
										<div className='flex justify-between items-start gap-2'>
											<div className='flex-1 min-w-0'>
												<p className='text-xs sm:text-sm text-gray-500 font-medium mb-1'>
													Номер заказа
												</p>
												<p className='text-sm sm:text-base md:text-lg font-semibold text-blue-900 truncate'>
													{order.orderId.slice(0, 20)}
												</p>
											</div>
											<div className='text-right'>
												<p className='text-xs sm:text-sm text-gray-500 font-medium mb-1'>
													Дата
												</p>
												<p className='text-sm sm:text-base font-semibold text-gray-800'>
													{order.orderedDay} {order.month} {order.year}
												</p>
											</div>
										</div>
									</div>

									{/* Items Count and Total */}
									<div className='grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 py-4 sm:py-5 border-y border-gray-200'>
										<div>
											<p className='text-xs sm:text-sm text-gray-500 font-medium mb-1'>
												Предметов
											</p>
											<p className='text-lg sm:text-xl font-semibold text-gray-800'>
												{totalItems}
											</p>
										</div>
										<div>
											<p className='text-xs sm:text-sm text-gray-500 font-medium mb-1'>
												Сумма
											</p>
											<p className='text-lg sm:text-xl font-semibold text-red-600'>
												{totalPrice} ₽
											</p>
										</div>
									</div>

									{/* Status */}
									<div className='flex gap-4 sm:gap-6'>
										<div className='flex items-center gap-2'>
											<p className='text-xs sm:text-sm text-gray-500 font-medium'>
												Доставлено:
											</p>
											<div
												className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded text-sm sm:text-base ${
													order.delivered
														? 'bg-red-600 text-white'
														: 'bg-gray-200 text-gray-400'
												}`}
											>
												{order.delivered ? '✓' : '—'}
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<p className='text-xs sm:text-sm text-gray-500 font-medium'>
												Оплачено:
											</p>
											<div className='w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded bg-red-600 text-white text-sm sm:text-base'>
												✔
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default OrderList
