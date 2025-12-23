import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Страница не найдена</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 rounded-lg bg-[#002C6A] text-white hover:bg-[#001f4d] transition"
      >
        Вернуться на главную
      </button>
    </div>
  )
}
