import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar';

import Art from '../images/art/SearchPageArt.svg'

const Search = () => {

    const [searchFound, setSearchFound] = useState(false);

    return (
        <div>
            <Navbar />
            <SearchBar />
            <div className='mt-3'>
                {!searchFound && <div className='d-flex justify-content-end align-items-center'>
                    <Image style={{ width: '40%' }} src={Art} fluid />
                </div>}
            </div>
        </div>

    )
}

export default Search
