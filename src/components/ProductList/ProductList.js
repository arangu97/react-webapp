import React from 'react'
import PropTypes from 'prop-types'
import Product from '../Product/Product'

class ProductList extends React.Component {

    static propTypes = {
        products: PropTypes.array.isRequired,
        productsCount: PropTypes.array.isRequired,
        addClick: PropTypes.func.isRequired,
        substractClick: PropTypes.func.isRequired
    }

    render() {
        
        const {products, productsCount, addClick, substractClick} = this.props

        return(
            <ul className="list-group" style={{padding: 20}}>
                {products.map(product => {
                    return (
                        <li key={product.idb} className="list-group-item">
                            <Product
                            key={product.idb}
                            count={productsCount[product.idb]}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            addClick={() => addClick(product.idb)}
                            substractClick={() => substractClick(product.idb)}
                            />
                        </li>
                        );
                })}
            </ul>
        )
    }
}

export default ProductList