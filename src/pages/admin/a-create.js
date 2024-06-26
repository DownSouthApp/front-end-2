import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import animationData from './a-update.json';
import Button from '@mui/material/Button';
import './a-create.css';

const A_Create = () => {
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
        console.log("try to create destination");
        if (!image) {
            console.error("No image selected");
            return;
        }
        try{
            let fileInput = document.querySelector('input[type="file"]');
            let selectedFile = fileInput.files[0];
            let formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('name', title);
            formData.append('description', description);

            const response = await axios.post('https://ds-desrination.onrender.com/api/v1/destination/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': user.token
                }
            });
            console.log(response.data);
            window.location.href = '/a_home';
        } catch (err) {
            console.error(err);
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

    const handleFileButtonClick = () => {
        document.getElementById('image').click();
    };

    return (
        <div className="create-page">
            <div className="animation-container">
                <Lottie options={defaultOptions} height="100%" width="100%" />
            </div>
            <div className="form-container">
                <div className="form-inner">
                    <h1 className='form-header'>Create Destination</h1>
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
                          
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            <Button variant="contained" component="span" onClick={handleFileButtonClick}>
                                Choose Image
                            </Button>
                            {image && <span>{image.name}</span>}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default A_Create;
