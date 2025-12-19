import { useEffect, useState } from 'react'

const API_URL = `https://dummyjson.com/products/category/` // fetch enough products

export default function useFilter({ currentCategory, filters }) {
	const [allProducts, setAllProducts] = useState([]) // all products fetched
	const [products, setProducts] = useState([]) // filtered products
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	// Fetch all products once
	useEffect(() => {
		const controller = new AbortController()
		async function fetchProducts() {
			try {
				setLoading(true)
				const res = await fetch(
					`${API_URL}${currentCategory}?offset=0&limit=40`,
					{
						signal: controller.signal,
					}
				)
				if (!res.ok) throw new Error('Failed to fetch products')
				const data = await res.json()
				setAllProducts(data.products)
				setProducts(data.products) // initially show all
			} catch (err) {
				if (err.name !== 'AbortError') setError(err.message)
			} finally {
				setLoading(false)
				console.log(`${API_URL}${currentCategory}?offset=0&limit=40`)
			}
		}
		fetchProducts()
		return () => controller.abort()
	}, [])

	// Apply filters whenever they change
	useEffect(() => {
		if (!allProducts.length) return
		let filtered = [...allProducts]

		if (filters.size) filtered = filtered.filter(p => p.size === filters.size)
		if (filters.season)
			filtered = filtered.filter(p => p.season === filters.season)
		if (filters.price) filtered = filtered.filter(p => p.price <= filters.price)
		if (filters.color)
			filtered = filtered.filter(
				p =>
					p.title.toLowerCase().includes(filters.color.toLowerCase()) ||
					p.color === filters.color
			)
		if (filters.category)
			filtered = filtered.filter(p => p.category === filters.category)
		if (filters.brand)
			filtered = filtered.filter(p => p.brand === filters.brand)

		setProducts(filtered)
	}, [filters, allProducts])

	return { products, loading, error }
}
