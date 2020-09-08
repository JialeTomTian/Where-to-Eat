import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function deleteItem(length, index, lst){
  const output_lst = []
  for (let counter = 0; counter < length; counter++){
    if(counter === index-1){
      
    } else {
    output_lst.push(lst[counter]);
    }
  }
  return output_lst;
}

function Guest() {
  const [options, setOptionsState] = useState([]);
  const [position, setPosition] = useState(1);
  const [place, setPlace] = useState("");
  const [called, setCalled] = useState("");
  const [number, setNumber] = useState("");
  const [show, setShow] = useState(false);
  const [result, setResult] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const hideResult = () => setResult(false);
  const showResult = () => setResult(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOptionsState([
      ...options,
      {
        index: position,
        location: place,
        name: called,
        priority: parseInt(number, 10),
        Delete: true
      },
    ]);

    try {
      const body = {location: place, restaurant: called, counter: 1};
      const response = await fetch("http://localhost:5050/locations", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      console.log(response);
    } catch (error) {
      console.log(error.message)
    }

    setPosition(position + 1);
    setCalled("");
    setPlace("");
    setNumber("");
  };

  const deleteRow = (rowNumber) => {
    console.log(rowNumber);
    setOptionsState(deleteItem(options.length, rowNumber, options));
    setPosition(position-1);
    for(let counter = 1; counter < options.length+1; counter++){
      options[counter-1].index = counter;
    }
  }

  const renderTableHeader = () => {
    let header = Object.keys(options[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderTableData = () => {
    return options.map((option, counter) => {
      const { index, location, name, priority } = option;
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{location}</td>
          <td>{name}</td>
          <td>{priority}</td>
          <td style={{position:"static"}}>
              <Button onClick = {() => {
                deleteRow(index);
              }}
                style={{
                  fontSize: "15px",
                  border: "none",
                  backgroundColor: "#DC143C",
                  color: "#F4D35E",
                  transform: "translateY(-3px)"
                }}
              >
                Delete
              </Button>
          </td>
        </tr>
      );
    });
  };

  const displayResults = () => {
    let output_result = options[0];

    if (output_result == null) {
      return <h1 style={{ textAlign: "center" }}> No results yet</h1>;
    } else {
      output_result = options[Math.floor(Math.random() * options.length)];

      let optionPriorities = [];
      let totalWeight = 0;
      for (var option of options) {
        optionPriorities.push(option.priority);
        totalWeight += option.priority;
      }

      var weightedOptions = [];
      var currentOption = 0;
      while (currentOption < options.length) {
        for (var i = 0; i < optionPriorities[currentOption]; i++) {
          weightedOptions[weightedOptions.length] = options[currentOption];
        }
        currentOption++;
      }
      console.log(weightedOptions);

      var randomNumber = Math.floor(Math.random() * totalWeight);
      const { index, location, name, priority } = weightedOptions[randomNumber];
      return (
        <div style={{ textAlign: "center" }}>
          <h1>Your Index: {index}</h1>
          <h1>Your Location: {location}</h1>
          <h1>Location Name: {name}</h1>
          <h1>Priority Number: {priority}</h1>
        </div>
      );
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "75px" }}>Where to Eat?</h1>
      {Array.isArray(options) && !options.length ? (
        <h1 style={{ textAlign: "center" }}>
          {" "}
          There is currently no information added
        </h1>
      ) : (
        <div>
          {" "}
          <h1 style={{ textAlign: "center" }}>Your Current Input</h1>
          <table
            className="center"
            style={{
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
              borderCollapse: "collapse",
              border: "3px solid #F95738",
              width: "50%",
              backgroundColor: "#F95738",
            }}
          >
            <tbody>
              <tr>{renderTableHeader()}</tr>
              {renderTableData()}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#FAF0CA" }}>
          <Modal.Title
            style={{ textAlign: "center", backgroundColor: "#FAF0CA" }}
          >
            New Location
          </Modal.Title>
        </Modal.Header>
        <Form style={{ backgroundColor: "#FAF0CA" }} onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
              type="Name"
              placeholder="Location"
              style={{ backgroundColor: "#FAF0CA" }}
              onChange={(e) => setCalled(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location of Restaurant</Form.Label>
            <Form.Control
              type="location"
              placeholder="Location"
              style={{ backgroundColor: "#FAF0CA" }}
              onChange={(e) => setPlace(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Restaurant Priority</Form.Label>
            <Form.Control
              type="Priority"
              placeholder="Location Priority"
              style={{ backgroundColor: "#FAF0CA" }}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            style={{
              fontSize: "20px",
              border: "none",
              backgroundColor: "#0D3B66",
              color: "#F4D35E",
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal>

      <Modal show={result} onHide={hideResult}>
        <Modal.Header closeButton style={{ backgroundColor: "#FAF0CA" }}>
          <Modal.Title
            style={{ textAlign: "center", backgroundColor: "#FAF0CA" }}
          >
            Our Results
          </Modal.Title>
        </Modal.Header>
        {displayResults()}
      </Modal>

      <div
        style={{
          position: "fixed",
          textAlign: "center",
          left: "43%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <br></br>
          <Button
            onClick={() => {
              handleShow();
            }}
            style={{
              fontSize: "35px",
              border: "none",
              backgroundColor: "#0D3B66",
              color: "#F4D35E",
            }}
          >
            Add Location
          </Button>
        </div>

        <div style={{ textAlign: "center" }}>
          <br></br>
          <Button
            onClick={showResult}
            style={{
              fontSize: "35px",
              border: "none",
              backgroundColor: "#0D3B66",
              color: "#F4D35E",
            }}
          >
            Generate Result
          </Button>
        </div>
      </div>
      <div>
        <br></br>
      </div>
    </div>
  );
}

export default Guest;
