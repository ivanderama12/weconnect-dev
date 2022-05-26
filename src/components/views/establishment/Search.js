import React, { useState, useEffect } from 'react'
import { Button, Card, Container, Form, Image } from 'react-bootstrap'
import { useHistory } from 'react-router'

import Navbar from '../../navbar/Navbar'
import Menu from './Menu'
import results from '../../../results'

import Art from '../../../images/art/SearchPageArt.svg'

const Search = () => {

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    let history = useHistory()

    useEffect(() => {
        const userList = []
        results.get('/users/serviceagency/.json')
            .then(function (response) {
                for (let key in response.data) {
                    userList.unshift(
                        {
                            ...response.data[key],
                            key: key
                        }
                    )
                }
            }).catch(function (error) {
                //error here
                setLoading(false)
                console.log(error)
            }).then(function () {
                setLoading(false)
                setUsers(userList)
                console.log(users)
            })
    }, [])

    function handleClick(key) {
        history.push('/agency/' + key);
    }

    return (
        <div>
            <Navbar />
            <div className="bg-red-gradient p-3 py-2" >
                <Container
                    className='d-flex justify-content-center'
                    style={{ gap: '10px' }}>
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
            <Menu />
            <Container className="mt-3">


                {!loading && users.length !== 0 && <div>
                    <Card className='m-3'>
                        <Card.Header>
                            <h3>Top Agencies</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className='d-flex' style={{gap:'5px'}}>
                                {users.map((user) =>
                                    <Card
                                        style={{ width: '7rem' }}
                                        variant='outline-secondary'
                                        onClick={(e) => handleClick(user.key)}
                                        className=''>
                                        <Card.Img src={user.imageRef} className='p-3' fluid/>
                                        <Card.Body className='px-1'>
                                            {user.companyName}
                                        </Card.Body>
                                    </Card>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </div>}

            </Container >
        </div >
    )
}

export default Search