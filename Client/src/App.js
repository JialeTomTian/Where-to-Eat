import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Guest from './guest'
import Home from './home'
import LogIn from './components/popular'

function App() {
  return (
    <Router>
      <div>
        <Navbar style={{ backgroundColor: "#F4D35E" }} variant="light">
          <Navbar.Brand>Eating Project</Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Popular Places</Nav.Link>
            <Nav.Link href="/guest">Use Program</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/guest">
            <Guest />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}





export default App;
