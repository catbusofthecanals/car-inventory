import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import "./AddCar.css";

function AddCar({ fetchCars }) {
  // set initial states for input car data
  const [make, setMake] = useState(null);
  const [model, setModel] = useState("");
  const [owner, setOwner] = useState("");
  const [registration, setRegistration] = useState("");

  // when submit button is clicked trigger post method function
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      make: make,
      model: model,
      owner: owner,
      registration: registration,
    };
    alert("Success! Added new car data");
    // fetch function with post method
    fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .catch((error) => console.log("Error:", error));
    // run fetch cars function
    fetchCars();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} id="addCarForm" className="gap-1">
        <Form.Group>
          <Form.Label>Enter details about a car:</Form.Label>
        </Form.Group>
        <Form.Group as={Row} className="m-3 p-2">
          {/* set make on input change */}
          <Form.Control
            type="number"
            placeholder="Enter the car make year"
            name="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
          {/* set model on input change */}
          <Form.Control
            type="text"
            placeholder="Enter the car model"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Row} className="m-3 p-2">
          {/* set owner on input change */}
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          {/* set registration on input change */}
          <Form.Control
            type="text"
            placeholder="Enter your registration details"
            name="registration"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
          />
        </Form.Group>
        {/* post method function will run on click */}
        <Button onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddCar;
