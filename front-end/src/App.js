import React, { useState, useEffect } from "react";
import CarList from "../src/components/CarList/CarList";
import AddCar from "../src/components/AddCar/AddCar";
import Header from "../src/components/Header/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function App() {
  // set initial state to store car list and search terms
  const [cars, setCars] = useState([]);

  // async function to fetch cars from backend
  const fetchCars = async () => {
    const result = await fetch("/api", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const carList = await result.json();
    // set result in cars state
    setCars(carList.data);
  };

  // when show button is clicked trigger fetch cars function
  const handleShow = (e) => {
    e.preventDefault();
    // run fetch cars function
    fetchCars();
  };

  // async function to fetch cars older then 5 years from backend
  const fetchCarsFiltered = async () => {
    const result = await fetch("/api/filter", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const carList = await result.json();
    // set result in cars state
    setCars(carList.data);
  };

  useEffect(() => {
    console.log(cars);
  }, [cars]);

  // when filter button is clicked trigger fetch cars function
  const handleFilter = (e) => {
    e.preventDefault();
    // run fetch cars function
    fetchCarsFiltered();
  };

  return (
    <div className="App">
      <Header />
      <div className="container bg-white p-4 mt-5">
        <AddCar fetchCars={fetchCars} />
        {/* pass props of fetchCars function and cars to Car List component*/}
        <Button className="btn" onClick={handleShow} type="submit">
          Show Car Inventory
        </Button>
        <Button className="btn" onClick={handleFilter} type="submit">
          Show Cars from 2018 and before
        </Button>
        <CarList fetchCars={fetchCars} cars={cars} />
      </div>
    </div>
  );
}

export default App;
