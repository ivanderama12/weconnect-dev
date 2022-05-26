import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import results from '../../../results'
import { useAuth } from '../../../AuthContext'
import { Card, Button, Form } from 'react-bootstrap'

const Messages = (props) => {

    const convo = props.convo
    const convoID = props.convoID

    const { currentUser } = useAuth()
    const [message, setMessage] = useState()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const messagesEndRef = React.createRef()

    useEffect(() => {
        const messageList = []
        results.get('/conversations/' + convoID + '/messages.json')
            .then(function (response) {
                const messages = response.data
                for (let key in messages) {
                    messageList.unshift(
                        {
                            ...messages[key],
                            key: key
                        }
                    )
                }
                const sortedMessages =
                    _(messageList)
                        .orderBy(['createdAt'], 'asc')
                        .value()
                setMessages(sortedMessages)
            })
    }, [messages])

    function MyMessage(message) {
        return (
            <div className='d-flex justify-content-end text-light mb-1 me-2'>
                <Card className='bg-danger p-1'>{message.message.message}</Card>
            </div>
        )
    }

    function TheirMessage(message) {
        return (
            <div className='d-flex text-light mb-1 ms-2'>
                <Card className='bg-secondary p-1'>{message.message.message}</Card>
            </div>
        )
    }

    function submitMessage(e) {
        e.preventDefault()
        const data = {
            sender: currentUser.uid,
            createdAt: new Date(),
            message: message
        }
        results.post('conversations/' + convoID + '/messages.json', data)
    }

    return (
        <div className='flex-fill' style={{ height: '100%', width: '100%' }}>
            <Card >
                {!loading && <Card.Header>
                    {convo && <h4>{convo.otherPerson.companyName}</h4>}
                </Card.Header>}
                {!loading && <Card.Body className='p-0'>
                    <div className='overflow-auto p-0 m-0' style={{ height: '73vh' }}>
                        {messages.map((message) => {
                            const isMyMessage = message.sender === currentUser.uid
                            return (
                                isMyMessage ? <MyMessage message={message} /> : <TheirMessage message={message} />
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                    <Form
                        className='mx-0 mb-0'
                        onSubmit={submitMessage}>
                        <div className='d-flex'>
                            <Form.Group className='flex-fill me-1' controlId="chatInput ">
                                <Form.Control
                                    autoComplete='off'
                                    size='sm'
                                    type="text"
                                    placeholder="Aa"
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </Form.Group>
                            <Button type='submit' variant='danger' size='sm' disabled={!message}>Send</Button>
                        </div>
                    </Form>
                </Card.Body>}

            </Card>
        </div>

    )
}

export default Messages
