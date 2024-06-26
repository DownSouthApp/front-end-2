/* eslint-disable react/jsx-pascal-case */
import React from "react";
// import Login from "./components/Login2";
// import Register from "./components/Register";
// import "./App.css";

// import { selectUser } from "./slices/userSlice";
// import { useSelector } from "react-redux";
// import Logout from "./components/Logout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Information from "./pages/Information";
import Example from "./pages/Example";
import SignUp from "./pages/SignUp";

// Import Tourist pages
import TouristRegister from "./pages/tourist/t-register";
import T_Home from "./pages/tourist/t-home";
import Destinations from "./pages/tourist/Destinations";
import MAP from "./pages/tourist/map";
import T_Update from "./pages/tourist/t-update";
//import CreateAppntmt from "./pages/tourist/createAppntmt"
import T_appointment from "./pages/tourist/T_appointment";
import Medical from "./pages/m_center/Medical";
import M_home from "./pages/m_center/M_home";
import M_update from "./pages/m_center/M_update";
//import m_register from "./pages/m_center/m_register";

//import Destination from "./pages/test/destination";

//Import Admin Pages
import A_Home from "./pages/admin/a-home2";
import A_Create from "./pages/admin/a-create";
import A_Update from "./pages/admin/a-update";

import Map from "./pages/map";

 import Appointment_Update from "./pages/tourist/T_edit_appointment";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
// import BuyerOrders from "./components/BuyerOrders";
// import ViewProducts from "./components/ViewProducts";
// import CreateProduct from "./components/CreateProduct";
const App = () => {

    // const user = useSelector(selectUser);
    
    // console.log(user);
    
    const dev = true;
    if(dev === false)
    return (

        <div className="app">
            <Router>
                
                {/* <Header></Header> */}
                <Routes>
                    <Route path="/" element={<Home />}></Route>

                    {/* <Route path="/signin" element={<SignIn></SignIn>} />
                    <Route path="/signup" element={<SignUp></SignUp>} /> */}
                    {/* <Route path="/buyerorders" element={
                        user ? <BuyerOrders></BuyerOrders> : <SignIn /> 
                    } /> */}
                    {/* <Route path="/createproduct" element={
                      <CreateProduct></CreateProduct> 
                    } /> */}

                    {/* <Route path="/products" element={<ViewProducts />}></Route>
                    <Route path="/" element={
                        //only show the logout component if the user is logged in
                        user ? <Logout /> :
                            <Login />

                    } /> */}
                    {/* <Route path="/logout" element={
                        //only show the logout component if the user is logged in
                        user ? <Logout /> : <Login />
                    } />

                    <Route path="/register" element={
                        //only show the logout component if the user is logged in
                        user ? <Logout /> : <Register />
                    } /> */}
                </Routes>
                {/* <Footer></Footer> */}
            </Router>
        </div>

    )
    else
    return (
        <div className="app">
            <Router>
               
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/t_register" element={<TouristRegister/>}></Route>
                    <Route path="/t_home" element={<T_Home/>}></Route>
                    <Route path="/t_update" element={<T_Update/>}></Route>
                    <Route path="/search" element={<Search/>}></Route>
                    <Route path="/information" element={<Information/>}></Route>
                    <Route path="/example" element={<Example/>}></Route>
                    <Route path="/medical" element={<Medical/>}></Route>
                    <Route path="/m_home" element={<M_home/>}></Route>
                    <Route path="/t_appointment" element={<T_appointment/>}></Route>
                    <Route path="/:destination" element={< Destinations/>} />
                    <Route path="/maps/:destination" element={< MAP/>} />
                    <Route path="/m_update" element={<M_update/>}></Route>

                    <Route path="a_home" element = {<A_Home/>}></Route>
                    <Route path="admin/a_create" element = {<A_Create/>}></Route>   
                    <Route path="admin/a_update" element = {<A_Update/>}></Route>

                    <Route path="/map" element={<Map/>}></Route>

                    <Route path="/t_appointments/:appointment_id" element = {<Appointment_Update/> }> </Route>
                    <Route path="/signup" element={<SignUp/>}></Route>
                    
                </Routes>
            </Router>
        </div>
    )
};

export default App;