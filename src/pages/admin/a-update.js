import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import animationData from './a-update.json'; 
import './a-update.css'; 
import Button from '@mui/material/Button';

const A_Update = () => {
    const user = useSelector(selectUser);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("try to update destination");
        try {
            let fileInput = document.querySelector('input[type="file"]');
            let selectedFile = fileInput.files[0];
            let formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('name', title);
            formData.append('description', description);

            const response = await axios.put('https://ds-desrination.onrender.com/api/v1/destination/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': user.token
                }
            });
            console.log(response.data);
            window.location.href = '/a_home';
        } catch (error) {
            console.error("Error reading file:", error);
            console.log("\tFailed => Update Destination");
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="update-page">
            <div className="form-container">
                <div className="form-inner">
                    <h1 className="form-header">Update Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image:</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                required
                            />
                            <Button
                                variant="contained"
                                component="span"
                                onClick={() => document.getElementById('image').click()}
                            >
                                Choose Image
                            </Button>
                        </div>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </form>
                </div>
            </div>
            <div className="animation-container">
                <Lottie options={defaultOptions} height="100%" width="100%" />
            </div>
        </div>
    );
};

export default A_Update;
