import React, { useState } from 'react'
import { Card, Container, Col, Row, Image, Form } from 'react-bootstrap'

const Messages = () => {
    const imageRef = 'https://firebasestorage.googleapis.com/v0/b/weconnect-dev-de5dc.appspot.com/o/images%2Fprof-icon1%201.png?alt=media&token=3882b521-d138-479e-ab70-5d4aa3edae3c'
    const conversations = [{ imgRef: imageRef, establishmentName: 'Test1', selected: true }, { imgRef: imageRef, establishmentName: 'Test2', selected: false }, { imgRef: imageRef, establishmentName: 'Test3', selected: false }, { imgRef: imageRef, establishmentName: 'Test4', selected: false }]
    // const [selected, setSelected] = useState()
    const [search, setSearch] = useState()

    return (
        <div>
            <Container>
                <Row xs={1} sm={2} md={2}>
                    <Col lg={4}>
                        <Card className='m-3'>
                            <h4 className='m-3'>Messages</h4>

                            <Form className='mx-3 mb-2'>
                                <Form.Group controlId="searchBar">
                                    <Form.Control
                                        size='sm'
                                        type="search"
                                        placeholder="Search Messages"
                                        onChange={(e) => setSearch(e.target.value)} />
                                </Form.Group>
                            </Form>

                            <div>
                                {conversations.map((conversation) =>
                                    <div className={!conversation.selected ? 'd-flex ps-3' : 'ps-3 d-flex bg-danger'}>
                                        <Image className='agreements-profile-pic my-2' src={conversation.imgRef} />
                                        <div className='ms-3 mt-2'>
                                            {conversation.establishmentName}
                                            <br />
                                            <a className='text-secondary text-decoration-none'>test message</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Col>

                    <Col>
                        <Card className='m-3'>
                            <Card.Header>
                                <h3>Test1</h3>
                            </Card.Header>
                            <Card.Body>
                                <div>
                                    <div className='d-flex text-small'>
                                        <Card className='bg-danger p-1'>Test Message</Card>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <Card className='bg-secondary p-1'>Test Message</Card>
                                    </div>
                                </div>
                            </Card.Body>
                            <Form className='mx-3 mb-2'>
                                <Form.Group controlId="searchBar">
                                    <Form.Control
                                        size='sm'
                                        type="text"
                                        placeholder="Write a response"
                                        onChange={(e) => setSearch(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Messages
