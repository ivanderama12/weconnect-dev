import React, { useEffect, useState } from 'react'

import { Alert, Image } from 'react-bootstrap'

import { useAuth } from '../../../../../AuthContext'
import results from '../../../../../results'

const ViewProfile = () => {

    const [loading, setLoading] = useState()
    const { currentUser, userDetails } = useAuth()
    const [services, setServices] = useState([])
    const [error, setError] = useState()

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
            }).catch(function () {
                setLoading(false)
                setError('Database Error')
            })
            .then(function () {
                setLoading(false)
                setServices(serviceList)
            })
    }, [currentUser.uid])

    return (
        <div>
            <div className='d-flex mt-3'>
                {!loading && error && <Alert className='mx-3 mt-3 mb-0' variant='danger' style={{ fontSize: '14px' }}>{error} </Alert>}

                <div className='profile-pic'>
                    <Image fluid src={userDetails.imageRef} />
                </div>

                <div className='ms-3'>
                    <h5>{userDetails.companyName}</h5>
                    <div className='text-muted'>{userDetails.userName}</div>
                    {userDetails.userTitle}
                </div>
            </div>

            <div className='mt-3 p-3' style={{ maxWidth: '450px' }}>
                <div className='d-flex justify-content-between fw-bold'>
                    <p>Services</p>
                    <p>Availability</p>
                </div>
                {services.map((service) =>
                    <div key={service.id} className='d-flex justify-content-between'>
                        <div>{service.name}</div>
                        <div>{service.availability}</div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default ViewProfile
