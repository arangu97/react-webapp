import React from 'react'
import{Row, Col, Table} from 'react-bootstrap'
import PropTypes from 'prop-types'

import './Product.css'

class Product extends React.Component {

    static propTypes = {
        count: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        addClick: PropTypes.func.isRequired,
        price: PropTypes.number.isRequired,
        substractClick: PropTypes.func.isRequired
    }

    render() {
        const {image, title, count, addClick, substractClick, price} = this.props
        return(
            <Row className="item-row">
                <Col sm="2" className='item-image-div'>
                    <img alt={title} src={image} className='item-image' width="75%"/>
                </Col>
                <Col sm="6" className="item-title"><h4>{title}</h4></Col>
                <Col sm="4" className="item-buy">
                    <Row style={{width: '100%'}}>
                        <ul className='list-group' style={{width: '100%'}}>
                            <li className='list-group-item'> <h5> Precio: {price}€ </h5></li>
                            <li className='list-group-item'>
                                <Row className="justify-content-center">
                                    <button onClick={substractClick} className="btn btn-danger btn-circle"> - </button>
                                    <h3 style={{padding: 5}}>{count} </h3>
                                    <button onClick={addClick} className="btn btn-success btn-circle"> + </button>
                                </Row>
                            </li>
                            <li className='list-group-item'> <h5>Subtotal: {price * count}€</h5> </li>

                        </ul>
                    </Row>
                </Col>
                <hr />
            </Row>
        )
    }
}

export default Product