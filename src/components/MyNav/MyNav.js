import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom'
import {Navbar, Container, Dropdown} from 'react-bootstrap'

import * as ROUTES from '../../constants/routes';
import {FaUser, FaTshirt, GoChecklist} from 'react-icons/all';

class MyNav extends React.Component {
    render() {
        const {isAuthed, logout} = this.props
        return (
            <Container>
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" style={{paddingRight: 45}}>
                    <Navbar.Brand href="/tienda">
                        <img src="https://es.nba.com/assets/img/social_share_default.png" height="100" style={{marginRight: 10}}/>{' '}
                        NBA Store
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{marginRight: 20}}/>
                    <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-center'>
                            <ul className="navbar-nav">
                                <li style={{paddingLeft: 20}}>
                                    <NavLink to={ROUTES.TIENDA} style={{color: this.props.location.pathname === ROUTES.TIENDA ? '#0d6efd' : '#ffffff'}}><FaTshirt /> Productos</NavLink>
                                </li>
                                {isAuthed &&
                                <li style={{paddingLeft: 20}}>
                                    <NavLink to={ROUTES.PEDIDOS} style={{color: this.props.location.pathname === ROUTES.PEDIDOS ? '#0d6efd' : '#ffffff'}}> <GoChecklist /> Mis Pedidos</NavLink>
                                </li>
                                }
                            </ul>
                            <Dropdown className='ml-auto'>
                                <Dropdown.Toggle>
                                    <FaUser />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {isAuthed &&
                                        <Dropdown.Item>
                                            <li onClick={logout}>Cerrar Sesión</li>
                                        </Dropdown.Item>
                                    }
                                    {!isAuthed &&
                                    <Dropdown.Item>
                                        <NavLink to={ROUTES.LOGIN}> Iniciar Sesión</NavLink>
                                    </Dropdown.Item>
                                    }
                                    {!isAuthed &&
                                    <Dropdown.Item>
                                        <NavLink to={ROUTES.SIGN_UP}> Registrarse </NavLink>
                                    </Dropdown.Item>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}
MyNav = withRouter(MyNav);

export default MyNav;