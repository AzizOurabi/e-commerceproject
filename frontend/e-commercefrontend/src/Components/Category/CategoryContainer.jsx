import React from 'react'
import { Container, Row } from 'react-bootstrap'
import SubTitle from '../Utility/SubTitle'
import CategotyCard from '../Category/CategotyCard'
import clothe from '../../images/clothe.png'
import cat2 from '../../images/cat2.png'
import labtop from '../../images/labtop.png'
import sale from '../../images/sale.png'
import pic from '../../images/pic.png'
const CategoryContainer = () => {
  return (
        <Container>
            <SubTitle title="التصنيفات" btntitle={null} pathTexte={null} />
            <Row className='my-2 d-flex justify-content-between'>
            <CategotyCard title='اجهزة منزلية' img={clothe} background='#F4DBA4'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={cat2} background='#F4DBA4'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={labtop} background='#0034FF'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={sale} background='#FFDBA4'></CategotyCard> 
            <CategotyCard title='اجهزة منزلية' img={clothe} background='#FFDBA4'></CategotyCard> 
            <CategotyCard title='اجهزة منزلية' img={pic} background='#F4DBA4'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={labtop} background='#F4DBA4'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={sale} background='#F4DBAE'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={clothe} background='#F4DCA4'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={clothe} background='#F4DBA4'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={cat2} background='#F4DBA4'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={labtop} background='#0034FF'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={sale} background='#FFDBA4'></CategotyCard> 
            <CategotyCard title='اجهزة منزلية' img={clothe} background='#FFDBA4'></CategotyCard> 
            <CategotyCard title='اجهزة منزلية' img={pic} background='#F4DBA4'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={labtop} background='#F4DBA4'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={sale} background='#F4DBAE'></CategotyCard>
            <CategotyCard title='اجهزة منزلية' img={clothe} background='#F4DCA4'></CategotyCard>

            </Row>
            
        </Container>
  )
}

export default CategoryContainer
