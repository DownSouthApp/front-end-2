
import React, { useState } from 'react';
import axios from 'axios';





const Destination = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    
    console.log(process.env.REACT_APP_API_URL);
    
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const body = new FormData();
        body.append('name', 'dev1');
        body.append('file', file);
        

        try {
            const response = await axios.put(`https://ds-desrination.onrender.com/api/v1/destination/`, body )
                .then
                (res => {
                    console.log(res.data);
                })
                .catch
                (err => {
                    //setError(err);
                    console.log(err);
                });


            console.log(response.data);
            // Handle the response data here
        } catch (error) {
            console.error(error);
            //setError('Error uploading image. Please try again.');
        }
    };

    return (
        <div>
            <input type="file" onChange={
                handleImageUpload} />
            {error && <p>{error}</p>}
            
        </div>
    );
};

export default Destination;
