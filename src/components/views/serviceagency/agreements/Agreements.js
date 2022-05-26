import React, { useState } from 'react'
import { Card, Button, Image, Container } from 'react-bootstrap'

import viewIcon from '../../../../images/icons/ViewButton.png'
import contactIcon from '../../../../images/icons/ContactIcon.png'

import Navbar from '../../../navbar/Navbar'
import SearchBar from '../../../SearchBar'

import View from './View'
import Messages from '../../messaging/MessageWindow'
import Expired from '../Expired'

const Agreements = () => {

    return (
        <div>
            <div>
                <Navbar />
                <SearchBar />
                <Expired />
                <View />

            </div>
        </div>
    )
}

export default Agreements
