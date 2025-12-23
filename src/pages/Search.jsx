import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"

export default function Search() {
  const [params] = useSearchParams()
  const query = (params.get("query") || "").toLowerCase()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetch("https://dummyjson.com/products")
        const data = await res.json()
        setProducts(data.products || [])
      } catch {
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  )

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>{error}</h2>

  return (
    <div className="w-full container mx-auto px-8 lg:px-16 xl:px-25 2xl:px-30 pt-20 pb-40">
      <h1 className="text-4xl font-semibold mb-8">
        Поиск: <span className="text-red-600">{query}</span>
      </h1>

      {filtered.length === 0 && (
        <h2 className="text-xl">Ничего не найдено</h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} loading={false} />
        ))}
      </div>
    </div>
  )
}
