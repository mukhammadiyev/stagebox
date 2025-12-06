import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "../App.jsx";
import Home from "../pages/home.jsx";
import Filter from '../pages/Filter.jsx'
import Reviews from '../pages/Reviews.jsx'
import Blog from '../pages/Blog.jsx'
import Basket from '../pages/Basket.jsx'
import Profile from '../pages/Profile.jsx'
import Faworites from '../pages/Faworites.jsx'
import Search from '../pages/Search.jsx'

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        {/* Root home page */}
        <Route index element={<Home />} />
        {/* Dynamic category route */}
        <Route path=":category" element={<Home />} />
        <Route path=':category/filter' element={<Filter/>} />
        <Route path='/reviews' element={<Reviews/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/basket' element={<Basket/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/faworites' element={<Faworites/>} />
        <Route path='/search' element={<Search/>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
