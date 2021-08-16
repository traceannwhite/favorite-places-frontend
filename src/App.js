import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Display from "./components/Display";

function App() {
  // URL variable
  const url = "https://favorite-places-tw.herokuapp.com";

  // list of places
  const [places, setPlaces] = useState([]);

  // function for getting the list of places
  const getPlaces = () => {
    fetch(url + "/places")
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
      });
  };

  //useeffect to initial fetching
  useEffect(() => getPlaces(), []);

  return (
    <div className="App">
      <h1>Oh, the places you'll go...</h1>
      <h2>Favorite Escapes</h2>
      <hr />
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => <Display {...rp} places={places} />}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
