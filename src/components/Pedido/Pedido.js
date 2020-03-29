import React from 'react'
import{Accordion, Card, Row, Col, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'


class Pedido extends React.Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired
    };

    render() {
        const {id, name, surname, price, email, address, date, onDelete} = this.props
        const formatedDate = new Date(date).toLocaleString()
        return(
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={id}>
                    <Row>
                        <Col sm="6">
                            Realizado por : <b>{name} {surname}</b>
                        </Col>
                        <Col sm="6">
                            Fecha : <b>{formatedDate}</b>
                        </Col>
                    </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={id}>
                    <Card.Body className="p-4">
                        <Row>
                            Pedido realizado por : {name} {surname}
                        </Row>
                        <Row>
                            Fecha de realización : {formatedDate}
                        </Row>
                        <Row>
                            Coste del pedido : {price} €
                        </Row>
                        <Row>
                            Email de contacto : {email}
                        </Row>
                        <Row>
                            Dirección de entrega del pedido : {address}
                        </Row>
                        <Row>
                             <Col sm="8"/>
                            <Col sm="4">
                                <Button variant="danger" onClick={onDelete} >Eliminar Pedido</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    }
}

export default Pedido