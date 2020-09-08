import React, { Fragment } from "react";
import DisplayLocations from "./display";

function LogIn() {
  return (
    <Fragment>
      <h1 style={{ textAlign: "center", fontSize: "75px" }}>Popular Locations</h1>
      <h1 style={{ textAlign: "center", fontSize: "50px" }}>Top Places Entered into The Program</h1>
      <br></br>
      <DisplayLocations />
    </Fragment>
  );
}

export default LogIn;
