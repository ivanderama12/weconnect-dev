import React, { useState, useEffect } from 'react'
import { Button, Card, Image, Form } from 'react-bootstrap'
import results from '../../../results'
import _ from 'lodash'
import { useAuth } from '../../../AuthContext'
import Messages from './Messages'

const MessageWindow = () => {
    const [search, setSearch] = useState()
    const [selectedConvoID, setSelectedConvoID] = useState()
    const [selectedConvo, setSelectedConvo] = useState()
    const [conversations, setConversations] = useState([])
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const currentuser = currentUser.uid
        const convoList = []
        var sortConvos
        results.get('/conversations.json')
            .then(function (response) {
                for (let key in response.data) {
                    const data = response.data[key]
                    var otherPerson
                    if (data.p1 === currentuser || data.p2 === currentuser) {
                        const msgList = []

                        const otherPersonID = (data.p1 === currentuser) ? data.p2 : data.p1

                        const messages = response.data[key].messages
                        for (let x in messages) {
                            msgList.unshift(
                                {
                                    ...messages[x],
                                    key: x
                                }
                            )
                        }
                        const messageList =
                            _(msgList)
                                .orderBy(['createdAt'], 'desc')
                                .slice(0, 1)
                                .value()
                        const latestMessage = messageList[0]

                        Promise.all([results.get('users/establishment.json'), results.get('users/serviceagency.json')])
                            .then(function (response) {
                                for (let i = 0; i < response.length; i++) {
                                    for (let key in response[i].data) {
                                        if (key === otherPersonID) {
                                            otherPerson = response[i].data[key]
                                        }
                                    }
                                }
                                convoList.unshift(
                                    {
                                        key: key,
                                        date: latestMessage.createdAt,
                                        otherPerson: otherPerson,
                                        imageRef: otherPerson.imageRef,
                                        latestMessage: latestMessage.message,
                                        selected: false
                                    }
                                )

                            }).then(function () {
                                sortConvos =
                                    _(convoList)
                                        .orderBy(['createdAt'], 'desc')
                                        .value()

                                sortConvos[0] = {
                                    ...sortConvos[0],
                                    selected: true
                                }
                                setSelectedConvoID(sortConvos[0].key)
                                setSelectedConvo(sortConvos[0])
                                setConversations(sortConvos)
                                setLoading(false)
                            }).catch(function () {
                                setError(true)
                                setLoading(false)
                            })
                    }
                }
            })
    }, [])

    function clickHandler(key) {
        var convos = conversations

        for (let i = 0; i < convos.length; i++) {
            if (convos[i].key === selectedConvoID) {
                convos[i] = {
                    ...convos[i],
                    selected: false
                }
            }
            if (convos[i].key === key) {
                convos[i] = {
                    ...convos[i],
                    selected: true
                }
                setSelectedConvoID(convos[i].key)
                setSelectedConvo(convos[i])
            }
        }
        setConversations(convos)
    }

    return (
        <div >
            <div className='d-flex' style={{ height: '91%' }}>
                <Card style={{ height: '100%', width: '40%' }}>
                    <Card.Header>
                        <h4>Messages</h4>
                    </Card.Header>
                    <Card.Body className='px-0 py-0'>
                        <Form className='px-0'>
                            <Form.Group controlId="searchBar">
                                <Form.Control
                                    autoComplete='off'
                                    size='sm'
                                    type="search"
                                    placeholder="Search Messages"
                                    onChange={(e) => setSearch(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <div className='overflow-auto' style={{ height: '82%' }}>
                            {conversations.map((conversation) =>
                                <div as={Button} onClick={() => clickHandler(conversation.key)} className={!conversation.selected ? 'd-flex ps-3' : 'ps-3 d-flex bg-danger'}>
                                    <Image className='agreements-profile-pic my-2' src={conversation.imageRef} />
                                    <div className='ms-2 me-5 mt-2 text-truncate'>
                                        {conversation.otherPerson.companyName}
                                        <br />
                                        <a className='text-secondary text-decoration-none text-truncate'>{conversation.latestMessage}</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card.Body>
                </Card>
                {!loading && !error && <Messages convoID={selectedConvoID} convo={selectedConvo} />}
            </div>
        </div>
    )
}

export default MessageWindow
