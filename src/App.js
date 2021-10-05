import React from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import About from './components/About';
import Shop from './components/Shop';

import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Admin from './components/Admin/Admin';


function App() {
  return (
    <>
      <Router>
        <Navbar title="DigitalMartNepal" />
        <Switch>
          <Router exact path="/">
            <Products />
          </Router>
          <Router exact path="/about">
            <About />
          </Router>
          <Router exact path="/shop">
            <Shop />
          </Router>
          <Router exact path="/products">
            <Products />
          </Router>
          <Router exact path="/admin">
            <Admin />
          </Router>
        </Switch>
      </Router>
    </>
  );
}

export default App;
