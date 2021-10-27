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
                <Form.Group className='mb-3' controlId='signInEmail'>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Email address"
                        // onChange={(e) => setEmail(e.target.value)} 
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="signInPassword">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                    // onChange={(e) => setPassword(e.target.value)} 
                    />
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
