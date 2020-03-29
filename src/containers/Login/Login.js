import React from 'react';
import {Button, Container, Form} from 'react-bootstrap'
import * as ROUTES from "../constants/routes";
import {Link, Redirect} from "react-router-dom";
import axios from '../axios';



const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    submitted: false
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }

    handleSubmit = (event) => {
        const authData = {
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAojn4pWJv-oo2I24rmVYd8cgO8VxcO9rQ', authData)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', JSON.stringify(response.data));
                this.props.setAuthentication(true, response.data);
                this.setState({ submitted: true})
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: err
                })
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
            email,
            password,
            error
        } = this.state;

        let redirect = null;
        if (this.state.submitted || this.props.isAuthed) {
            redirect = <Redirect to={ROUTES.TIENDA} />;
        }

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <Container>
                {redirect}
                <h1>
                    Login
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={email} placeholder="Introduce un correo electrónico" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={password} placeholder="Introduce su contraseña" />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isInvalid}>
                        Iniciar Sesión
                    </Button>
                    <p>
                        No tienes una cuenta? <Link to={ROUTES.SIGN_UP}>Registrate</Link>
                    </p>
                    {error && <p>{error.message}</p>}
                </Form>
            </Container>
        );
    }
}
export default Login;
