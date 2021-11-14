import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import Navbar from '../navbar/Navbar'
import SearchBar from '../SearchBar';

import Art from '../../images/art/SearchPageArt.svg'
import { useAuth } from '../../AuthContext';



const Search = () => {

    const { setisagency } = useAuth()

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
