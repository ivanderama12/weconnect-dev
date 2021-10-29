import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'

import SearchBar from '../../SearchBar'
import Navbar from '../../navbar/Navbar'
import Art from '../../../images/art/PremiumArt.svg'
import check from '../../../images/icons/CheckBoxRed.png'

const Premium = () => {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <Container className='mt-3'>
                <Row>
                    <Col>
                        <h1 className='mb-1'>Premium Account</h1>
                        <div className='mb-2 '>What you will get:</div>
                        <Container className='ms-3'>
                            <div className='mb-2'> <Image className='check-art me-4' src={check} />All benefits of branded Ad, plus:</div>
                            <div className='mb-2'> <Image className='check-art me-4' src={check} />Priority listing on Mobile and Web search results</div>
                            <div className='mb-2'> <Image className='check-art me-4' src={check} />Faster access to more establishments</div>
                            <div className='mb-2'> <Image className='check-art me-4' src={check} />Branding features to lift your company brand</div>
                        </Container>
                    </Col>
                    <Col className='d-none d-md-block d-lg-block d-xl-block' >
                        <Image src={Art} fluid />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Premium
