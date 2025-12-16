import { useEffect, useState } from 'react'
const API_URL = `https://dummyjson.com/products/category/`


export default function useProducts({forPr, limit = 40}) {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const controller = new AbortController()

		async function fetchProducts() {
			try {
				setLoading(true)
				const res = await fetch(`${API_URL}${forPr}?offset=0&limit=${limit}`, {
					signal: controller.signal,
				})

				if (!res.ok) {
					throw new Error('Failed to fetch products')
				}

				const data = await res.json()
				setProducts(data)
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err.message)
				}
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()

		return () => controller.abort()
	}, [limit])

	return { products, loading, error }
}
