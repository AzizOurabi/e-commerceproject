import React from 'react'
import { Container, Row } from 'react-bootstrap'
import SubTitle from '../Utility/SubTitle';
import ProductCard from "../Products/ProductCard";
const CardProductsContainer = ({title,btntitle}) => {
  return (
    <div>
        <Container>
            <SubTitle title={title} btntitle={btntitle} pathTexte="allproducts" />
            <Row className='my-2 d-flex justify-content-between'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /> 
            </Row>
            
        </Container>
    </div>
)
}

export default CardProductsContainer
