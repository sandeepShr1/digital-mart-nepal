import React from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import About from './components/About';
import Shop from './components/Shop';

import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import ProductState from './context/products/ProductState';
// import Admin from './components/Admin/Admin';
import { useState } from 'react';
import Alert from '../src/components/Alert'


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
            <Router exact path="/">
              <Products showAlert={showAlert}/>
            </Router>
            <Router exact path="/about">
              <About />
            </Router>
            <Router exact path="/shop">
              <Shop />
            </Router>
            {/* <Router exact path="/admin">
            <Admin />
          </Router> */}
          </Switch>
        </Router>
      </ProductState>
    </>
  );
}

export default App;
