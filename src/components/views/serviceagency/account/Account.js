import React, { useState } from 'react'
import Navbar from '../../../navbar/Navbar'
import { Card, Button, Image, Container } from 'react-bootstrap'
import myProfileIcon from '../../../../images/icons/PersonButton.png'
import myPlanIcon from '../../../../images/icons/MyPlanIcon.svg'
import createPostIcon from '../../../../images/icons/PenButton.svg'

import Profile from './profile/Profile'
import Plan from './Plan'
import CreatePost from './CreatePost'
import SearchBar from '../../../SearchBar'

const ManageAccount = () => {

    const [profileBtnVar, setProfileBtnVar] = useState('danger')
    const [planBtnVar, setPlanBtnVar] = useState('light')
    const [postBtnVar, setPostBtnVar] = useState('light')

    function handleButtonClick(button) {

        setProfileBtnVar('light')
        setPlanBtnVar('light')
        setPostBtnVar('light')

        if (button === 'profile')
            setProfileBtnVar('danger')
        if (button === 'myplan')
            setPlanBtnVar('danger')
        if (button === 'post')
            setPostBtnVar('danger')
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Container className='mt-3  '>
                <h2>My Account</h2>
                <div className='d-flex justify-content-center mt-3'>
                    <Card className='position-relative p-4 account-card'>
                        <div className='d-flex justify-content-center position-absolute top-50 start-50 translate-middle' style={{ width: '300px' }}>
                            <Button onClick={(e) => handleButtonClick('profile')} variant={profileBtnVar} className='menu-button-account mx-2'>
                                <Image className='button-art' src={myProfileIcon}></Image>
                                Profile
                            </Button>
                            <Button onClick={(e) => handleButtonClick('myplan')} variant={planBtnVar} className='menu-button-account mx-2'>
                                <Image className='button-art' src={myPlanIcon}></Image>
                                My Plan
                            </Button>
                            <Button onClick={(e) => handleButtonClick('post')} variant={postBtnVar} className='menu-button-account mx-2'>
                                <Image className='button-art' src={createPostIcon}></Image>
                                Create Post
                            </Button>
                        </div>
                    </Card>
                </div>
            </Container>

            {profileBtnVar === 'danger' && <div><Profile /></div>}
            {planBtnVar === 'danger' && <div><Plan /></div>}
            {postBtnVar === 'danger' && <div><CreatePost /></div>}

        </div>
    )
}

export default ManageAccount