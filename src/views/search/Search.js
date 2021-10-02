import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import Art from './SearchPageArt.svg'

const Search = () => {

    const [searchFound, setSearchFound] = useState(false);

    return (
        <div>
            {!searchFound && <div className='d-flex justify-content-end align-items-center'>
                <Image style={{ width: '40%' }} src={Art} fluid />
            </div>}
        </div>
    )
}

export default Search
