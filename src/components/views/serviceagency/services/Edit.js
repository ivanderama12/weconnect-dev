import React, { useState, useEffect } from 'react'
import { Alert, Card, Form, FloatingLabel, Button } from 'react-bootstrap'
import results from '../../../../results'
import { useAuth } from '../../../../AuthContext'

const Edit = () => {

    const { currentUser } = useAuth()
    const [availability, setAvailability] = useState('0')
    const [ID, setID] = useState()

    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [hasSelected, setHasSelected] = useState(false)
    const [services, setServices] = useState([])

    useEffect(() => {
        const serviceList = []
        results.get('/services.json')
            .then(function (response) {
                for (let key in response.data) {
                    if (response.data[key][currentUser.uid]) {
                        serviceList.unshift(
                            {
                                id: key,
                                name: response.data[key].serviceName,
                                availability: response.data[key][currentUser.uid].availability
                            }
                        )
                    }
                }
            }).catch(function (error) {
                setError('Database Error')
            })
            .then(function () {
                setServices(serviceList)
            })
    }, [currentUser.uid, services])

    function handleChange(e) {
        const selected = (e.target.value === 'default') ? false : true
        setHasSelected(selected)
        if (!selected) {
            setAvailability('0')
            setID()
        }
        results.get('/services/' + e.target.value + '/' + currentUser.uid + '/.json')
            .then(function (response) {
                if (response.data) {
                    setAvailability(response.data.availability)
                    setID(e.target.value)
                }
            })
    }

    function handleSave(e) {
        e.preventDefault()
        results.put('/services/' + ID + '/' + currentUser.uid + '/.json', { availability: availability })
            .then(() => {
                setSuccess(true)
            }).catch(() => {
                setError('Something Went Wrong')
            })
    }

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <Card className='m-3' style={{ width: '500px' }}>
                    <Card.Header>
                        Edit Services
                    </Card.Header>
                    <Card.Body>
                        {error && <Alert className='mb-0' variant='danger' style={{ fontSize: '14px' }}> {error} </Alert>}
                        {success && !error && <Alert className='mb-0' variant='success' style={{ fontSize: '14px' }}> Edit Success </Alert>}
                        <Form className='p-3'>
                            <Form.Select aria-label="Default select example" onChange={handleChange}>
                                <option value='default'>Select Service Type</option>
                                {services.map((service) =>
                                    <option key={service.id} value={service.id}>{service.name}</option>
                                )}
                            </Form.Select>

                            <Form.Group>
                                <FloatingLabel className='my-3' label='Availability' >
                                    <Form.Control
                                        placeholder='Availability'
                                        required
                                        type='text'
                                        value={availability}
                                        disabled={!hasSelected}
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
                                    disabled={!hasSelected}
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

export default Edit
