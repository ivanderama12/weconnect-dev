import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useAuth } from '../../../../AuthContext'

const Plan = () => {

    const history = useHistory()
    const { userDetails } = useAuth()

    function handleUpgrade(e) {
        e.preventDefault()
        history.push('/serviceagency/premium')
    }

    return (
        <div >
            <div className='d-flex justify-content-center'>
                <Card className='m-3' style={{ width: '500px' }}>
                    <Card.Header className='bg-success text-white text-center'>
                        Current Plan
                    </Card.Header>
                    <Card.Body>
                        <div className='d-flex justify-content-between'>
                            <div>
                                {userDetails.premiumExpiry === 0 ? 'Free Trial' : 'Premium'}
                            </div>
                            <div>
                                also this
                            </div>
                        </div>
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
