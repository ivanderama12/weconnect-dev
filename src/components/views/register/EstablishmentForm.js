import React, { useState } from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useAuth } from '../../../AuthContext'
import results from '../../../results'

const EstablishmentForm = () => {

    let history = useHistory()

    const [person, setPerson] = useState()
    const [title, setTitle] = useState()
    const [company, setCompany] = useState()
    const [number, setNumber] = useState()

    const [loading, setLoading] = useState()

    const { currentUser } = useAuth()
    const email = currentUser.email
    const uid = currentUser.uid

    function handleSubmit(e) {

        e.preventDefault()
        results.put('users/establishment/' + uid + '.json', {
            email: email,
            userName: person,
            userTitle: title,
            companyName: company,
            contactNumber: number
        })
            .then(function () {
                history.push('/');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <FloatingLabel
                        className="mb-3"
                        label="Contact Person Name"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Contact Person Name"
                            onChange={(e) => setPerson(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel
                        className="mb-3"
                        label="Contact Person Title"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Contact Person Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel
                        className="mb-3"
                        label="Company Name"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Company Name"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel
                        className="mb-3"
                        label="Contact Number"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="ContactNumber"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>


                <div className="d-grid gap-2">
                    <Button
                        variant="danger"
                        type="submit"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default EstablishmentForm
