import React from 'react';
import axios from '../axios';
import {Container, Row, Col} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import {FaShoppingCart} from 'react-icons/fa';


import ProductList from '../components/ProductList/ProductList'

import ConfirmationModal from '../components/modals/ConfirmationModal/ConfirmationModal';
import FormModal from '../components/modals/FormModal/FormModal';
import GratingModal from '../components/modals/GratingModal/GratingModal';
import {Redirect} from "react-router-dom";
import * as ROUTES from "../constants/routes";
import MyNav from "../components/MyNav/MyNav";
import {AppContext} from "../App";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialState = {
    products: [],
    productsCount: [],
    moneyCount: 0,
    showAddedSnackbar: false,
    showDeletedSnackbar: false,
    showConfirmationModal: false,
    showFormModal: false,
    showGratingModal: false
};

class Tienda extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState
    }

    handleAddProduct = (id) => {
        let productPrice = this.state.products[id].price;
        let newMoneyCount = this.state.moneyCount + productPrice;

        let productsCount = [...this.state.productsCount];
        productsCount[id] ++;
        this.setState({
            productsCount: productsCount,
            showAddedSnackbar: true,
            moneyCount: newMoneyCount
        });
        setTimeout(() => {
            this.setState({
                showAddedSnackbar: false
            })
        },2000)
    };

    handleSubstractProduct = (id) => {
        let productPrice = this.state.products[id].price;
        let newMoneyCount = this.state.moneyCount - productPrice;
        let productsCount = [...this.state.productsCount];
        if (productsCount[id] > 0) {
            productsCount[id] --;
            this.setState({
                productsCount: productsCount,
                showDeletedSnackbar: true,
                moneyCount: newMoneyCount
            });
            setTimeout(() => {
                this.setState({
                    showDeletedSnackbar: false
                })
            },2000)
        }
    };

    handleDeleteProducts = () => {
        const newCount = new Array(this.state.productsCount.length).fill(0)
        this.setState({
            moneyCount: 0,
            productsCount: newCount
        })
    }

    handleShowConfirmationModal = () => {
        if(this.state.moneyCount !== 0) {
            if(!this.props.isAuthed){
                this.props.history.push(ROUTES.LOGIN);
            } else {
                this.setState({
                    showConfirmationModal: true
                })
            }
        }
    };

    handleHideConfirmationModal = () => {
        this.setState({
            showConfirmationModal: false
        })
    };

    handleShowFormModal = () => {
        this.setState({
            showFormModal: true,
            showConfirmationModal: false
        })
    };

    handleHideFormModal = () => {
        this.setState({
            showFormModal: false
        })
    };

    handleShowGratingModal = () => {
        this.setState({
            showFormModal: false,
            showGratingModal: true
        })
    };

    handleHideGratingModal = async () => {
        await this.setState({
            showGratingModal: false
        })
        window.location.reload(false)

    };

    componentDidMount() {
            axios.get('/products.json')
            .then(response => {
                let products = [];
                let productsCount = [];
                for (let key in response.data) {
                    products.push({
                        ...response.data[key],
                        idb: key
                    });
                    productsCount.push(0);
                }
                this.setState({ products: products, productsCount: productsCount });
            }).catch(error => {
                this.setState({ error: true });
            });
    }

    render() {

        return (
            <AppContext.Consumer>
                {({app}) => (
                <Container>
                    <MyNav isAuthed={this.props.isAuthed} logout={this.props.logout}/>
                    <Container style={{padding: 20}}>
                        <Row className="justify-content-center align-vertical-center">
                            <Col>
                                <Row className="justify-content-center">
                                    <Col>
                                        <Row className="justify-content-center">
                                            <FaShoppingCart size={32}/>
                                            <p style={{paddingLeft: 10, fontSize: 20}}> {this.state.moneyCount}€</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <button className="btn btn-success" onClick={this.handleShowConfirmationModal}> Realizar Pedido </button>
                                <button className="btn btn-danger" style={{marginLeft: 15}} onClick={this.handleDeleteProducts}> Vaciar carrito</button>
                                <ConfirmationModal
                                    products={this.state.products}
                                    productsCount={this.state.productsCount}
                                    showConfirmationModal={this.state.showConfirmationModal}
                                    handleShowFormModal={this.handleShowFormModal}
                                    handleHideConfirmationModal={this.handleHideConfirmationModal}
                                    moneyCount={this.state.moneyCount}
                                />
                                <FormModal
                                    showFormModal={this.state.showFormModal}
                                    products={this.state.products}
                                    productsCount={this.state.productsCount}
                                    handleShowGratingModal={this.handleShowGratingModal}
                                    handleHideFormModal={this.handleHideFormModal}
                                    moneyCount={this.state.moneyCount}
                                    userId={app.state.authData.localId}
                                />
                                <GratingModal
                                    showGratingModal={this.state.showGratingModal}
                                    handleHideGratingModal={this.handleHideGratingModal}
                                />
                            </Col>
                        </Row>
                        <ProductList
                            products={this.state.products}
                            productsCount={this.state.productsCount}
                            addClick={this.handleAddProduct}
                            substractClick={this.handleSubstractProduct}
                        />
                        <Snackbar open={this.state.showAddedSnackbar} autoHideDuration={2000}>
                            <Alert severity="success">
                                Producto añadido al carrito!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={this.state.showDeletedSnackbar} autoHideDuration={2000}>
                            <Alert severity="error">
                                Producto eliminado del carrito!
                            </Alert>
                        </Snackbar>
                    </Container>
                </Container>
                    )}
            </AppContext.Consumer>
        );
    }
}

export default Tienda;