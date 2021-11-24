import React, { useState } from 'react'
import Navbar from '../../../navbar/Navbar'
import { Card, Button, Image, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import manageUserIcon from '../../../../images/icons/ManageUsersButton.png'
import manageServiceIcon from '../../../../images/icons/ManageServicesButton.png'
import manageAgreementIcon from '../../../../images/icons/ManageAgreementsButton.png'

import Profile from './Profile'

const ManageAccount = () => {

    const [profileBtnVar, setProfileBtnVar] = useState('danger')
    const [serviceBtnVar, setServiceBtnVar] = useState('light')
    const [agreementsBtnVar, setAgreementsBtnVar] = useState('light')

    function handleButtonClick(button) {

        setProfileBtnVar('light')
        setServiceBtnVar('light')
        setAgreementsBtnVar('light')

        if (button === 'profile')
            setProfileBtnVar('danger')
        if (button === 'services')
            setServiceBtnVar('danger')
        if (button === 'agreements')
            setAgreementsBtnVar('danger')
    }

    return (
        <div>
            <Navbar />
            <Container>
                <h2>My Account</h2>
                <div className='d-flex justify-content-center'>
                    <Card className='position-relative p-4 account-card'>
                        <div className='d-flex justify-content-center position-absolute top-50 start-50 translate-middle' style={{ width: '300px' }}>
                            <Button onClick={(e) => handleButtonClick('profile')} variant={profileBtnVar} className='menu-button-account mx-2'>
                                <Image className='button-art' src={manageUserIcon}></Image>
                                Profile
                            </Button>
                            <Button onClick={(e) => handleButtonClick('services')} variant={serviceBtnVar} className='menu-button-account mx-2'>
                                <Image className='button-art' src={manageServiceIcon}></Image>
                                Services
                            </Button>
                            <Button onClick={(e) => handleButtonClick('agreements')} variant={agreementsBtnVar} className='menu-button-account mx-2'>
                                <Image className='button-art' src={manageAgreementIcon}></Image>
                                Agreements
                            </Button>
                        </div>
                    </Card>
                </div>
            </Container>

            <Card className='mt-3 mx-5 p-3'>
                {profileBtnVar === 'danger' && <div><Profile /></div>}
                {serviceBtnVar === 'danger' && <div>service</div>}
                {agreementsBtnVar === 'danger' && <div>agreements</div>}
            </Card>
        </div>
    )
}

export default ManageAccount