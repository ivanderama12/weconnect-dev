import React from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import manageUserIcon from '../../../images/icons/PersonButton.png'
import manageServiceIcon from '../../../images/icons/ManageServicesButton.png'
import manageAgreementIcon from '../../../images/icons/ManageAgreementsButton.png'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import { useAuth } from '../../../AuthContext'

const Dashboard = () => {

    const { currentUser } = useAuth()

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Container>
                <div className='mt-3'>
                    <h1>Hi {currentUser.displayName}.<br />
                        Welcome to WeConnect</h1>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <Card className='p-3 admin-card'>
                        <div className='d-flex justify-content-center'>
                            <Button as={Link} to='account' variant='light' className='menu-button mx-3'>
                                <Image className='button-art' src={manageUserIcon}></Image>
                                Account
                            </Button>

                            <Button as={Link} to='services' variant='light' className='menu-button mx-3'>
                                <Image className='button-art' src={manageServiceIcon}></Image>
                                Services
                            </Button>

                            <Button as={Link} to='agreements' variant='light' className='menu-button mx-3'>
                                <Image className='button-art' src={manageAgreementIcon}></Image>
                                Agreements
                            </Button>
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    )
}

export default Dashboard
