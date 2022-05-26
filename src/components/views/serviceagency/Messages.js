import React from 'react'
import Navbar from '../../navbar/Navbar'
import SearchBar from '../../SearchBar'
import MessageWindow from '../messaging/MessageWindow'

const Messages = () => {
    return (
        <div style={{ height: '100vh' }}>
            <Navbar />
            <SearchBar />
            <MessageWindow />
        </div>
    )
}

export default Messages