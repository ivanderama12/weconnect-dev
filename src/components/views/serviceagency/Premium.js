import React, { useState } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'

import SearchBar from '../../SearchBar'
import Navbar from '../../navbar/Navbar'
import Art from '../../../images/art/PremiumArt.svg'
import check from '../../../images/icons/CheckBoxRed.png'
import { Link } from 'react-router-dom'

const Premium = () => {
    const [month, setMonth] = useState('danger')
    const [semi, setSemi] = useState('secondary')
    const [year, setYear] = useState('secondary')
    const [selection, setSelection] = useState(1)

    function monthClick() {
        setMonth('danger')
        setSemi('secondary')
        setYear('secondary')
        setSelection(1)
    }

    function semiClick() {
        setMonth('secondary')
        setSemi('danger')
        setYear('secondary')
        setSelection(6)
    }

    function yearClick() {
        setMonth('secondary')
        setSemi('secondary')
        setYear('danger')
        setSelection(12)
    }

    function handlePurchase() {
        console.log(selection)
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Container className='mt-3'>
                <Row>
                    <Col>
                        <h1 className='mb-3'>Premium Account</h1>
                        <div className='mb-3 '>What you will get:</div>
                        <Container className='ms-3'>
                            <div className='mb-4'>
                                <Image className='check-art me-4' src={check} />
                                All benefits of branded Ad, plus:
                            </div>
                            <div className='mb-4'>
                                <Image className='check-art me-4' src={check} />
                                Priority listing on Mobile and Web search results
                            </div>
                            <div className='mb-4'>
                                <Image className='check-art me-4' src={check} />
                                Faster access to more establishments</div>
                            <div className='mb-4'>
                                <Image className='check-art me-4' src={check} />
                                Branding features to lift your company brand
                            </div>
                        </Container>
                        <hr />
                        <div className='mb-5 d-flex justify-content-center'>
                            <div className='p-2 flex-fill'>
                                <Button
                                    className='p-4'
                                    variant={month}
                                    onClick={monthClick}
                                >
                                    Monthly Plan
                                </Button>
                            </div>
                            <div className='p-2 flex-fill'>
                                <Button
                                    className='p-4'
                                    variant={semi}
                                    onClick={semiClick}
                                >
                                    Semi-Annual Plan
                                </Button>
                            </div>
                            <div className='p-2 flex-fill'>
                                <Button
                                    className='p-4'
                                    variant={year}
                                    onClick={yearClick}
                                >
                                    Yearly Plan
                                </Button>
                            </div>
                        </div>
                        <div className="mt-5 d-grid gap-2">
                            <Button
                                variant="success"
                                type="submit"
                                onClick={handlePurchase}
                            >
                                Purchase
                            </Button>
                        </div>

                        <div className="mt-5 d-grid gap-2">
                            <Button
                                variant="secondary"
                                as={Link}
                                to='dashboard'
                            >
                                Skip
                            </Button>
                        </div>

                    </Col>
                    <Col className='d-none d-lg-block d-xl-block' >
                        <Image src={Art} fluid />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Premium
