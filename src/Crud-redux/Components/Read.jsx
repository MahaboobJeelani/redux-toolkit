import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUser, showUser } from '../features/userDetailsSlice';
import { Link } from 'react-router-dom';
import CustomModel from './CustomModel';

const Read = () => {

    const [id, setId] = useState()
    const [showPopup, setShowPopup] = useState(false);
    const [filterGender, setFilterGender] = useState('')

    const dispatch = useDispatch();

    const { users, loading, searchData } = useSelector(state => state.app)

    useEffect(() => {
        dispatch(showUser())
    }, [])

    if (loading) {
        return (<h1>Loading...</h1>)
    }

    return (
        <div>
            {showPopup ? (<CustomModel id={id} setShowPopup={setShowPopup} showPopup={showPopup} />) : ''}
            <input type="text" checked={filterGender === ''} name='gender' type='radio' value='' onChange={(e) => setFilterGender(e.target.value)} />
            <label htmlFor="">All</label>
            <input type="text" checked={filterGender === 'Male'} name='gender' type='radio' value='Male' onChange={(e) => setFilterGender(e.target.value)} />
            <label htmlFor="">Male</label>
            <input type="text" checked={filterGender === 'Female'} name='gender' type='radio' value='Female' onChange={(e) => setFilterGender(e.target.value)} />
            <label htmlFor="">Female</label>

            {
                users

                && users.filter(user => {
                    if (searchData.length === 0) {
                        return user
                    }
                    return user.name.toLowerCase().includes(searchData.toLowerCase())
                }).filter(user => {
                    if (filterGender === '') {
                        return user
                    }
                    if (filterGender === "Male") {
                        return user.gender.includes(filterGender)
                    }
                    if (filterGender === 'Female') {
                        return user.gender.includes(filterGender)
                    }
                })

                    .map((user) => {
                        return (
                            <Card style={{ width: '18rem' }} key={user.id}>
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                                    <Card.Text>{user.gender}</Card.Text>
                                    <Card.Link onClick={() => { setId(user.id); setShowPopup(true) }}>View</Card.Link>
                                    <Card.Link to={`/edit/${user.id}`} as={Link} onClick={() => dispatch(editUser(user.id))}>Edit</Card.Link>
                                    <Card.Link onClick={() => dispatch(deleteUser(user.id))}>Delete</Card.Link>
                                </Card.Body>
                            </Card>
                        )
                    })
            }
        </div>


    );
}

export default Read;