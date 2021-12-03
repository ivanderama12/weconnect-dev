import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Image, Row, FloatingLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar';

import { useAuth } from '../../../AuthContext'
import Art from '../../../images/art/RegisterPageArt.svg'
import EstablishmentForm from './EstablishmentForm';
import AgencyForm from './AgencyForm';

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [checked, setChecked] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const { signup, isAgency, currentUser } = useAuth()

    const handleCheck = () => {
        checked ? setChecked(false) : setChecked(true)
    }

    async function handleSubmit(e) {
        var errorCheck = false;
        e.preventDefault();
        if (!checked) {
            setLoading(false)
            return setError('Must accept Terms of Service and Privacy Policy')
        }
        else if (password !== confirmPassword) {
            setLoading(false)
            return setError('Passwords do not match')
        }
        setLoading(true)
        try {
            setError('')
            await signup(email, password)
        } catch {
            errorCheck = true
            setError('Something went wrong')
            setLoading(false)
        }
        console.log('errc', errorCheck)
        if (!errorCheck) {
            setSuccess(true)
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Container className='mt-3'>
                <Row>
                    <Col>
                        <h3>Create Account</h3>
                        <Card>
                            {error && <Alert className='mx-3 mt-3 mb-0' variant='danger' style={{ fontSize: '14px' }}>{error} </Alert>}
                            {success && !error && <Alert className='mx-3 mt-3 mb-0' variant='success' style={{ fontSize: '14px' }}> Account Created Successfully! Set up user information </Alert>}
                            <Card.Body>
                                {!success && <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <FloatingLabel
                                            className="mb-3"
                                            label="Email Address"
                                        >
                                            <Form.Control
                                                required
                                                type="email"
                                                placeholder="Email Adress"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group>
                                        <FloatingLabel
                                            className="mb-3"
                                            label="Password"
                                        >
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group>
                                        <FloatingLabel
                                            className="mb-3"
                                            label="Confirm Password"
                                        >
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="Confirm Password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="d-flex">
                                        <Form.Check
                                            type="checkbox"
                                            onClick={handleCheck}
                                        />
                                        <Form.Label>
                                            <p className='ms-2'>By signing up you accept the
                                                <Link className='link-format red-font' to='/tos'> Terms of Service </Link>
                                                and
                                                <Link className='link-format red-font' to='/privacy'> Privacy Policy </Link>
                                            </p>
                                        </Form.Label>
                                    </Form.Group>

                                    <div className='d-grid gap-2'>
                                        <Button
                                            variant='danger'
                                            type='submit'
                                            disabled={loading}
                                        >
                                            Register
                                        </Button>
                                    </div>
                                </Form>}

                                {!error && currentUser && success && !isAgency && <EstablishmentForm />}
                                {!error && currentUser && success && isAgency && <AgencyForm />}

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

export default Register
