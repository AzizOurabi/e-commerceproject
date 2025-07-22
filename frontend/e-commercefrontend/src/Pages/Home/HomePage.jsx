import React from 'react'
import Slider from '../../Components/Home/Slider'
import HomeCategoty from '../../Components/Home/HomeCategoty'
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import DiscountSection from '../../Components/Home/DiscountSection';
import BrandFeatured from '../../Components/Brand/BrandFeatured';

const HomePage = () => {
  return (
    <div className='font' style={{minHeight:'670px'}}>
      <Slider/>
      <HomeCategoty></HomeCategoty>
      <CardProductsContainer title="الاكثر مبيعا" btntitle="المزيد"/> 
      <DiscountSection></DiscountSection>
      <CardProductsContainer title="الاكثر تقييما" btntitle="المزيد"/> 
      <BrandFeatured title="اشهر المركات" btntitle={null}/>
      
    </div>
  )
}

export default HomePage
