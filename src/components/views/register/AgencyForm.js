import React, { useState } from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useAuth } from '../../../AuthContext'
import results from '../../../results'

const AgencyForm = () => {

    const history = useHistory();

    const [person, setPerson] = useState()
    const [title, setTitle] = useState()
    const [company, setCompany] = useState()
    const [number, setNumber] = useState()

    const [loading, setLoading] = useState()

    const { currentUser, updateprofile } = useAuth()
    const email = currentUser.email
    const uid = currentUser.uid
    const imageRef = 'https://firebasestorage.googleapis.com/v0/b/weconnect-dev-de5dc.appspot.com/o/images%2Fprof-icon1%201.png?alt=media&token=3882b521-d138-479e-ab70-5d4aa3edae3c'
    const date = new Date()
    const expiry = date.setMonth(date.getMonth() + 1)

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        results.put('users/serviceagency/' + uid + '.json', {
            imageRef: imageRef,
            email: email,
            userName: person,
            userTitle: title,
            companyName: company,
            contactNumber: number,
            premiumExpiry: expiry,
            accountStatus: "Free Trial"
        })
            .then(function () {
                setLoading(false)
                updateprofile(company, imageRef)
                history.push('premium');
                history.go(0)
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error);
            });
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <FloatingLabel className="mb-3" label="Contact Person Name" >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Contact Person Name"
                            onChange={(e) => setPerson(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel className="mb-3" label="Contact Person Title" >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Contact Person Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel className="mb-3" label="Company Name" >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Company Name"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel className="mb-3" label="Contact Number" >
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

export default AgencyForm
