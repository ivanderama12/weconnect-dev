import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

import Menu from './Menu'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import file from '../../../images/file 1.png'


const Agreements = () => {

    let history = useHistory()
    const imageRef = 'https://firebasestorage.googleapis.com/v0/b/weconnect-dev-de5dc.appspot.com/o/images%2Fprof-icon1%201.png?alt=media&token=3882b521-d138-479e-ab70-5d4aa3edae3c'

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Menu />
            <Container className='text-center'>
                <h2 className='mt-3'>Agreements</h2>
                <Row className='mt-3'>
                    <Col>
                        <Card >
                            <Card.Header className='text-start'>
                                <h4>
                                    List of Agreements
                                </h4>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <div className='d-flex'>
                                        <div >
                                            <Image className='agreements-profile-pic my-2' src={imageRef} />
                                        </div>
                                        <div className='ms-3 mt-2'>
                                            <a>Jorobs Construction Services</a><br />
                                            <a className='text-decoration-none text-secondary'>Jorobs-Quotation.pdf</a>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='d-flex justify-content-center' style={{ gap: '2px' }}>
                                        <Button size='sm' variant='secondary'>View</Button>
                                        <Button size='sm' variant='secondary'>Download</Button>
                                        <Button size='sm' variant='success'>Accept</Button>
                                        <Button size='sm' variant='danger'>Deny</Button>
                                    </div>
                                    <hr />
                                    <div className='d-flex'>
                                        <div >
                                            <Image className='agreements-profile-pic my-2' src={imageRef} />
                                        </div>
                                        <div className='ms-3 mt-2'>
                                            <a>Jorobs Construction Services</a><br />
                                            <a className='text-decoration-none text-secondary'>Jorobs-Quotation.pdf</a>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div >
                                            <Image className='agreements-profile-pic my-2' src={imageRef} />
                                        </div>
                                        <div className='ms-3 mt-2'>
                                            <a>Jorobs Construction Services</a><br />
                                            <a className='text-decoration-none text-secondary'>Jorobs-Quotation.pdf</a>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Header className='text-start'>
                                <h4>
                                    View Document(s)
                                </h4>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <div className='d-flex justify-content-center'>
                                        <div >
                                            <Image className='agreements-profile-pic my-2' src={imageRef} />
                                        </div>
                                        <div className='ms-3 mt-2'>
                                            <a>Jorobs Construction Services</a><br />
                                            <a className='text-decoration-none text-secondary'>Jorobs-Quotation.pdf</a>
                                        </div>
                                    </div>
                                    <hr />
                                    <Image src={file} />
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <Button
                                        size='sm'
                                        variant='light'
                                        onClick={(e)=> history.push('/agency/q00UoFDxlkZlKMzFVzrUQG7myxv2/request')}
                                    >
                                        Reply {'>'}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Agreements;
