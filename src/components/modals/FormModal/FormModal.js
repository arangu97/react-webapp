import React from 'react';
import PropTypes from 'prop-types';
import {Container, Navbar, Nav, Row, Col, Modal, Button, Form} from 'react-bootstrap'
import axios from '../../../axios';



class FormModal extends React.Component {

    state = {
        validated: false,
        name: '',
        surname: '',
        email: '',
        address: ''
    }
    

    static propTypes = {
        products: PropTypes.array.isRequired,
        productsCount: PropTypes.array.isRequired,
        showFormModal: PropTypes.bool.isRequired,
        handleShowGratingModal: PropTypes.func.isRequired,
        handleHideFormModal: PropTypes.func.isRequired,
        moneyCount: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired
    }

    

    handleSubmit = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        this.setState({
            validated: true
        })
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.state.name !== '' && 
            this.state.surname !== '' &&
            re.test(this.state.email) &&
            this.state.address !== ''){
                const data = {
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    address: this.state.address,
                    date: new Date(),
                    price: this.props.moneyCount
                }
                axios.post(`/pedidos/${this.props.userId}.json`, data).then(() => {
                        this.props.handleShowGratingModal()
                    }
                )
                
        }
    };

    render() {

        return(
            <Modal show={this.props.showFormModal} onHide={this.props.handleHideFormModal}>
                <Modal.Header closeButton>
                <Modal.Title>Información adicional del pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Nombre y apellidos del solicitante </Form.Label>
                        <Row>
                            <Col>
                            <Form.Control required type="text" placeholder="Nombre" onChange={(event) => this.setState({name: event.target.value})}/>
                            </Col>
                            <Col>
                            <Form.Control required type="text" placeholder="Apellidos" onChange={(event) => this.setState({surname: event.target.value})}/>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email del solicitante</Form.Label>
                        <Form.Control type="email" required placeholder="Introduce tu email" onChange={(event) => this.setState({email: event.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" required placeholder="Introduce tu dirección" onChange={(event) => this.setState({address: event.target.value})}/>
                        <Form.Text className="text-muted">
                            El envío se realizara a la dirección correspondiente.
                        </Form.Text>
                    </Form.Group>
                </Form>
                <Button variant="secondary" className="mr-3" onClick={this.props.handleHideFormModal}>
                    Cancelar
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Finalizar Pedido
                    </Button>
                </Modal.Body>
            </Modal>
        )
    }

}

export default FormModal