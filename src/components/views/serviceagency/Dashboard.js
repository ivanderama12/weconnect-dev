import React, { useState } from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import manageUserIcon from '../../../images/icons/PersonButton.png'
import manageServiceIcon from '../../../images/icons/ManageServicesButton.png'
import manageAgreementIcon from '../../../images/icons/ManageAgreementsButton.png'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import { useAuth } from '../../../AuthContext'
import Expired from './Expired'
import { useHistory } from 'react-router-dom'
import PremiumModal from './PremiumModal'

const Dashboard = () => {

    let history = useHistory()
    const [modalShow, setModalShow] = useState(false)

    const { userDetails } = useAuth()

    function handleServicesClick() {
        if (userDetails.accountStatus === "Expired") {
            setModalShow(true)
        } else {
            history.push('services')
        }
    }

    function handleAgreementsClick() {
        if (userDetails.accountStatus === "Expired") {
            setModalShow(true)
        } else {
            history.push('agreements')
        }
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Expired />
            {userDetails && <Container>
                <div className='mt-3'>
                    <h1>Hi {userDetails.companyName}.<br />
                        Welcome to WeConnect</h1>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <Card className='p-3 admin-card'>
                        <div className='d-flex justify-content-center'>
                            <Button as={Link} to='account' variant='light' className='menu-button mx-3 '>
                                <Image className='button-art mt-3' src={manageUserIcon}></Image>
                                Account
                            </Button>

                            <Button onClick={handleServicesClick} variant='light' className='menu-button mx-3'>
                                <Image className='button-art' src={manageServiceIcon}></Image>
                                Services
                            </Button>

                            <Button onClick={handleAgreementsClick} variant='light' className='menu-button mx-3'>
                                <Image className='button-art' src={manageAgreementIcon}></Image>
                                Agreements
                            </Button>
                        </div>
                    </Card>
                </div>
            </Container>}
            <PremiumModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default Dashboard
