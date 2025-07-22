import React from 'react'
import HomePage from './Pages/Home/HomePage'
import NavBarLogin from '../src/Components/Utility/NavBarLogin'
import Footer from '../src/Components/Utility/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import AllCategoryPage from "./Pages/Category/AllCategoryPage";
import AllProductsPage from './Pages/Products/AllProductsPage';
import AllBrandPage from './Pages/Brand/AllBrandPage';
const App = () => {
  return (
    <div className='font'>
    <NavBarLogin/>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} /> 
        <Route index path='/login' element={<LoginPage />} /> 
        <Route index path='/register' element={<RegisterPage />} /> 
        <Route index path='/allcategory' element={<AllCategoryPage />} /> 
        <Route index path='/allproducts' element={<AllProductsPage />} />
        <Route index path='/allbrand' element={<AllBrandPage />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}

export default App
