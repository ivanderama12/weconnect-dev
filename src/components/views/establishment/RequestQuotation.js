import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { storage } from '../../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useAuth } from '../../../AuthContext'


import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import results from '../../../results'

const RequestQuotation = () => {

    let history = useHistory()

    const { id } = useParams()
    const { currentUser } = useAuth()

    const [agency, setAgency] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const [progress, setProgress] = useState()
    const [description, setDescription] = useState()
    const [url, setUrl] = useState()
    const [path, setPath] = useState(false)
    const date = new Date()

    const [title, setTitle] = useState()

    useEffect(() => {
        setLoading(true)
        results.get('/users/serviceagency/' + id + '.json')
            .then(function (response) {
                setAgency(response.data)
                setLoading(false)
            }).catch(function (error) {
                setError(error)
                setLoading(false)
            })
    }, [id])

    function handleUpload(file) {
        setLoading(true)
        const filePath = 'documents/' + date.getFullYear() + (date.getMonth() + 1) + date.getDay() + date.getHours() + date.getMinutes() + file.name
        const storageRef = ref(storage, filePath)
        const uploadTask = uploadBytesResumable(storageRef, file)
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
                    setPath(filePath)
                    setLoading(false)
                })
            }
        )
    }

    function handleSubmit() {
        const agreement = {
            agency: id,
            establishment: currentUser.uid,
        }

        results.post('/agreements/.json', agreement)
            .then(function (response) {
                const document = {
                    fileName: path,
                    agreementID: response.data.name,
                    contentRef: url,
                    contentText: description,
                    dateTime: new Date(),
                    title: title,
                    type: 'quotation',
                    senderID: currentUser.uid
                }
                results.post('agreements/' + response.data.name + '/documents/.json', document)
                    .catch(function () {
                        setError('Database Erorr')
                    })
            })
            .catch(function () {
                setError('Database Error')
            })
            .then(function () {
                history.push('/agreements')
            })
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Container className='mt-3'>
                {!error && agency &&
                    <Card className='bg-light'>
                        <Card.Header className='bg-danger text-light'>
                            Recepient: {agency.companyName}
                            <br />
                            <Form className='mt-2 bg-danger'>
                                <Form.Group className='bg-danger' controlId="searchBar">
                                    <Form.Control
                                        size='sm'
                                        type="search"
                                        placeholder="Enter a title"
                                        onChange={(e) => setTitle(e.target.value)} />
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
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Attachment</Form.Label>
                                    <Form.Control type="file" onChange={(e) => handleUpload(e.target.files[0])} />
                                </Form.Group>

                                <div className='d-flex justify-content-between'>

                                    {<div>{progress === 100 ? 'Upload Success' : 'Uploading'}</div>}

                                    <Button
                                        disabled={!title || !url || loading}
                                        variant='danger'
                                        onClick={handleSubmit}
                                    >
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

export default RequestQuotation