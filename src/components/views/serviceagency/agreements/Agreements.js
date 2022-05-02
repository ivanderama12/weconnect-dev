import React, { useState } from 'react'
import { Card, Button, Image, Container } from 'react-bootstrap'

import viewIcon from '../../../../images/icons/ViewButton.png'
import contactIcon from '../../../../images/icons/ContactIcon.png'

import Navbar from '../../../navbar/Navbar'
import SearchBar from '../../../SearchBar'

import View from './View'
import Messages from './Messages'

const Agreements = () => {

    const [viewBtnVar, setViewBtnVar] = useState('danger')
    const [planBtnVar, setPlanBtnVar] = useState('light')

    function handleButtonClick(button) {

        setViewBtnVar('light')
        setPlanBtnVar('light')

        if (button === 'profile')
            setViewBtnVar('danger')
        if (button === 'myplan')
            setPlanBtnVar('danger')
    }

    return (
        <div>
            <div>
                <Navbar />
                <SearchBar />
                <Container className='mt-3  '>
                    <h2>Agreements</h2>
                    <div className='d-flex justify-content-center mt-3'>
                        <Card className='position-relative p-4 account-card'>
                            <div className='d-flex justify-content-center position-absolute top-50 start-50 translate-middle' style={{ width: '300px' }}>
                                <Button
                                    className='menu-button-account mx-4'
                                    variant={viewBtnVar}
                                    onClick={(e) => handleButtonClick('profile')}
                                    style={{ fontSize: '12px' }}
                                >
                                    <Image className='button-art' src={viewIcon}></Image>
                                    View Agreements
                                </Button>
                                <Button
                                    onClick={(e) => handleButtonClick('myplan')}
                                    variant={planBtnVar}
                                    className='menu-button-account mx-'
                                    style={{ fontSize: '12px' }}
                                >
                                    <Image className='button-art' src={contactIcon}></Image>
                                    Contact Establishment
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Container>

                {viewBtnVar === 'danger' && <div><View /></div>}
                {planBtnVar === 'danger' && <div><Messages /></div>}

            </div>
        </div>
    )
}

export default Agreements
