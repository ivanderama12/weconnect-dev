import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import HomeIcon from '../../../images/icons/HomeIcon.png'
import SearchIcon from '../../../images/icons/SearchIcon.png'
import AgreementsIcon from '../../../images/icons/AgreementIcon2.png'

const Menu = () => {
    return (
        <div className='bg-secondary d-flex justify-content-center'>
            <Button as={Link} to='dashboard' size='sm' variant='secondary'>
                <Image className='button-art-menu' src={HomeIcon}></Image> <br />
                <a className='text-decoration-none text-dark'>Home</a>
            </Button>

            <Button as={Link} to='search' size='sm' variant='secondary'>
                <Image className='button-art-menu' src={SearchIcon}></Image> <br />
                <a className='text-decoration-none text-dark'>Search</a>
            </Button>

            <Button as={Link} to='agreements' size='sm' variant='secondary'>
                <Image className='button-art-menu' src={AgreementsIcon}></Image> <br />
                <a className='text-decoration-none text-dark'>Agreements</a>
            </Button>
        </div>
    );
}

export default Menu;