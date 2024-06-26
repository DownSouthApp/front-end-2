// dependencies
import React, { useState } from "react";

import axios from "axios";

// local imports
import NavBar from "../components/NavBar";

const Home = () => {
  const [destinations, setDestinations] = useState([]);

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;

    try {
      const response = await axios.get(
        `https://ds-desrination.onrender.com/api/v1/destination/search?name=${searchTerm}`
      );
      console.log(response);
      console.log(response.data);
      console.log(
        response.data.map((destination) => destination.name)
      );
      setDestinations(
        response.data.map((destination) => destination.name)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <NavBar />
      <br />
      <h1> navigation bar here</h1>
      <br />
      <h1>Search bar </h1>
      <input type="text" placeholder="Search..." onChange={handleSearch} />
      {destinations && destinations.length > 0 && <div className="results-list">
        {destinations.map((result, id) => {
        return <div
              className="search-result"
              onClick={(e) => alert(`You selected ${result}!`)}
              >
                  {result}
              </div>  
         
      })}
    </div>}   
    <button
        
        onMouseOver={(e) => e.target.style.cursor = "pointer"}

        onClick={(e) => alert("You clicked the search button!")}
    >Search</button>   
      

      
      <h1>footer here</h1>
    </div>
  );
};

export default Home;