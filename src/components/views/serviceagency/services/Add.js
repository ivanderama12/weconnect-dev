import React, { useState } from 'react'
import { Card, Form, FloatingLabel, Button } from 'react-bootstrap'
import results from '../../../../results'
import { useAuth } from '../../../../AuthContext'

const Add = () => {
    const [serviceType, setServiceType] = useState()
    const [availability, setAvailability] = useState()
    const [loading, setLoading] = useState()
    const { currentUser } = useAuth()

    function handleSave(e) {
        e.preventDefault()
        setLoading(true)
        var found = false
        var serviceID = ''
        results.get('/services.json')
            .then(function (response) {
                for (let key in response.data) {
                    console.log(response.data[key].serviceName+': '+ response.data[key][currentUser.uid].availability)
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
                            results.put('/services/' + serviceID + '/' + currentUser.uid + '.json', { availability: availability })
                            setLoading(false)
                        })
                } else {
                    results.put('/services/' + serviceID + '/' + currentUser.uid + '.json', { availability: availability })
                    setLoading(false)
                }
            })
    }

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Card className='m-3' style={{ width: '500px' }}>
                    <Card.Header>
                        Add Services
                    </Card.Header>
                    <Card.Body>
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
                                        type='text'
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
                                    disabled={loading}
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
