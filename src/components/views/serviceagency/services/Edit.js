import React, { useState } from 'react'
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap'

const Edit = (props) => {

    const service = props.editservice
    const [serviceName, setServiceName] = useState()
    const [availability, setAvailability] = useState()
    const [loading, setLoading] = useState()

    function handleSave(e) {
        e.preventDefault()
        console.log(serviceName, availability)
    }

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Service
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='p-3'>
                        <Form.Group>
                            <FloatingLabel className='mb-3' label='Service Type' >
                                <Form.Control
                                    placeholder='Service Type'
                                    required
                                    type='text'
                                    onChange={(e) => setServiceName(e.target.value)}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit
