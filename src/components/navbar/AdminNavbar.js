import React from 'react'
import { Navbar as NavB, Dropdown, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../images/WeConnect-Logo.svg'
import notificon from '../../images/icons/NotificationIcon.svg'
import usericon from '../../images/icons/UserIcon.svg'
import msgicon from '../../images/icons/MessageIcon.svg'
import agreeicon from '../../images/icons/AgreementIcon.svg'
import logouticon from '../../images/icons/LogoutIcon.svg'

const AdminNavbar = () => {
    return (<div >
        <NavB className="justify-content-between px-3"
            bg="light"
            expand="md" >
            <NavB.Brand as={Link}
                to='/admin' >
                <Image src={logo} alt='weconnect-logo' />
            </NavB.Brand>
            <NavB className='justify-content-end'
                id="basic-navbar-nav"
                style={
                    { gap: '10px' }} >
                <Dropdown >
                    <Dropdown.Toggle variant='light'>
                        Admin
                    </Dropdown.Toggle>
                    <Dropdown.Menu align='end'>
                        <Dropdown.Item as={Link}
                            to='/admin/users' >
                            <Image className='menu-icon' src={usericon} alt='users' />
                            Manage Users
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to='/admin/messages' >
                            <Image className='menu-icon' src={msgicon} alt='msgs' />
                            Messages
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to='/admin/agreements'>
                            <Image className='menu-icon' src={agreeicon} alt='agreements' /> View Agreements
                        </Dropdown.Item>
                        {/* <Dropdown.Item as={Link} to='/admin/' >Change Password</Dropdown.Item> */}
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to='/' >
                            <Image className='menu-icon' src={logouticon} alt='logout' /> Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown >
                    <Dropdown.Toggle variant='light ' >
                        <Image src={notificon}
                            alt='notif' />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align='end'>
                        <Dropdown.Item href="#action/3.1"> Action </Dropdown.Item>
                        <Dropdown.Item href="#action/3.2" > Another action </Dropdown.Item>
                        <Dropdown.Item href="#action/3.3" > Something </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to='/' > Separated link </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </NavB>
        </NavB>
    </div>
    );
}

export default AdminNavbar;