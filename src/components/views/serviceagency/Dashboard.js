import React from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import manageUserIcon from '../../../images/icons/ManageUsersButton.png'
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
            <div className='ms-3 mt-3'>
                <h1>Hi {currentUser.displayName}.<br />
                    Welcome to WeConnect</h1>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <Card className='position-relative p-4 admin-card'>
                    <div className='d-flex justify-content-center position-absolute top-50 start-50 translate-middle' style={{ width: '500px' }}>
                        <Button as={Link} to='profile' variant='light' className='menu-button mx-4'>
                            <Image className='button-art' src={manageUserIcon}></Image>
                            My Account
                        </Button>

                        <Button as={Link} to='services' variant='light' className='menu-button mx-4'>
                            <Image className='button-art' src={manageServiceIcon}></Image>
                            Services
                        </Button>

                        <Button as={Link} to='agreements' variant='light' className='menu-button mx-4'>
                            <Image className='button-art' src={manageAgreementIcon}></Image>
                            Agreements
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard