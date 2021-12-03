import React, { useState, useEffect } from 'react'
import { Col, Row, Image, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../../../AuthContext'
import testPic from '../../../../images/prof-icon1 1.png'
import Post from './Post'
import results from '../../../../results'

const Profile = () => {

    const { currentUser, userDetails } = useAuth()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setLoading(true)

        setError()
        const postList = []
        results.get('/posts/' + currentUser.uid + '/.json')
            .then(function (response) {
                for (let key in response.data) {
                    console.log(response.data)
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
            });
        console.log(postList)
    }, []);

    return (
        <div>
            <Card className='m-3 p-3'>
                <h3>My Profile</h3>
                <Row xs={1} sm={1} md={2}>
                    <Col className='mb-3'>
                        <div className='d-flex mt-2'>
                            <div className='profile-pic'>
                                <Image fluid src={testPic} />
                            </div>
                            <div className='ms-3'>
                                {userDetails.companyName} <br />
                                {userDetails.userName} <br />
                                {userDetails.userTitle}
                            </div>
                        </div>
                    </Col>

                    <Col>
                        {error && <Alert className='mx-3 mt-3 mb-0' variant='danger' style={{ fontSize: '14px' }}>{error} </Alert>}
                        <h3 className='mb-3'>News Feed</h3>
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
