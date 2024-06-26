
import React, { useState } from 'react';
//import { login } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
//import { useDispatch } from "react-redux";
import axios from "axios";
import avatar from "../../assets/images/profile.png";  //_

const M_Home = () => {
    const [name, setName] = useState('');
    const [postImage, setPostImage] = useState( { myFile : ""})  //_
    
    //const dispatch = useDispatch();
    const user = useSelector(selectUser);
    // take data from userSlice
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted name:', name);
        console.log('token:', user.token);
        // Handle form submission logic here
        await axios.post('http://localhost:4000/destination/api/v1/destination/', {
            Headers: {
                "x-access-token": user.token,
            },
            name: name,
            image: postImage.myFile,
            token: user.token
        })
        .then((response) => {
            console.log(response);
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
        console.log(user);
        console.log(user.token);
        

        
    };
    //_ file upload
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64)
        setPostImage({ ...postImage, myFile : base64 })
      }

    return (
        <div>
            <h1>Welcome to the Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter New Destination Name"
                />
                /_ file upload 
                    <label htmlFor="file-upload" className='custom-file-upload'>
                        <img src={ avatar} alt="" />
                    </label>

                    <input 
                    type="file"
                    lable="Image"
                    name="myFile"
                    id='file-upload'
                    accept='.jpeg, .png, .jpg'
                    onChange={(e) => handleFileUpload(e)}
                    />

                    <h3>Doris Wilder</h3>
                    <span>Designer</span>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
//_
function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }


export default M_Home;