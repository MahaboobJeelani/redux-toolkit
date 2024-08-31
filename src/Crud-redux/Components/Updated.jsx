import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editUser } from "../features/userDetailsSlice";

const Create = () => {
    const [updatedData, setUpdatedData] = useState()

    const { id } = useParams();
    const { users, loading } = useSelector(state => state.app)
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            const singleUser = users.filter((user) => user.id === id)
            setUpdatedData(singleUser[0])
        }
    }, [])


    const updatedUser = (e) => {
        e.preventDefault()
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })

    }
    console.log(updatedData)


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editUser(updatedData))
    }

    return (
        <div>
            <h2 className="my-2">Fill the data</h2>
            <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        class="form-control"
                        value={updatedData && updatedData.name}
                        onChange={updatedUser}
                        required
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        class="form-control"
                        value={updatedData && updatedData.email}
                        onChange={updatedUser}
                        required
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Age</label>
                    <input
                        type="text"
                        name="age"
                        class="form-control"
                        onChange={updatedUser}
                        value={updatedData && updatedData.age}
                        required
                    />
                </div>
                <div class="mb-3">
                    <input
                        class="form-check-input"
                        name="gender"
                        value="Male"
                        type="radio"
                        checked={updatedData && updatedData.gender === 'Male'}
                        onChange={updatedUser}
                        required
                    />
                    <label class="form-check-label">Male</label>
                </div>
                <div class="mb-3">
                    <input
                        class="form-check-input"
                        name="gender"
                        value="Female"
                        type="radio"
                        onChange={updatedUser}
                        checked={updatedData && updatedData.gender === 'Female'}
                    />
                    <label class="form-check-label">Female</label>
                </div>

                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Create;