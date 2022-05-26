import React, { useState } from 'react'
import { Card, Form, FloatingLabel, Button, Image, Alert } from 'react-bootstrap'
import { useAuth } from '../../../../AuthContext'
import { storage } from '../../../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import results from '../../../../results'

const CreatePost = () => {

    const { currentUser } = useAuth()
    const [postTitle, setPostTitle] = useState()
    const [postDetails, setPostDetails] = useState()
    const [postActive, setPostActive] = useState(false)
    const [url, setUrl] = useState()
    const [loading, setLoading] = useState()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState()
    const [progress, setProgress] = useState()
    const date = new Date()

    function handleBoxClick() {
        !postActive ? setPostActive(true) : setPostActive(false)
    }

    function handleUpload(file) {
        setLoading(true)
        const metadata = {
            contentType: file.type
        }
        const filePath = 'images/' + date.getFullYear() + (date.getMonth() + 1) + date.getDay() + date.getHours() + date.getMinutes() + file.name.substring(file.name.length - 10)

        const storageRef = ref(storage, filePath)
        const uploadTask = uploadBytesResumable(storageRef, file, metadata)
        uploadTask.on('state_changed',
            (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                        break
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        setError('Unauthroized upload')
                        break;
                    case 'storage/canceled':
                        setError('Upload Cancelled')
                        break;
                    case 'storage/unknown':
                        setError('Unknown Error try again')
                        break;
                    default:
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL)
                    setLoading(false)
                })
            }
        )

    }

    function handleSubmit() {
        results.post('/posts/' + currentUser.uid + '/.json', {
            title: postTitle,
            details: postDetails,
            active: postActive,
            imageRef: url,
            date: date
        }).catch(function () {
            setError('Database Error')
        }).then(function () {
            setSuccess(true)
        })
    }

    return (
        <div>

            <div className='d-flex justify-content-center'>
                <Card className='m-3' style={{ width: '800px' }}>
                    <Card.Header className='bg-danger text-white'>
                        Create Post
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            {success && <Alert className='mb-3' variant='success' style={{ fontSize: '14px' }}> Post Success </Alert>}
                            {error && <Alert className='mb-3' variant='danger' style={{ fontSize: '14px' }}> {error} </Alert>}
                            <Form.Group>
                                <FloatingLabel className='mb-3' label='Title' >
                                    <Form.Control
                                        placeholder='Title'
                                        required type='text'
                                        onChange={(e) => setPostTitle(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className='mb-2' controlId='exampleForm.ControlTextarea1'>
                                <Form.Control
                                        as='textarea'
                                        rows={3}
                                        placeholder='Description'
                                    onChange={(e) => setPostDetails(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Check
                                    type='checkbox'
                                    label='Active'
                                    onClick={handleBoxClick}
                                />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Attachment</Form.Label>
                                <Form.Control type="file" onChange={(e) => handleUpload(e.target.files[0])} />
                            </Form.Group>

                            <div className='d-flex justify-content-end'>
                                <Button variant='secondary' onClick={handleSubmit} disabled={loading || (!postTitle && !postDetails)}>
                                    Post {'>'}
                                </Button>
                            </div>
                        </Form>

                        <div >
                            {loading && <div>
                                {'Upload is ' + Math.round(progress) + '% done'}
                            </div>}
                            <Image className='create-post-pic' src={url} />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default CreatePost
