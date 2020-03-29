import React from 'react';
import PropTypes from 'prop-types';
import { Row, Modal, Button, Col} from 'react-bootstrap'

import {FaMoneyBillWave} from 'react-icons/fa';


class ConfirmationModal extends React.Component {


    static propTypes = {
        products: PropTypes.array.isRequired,
        productsCount: PropTypes.array.isRequired,
        showConfirmationModal: PropTypes.bool.isRequired,
        handleHideConfirmationModal: PropTypes.func.isRequired,
        handleShowFormModal: PropTypes.func.isRequired,
        moneyCount: PropTypes.number.isRequired
    }

    render() {

        return(
            <Modal show={this.props.showConfirmationModal} onHide={this.props.handleHideConfirmationModal}>
                <Modal.Header closeButton>
                <Modal.Title>Confirmación del pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className='list-group'>
                        {this.props.products.map((product,id) => {
                            if(this.props.productsCount[id] !== 0){
                                return(
                                    <li className='list-group-item'>
                                        <Row className="p-2" key={id}>
                                            <Col sm="3">
                                                <img src={product.image} alt={product.title} width="100%"/>
                                            </Col>
                                            <Col sm="9">
                                                <Row style={{height: '50%', marginBottom: 10}} className='justify-center'>
                                                    {product.title}
                                                </Row>
                                                <Row>
                                                    <Col className='justify-center'>
                                                        <b>Unidades: {this.props.productsCount[id]}</b>
                                                    </Col>
                                                    <Col>
                                                        <b> Coste: {product.price * this.props.productsCount[id]} € </b>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Row className="text-center float-left p-2">
                        <FaMoneyBillWave size={24} style={{paddingRight: 5}} />
                        Importe total : {this.props.moneyCount}€
                    </Row>
                    <Button variant="secondary" onClick={this.props.handleHideConfirmationModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={this.props.handleShowFormModal}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default ConfirmationModal