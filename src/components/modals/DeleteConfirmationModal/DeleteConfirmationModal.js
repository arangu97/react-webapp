import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button} from 'react-bootstrap'



class DeleteConfirmationModal extends React.Component {


    static propTypes = {
        deleteId: PropTypes.string.isRequired,
        deleteIndex: PropTypes.number.isRequired,
        showDeleteConfirmationModal: PropTypes.bool.isRequired,
        handleHideDeleteConfirmationModal: PropTypes.func.isRequired,
        handleDelete: PropTypes.func.isRequired
    };

    render() {

        const {deleteId, deleteIndex, showDeleteConfirmationModal, handleHideDeleteConfirmationModal, handleDelete} = this.props
        return(
            <Modal show={showDeleteConfirmationModal} onHide={handleHideDeleteConfirmationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3> ¿Está seguro de que quiere eliminar el pedido? </h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideDeleteConfirmationModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(deleteId,deleteIndex)}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default DeleteConfirmationModal