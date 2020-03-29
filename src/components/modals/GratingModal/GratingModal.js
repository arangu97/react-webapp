import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button} from 'react-bootstrap'



class GratingModal extends React.Component {


    static propTypes = {
        showGratingModal: PropTypes.bool.isRequired,
        handleHideGratingModal: PropTypes.func.isRequired,
    }

    render() {

        return(
            <Modal show={this.props.showGratingModal} onHide={this.props.handleHideConfirmationModal}>
                <Modal.Header closeButton>
                <Modal.Title>Pedido realizado con éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        La tienda de camisetas NBA le agradece su confianza. Pronto recibirá noticias sobre su pedido.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={this.props.handleHideGratingModal}>
                    Realizar un nuevo pedido
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default GratingModal