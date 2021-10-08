import React from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import manageUserIcon from '../images/icons/ManageUsersButton.svg'
import manageServiceIcon from '../images/icons/ManageServicesButton.svg'

const Admin = () => {
    return (
        <div>
            <Navbar />
            <div className='ms-3 mt-3'>
                <h1>Hi Admin.<br />
                    Welcome to WeConnect</h1>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <Card className='position-relative p-4 admin-card'>
                    <div className='d-flex justify-content-center position-absolute top-50 start-50 translate-middle' style={{ width: '500px' }}>
                        <Button as={Link} to='/admin/1' variant='light' className='menu-button mx-5'>
                            <Image src={manageUserIcon}></Image>
                            Manage Users
                        </Button>

                        <Button as={Link} to='/admin/2' variant='light' className='menu-button mx-5'>
                            <Image src={manageServiceIcon}></Image>
                            Manage Services
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Admin
