import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Alert, Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar';

import results from '../results'
import { useAuth } from '../AuthContext'
import Art from '../images/art/LoginPageArt.svg'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const { login, isAgency } = useAuth()
    const userType = isAgency ? 'serviceagency' : 'establishment'
    var userFound = false;

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        await results.get('/users/' + userType + '.json')
            .then(function (response) {
                for (let key in response.data) {
                    if (response.data[key].email === email) {
                        return userFound = true;
                    }
                }
            })

        if (!userFound) {
            setLoading(false)
            setError('User not found')
        } else {
            try {
                await login(email, password)
                isAgency ? history.push('/serviceagency') : history.push('/')
            } catch {
                setError('Failed to log in');
            }
            setLoading(false)
        }
        console.log(userFound)
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Container className='mt-3'>
                <Row>
                    <Col>
                        <h3>Login</h3>
                        <Card style={{ maxWidth: '25rem' }}>
                            {!loading && error && <Alert className='mx-3 mt-3 mb-0' variant='danger' style={{ fontSize: '14px' }}>{error} </Alert>}
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="signInEmail">
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="signInPassword">
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button variant="success"
                                            type="submit"
                                            onClick={handleSubmit}>
                                            Login
                                        </Button>
                                    </div>
                                </Form>
                                <div className='mt-2 d-flex justify-content-center'>
                                    <Link to='/forgotpassword' className='link-format red-font'> Forgot Password? </Link>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className='d-none d-md-block d-lg-block d-xl-block' >
                        <Image src={Art} fluid />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
