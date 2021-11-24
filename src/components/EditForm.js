import React from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'

const EditForm = (props) => {
    const uid = props.uid
    const type = props.type



    const isAgency = props.type === 'serviceagency' ? true : false
    console.log(isAgency)
    return (
        <div>
            {isAgency && <Form>
                <Form.Group className='mb-3' controlId='editContact'>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Contact Person"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Contact Person"
                        // onChange={(e) => setEmail(e.target.value)} 
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="editCompany">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Company Name"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Company Name"
                        // onChange={(e) => setPassword(e.target.value)} 
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="editEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email Address"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Email Address"
                        // onChange={(e) => setPassword(e.target.value)} 
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="editExpiry">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Premium Expiry"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Premium Expiry"
                        // onChange={(e) => setPassword(e.target.value)} 
                        />
                    </FloatingLabel>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="success"
                        type="submit"
                    // onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </div>
            </Form>}
        </div>
    )
}

export default EditForm
