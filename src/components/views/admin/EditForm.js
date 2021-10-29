import React, { useState, useEffect } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import results from '../../../results'

const EditForm = (props) => {
    const uid = props.uid
    const type = props.type

    const [contactPerson, setContactPerson] = useState()
    const [companyName, setCompanyName] = useState()
    const [email, setEmail] = useState()
    const [premiumExpiry, setPremiumExpiry] = useState()
    const [user, setUser] = useState()

    // var d = new Date()
    // var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

    useEffect(() => {
        results.get('/users/' + type + '/' + uid + '.json')
            .then(function (response) {
                setUser(response.data)
                setContactPerson(response.data.contactPerson)
                setCompanyName(response.data.companyName)
                setEmail(response.data.email)
                setPremiumExpiry(response.data.premiumExpiry)
            }).catch(function (error) {
                //error here
                console.log(error)
            })
    }, [type, uid])

    function handleSubmit() {
        console.log(user.email, email)
        if (user.email !== email) {

        }
    }

    const isAgency = props.type === 'serviceagency' ? true : false
    return (
        <div>
            {isAgency && <Form>
                <Form.Group>
                    <FloatingLabel
                        label="Contact Person"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Contact Person"
                            value={contactPerson}
                            onChange={
                                (e) => setContactPerson(e.target.value)
                            }
                        />
                    </FloatingLabel >
                </Form.Group>

                <Form.Group >
                    <FloatingLabel
                        label="Company Name"
                        className="mb-3" >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={
                                (e) => setCompanyName(e.target.value)
                            }
                        />
                    </FloatingLabel >
                </Form.Group>

                <Form.Group>
                    <FloatingLabel
                        label="Email Address"
                        className="mb-3" >
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={
                                (e) => setEmail(e.target.value)
                            }
                        /> </FloatingLabel>
                </Form.Group>

                <Form.Group >
                    <FloatingLabel
                        label="Premium Expiry"
                        className="mb-3" >
                        <Form.Control
                            type='date'
                            value={premiumExpiry}
                            onChange={
                                (e) => setPremiumExpiry(e.target.value)
                            }
                        /> </FloatingLabel>
                </Form.Group>

                <div className="d-grid gap-2" >
                    <Button variant="success"
                        // type="submit"
                        onClick={handleSubmit} >
                        Submit </Button>
                    <hr /> {premiumExpiry}
                </div>
            </Form>}
        </div>
    )
}

export default EditForm