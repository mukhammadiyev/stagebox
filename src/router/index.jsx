import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Navigate
} from 'react-router-dom'

import App from '../App.jsx'
import OrderList from '../components/OrderList.jsx'
import Profile from '../components/Profile.jsx'
import Basket from '../pages/Basket.jsx'
import Blog from '../pages/Blog.jsx'
import Faworites from '../pages/Faworites.jsx'
import Filter from '../pages/Filter.jsx'
import Reviews from '../pages/Reviews.jsx'
import Search from '../pages/Search.jsx'
import UserPersonal from '../pages/UserPersonal.jsx'
import Home from '../pages/home.jsx'
import ProductView from '../pages/productView.jsx'
const Router = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<App />}>
				{/* Root home page */}
				<Route index element={<Navigate to="/crosses" replace />} />
				{/* Dynamic category route */}
				<Route path=':category' element={<Home />} />
				<Route path=':category/:id' element={<ProductView />}>
					<Route
						index
						path='description'
						element={<div>Описание продукта</div>}
					/>
					<Route
						path='payment'
						element={<div>Условия оплаты и доставки</div>}
					/>
					<Route path='exchange' element={<div>Обмен и возврат</div>} />
					<Route path='warranty' element={<div>Гарантии магазина</div>} />
					<Route
						path='about'
						element={<div>О товаре: категория, модель, сезон, цвет</div>}
					/>
				</Route>
				<Route path=':category/filter' element={<Filter />} />
				<Route path='/reviews' element={<Reviews />} />
				<Route path='/blog' element={<Blog />} />
				<Route path='/basket' element={<Basket />} />
				<Route path='/personal' element={<UserPersonal />}>
					<Route index element={<Profile />} /> // default page
					<Route path='profile' element={<Profile />} />
					<Route path='orders' element={<OrderList />} />
				</Route>
				<Route path='/faworites' element={<Faworites />} />
				<Route path='/search' element={<Search />} />
			</Route>
		)
	)

	return <RouterProvider router={router} />
}

export default Router
