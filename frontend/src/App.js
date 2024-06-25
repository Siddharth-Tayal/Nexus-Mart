import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WebFont from 'webfontloader';
import store from "./store"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import { loadStripe } from '@stripe/stripe-js';

import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Footer/Footer.js"
import Home from "./components/Home/Home.js"
import Products from "./components/Product/Products.js"
import ProductDetails from "./components/Product/ProductDetails"
import NoProduct from "./components/layout/NoProduct"
import Search from './components/Product/Search';

import LoginSignup from './components/User/LoginSignup';
import Profile from './components/User/Profile.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import UserOptions from "./components/layout/Header/UserOption.js"

import Cart from "./components/Cart/Cart.js"
import Shipping from "./components/Order/Shipping.js"
import ConfirmOrder from './components/Order/ConfirmOrder.js';
import Payment from './components/Order/Payment.js';
import ProtectedRoute from './components/Route/ProtectedRoute';
import ElementsLayout from './components/Route/ElementLayout';
import OrderSuccess from './components/Order/OrderSuccess';
import MyOrders from './components/Cart/MyOrders.js';
import OrderDetails from './components/Cart/OrderDetails.js';

import DashBoard from "./components/Admin/DashBoard/DashBoard.js"
import ProductList from "./components/Admin/Products/ProductList.js"
import CreateProduct from './components/Admin/Products/CreateProduct';
import UpdateProduct from './components/Admin/Products/UpdateProduct.js';
import AdminOrders from './components/Admin/Orders/AdminOrders';
import AdminUpdateOrder from './components/Admin/Orders/UpdateOrder.js';
import Users from './components/Admin/Users/Users';
import UpdateUserRole from './components/Admin/Users/UpdateUserRole';
import Reviews from './components/Admin/Reviews/Reviews';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import NotFound from './components/Not Found/NotFound';
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    const dataActual = data.stripeApiKey;
    setStripeApiKey(dataActual)
  }
  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey();
  }, [])


  return <Router>
    <Header />
    {
      isAuthenticated && <UserOptions user={user} />
    }
    <Routes>

      <Route extact path='/' Component={Home} />
      <Route extact path='/about' Component={About} />
      <Route extact path='/contact' Component={Contact} />

      {/* Product Routes */}
      <Route extact path='/product/:id' Component={ProductDetails} />
      <Route extact path='/noproduct/:id' Component={NoProduct} />
      <Route extact path='/products' Component={Products} />
      <Route path='/products/:keyword' Component={Products} />
      <Route extact path='/search' Component={Search} />

      {/* User Routes */}
      <Route exact path='/account' element={<ProtectedRoute component={Profile} />} />
      <Route exact path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />
      <Route exact path='/password/update' element={<ProtectedRoute component={UpdatePassword} />} />
      <Route exact path='/cart' element={<ProtectedRoute component={Cart} />} />
      <Route exact path='/login/shipping' element={<ProtectedRoute component={Shipping} />} />
      <Route exact path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder} />} />
      <Route exact path='/success' element={<ProtectedRoute component={OrderSuccess} />} />
      <Route exact path='/orders/me' element={<ProtectedRoute component={MyOrders} />} />
      <Route exact path='/order/:id' element={<ProtectedRoute component={OrderDetails} />} />

      {
        stripeApiKey && (
          <Route element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />}>
            <Route path="/payment" element={<Payment />} />
          </Route>
        )
      }

      {/* Authentication Routes */}
      <Route exact path='/password/forgot' element={<ForgotPassword />} />
      <Route exact path='/password/reset/:token' element={<ResetPassword />} />
      <Route extact path='/login' Component={LoginSignup} />

      {/* Admin Routes */}
      <Route exact path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} component={DashBoard} />} />
      <Route exact path='/admin/products' element={<ProtectedRoute isAdmin={true} component={ProductList} />} />
      <Route exact path='/admin/product' element={<ProtectedRoute isAdmin={true} component={CreateProduct} />} />
      <Route exact path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />} />
      <Route exact path='/admin/orders/' element={<ProtectedRoute isAdmin={true} component={AdminOrders} />} />
      <Route exact path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} component={AdminUpdateOrder} />} />
      <Route exact path='/admin/users' element={<ProtectedRoute isAdmin={true} component={Users} />} />
      <Route exact path='/admin/user/:id' element={<ProtectedRoute isAdmin={true} component={UpdateUserRole} />} />
      <Route exact path='/admin/reviews' element={<ProtectedRoute isAdmin={true} component={Reviews} />} />

      {/*No page found  */}

      <Route exact path='*' element={<ProtectedRoute isAdmin={true} component={NotFound} />} />
    </Routes>
    <Footer />
  </Router>
}

export default App;
