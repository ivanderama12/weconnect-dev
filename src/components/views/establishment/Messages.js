import React, { useState } from 'react'
import { Card, Container, Col, Row, Image, Form } from 'react-bootstrap'

import Menu from './Menu'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import MessageWindow from '../messaging/MessageWindow'

const Messages = () => {

    return (
        <div>
            <Navbar />
            <SearchBar />
            <Menu />
            <MessageWindow />
        </div>
    )
}

export default Messages
