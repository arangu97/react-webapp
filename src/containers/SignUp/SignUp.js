import React from 'react';
import {Button, Container, Form, InputGroup} from 'react-bootstrap'
import * as ROUTES from "../../constants/routes";
import axios from '../../axios';
import {Redirect} from "react-router-dom";
import logo from "../../images/nba.png";

import {FaAt, FaKey, FaUser} from 'react-icons/fa';

import './SignUp.css'


const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    error: null,
    submitted: false
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }

    handleSubmit = (event) => {
        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        };
        event.preventDefault();
        console.log(authData);
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAojn4pWJv-oo2I24rmVYd8cgO8VxcO9rQ', authData)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', JSON.stringify(response.data));
                this.props.setAuthentication(true, response.data);
                this.setState({ submitted: true})
            })
            .catch(err => {
                console.log(err);
                this.props.setAuthentication(false, {});
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    render() {
        const {
            username,
            email,
            password,
            repeatPassword,
            error
        } = this.state;

        let redirect = null;
        if (this.state.submitted || this.props.isAuthed) {
            redirect = <Redirect to={ROUTES.TIENDA} />;
        }

        const isInvalid =
            password !== repeatPassword ||
            password === '' ||
            email === '' ||
            username === '';

        return (
            <Container className='signUpContainer'>
                {redirect}
                <div className="d-flex justify-content-center h-100 pt-100">
                    <div className="signup_user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img
                                    src={logo}
                                    className="brand_logo" alt="Logo" />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center form_container'>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicUserName" style={{padding: 10}}>
                                    <Form.Label className='inputLabels'>Nombre Usuario</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend'>
                                            <FaUser className='fa' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" name="username" value={username} placeholder="Introduce nombre de usuario" onChange={this.handleChange} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" style={{padding: 10}}>
                                    <Form.Label className='inputLabels'>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend'>
                                            <FaAt className='fa' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email" name="email" value={email} placeholder="Introduce un correo electrónico" onChange={this.handleChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" style={{padding: 10}}>
                                    <Form.Label className='inputLabels'>Contraseña</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend'>
                                            <FaKey className='fa' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" name="password" value={password} placeholder="Introduce su contraseña" onChange={this.handleChange}  />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword2" style={{padding: 10}}>
                                    <Form.Label className='inputLabels'>Repita la contraseña</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend className='inputPrepend'>
                                            <FaKey className='fa' size={30}/>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" name="repeatPassword" value={repeatPassword} placeholder="Repita la contraseña" onChange={this.handleChange}  />
                                    </InputGroup>
                                </Form.Group>
                                <Button variant="danger" type="submit" disabled={isInvalid}>
                                    Registrarse
                                </Button>
                                {error && <p>{error.message}</p>}
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default SignUp;
