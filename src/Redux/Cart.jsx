import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { remove } from './Store/createSlice'

const Cart = () => {
    const dispatch = useDispatch()
    const productCart = useSelector(state => state.cart)


    const removeToCart = (id) => {
        dispatch(remove(id))
    }

    let cards = productCart.map(product => (
        <div className='col-md-3'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px' }} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.price}
                    </Card.Text>
                    <Button variant="danger" onClick={() => removeToCart(product.id)}>Remove</Button>
                </Card.Body>
            </Card>
        </div>
    ))

    return (
        <div>
            {cards}
        </div>
    )
}

export default Cart
