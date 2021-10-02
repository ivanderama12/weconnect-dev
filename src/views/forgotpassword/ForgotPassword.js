import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Alert, Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../../AuthContext'
import Art from './ForgotPasswordArt.svg'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const { login, isAgency } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password)
            isAgency ? history.push('/serviceagency') : history.push('/')
        } catch {
            setError('Failed to log in');
        }
        setLoading(false)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h3 className='mt-3'>Forgot your password?</h3>
                        <Card style={{ maxWidth: '25rem' }}>
                            {error && <Alert className='mx-3 mt-3 mb-0' variant='danger' style={{ fontSize: '14px' }}>{error} </Alert>}
                            <Card.Body>
                                <Card.Text>
                                    Enter the email associated with your account and we’ll send you the instructions to reset your password.
                                </Card.Text>
                                <Form>
                                    <Form.Group className="mb-3" controlId="signInEmail">
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>

                                    <div className="d-grid gap-2">
                                        <Button variant="success"
                                            type="submit"
                                            onClick={handleSubmit}>
                                            Send Instruction
                                        </Button>
                                    </div>
                                </Form>
                                <hr />
                                <div className='d-flex flex-column justify-content-center'>
                                    <Card.Text className='text-center'>
                                        New User?
                                    </Card.Text>
                                    <Button as={Link} to={isAgency ? '/serviceagency/register' : '/register'} variant='danger'>
                                        Register
                                    </Button>
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

export default ForgotPassword
