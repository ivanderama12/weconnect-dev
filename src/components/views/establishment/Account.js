import React, { useState } from 'react'
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Image } from 'react-bootstrap'
import Art from '../../../images/art/ProfileArt.png'
import EditIcon from '../../../images/icons/EditIcon.svg'

import Menu from './Menu'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import { useAuth } from '../../../AuthContext'

const Account = () => {

    const { userDetails } = useAuth()
    const [userName, setUserName] = useState(userDetails.userName)
    const [email, setEmail] = useState(userDetails.email)
    const [userTitle, setUserTitle] = useState(userDetails.userTitle)
    const [contactNumber, setContactNumber] = useState(userDetails.contactNumber)
    const [companyName, setCompanyName] = useState(userDetails.companyName)

    const [loading, setLoading] = useState(false)
    const [disableEdit, setDisableEdit] = useState(true)

    function handleEditClick() {
        setDisableEdit(!disableEdit)
        console.log(disableEdit)
    }

    function handleSubmit() {

    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Menu />
            <Container>
                <Row>
                    <Col xl={4}>
                        <div>
                            <h1 className='text-center'>My Profile</h1>
                            <Card className='text-center p-3 ms-3'>
                                {userDetails.imageRef && <Image className='rounded mx-auto d-block profile-pic' fluid src={userDetails.imageRef} />}
                                <div className='d-flex justify-content-end'>
                                    <Button size='sm' variant='light' onClick={handleEditClick}>
                                        <Image className='edit-button' src={EditIcon} /> Edit
                                    </Button>
                                </div>

                                <Form>
                                    <Form.Group>
                                        <FloatingLabel className="mb-2" label="User Name" >
                                            <Form.Control
                                                required
                                                disabled={disableEdit}
                                                value={userName}
                                                type="text"
                                                placeholder="User Name"
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group>
                                        <FloatingLabel className="mb-2" label="Email Address" >
                                            <Form.Control
                                                required
                                                disabled={disableEdit}
                                                value={email}
                                                type="email"
                                                placeholder="Email Address"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group>
                                        <FloatingLabel className="mb-2" label="Position/Title" >
                                            <Form.Control
                                                required
                                                disabled={disableEdit}
                                                value={userTitle}
                                                type="text"
                                                placeholder="Position/Title"
                                                onChange={(e) => setUserTitle(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group>
                                        <FloatingLabel className="mb-2" label="Contact Number" >
                                            <Form.Control
                                                required
                                                disabled={disableEdit}
                                                value={contactNumber}
                                                type="text"
                                                placeholder="ContactNumber"
                                                onChange={(e) => setContactNumber(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group>
                                        <FloatingLabel className="mb-2" label="Company Name" >
                                            <Form.Control
                                                required
                                                disabled={disableEdit}
                                                value={companyName}
                                                type="text"
                                                placeholder="Company Name"
                                                onChange={(e) => setCompanyName(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>


                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="success"
                                            type="submit"
                                            disabled={(!loading && disableEdit)}
                                            onClick={handleSubmit}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </Form>
                            </Card>
                        </div >
                    </Col>
                    <Col className='mt-5 d-none d-lg-block d-xl-block' >
                        <Image src={Art} fluid />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Account
