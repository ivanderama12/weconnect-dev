import React from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import manageUserIcon from '../../../images/icons/ManageUsersButton.png'
import manageServiceIcon from '../../../images/icons/ManageServicesButton.png'
import AdminNavbar from '../../navbar/AdminNavbar'

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
                        <Button as={Link} to='/admin/users' variant='light' className='menu-button pt-3 mx-5'>
                            <Image className='button-art' src={manageUserIcon}></Image>
                            Manage Users
                        </Button>

                        <Button as={Link} to='/admin/services' variant='light' className='menu-button pt-3 mx-5'>
                            <Image className='button-art' src={manageServiceIcon}></Image>
                            Manage Services
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Admin
