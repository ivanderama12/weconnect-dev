import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import results from '../../../../results'

const View = () => {

    const [hasQuery, setHasQuery] = useState(false)
    const [services, setServices] = useState([])
    const [serviceName, setServiceName] = useState()
    const [queryID, setQueryID] = useState('default')
    const [agencies, setAgencies] = useState([])

    useEffect(() => {
        const serviceList = []
        results.get('/services.json')
            .then(function (response) {
                for (let key in response.data) {
                    serviceList.unshift(
                        {
                            id: key,
                            name: response.data[key].serviceName
                        }
                    )
                }
            }).then(function () {
                setServices(serviceList)
            })
    }, [])

    function getAgencies() {
        return results.get('/users/serviceagency.json')
    }

    function getServices(ID) {
        return results.get('/services/'+ID+'/.json')
    }

    function handleApply(e) {
        e.preventDefault()
        const agencyList = []
        if (queryID !== 'default') {
            Promise.all([getAgencies(), getServices(queryID)])
                .then(function(response){
                    for(let key in response[1].data) {
                        setServiceName(response[1].data.serviceName)
                        if(response[0].data[key]) {
                            agencyList.unshift(
                                {
                                    name: response[0].data[key].companyName,
                                    availability: response[1].data[key].availability
                                }
                            )
                        }
                    }
                }).then(function(){
                    setHasQuery(true)
                    setAgencies(agencyList)
                })
        }
    }

    return (
        <div className='mt-3 p-3'>
            <Row xs={1} sm={1} md={2}>
                <Col className='mb-3'>
                    <Card>
                        <Container>
                            <h1 className='mt-3'>View Services</h1>
                            <Form className='p-3 mb-3'>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={(e) => setQueryID(e.target.value)}
                                >
                                    <option value='default'>Select Service Type</option>
                                    {services.map((service) =>
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    )}
                                </Form.Select>

                                <div className='ps-3 mt-3 d-flex justify-content-between'>
                                    <Button
                                        variant='light'
                                        style={{ minWidth: '150px' }}
                                        onClick={(e) => setHasQuery(false)}
                                        disabled={!hasQuery}
                                    >
                                        Reset
                                    </Button>

                                    <Button
                                        variant='success'
                                        style={{ minWidth: '150px' }}
                                        onClick={handleApply}
                                    >
                                        Apply
                                    </Button>
                                </div>

                            </Form>
                        </Container>
                    </Card>
                </Col>

                {hasQuery && <Col>
                    <Card>
                        <Card className='bg-danger text-white'>
                            <Card.Header>
                                Services: {serviceName}
                            </Card.Header>
                            <Card.Body>
                                {agencies.map((agency) =>
                                    <div className='d-flex justify-content-between'
                                        key={agency.name}
                                    >
                                        <span>{agency.name}</span>
                                        <span>{agency.availability}</span>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Card>
                </Col>}
            </Row>
        </div>
    )
}

export default View