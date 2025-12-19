import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import FiltersSidebar from '../components/FiltersSidebar'
import ProductCard from '../components/ProductCard'
import useFilter from '../hooks/useFilter'
export default function Filter() {
	const { category } = useParams()
	const validCategories = ['clothes', 'crosses', 'accesories']

	if (!validCategories.includes(category)) {
		return <Navigate to={`/${category}`} replace />
	}

	const categoryMap = {
		clothes: 'mens-shirts',
		crosses: 'mens-shoes',
		accesories: 'womens-bags',
	}

	const currentCategory = categoryMap[category] || 'mens-shoes'

	// Lifted filters state
	const [filters, setFilters] = useState({
		size: null,
		season: null,
		price: 5000,
		color: null,
		category: null,
		brand: null,
	})

	// Pass filters to the hook
	const { products, loading, error } = useFilter({
		currentCategory: currentCategory,
		filters,
		limit: 40,
	})

	return (
		<div className='container w-full mx-auto flex gap-6 py-10'>
			<div className='w-full px-8 lg:px-16 xl:px-24 py-12 flex gap-20'>
				<FiltersSidebar filters={filters} setFilters={setFilters} />

				<div className='flex-1'>
					{loading && <p>Loading products...</p>}
					{error && <p>Error: {error}</p>}
					{!loading && !error && products.length === 0 && (
						<p>No products found</p>
					)}
					<div className='grid grid-cols-3 gap-6'>
						{products.map(p => (
							<ProductCard product={p} loading={p.loading} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
