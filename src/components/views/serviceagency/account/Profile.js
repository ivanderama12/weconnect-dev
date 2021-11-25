import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useAuth } from '../../../../AuthContext'

const Profile = () => {
    const { userDetails } = useAuth()
    return (
        <div>
            <h3>My Profile</h3>
            <Row sm={1} md={2}>
                <Col fluid>test</Col>
                <Col fluid>Test</Col>
            </Row>
        </div>
    )
}

export default Profile
