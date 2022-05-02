import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Container, Form } from 'react-bootstrap'

import { storage } from '../../../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useAuth } from '../../../../AuthContext'


import Navbar from '../../../navbar/Navbar'
import SearchBar from '../../../SearchBar'
import results from '../../../../results'

const SendDocument = () => {
    const { currentUser } = useAuth()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState()

    // useEffect(() => {
    //     setLoading(true)
    //     results.get('/users/serviceagency/' + id + '.json')
    //         .then(function (response) {
    //             setAgency(response.data)
    //             setLoading(false)
    //         }).catch(function (error) {
    //             setError(error)
    //             setLoading(false)
    //         })
    // }, [id])

    // function handleUpload(file) {
    //     setLoading(true)
    //     const filePath = 'documents/' + date.getFullYear() + (date.getMonth() + 1) + date.getDay() + date.getHours() + date.getMinutes() + file.name.substring(file.name.length - 10)

    //     const storageRef = ref(storage, filePath)
    //     const uploadTask = uploadBytesResumable(storageRef, file)
    //     uploadTask.on('state_changed',
    //         (snapshot) => {
    //             setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    //             switch (snapshot.state) {
    //                 case 'paused':
    //                     break;
    //                 case 'running':
    //                     break
    //             }
    //         },
    //         (error) => {
    //             switch (error.code) {
    //                 case 'storage/unauthorized':
    //                     setError('Unauthroized upload')
    //                     break;
    //                 case 'storage/canceled':
    //                     setError('Upload Cancelled')
    //                     break;
    //                 case 'storage/unknown':
    //                     setError('Unknown Error try again')
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 setUrl(downloadURL)
    //                 setLoading(false)
    //             })
    //         }
    //     )
    // }

    // function handleSubmit() {
    //     // results.post('/agreement/.json', {
    //     //     date: date
    //     // }).catch(function () {
    //     //     setError('Database Error')
    //     // }).then(function () {
    //     //     setSuccess(true)
    //     // })
    // }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Container className='mt-3'>
                {!error &&
                    <Card className='bg-light'>
                        <Card.Header className='bg-danger text-light'>
                            {/* Recepient: {agency.companyName}
                            <br /> */}
                            <Form className='mt-2 bg-danger'>
                                <Form.Group className='bg-danger' controlId="searchBar">
                                    <Form.Control
                                        size='sm'
                                        type="search"
                                        placeholder="Enter a title"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Description"
                                    />
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Attachment</Form.Label>
                                    <Form.Control
                                        type="file"
                                    // onChange={(e) => handleUpload(e.target.files[0])} 
                                    />
                                </Form.Group>

                                <div className='d-flex justify-content-end'>
                                    <Button
                                        variant='light'
                                        //  onClick={handleSubmit} 
                                        disabled={loading}>
                                        Send {'>'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>}
            </Container>
        </div>
    )
}

export default SendDocument