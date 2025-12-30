import { useState, useEffect, lazy } from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from "react-router-dom"
import App from "../App.jsx"

// Lazy pages
const OrderList = lazy(() => import("../components/OrderList.jsx"))
const Profile = lazy(() => import("../components/Profile.jsx"))
const Basket = lazy(() => import("../pages/Basket.jsx"))
const Blog = lazy(() => import("../pages/Blog.jsx"))
const Favorites = lazy(() => import("../pages/Faworites.jsx"))
const Filter = lazy(() => import("../pages/Filter.jsx"))
const Reviews = lazy(() => import("../pages/Reviews.jsx"))
const Search = lazy(() => import("../pages/Search.jsx"))
const UserPersonal = lazy(() => import("../pages/UserPersonal.jsx"))
const Home = lazy(() => import("../pages/home.jsx"))
const ProductView = lazy(() => import("../pages/productView.jsx"))

const Router = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/crosses" replace />} />
        <Route path=":category" element={<Home />} />
        <Route path=":category/:id" element={<ProductView />}>
          <Route index path="description" element={<div>Описание продукта</div>} />
          <Route path="payment" element={<div>Условия оплаты и доставки</div>} />
          <Route path="exchange" element={<div>Обмен и возврат</div>} />
          <Route path="warranty" element={<div>Гарантии магазина</div>} />
          <Route path="about" element={<div>О товаре: категория, модель, сезон, цвет</div>} />
        </Route>
        <Route path=":category/filter" element={<Filter />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/personal" element={<UserPersonal />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<OrderList />} />
        </Route>
        <Route path="/faworites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default Router
