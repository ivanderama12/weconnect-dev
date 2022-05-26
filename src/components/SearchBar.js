import { Alert } from 'react-bootstrap';
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useAuth } from '../AuthContext';


const SearchBar = () => {

    const [search, setSearch] = useState('');
    const { userDetails, isAgency } = useAuth()

    return (
        <div>
            {!isAgency && <div className="bg-red-gradient p-3 py-2" >
                <Container className='d-flex justify-content-center' style={{ gap: '10px' }}>
                    <Form className='w-75'>
                        <Form.Group controlId="searchBar">
                            <Form.Control
                                type="search"
                                placeholder="Search Services/Agencies"
                                onChange={(e) => setSearch(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <Button variant='light'>Search</Button>
                </Container>
            </div>}
        </div >
    )
}

export default SearchBar
