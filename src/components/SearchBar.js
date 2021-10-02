import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="bg-red-gradient p-3" >
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
        </div >
    )
}

export default SearchBar
