import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import MapView from "./viewmap";

function DisplayTable(props) {
  return (
    <Table
      striped
      bordered
      hover
      style={{ marginLeft: "auto", marginRight: "auto", width: "75%" }}
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Restaurant Name</th>
          <th>location Name</th>
          <th>Choosen Counter</th>
          <th>View On Google Maps</th>
        </tr>
      </thead>
      <tbody>
        {props.input.map((location) => {
          return (
            <tr key={props.input.indexOf(location)}>
              <td>{props.input.indexOf(location) + 1}</td>
              <td>{location.restaurant_name}</td>
              <td>{location.location_name}</td>
              <td>{location.choosen_counter}</td>
              <td>
                <MapView address={location.location_name}></MapView>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

function DisplayLocations() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    try {
      console.log("running default");
      const jsonLocations = await fetch("http://localhost:5050/locations");
      const parsedLocations = await jsonLocations.json();
      setLocations(parsedLocations);
    } catch (error) {
      console.log(error.message);
    }
  };

  const makeQuery = async () => {
    try {
      if (query === "") {
        getLocations();
      } else {
        console.log("running special query");
        const url = "http://localhost:5050/locations/similar/".concat(query);
        const jsonLocations = await fetch(url);
        const parsedLocations = await jsonLocations.json();
        setLocations(parsedLocations);
        
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  console.log(locations);

  return (
    <Fragment>
      <center>
        <input
          type="text"
          name="search"
          placeholder="Search For a Location..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
        <Button
          style={{
            fontSize: "15px",
            border: "none",
            backgroundColor: "#DC143C",
            color: "#F4D35E",
            transform: "translateY(-3px)",
          }}
          onClick={() => {makeQuery()}}
        >
          Submit query
        </Button>
      </center>
      <br></br>
      {Array.isArray(locations) && locations.length ? (
        <DisplayTable input={locations} />
      ) : (
        <h1>No Data Found</h1>
      )}
    </Fragment>
  );
}

export default DisplayLocations;
