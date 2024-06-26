import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import axios from 'axios';
import './a-home.css'; 

const AdminHome = () => {
    const user = useSelector(selectUser);
    const [username, setUsername] = useState('');
    const [disqualified, setDisqualified] = useState(false);

    const handleDisqualify = async () => {
        console.log(username);
        try {
            const response = await axios.put(`${process.env.REACT_APP_AUTH_URL}/api/v1/auth/update`, {
                token: user.token,
                username: username,
                usertype: 'invalid',
                password: 'invalid',
            });
            setDisqualified(true);
            console.log("\tPassed => Update User");
            console.log("\t********************* \n");
        }
        catch (error) {
            console.error(error);
            console.log("\tFailed => Update User");
            console.log("\t********************* \n");
        }
    };

    return (
        <div className="admin-home">
            <div className="admin-background"></div>
            <div className="admin-nav-bar">
                <h1 className="admin-home-heading">Admin Home</h1>
                <div className="admin-home-links">
                    <Link to="/admin/a_create">Create</Link>
                    <Link to="/admin/a_update">Update</Link>
                </div>
            </div>
            <div className="admin-content">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="admin-home-input"
                    placeholder="Enter username"
                />
                <button
                    onClick={handleDisqualify}
                    className="admin-home-button"
                >
                    Disqualify User
                </button>
                {disqualified && <p className="admin-home-message">User has been disqualified!</p>}
            </div>
        </div>
    );
};

export default AdminHome;