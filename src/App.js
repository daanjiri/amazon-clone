import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";

import Home from "./Pages/Home";
import Header from "./Header";
import Checkout from "./components/Checkout/Checkout";
import Login from "./Pages/Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Pages/Orders";
import Upload from "./Pages/Upload";

const promise = loadStripe(
  "pk_test_51I8YTRAku80oCRQEjp2i3Ei4R0hwstBEywhr25raKzakk1cwDW8c8G8eLFvUHvvnJ0X3IWnbydKfsYLAabCcGzyW00EWpdHMnp"
);

function App() {
  const [{ basket, user }, dispatch] = useStateValue();

  //only runs when the app component loads for the first time
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        //the user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      //cleanup
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/upload">
            <Header />
            <Upload />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
