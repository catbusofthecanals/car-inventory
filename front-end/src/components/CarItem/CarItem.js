import "./CarItem.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CarItem({ item, fetchCars }) {
  // set initial states
  const [edit, setEdit] = useState(false);
  const [newMake, setNewMake] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newRegistration, setNewRegistration] = useState("");

  // get id from item id
  const id = item._id;

  const removeItem = async () => {
    await fetch(`api/delete/${id}`, {
      method: "DELETE",
    });
    alert("Car removed");
    fetchCars();
  };
  // function to handle removing car item
  const handleRemove = (e) => {
    e.preventDefault();
    // run async function to remove item
    removeItem();
  };

  // function to handle updating one car item
  const handleEditOne = (e) => {
    e.preventDefault();
    // run async function to edit one item
    editItem();
  };

  const editItem = async () => {
    let data = {
      newMake: newMake,
      newModel: newModel,
      newOwner: newOwner,
      newRegistration: newRegistration,
    };
    // fetch PUT method with data variable filled with the new values
    fetch(`/api/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    alert("Car updated");
    // set edit back to false
    setEdit(false);
    // call fetch cars to return updated car
    fetchCars();
  };

  // function to handle updating many car item
  const handleEditMany = (e) => {
    e.preventDefault();
    // run async function to edit one item
    editMany();
  };

  const editMany = async () => {
    let data = {
      make: item.make,
      model: item.model,
      owner: item.owner,
      registration: item.registration,
      newMake: newMake,
      newModel: newModel,
      newOwner: newOwner,
      newRegistration: newRegistration,
    };
    // fetch PUT method with data variable filled with the new values
    fetch(`/api/update_many/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    alert("Cars updated");
    // set edit back to false
    setEdit(false);
    // call fetch cars to return updated car
    fetchCars();
  };

  // if edit state is true than display fields to edit values for project
  if (edit) {
    return (
      <div className="d-flex justify-content-between">
        <Form>
          <input
            id="editMake"
            value={newMake}
            onChange={(e) => setNewMake(e.target.value)}
            placeholder="Edit make"
          />
          <input
            id="editModel"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            placeholder="Edit model"
          />
          <input
            id="editOwner"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            placeholder="Edit owner"
          />
          <input
            id="editRegistration"
            value={newRegistration}
            onChange={(e) => setNewRegistration(e.target.value)}
            placeholder="Edit registration"
          />
          <Button
            className="btn btn-primary mb-2"
            onClick={handleEditOne}
            type="submit"
            id="submitButton"
          >
            Update For One
          </Button>
          <Button
            className="btn btn-primary mb-2"
            onClick={handleEditMany}
            type="submit"
            id="submitButton"
          >
            Update For Many
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <div className="car-item">
      <div className="item-info">
        <div className="make">Make: {item.make}</div>
        <div className="model">Model: {item.model}</div>
        <div className="owner">Ownerl: {item.owner}</div>
        <div className="registration">Registration: {item.registration}</div>
      </div>
      <div className="btns">
        <button onClick={handleRemove}>Delete</button>
        <button
          onClick={(e) => {
            setEdit(true);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default CarItem;
