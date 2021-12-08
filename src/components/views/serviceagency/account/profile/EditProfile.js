import React, { useState } from 'react'
import { Form, Button, FloatingLabel, Image } from 'react-bootstrap'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '../../../../../firebase'

import { useAuth } from '../../../../../AuthContext'
import results from '../../../../../results'

const EditForm = () => {

    const { currentUser, userDetails, updateprofile, updateemail } = useAuth()

    const [contactPerson, setContactPerson] = useState(userDetails.userName)
    const [companyName, setCompanyName] = useState(userDetails.companyName)
    const [email, setEmail] = useState(userDetails.email)
    const [url, setUrl] = useState(userDetails.imageRef)

    const [progress, setProgress] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)


    const date = new Date()

    function handleUpload(file) {
        if (file) {
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
                            console.log('Upload is paused')
                            break;
                        case 'running':
                            console.log('Upload is running')
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
    }

    function handleSubmit() {
        setSuccess(false)
        console.log(contactPerson, companyName, url)
        if (email !== userDetails.email) {

        }
        console.log(url !== userDetails.imageRef || companyName !== userDetails.companyName)
        // results.put('/users/serviceagency/' + currentUser.uid + '/.json', {

        // }).catch(function () {
        //     setError('Database Error')
        // }).then(function () {
        //     setSuccess(true)
        // })
    }

    return (
        <div>
            <Form className='p-3' >
                <div className='mb-3 d-flex' style={{ gap: '35px' }}>
                    <div className='profile-pic'>
                        <Image fluid src={url} />
                    </div>

                    <div>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Change Profile Picture</Form.Label>
                            <Form.Control type="file" size='sm' onChange={(e) => handleUpload(e.target.files[0])} />
                        </Form.Group>

                        {loading && <div>
                            Uploading {Math.round(progress)} %
                        </div>}
                        {progress === 100 && !loading && <div className='text-success'>
                            Upload Complete!
                        </div>}
                    </div>
                </div>



                <Form.Group>
                    <FloatingLabel
                        label="Contact Person"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Contact Person"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                        />
                    </FloatingLabel >
                </Form.Group>

                <Form.Group >
                    <FloatingLabel
                        label="Company Name"
                        className="mb-3" >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </FloatingLabel >
                </Form.Group>

                <Form.Group>
                    <FloatingLabel
                        label="Email Address"
                        className="mb-3" >
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <div className="d-grid gap-2" >
                    <Button variant="success"
                        // type="submit"
                        disabled={loading}
                        onClick={handleSubmit} >
                        Save
                    </Button>
                </div>
            </Form >
        </div >
    )
}

export default EditForm