import React, { useState } from 'react'
import { Alert, Card, Form, FloatingLabel, Button } from 'react-bootstrap'
import results from '../../../../results'
import { useAuth } from '../../../../AuthContext'

const Add = () => {
    const [serviceType, setServiceType] = useState()
    const [availability, setAvailability] = useState()
    const [loading, setLoading] = useState()
    const [success, setSuccess] = useState(false)
    const { currentUser } = useAuth()

    function handleSave(e) {
        e.preventDefault()
        setLoading(true)
        var found = false
        var serviceID = ''
        results.get('/services.json')
            .then(function (response) {
                for (let key in response.data) {
                    if (response.data[key].serviceName === serviceType) {
                        found = true
                        serviceID = key
                        break;
                    }
                }
            }).finally(function () {
                if (!found) {
                    results.post('/services.json', { serviceName: serviceType })
                        .then(function (response) {
                            serviceID = response.data.name
                        }).finally(function () {
                            setLoading(false)
                            setSuccess(true)
                            results.put('/services/' + serviceID + '/' + currentUser.uid + '.json', { availability: availability })

                        })
                } else {
                    setLoading(false)
                    setSuccess(true)
                    results.put('/services/' + serviceID + '/' + currentUser.uid + '.json', { availability: availability })

                }
            })
        console.log(success)
    }

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Card className='m-3' style={{ width: '500px' }}>
                    <Card.Header>
                        Add Services
                    </Card.Header>
                    <Card.Body>
                        {success && <Alert className='mx-3 mt-3 mb-0' variant='success' style={{ fontSize: '14px' }}> Service Added Successfuly </Alert>}
                        <Form className='p-3'>
                            <Form.Group>
                                <FloatingLabel className='mb-3' label='Service Type' >
                                    <Form.Control
                                        placeholder='Service Type'
                                        required
                                        type='text'
                                        onChange={(e) => setServiceType(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group>
                                <FloatingLabel className='mb-3' label='Availability' >
                                    <Form.Control
                                        placeholder='Availability'
                                        required
                                        type='number'
                                        onChange={(e) => setAvailability(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <div className='d-flex justify-content-center'>
                                <Button
                                    variant='success'
                                    type='submit'
                                    style={{ minWidth: '150px' }}
                                    onClick={handleSave}
                                    disabled={!serviceType || !availability}
                                >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Add
