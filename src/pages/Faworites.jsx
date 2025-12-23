import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard' // your existing card

export default function Favorites() {
	const [likedProducts, setLikedProducts] = useState([])
	const navigate = useNavigate()

	// Load liked products from localStorage
	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('likedProducts')) || []
		setLikedProducts(stored)
	}, [])

	if (likedProducts.length === 0) {
		return (
			<div className='container mx-auto w-full px-8 lg:px-16 xl:px-25 2xl:px-30'>
				<h1 className='text-3xl font-semibold'>
					У вас пока нет избранных товаров
				</h1>
				<button
					onClick={() => navigate('/')}
					className='mt-5 px-6 py-3 rounded-lg bg-[#002C6A] text-white'
				>
					Вернуться на главную
				</button>
			</div>
		)
	}

	return (
		<div className='w-full container mx-auto px-8 lg:px-16 xl:px-25 2xl:px-30 pt-20 pb-40'>
			<h1 className='text-4xl font-semibold mb-8'>Избранное</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{likedProducts.map(product => (
					<ProductCard key={product.id} product={product} loading={false} />
				))}
			</div>
		</div>
	)
}
