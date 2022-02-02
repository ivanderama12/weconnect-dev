import React, { useState, useEffect } from 'react'

import { Alert, Button, ButtonGroup, Card, Col, Image, Row } from 'react-bootstrap'

import Post from './Post'
import ViewProfile from './ViewProfile'
import EditProfile from './EditProfile'

import { useAuth } from '../../../../../AuthContext'
import results from '../../../../../results'

const Profile = () => {

    const { currentUser, userDetails } = useAuth()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [posts, setPosts] = useState([])

    const [viewBtnVar, setViewBtnVar] = useState('danger')
    const [editBtnVar, setEditBtnVar] = useState('secondary')

    useEffect(() => {
        setLoading(true)
        setError()
        const postList = []
        results.get('/posts/' + currentUser.uid + '/.json')
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
    }, [currentUser.uid])

    function handleButtonClick(button) {
        setViewBtnVar('secondary')
        setEditBtnVar('secondary')
        if (button === 'view')
            setViewBtnVar('danger')
        if (button === 'edit')
            setEditBtnVar('danger')
    }

    return (
        <div>
            <Card className='m-3 p-3'>
                <Row xs={1} sm={1} md={1} lg={2}>
                    <Col className='mb-3'>
                        <div className='d-flex justify-content-between'>
                            <h2>My Profile</h2>
                            <ButtonGroup>
                                <Button
                                    size='sm'
                                    variant={viewBtnVar}
                                    onClick={(e) => handleButtonClick('view')}
                                >
                                    View Profile
                                </Button>
                                <Button
                                    size='sm'
                                    variant={editBtnVar}
                                    onClick={(e) => handleButtonClick('edit')}
                                >
                                    Edit Profile
                                </Button>
                            </ButtonGroup>
                        </div>
                        {viewBtnVar === 'danger' && <div><ViewProfile /></div>}
                        {editBtnVar === 'danger' && <div><EditProfile /></div>}
                    </Col>

                    <Col>
                        {error && <Alert className='mx-3 mt-3 mb-0' variant='danger' style={{ fontSize: '14px' }}>{error} </Alert>}
                        <h3 className='mb-3'>News Feed</h3>
                        {posts.length === 0 && <div>
                            Your feed is empty
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
            </Card>
        </div>
    )
}
export default Profile
