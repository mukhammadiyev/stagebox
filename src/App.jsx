import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/index.jsx'
import Footer from './components/footer/index.jsx'
function App() {
	return (
		<div className="min-h-screen mx-auto flex flex-col">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
	)
}

export default App
