import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Button, Container, Col, Image, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'

import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import results from '../../../results'
import Post from '../serviceagency/account/profile/Post'

const ViewAgency = () => {
    const { id } = useParams()
    const [userDetails, setUserDetail] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState([])
    const [posts, setPosts] = useState([])

    let history = useHistory()

    useEffect(() => {
        results.get('/users/serviceagency/' + id + '.json')
            .then(function (result) {
                setUserDetail(result.data)
            }).catch(function (error) {
                console.log(error)
            })

    })

    useEffect(() => {
        const serviceList = []
        results.get('/services.json')
            .then(function (response) {
                for (let key in response.data) {
                    if (response.data[key][id]) {
                        serviceList.unshift(
                            {
                                id: key,
                                name: response.data[key].serviceName,
                                availability: response.data[key][id].availability
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
    }, [id])

    useEffect(() => {
        setLoading(true)
        setError()
        const postList = []
        results.get('/posts/' + id + '/.json')
            .then(function (response) {
                for (let key in response.data) {
                    postList.unshift(
                        {
                            ...response.data[key],
                            id: key
                        }
                    )
                }
            })
            .catch(function (error) {
                setLoading(false)
                setError('Database Error')
            })
            .then(function () {
                setLoading(false)
                setPosts(postList)
            })
    }, [id])

    function handleClick() {
        history.push('/agency/'+id+'/request');
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            {userDetails && <div>
                <Container className='mt-3'>
                    <Row>
                        <Col>
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



                        </Col>
                        <Col>
                            <div className='d-flex justify-content-end'>
                                <Button size='sm' variant='danger'
                                    onClick={handleClick}>
                                    Request Quotation
                                </Button>
                            </div>
                            {error && <Alert className='mx-3 mt-3 mb-0' variant='danger' style={{ fontSize: '14px' }}>{error} </Alert>}
                            <h3 className='mb-3'>News Feed</h3>
                            {posts.length === 0 && <div>
                                Feed is empty
                            </div>}
                            {!loading && posts.length !== 0 && <div>
                                <div>
                                    {posts.map((post) =>
                                        <Post key={post.id} post={post} />
                                    )}
                                </div>
                            </div>}
                        </Col>
                    </Row>
                </Container>
            </div >}
        </div >
    )
}

export default ViewAgency;
