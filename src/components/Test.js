import React from 'react'
import Navbar from './navbar/Navbar'
import { Button, Card } from 'react-bootstrap'

const Test = () => {
    return (
        <div className='m-0 p-0' style={{ height: '100vh' }}>
            <Navbar />
            <div className='d-flex justify-content-between' style={{ height: '91%' }}>
                <div className='bg-danger' style={{ height: '100%', width: '100%' }}>
                    asd
                </div>
                <div className='bg-secondary' style={{ height: '100%', width: '100%' }}>
                    <Card>
                        <Card.Header>Someshit</Card.Header>
                        <Card.Body className='p-0 m-0'>
                            <div className='overflow-auto' style={{height:'82vh'}}> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

                                Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" </div>
                            <Button size='sm'>Somebutton</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Test
