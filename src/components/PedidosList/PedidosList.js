import React from 'react'
import PropTypes from 'prop-types'
import Pedido from '../Pedido/Pedido'
import {Accordion, Container} from "react-bootstrap";

class PedidosList extends React.Component {

    static propTypes = {
        pedidos: PropTypes.array.isRequired,
        deletePedido: PropTypes.func.isRequired
    };

    render() {

        const {pedidos, deletePedido} = this.props

        return(
            <Accordion defaultActiveKey="0">
                {pedidos.length === 0 &&
                    <h2>Todavía no has realizado ningún pedido</h2>
                }
                {pedidos.map((pedido,index) => {
                    return (
                        <Pedido
                            id={index}
                            key={pedido.idb}
                            name={pedido.name}
                            surname={pedido.surname}
                            price={pedido.price}
                            email={pedido.email}
                            address={pedido.address}
                            date={pedido.date}
                            onDelete={() => deletePedido(pedido.idb, index)}
                        />
                    );
                })}
            </Accordion>
        )
    }
}

export default PedidosList