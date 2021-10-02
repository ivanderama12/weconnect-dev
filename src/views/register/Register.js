import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import results from '../../results'
import { useAuth } from '../../AuthContext'
import Art from './RegisterPageArt.svg'

const Register = () => {
    const [contactPerson, setContactPerson] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [checked, setChecked] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const { signup, isAgency, logout } = useAuth()
    const userType = isAgency ? 'serviceagency' : 'establishment'
    var errorCheck = false;

    const handleCheck = () => {
        checked ? setChecked(false) : setChecked(true)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        errorCheck = false;
        setSuccess(false);
        setLoading(true);
        if (!checked) {
            setLoading(false)
            return setError('Must accept Terms of Service and Privacy Policy')
        }
        else if (password !== confirmPassword) {
            setLoading(false)
            return setError('Passwords do not match')
        }
        try {
            setError()
            await signup(email, password)
            setLoading(false)
        } catch {
            errorCheck = true;
            setError('Failed to create account');
        }
        setLoading(false)
        logout()
        if (!errorCheck) {
            var data = isAgency ? {
                contactPerson: contactPerson,
                companyName: companyName,
                contactNumber: '',
                email: email,
                premiumExpiry: ''
            } : {
                contactPerson: contactPerson,
                companyName: companyName,
                contactNumber: '',
                email: email,
                userTitle: ''
            }

            results.post('/' + userType + '.json', data)
                .then(function (response) {
                    setSuccess(true)
                })
                .catch(function (error) {
                    setError('database fail');
                });
            
        }
    }



    return (
        <div>
            <Container className=''>
                <Row>
                    <Col>
                        <h3>Create Account</h3>
                        <Card style={{ maxWidth: '25rem' }}>
                            {error && <Alert className='mx-3 mt-3 mb-0' variant='danger' style={{ fontSize: '14px' }}>{error} </Alert>}
                            {success && !error && <Alert className='mx-3 mt-3 mb-0' variant='success' style={{ fontSize: '14px' }}> Account Created Successfully  </Alert>}
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-2" controlId="signInContactPerson">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Contact Person Name"
                                            onChange={(e) => setContactPerson(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="signInCompanyName">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Company Name"
                                            onChange={(e) => setCompanyName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="signInEmail">
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="signInPassword">
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="signInPasswordConfirm">
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="d-flex" controlId="tosCheckbox">
                                        <Form.Check
                                            type="checkbox"
                                            onClick={handleCheck} />
                                        <Form.Label>
                                            <p>By signing up you accept the
                                                <Link className='link-format' to='/tos'> Terms of Service </Link>
                                                and
                                                <Link className='link-format' to='/privacy'> Privacy Policy </Link>
                                            </p>
                                        </Form.Label>
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="danger"
                                            type="submit"
                                            disabled={loading}
                                            onClick={handleSubmit}>
                                            Register
                                        </Button>
                                    </div>
                                </Form>
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
