import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../../../AuthContext'
import { useHistory } from 'react-router-dom'

import results from '../../../results'


const Expired = () => {

    let history = useHistory()

    const { currentUser } = useAuth()
    const [status, setStatus] = useState()

    results.get('/users/serviceagency/' + currentUser.uid + '/premiumExpiry.json')
        .then(function (response) {
            if (new Date(response.data) > new Date()) {
                setStatus('Subscribed')
            } else {

                results.patch('/users/serviceagency/' + currentUser.uid + '/.json', { accountStatus: 'Expired' })
                    .then(function () {
                        setStatus('expired')
                    })
            }
        })

    function handleClick() {
        history.push('premium')
    }

    return (
        <div>
            {status === 'expired' && <Alert variant='danger' onClick={handleClick}>Your Subscription has Expired! Click here to subscribe.</Alert>}
        </div>
    )
}

export default Expired
