const express = require("express");
const router = express.Router();

const cars = require("../models/car.model");

/* Tried the pdf method but got errors, researched into this and found for Mongoose version 6, the find() method no longer accepts a callback function as the second argument. Instead, it returns a promise that you can handle using .then() or async/await syntax.
To fix the error, I rewrote the code to use promises instead of callbacks. Available here: https://stackoverflow.com/questions/75636331/mongoose-error-model-find-no-longer-accept-call-back */

// GET method to display all cars
router.get("/", async (req, res) => {
  try {
    // use find to return all documents in collection
    const result = await cars.find();
    res.status(200).json({ data: result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured in retrieving the cars" });
  }
});

// GET method to display all cars older than 5 years
router.get("/filter", async (req, res) => {
  /* was getting an converting circular structure to JSON so researched fixes here: https://stackoverflow.com/questions/62042501/typeerror-converting-circular-structure-to-json-node-js*/
  try {
    // use $lt to return all documents with make older than 5 years in collection
    const result = await cars.find({ make: { $lt: 2018 } });
    res.status(200).json({ data: result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured in retrieving the cars" });
  }
});

// POST method to display all cars
router.post("/add", async (req, res) => {
  const { make, model, owner, registration } = req.body;
  // create new car object from cars model
  const newCar = new cars({
    make: make,
    model: model,
    owner: owner,
    registration: registration,
  });
  // use save function to create a new document
  try {
    const newCarObject = await newCar.save();
    return res
      .status(200)
      .json({ message: "Car successfully added!", newCarObject });
  } catch (err) {
    // send error message if there is an error
    res.status(500).send({ message: "An error occured in adding new car" });
  }
});

// PUT method to update document by ID
router.put("/update/:_id", async (req, res) => {
  // find car by ID method and update
  /* Was only return original, researched tutorial and learned to use 'new: true, returnDocument: after' to return update. Available here: https://mongoosejs.com/docs/tutorials/findoneandupdate.html*/
  try {
    const updateCar = await cars.findByIdAndUpdate(
      req.params._id,
      // get parameters from document data
      {
        make: req.body.newMake,
        model: req.body.newModel,
        owner: req.body.newOwner,
        registration: req.body.newRegistration,
      },
      {
        new: true,
        returnDocument: "after",
      }
    );
    // send 404 error message to indicate nothing was found
    if (!updateCar) {
      res.status(404).send("Sorry, no matching car found");
      return;
    }
    // else successfully delete object by ID
    res.status(200).send("Car details updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT method to update many documents
router.put("/update_many/:_id", async (req, res) => {
  // use parameters from front end to updateMany
  try {
    // use query to find original values and set to update those values
    await cars.updateMany(
      {
        make: req.body.make,
        model: req.body.model,
        owner: req.body.owner,
        registration: req.body.registration,
      },
      {
        $set: {
          make: req.body.newMake,
          model: req.body.newModel,
          owner: req.body.newOwner,
          registration: req.body.newRegistration,
        },
      }
    );
    res.status(200).send("Cars details updated");
  } catch (err) {
    // if error send error message
    res.status(500).send(err);
  }
});

// DELETE method to delete by ID
router.delete("/delete/:_id", async (req, res) => {
  // find car by ID and delete method
  try {
    const deleteCar = await cars.findByIdAndDelete(req.params._id);
    if (!deleteCar) {
      // send error message if there is an error
      res.status(404).send("The car is not found");
      return;
    }
    // else successfully delete object by ID
    res.status(200).send("Car deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

// export router
module.exports = router;
