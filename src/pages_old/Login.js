import React, { useState } from "react";
import { login } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login =  () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("try to login ");

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_AUTH_URL}/api/v1/auth/login`,
                {
                    username: email,
                    password: password,
                }
            );

            
           

            console.log(response);

            dispatch(login(response.data));

            setEmail("");
            setPassword("");

            console.log(response.data.usertype);

            if(response.data.usertype === "m_center") window.location = "/m_center/home"
            else if(response.data.usertype === "admin") window.location = "/admin/home"
                
            // redirect to the logout page
            // window.location = "/logout";
        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <div className="login">
            <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
                <h1>Login Page </h1>

                <input
                    type="String"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="submit__btn">
                    Submit
                </button>

           
            </form>
        </div>
    );
};

export default Login;