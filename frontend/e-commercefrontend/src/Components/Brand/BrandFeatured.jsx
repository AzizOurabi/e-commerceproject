import React from 'react'
import { Container, Row } from 'react-bootstrap'
import SubTitle from '../Utility/SubTitle';
import BrandCard from "../Brand/BrandCard";
import brand1 from "../../images/brand1.png";
import brand2 from "../../images/brand2.png";
import brand3 from "../../images/brand3.png";
const BrandFeatured = ({title,btntitle}) => {
  return (
    <div>
        <Container>
            <SubTitle title="اشهر الماركات" btntitle="المزيد" pathTexte="/allbrand" />
            <Row className='my-2 d-flex justify-content-between'>
                <BrandCard img={brand1} />
                <BrandCard img={brand2} />
                <BrandCard img={brand3} />
                <BrandCard img={brand1} /> 
                <BrandCard img={brand2} /> 
                <BrandCard img={brand3} /> 
            </Row>
            
        </Container>
    </div>
  )
}

export default BrandFeatured
