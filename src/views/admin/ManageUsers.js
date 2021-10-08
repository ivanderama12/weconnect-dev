import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/AdminNavbar'
import { Alert, Button, Card, Container, Col, Form, Image, Row, ListGroup, Stack } from 'react-bootstrap'
import Art from '../../images/art/AdminManageUsersArt.svg'
import results from '../../results'
import editIcon from '../../images/icons/EditIcon.svg'

const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true)
        setError()
        const userList = []

        Promise.all([results.get('users/establishment.json'), results.get('users/serviceagency.json')])
            .then(function (response) {
                for (let i = 0; i < 2; i++) {
                    const type = i === 0 ? 'establishment' : 'serviceagency'
                    for (let key in response[i].data) {
                        userList.unshift(
                            {
                                ...response[i].data[key],
                                id: key,
                                userType: type
                            }
                        )
                    }
                }
            })
            .catch(function (error) {
                setLoading(false)
                setError('Database Error')
            })
            .then(function () {
                setLoading(false)
                setUsers(userList)
                console.log(userList)
            });

    }, []);

    return (
        <div>
            <Navbar />
            <h1 className='text-center'>Manage Users</h1>
            <Container className='mt-3' fluid>
                <Row xs={1} sm={1} md={1} lg={2} xl={3}>
                    <Col>
                        <Card>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Card.Body >
                                {loading && <div>
                                    <h3>Loading...</h3>
                                </div>}

                                {!loading && users.length === 0 && <div>
                                    <h3>There are no users</h3>
                                </div>}

                                {!loading && users.length !== 0 && <div>
                                    <h3> Users </h3>
                                    <ListGroup className='users-card'>
                                        {users.map((users) => (
                                            <ListGroup.Item key={users.id}>
                                                <Row>
                                                    <Col xs='5'> {users.companyName} </Col>
                                                    <Col xs='5'> {users.contactPerson} </Col>
                                                    <Col xs='1'>
                                                        <Button className='edit-button p-0'
                                                            variant='light'>
                                                            <Image style={{ marginTop: '-10px', height: '14px', width: 'auto' }}
                                                                src={editIcon} alt='editicon' />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col> {users.email} </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col >

                        <Card>
                            <Card.Body >
                                <h3 className='mx-3'>Edit Account</h3>
                                <hr />
                                <Form>
                                    <Form.Group className="mb-3" controlId="manageUserContactPerson">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Contact Person Name"
                                        // onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="manageUserCompanyName">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Company Name"
                                        // onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="manageUserEmail">
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Email"
                                        // onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="manageUserPassword">
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Password"
                                        // onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button variant="success"
                                        // onClick={handleSubmit}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className='d-none d-xl-block'>
                        <Image src={Art} fluid />
                    </Col>

                </Row>
            </Container>
        </div >
    )
}

export default ManageUsers;
