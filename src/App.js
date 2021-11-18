import React from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import About from './components/About';
import Shop from './components/Shop';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import ProductState from './context/products/ProductState';
// import Admin from './components/Admin/Admin';
import { useState } from 'react';
import Alert from '../src/components/Alert'
import Login from './components/Login';
import Register from './components/Register';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <ProductState >
        <Router>
          <Navbar title="DigitalMartNepal" />
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/">
              <Products showAlert={showAlert} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/shop">
              <Shop />
            </Route>
            <Route exact path="/login">
            <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/register">
            <Register showAlert={showAlert} />
            </Route>
          </Switch>
        </Router>
      </ProductState>
    </>
  );
}

export default App;
