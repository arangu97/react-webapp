import React from 'react';
import axios from '../axios';
import {Container} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PedidosList from "../components/PedidosList/PedidosList";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal/DeleteConfirmationModal";
import {Redirect} from "react-router-dom";
import * as ROUTES from "../constants/routes";
import MyNav from "../components/MyNav/MyNav";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Pedidos extends React.Component {
    state = {
        pedidos: [],
        showDeletedSnackbar: false,
        showDeleteConfirmationModal: false,
        deleteIndex: null,
        deleteId: null
    }

    deletePedidoHandler = (id, index) => {
        axios.delete(`/pedidos/${id}.json`).then(() => {
            this.setState({
                showDeletedSnackbar: true
            });
            setTimeout(() => {
                let newPedidos = [...this.state.pedidos]
                newPedidos.splice(index,1)
                this.setState({
                    pedidos: newPedidos,
                    showDeletedSnackbar: false,
                    showDeleteConfirmationModal: false
                })
            },2000)
        })
    };

    handleShowDeleteConfirmationModal = (id, index) => {
        this.setState({
            showDeleteConfirmationModal: true,
            deleteIndex: index,
            deleteId: id
        })
    }

    handleHideDeleteConfirmationModal = () => {
        this.setState({
            showDeleteConfirmationModal: false
        })
    }

    componentDidMount() {
        axios.get(`/pedidos/${this.props.userId}.json`)
            .then(response => {
                let pedidos = [];
                for (let key in response.data) {
                    pedidos.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                this.setState({ pedidos: pedidos });
            }).catch(error => {
            this.setState({ error: true });
        });
    }

    render() {  
        console.log(this.state)
        return (
            <Container>
                <MyNav isAuthed={this.props.isAuthed} logout={this.logoutUser}/>
                <Container style={{padding: 20}}>
                    {!this.props.isAuthed &&
                    <Redirect to={ROUTES.LOGIN} />
                    }
                    <PedidosList
                        pedidos={this.state.pedidos}
                        deletePedido={this.handleShowDeleteConfirmationModal}
                    />
                    <Snackbar open={this.state.showDeletedSnackbar} autoHideDuration={2000}>
                        <Alert severity="error">
                            El pedido ha sido eliminado!
                        </Alert>
                    </Snackbar>
                    <DeleteConfirmationModal
                        deleteIndex={this.state.deleteIndex}
                        deleteId={this.state.deleteId}
                        showDeleteConfirmationModal={this.state.showDeleteConfirmationModal}
                        handleHideDeleteConfirmationModal={this.handleHideDeleteConfirmationModal}
                        handleDelete={this.deletePedidoHandler}
                    />
                </Container>
            </Container>
        );
    }
}

export default Pedidos;