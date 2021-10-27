import React from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import manageUserIcon from '../../../images/icons/ManageUsersButton.png'
import manageServiceIcon from '../../../images/icons/ManageServicesButton.png'
import manageAgreementIcon from '../../../images/icons/ManageAgreementsButton.png'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
<<<<<<< HEAD
import { useAuth } from '../../../AuthContext'

const Dashboard = () => {
=======

const Admin = () => {
>>>>>>> b4a60fbb56c4bbc2f0a52b22d5fb03ffb7f2c86f
    return (
        <div>
            <Navbar />
            <SearchBar/> 
            <div className='ms-3 mt-3'>
                <h1>Hi Admin.<br />
                    Welcome to WeConnect</h1>
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <Card className='position-relative p-4 admin-card'>
                    <div className='d-flex justify-content-center position-absolute top-50 start-50 translate-middle' style={{ width: '500px' }}>
                        <Button as={Link} to='/serviceagency/users' variant='light' className='menu-button mx-5'>
<<<<<<< HEAD
                            <Image className='button-art' src={manageUserIcon}></Image>
=======
                            <Image className='menu-button' src={manageUserIcon}></Image>
>>>>>>> b4a60fbb56c4bbc2f0a52b22d5fb03ffb7f2c86f
                            Manage Users
                        </Button>

                        <Button as={Link} to='/serviceagency/services' variant='light' className='menu-button mx-5'>
<<<<<<< HEAD
                            <Image className='button-art' src={manageServiceIcon}></Image>
=======
                            <Image src={manageServiceIcon}></Image>
>>>>>>> b4a60fbb56c4bbc2f0a52b22d5fb03ffb7f2c86f
                            Manage Services
                        </Button>

                        <Button as={Link} to='/serviceagency/agreements' variant='light' className='menu-button mx-5'>
<<<<<<< HEAD
                            <Image className='button-art' src={manageAgreementIcon}></Image>
=======
                            <Image src={manageAgreementIcon}></Image>
>>>>>>> b4a60fbb56c4bbc2f0a52b22d5fb03ffb7f2c86f
                            Manage Agreements
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

<<<<<<< HEAD
export default Dashboard
=======
export default Admin
>>>>>>> b4a60fbb56c4bbc2f0a52b22d5fb03ffb7f2c86f
