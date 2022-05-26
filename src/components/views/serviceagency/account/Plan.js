import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useAuth } from '../../../../AuthContext'
import Expired from '../Expired'

const Plan = () => {

    const history = useHistory()
    const { userDetails } = useAuth()

    function handleUpgrade(e) {
        e.preventDefault()
        history.push('/serviceagency/premium')
    }

    function getStatus() {
        const expiry = (~~Math.abs((new Date() - new Date(userDetails.premiumExpiry))/(1000*60*60*24)))
        return (<div className='d-flex justify-content-between'>
            <div>{userDetails.accountStatus}</div>
            {userDetails.accountStatus !== 'Expired' && <div>{expiry} days</div>}
        </div>)
    }

    return (
        <div >
            <div className='d-flex justify-content-center'>
                <Card className='m-3' style={{ width: '500px' }}>
                    <Card.Header className='bg-success text-white text-center'>
                        Current Plan
                    </Card.Header>
                    <Card.Body>
                        {getStatus()}
                    </Card.Body>
                </Card>
            </div>

            <div className='d-flex justify-content-center'>
                <Button
                    variant='secondary'
                    style={{ minWidth: '150px' }}
                    onClick={handleUpgrade}
                >
                    Upgrade
                </Button>
            </div>
        </div>
    )
}

export default Plan
