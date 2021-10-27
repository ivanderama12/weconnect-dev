import React, { useEffect, useState } from 'react'
<<<<<<< HEAD:src/components/views/admin/ManageUsers.js
import AdminNavbar from '../../navbar/AdminNavbar'
=======
import Navbar from '../../navbar/AdminNavbar'
>>>>>>> b4a60fbb56c4bbc2f0a52b22d5fb03ffb7f2c86f:src/views/admin/ManageUsers.js
import { Alert, Button, Card, Container, Col, Image, Row, ListGroup, Modal } from 'react-bootstrap'
import Art from '../../../images/art/AdminManageUsersArt.svg'
import results from '../../../results'
import editIcon from '../../../images/icons/EditIcon.svg'
<<<<<<< HEAD:src/components/views/admin/ManageUsers.js
import EditForm from './EditForm'
=======
import EditForm from '../../EditForm'
>>>>>>> b4a60fbb56c4bbc2f0a52b22d5fb03ffb7f2c86f:src/views/admin/ManageUsers.js

const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [ID, setID] = useState();
    const [type, setType] = useState();

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
            });

    }, []);

    function EditModal(props) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm uid={ID} type={type} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function handleClick(id, type) {
        setID(id)
        setType(type)
        setModalShow(true)
    }

    return (
        <div>
<<<<<<< HEAD:src/components/views/admin/ManageUsers.js
            <AdminNavbar />
=======
            <Navbar />
>>>>>>> b4a60fbb56c4bbc2f0a52b22d5fb03ffb7f2c86f:src/views/admin/ManageUsers.js
            <h1 className='text-center my-5' >Manage Users</h1>
            <Container>
                <Row style={{ gap: '60px' }} >
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
                                                            variant='light'
                                                            onClick={() => handleClick(users.id, users.userType)}
                                                        >
                                                            <Image style={{ marginTop: '-10px', height: '14px', width: 'auto' }}
                                                                src={editIcon} alt='editicon' />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col> {users.email} </Col>
                                                    <Col> {users.userType} </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className='d-none d-md-block d-lg-block d-xl-block'>
                        <Image src={Art} fluid />
                    </Col>
                </Row>
            </Container>

            <EditModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </div >
    )
}

export default ManageUsers;
