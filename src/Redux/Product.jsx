import React, { useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { add } from './Store/createSlice';
import { getProducts } from './Store/productSlice'

const Product = () => {
    const dispatch = useDispatch()

    const { data: products, status } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const addToCart = (product) => {
        dispatch(add(product))
    }

    if (status === 'loading') {
        return <p> Loading ...</p>
    }

    if (status === 'error') {
        return <Alert key='danger' variant='danger'>SomeThing went wrong ...</Alert>
    }

    let cards = products.map(product => (
        <div className='col-md-3'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px' }} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        {product.price}
                    </Card.Text>
                    <Button variant="primary" onClick={() => addToCart(product)}>Add to cart</Button>
                </Card.Body>
            </Card>
        </div>
    ))

    return (
        <div className='row'>
            {cards}
        </div>
    )
}

export default Product
