import React from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Art from '../../../images/art/EstablishmentDashArt.png'

import Menu from './Menu'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import { useAuth } from '../../../AuthContext'

const Dashboard = () => {

    const { userDetails } = useAuth()

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Menu />


            <Container className='mt-3'>
                <Row>
                    <Col>
                        {userDetails && <div className='mt-3'>
                            <h1>Hi {userDetails.companyName}<br />
                                Welcome to WeConnect</h1>
                        </div>}
                    </Col>
                    <Col className='d-none d-md-block d-lg-block d-xl-block' >
                        <Image src={Art} fluid />
                    </Col>
                </Row>
            </Container >
        </div >
    )
}

export default Dashboard
