import React, { useState } from 'react'
import { Card, Col, Row, Image } from 'react-bootstrap'

const View = () => {
    const imageRef = 'https://firebasestorage.googleapis.com/v0/b/weconnect-dev-de5dc.appspot.com/o/images%2Fprof-icon1%201.png?alt=media&token=3882b521-d138-479e-ab70-5d4aa3edae3c'
    const agreements = [{ imgRef: imageRef, establishmentName: 'wah' }, { imgRef: imageRef, establishmentName: 'weh' }, { imgRef: imageRef, establishmentName: 'wih' }, { imgRef: imageRef, establishmentName: 'woh' }]
    const [selected, setSelected] = useState()

    return (
        <div>
            <Row xs={1} sm={2} md={2}>
                <Col>
                    <Card className='m-3 p-3'>
                        <h4 className='mb-3'>List of Agreements</h4>
                        <div className='ms-3'>
                            {agreements.map((agreement) =>
                                <div className='d-flex'>
                                    <Image className='agreements-profile-pic mt-2' src={agreement.imgRef} />
                                    <div className='ms-3 mt-3'>{agreement.establishmentName}</div>
                                </div>
                            )}
                        </div>
                    </Card>
                </Col>

                <Col>
                    <Card className='m-3 p-3'>
                        <h4 className='mb-3'>Progress Tracker</h4>
                        <div className='ms-3'>
                            ASDHIJASD HERE
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default View
