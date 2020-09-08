import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Guest from './guest';
import LogIn from './components/popular';

function Home() {
  const [show, setShow] = useState(0);
  return (
    <Router>
      <div>
        {show === 0 && (
          <div>
            <h1 style={{ textAlign: "center", fontSize: "100px" }}>
              Eating Project
            </h1>
            <div
              style={{
                position: "fixed",
                top: "30%",
                left: "40%",
                textAlgin: "center",
              }}
            >
              <center>
              <div >
                <Link to="/LogIn" onClick={() => setShow(show + 1)}>
                  <Button
                    style={{
                      fontSize: "75px",
                      border: "none",
                      backgroundColor: "#0D3B66",
                      color: "#F4D35E",
                    }}
                  >
                    Popular Locations 
                  </Button>
                </Link>
              </div>
              </center>

              <br></br>

              <div>
                <Link to="/Guest" onClick={() => setShow(show + 1)}>
                  <Button
                    style={{
                      fontSize: "75px",
                      border: "none",
                      backgroundColor: "#0D3B66",
                      color: "#F4D35E",
                    }}
                  >
                    Use as Guest
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/guest">
            <Guest />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Home;