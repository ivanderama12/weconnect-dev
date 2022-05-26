import React from 'react'
import { Card, Col, Container, Row, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const View = () => {
    const imageRef = 'https://firebasestorage.googleapis.com/v0/b/weconnect-dev-de5dc.appspot.com/o/images%2Fprof-icon1%201.png?alt=media&token=3882b521-d138-479e-ab70-5d4aa3edae3c'
    const agreements = [{ imgRef: imageRef, establishmentName: 'Test1', selected: true }, { imgRef: imageRef, establishmentName: 'Test2', selected: false }, { imgRef: imageRef, establishmentName: 'Test3', selected: false }, { imgRef: imageRef, establishmentName: 'Test4', selected: false }]
    // const [selected, setSelected] = useState()

    let history = useHistory()

    return (
        <div>
            <Container>
                <Row xs={1} sm={1} md={1} lg={2} xl={2}>
                    <Col lg={4}>
                        <Card className='m-3'>
                            <h4 className='m-3'>List of Agreements</h4>
                            <div className='mt'>
                                {agreements.map((agreement) =>
                                    <div className={!agreement.selected ? 'd-flex ps-3' : 'ps-3 d-flex bg-danger'}>
                                        <Image className='agreements-profile-pic my-2' src={agreement.imgRef} />
                                        <div className='ms-3 mt-2'>{agreement.establishmentName}</div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Col>

                    <Col>
                        <Card className='m-3'>
                            <Card.Header>
                                <h2 className='mb-3'>Progress Tracker</h2>

                            </Card.Header>
                            <Card.Body>
                                <p>
                                    Test1 <br />
                                    Test Company Name
                                </p>
                                <Card className='px-1 mb-2 bg-success'>
                                    <div className='d-flex justify-content-between'>
                                        <div>1. Quotation Request</div>
                                        <div>View Document</div>
                                    </div>
                                </Card>
                                <Card className='px-1 mb-2 bg-primary'
                                    onClick={(e) => history.push('send')}>
                                    <div className='d-flex justify-content-between'>
                                        <div>2. Quotation</div>
                                        <div>Send</div>
                                    </div>
                                </Card>
                                <Card className='px-1 mb-2 '>
                                    <div className='d-flex justify-content-between'>
                                        <div>3. Letter of Acceptance</div>
                                        <div>...</div>
                                    </div>
                                </Card>
                                <Card className='px-1'>
                                    <div className='d-flex justify-content-between'>
                                        <div>4. Contract</div>
                                        <div>...</div>
                                    </div>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default View
