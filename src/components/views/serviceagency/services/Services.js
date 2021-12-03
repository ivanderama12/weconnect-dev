import React, { useEffect, useState } from 'react'
import Navbar from '../../../navbar/Navbar'
import { Card, Button, Image, Container, Row, Col, ListGroup, Alert } from 'react-bootstrap'

import addIcon from '../../../../images/icons/PersonButton.png'
import editIcon from '../../../../images/icons/PenButton.svg'
import viewIcon from '../../../../images/icons/ViewButton.png'

import SearchBar from '../../../SearchBar'
import Edit from './Edit'

import results from '../../../../results'
import { useAuth } from '../../../../AuthContext'

const Services = () => {

    const { currentUser } = useAuth()
    const [error, setError] = useState()
    const [services, setServices] = useState([])
    const [editService, setEditService] = useState()
    const [modalShow, setModalShow] = useState(false);

    // const [addBtnVar, setAddBtnVar] = useState('danger')
    // const [editBtnVar, setEditBtnVar] = useState('light')
    // const [viewBtnVar, setViewBtnVar] = useState('light')

    // function handleButtonClick(button) {

    //     setAddBtnVar('light')
    //     setEditBtnVar('light')
    //     setViewBtnVar('light')

    //     if (button === 'add')
    //         setAddBtnVar('danger')
    //     if (button === 'edit')
    //         setEditBtnVar('danger')
    //     if (button === 'view')
    //         setViewBtnVar('danger')
    // }

    useEffect(() => {
        const serviceList = []
        results.get('/services.json')
            .then(function (response) {
                for (let key in response.data) {
                    if (response.data[key][currentUser.uid]) {
                        serviceList.unshift(
                            {
                                name: response.data[key].serviceName,
                                availability: response.data[key][currentUser.uid].availability,
                                id: key,
                            }
                        )
                    }
                }
            }).catch(function (error) {
                setError('Something went wrong. (Database Error)')
            }).then(function () {
                setServices(serviceList)
            })
    }, [])

    function handleClick(service) {
        setModalShow(true)
        setEditService(service)
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            {/* <Container className='mt-3  '>
                <h2>Manage Services</h2>
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
            </Container>*/}

            <div className='p-3 px-5 mb-5' style={{ height: '100vh', width: '100vw' }}>
                <h1> Manage Services </h1>
                <Card className='mt-3 p-3' style={{ height: '100vh' }}>
                    <Row xs={1} sm={1} md={2}>
                        <Col>
                            <h3>My Services</h3>
                            {error && <Alert className='mx-3 mt-3 mb-0' variant='danger' style={{ fontSize: '14px' }}> {error} </Alert>}
                            <ListGroup className='users-card overflow mt-3'>
                                {services.map((service) => (
                                    <ListGroup.Item key={service.id} action onClick={(e) => handleClick(service)}>
                                        <div className='d-flex justify-content-between'>
                                            <span>{service.name}</span>
                                            <span>{service.availability}</span>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item action onClick={() => console.log('Add')}> + Add Item </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col>
                            something here
                        </Col>
                    </Row>
                </Card>

                <Edit
                    editservice = {editService}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>


            {/* {addBtnVar === 'danger' && <div><Add /></div>}
            {editBtnVar === 'danger' && <div><Edit /></div>}
            {viewBtnVar === 'danger' && <div><View /></div>} */}



        </div>
    )
}

export default Services