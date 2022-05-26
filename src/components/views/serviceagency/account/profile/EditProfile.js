import React, { useState } from 'react'
import { Form, Button, FloatingLabel, Image, Alert } from 'react-bootstrap'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '../../../../../firebase'

import { useAuth } from '../../../../../AuthContext'
import results from '../../../../../results'

const EditForm = () => {

    const { currentUser, userDetails, updateprofile, updateemail, setuserdetails } = useAuth()

    const [userName, setUserName] = useState(userDetails.userName)
    const [userTitle, setUserTitle] = useState(userDetails.userTitle)
    const [companyName, setCompanyName] = useState(userDetails.companyName)
    const [email, setEmail] = useState(userDetails.email)
    const [url, setUrl] = useState(userDetails.imageRef)

    const [progress, setProgress] = useState()
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
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
                        console.log(url, file)
                    })
                }
            )
        }
    }

    function handleSubmit() {
        // setSuccess(false)
        // setError()
        // console.log(currentUser)
        // if (!password) {
        //     submit()
        // } else {
        //     if (password !== confirmPassword) {
        //         setError('Passwords do not match')
        //     }-
        // }
    }

    async function submit() {
        var errorCheck = false
        if (email !== userDetails.email) {
            console.log(email, 'emailchange')
            try {
                await updateemail(email)
            } catch {
                setError('Something went wrong')
                errorCheck = true
            }
        }

        if (url !== userDetails.imageRef || companyName !== userDetails.companyName) {
            try {
                console.log('picchange')
                await updateprofile(companyName, url)
            } catch {
                setError('Something went wrong')
                errorCheck = true
            }
        }

        if (!errorCheck) {
            results.patch('/users/serviceagency/' + currentUser.uid + '/.json', {
                ...userDetails,
                companyName: companyName,
                email: email,
                userName: userName,
                userTitle: userTitle,
                imageRef: url
            }).catch(function () {
                setError('Database Error')
            }).then(function (response) {
                setuserdetails(response.data)
                setSuccess(true)
            })
        }
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

                {error && <Alert variant='danger'>{error}</Alert>}
                {success && <Alert variant='success'>wohoo</Alert>}


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
                        label="Contact Person"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Contact Person"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </FloatingLabel >
                </Form.Group>

                <Form.Group>
                    <FloatingLabel
                        label="Contact Person"
                        className="mb-3"
                    >
                        <Form.Control
                            required
                            type="text"
                            placeholder="Title"
                            value={userTitle}
                            onChange={(e) => setUserTitle(e.target.value)}
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

                <Form.Group>
                    <FloatingLabel
                        label="Password"
                        className="mb-3" >
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel
                        label="Confirm Password"
                        className="mb-3" >
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <div className="d-grid gap-2" >
                    <Button variant="success"
                        disabled={loading}
                        onClick={handleSubmit} 
                        >
                        Save
                    </Button>
                </div>
            </Form >
        </div >
    )
}

export default EditForm