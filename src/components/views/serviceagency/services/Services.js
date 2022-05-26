import React, { useState } from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import Navbar from '../../../navbar/Navbar'
import SearchBar from '../../../SearchBar'

import Add from './Add'
import Edit from './Edit'
import View from './View'

import addIcon from '../../../../images/icons/PersonButton.png'
import editIcon from '../../../../images/icons/PenButton.svg'
import viewIcon from '../../../../images/icons/ViewButton.png'
import Expired from '../Expired'

const Services = () => {

    const [addBtnVar, setAddBtnVar] = useState('danger')
    const [editBtnVar, setEditBtnVar] = useState('light')
    const [viewBtnVar, setViewBtnVar] = useState('light')

    function handleButtonClick(button) {

        setAddBtnVar('light')
        setEditBtnVar('light')
        setViewBtnVar('light')

        if (button === 'add')
            setAddBtnVar('danger')
        if (button === 'edit')
            setEditBtnVar('danger')
        if (button === 'view')
            setViewBtnVar('danger')
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Expired />
            <Container className='mt-3  '>
                <h2>My Account</h2>
                <div className='d-flex justify-content-center mt-3'>
                    <Card className='position-relative p-4 account-card'>
                        <div className='d-flex justify-content-center position-absolute top-50 start-50 translate-middle' style={{ width: '300px' }}>
                            <Button onClick={(e) => handleButtonClick('add')} variant={addBtnVar} className='menu-button-account mx-2'>
                                <Image className='button-art' src={addIcon}></Image>
                                Add
                            </Button>
                            <Button onClick={(e) => handleButtonClick('edit')} variant={editBtnVar} className='menu-button-account mx-2'>
                                <Image className='button-art' src={editIcon}></Image>
                                Edit
                            </Button>
                            <Button onClick={(e) => handleButtonClick('view')} variant={viewBtnVar} className='menu-button-account mx-2'>
                                <Image className='button-art' src={viewIcon}></Image>
                                View
                            </Button>
                        </div>
                    </Card>
                </div>
            </Container>

            {addBtnVar === 'danger' && <div><Add /></div>}
            {editBtnVar === 'danger' && <div><Edit /></div>}
            {viewBtnVar === 'danger' && <div><View /></div>}
        </div>
    )
}

export default Services
