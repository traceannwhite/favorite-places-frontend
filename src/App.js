import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./components/Display";
import Form from "./components/Form";

function App() {
  // URL variable
  const url = "https://favorite-places-tw.herokuapp.com";

  // list of places
  const [places, setPlaces] = useState([]);
  // empty place
  const emptyPlace = {
    img: "",
    name: "",
    description: "",
  };

  const [selectedPlace, setSelectedPlace] = useState(emptyPlace);

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

  const handleAdd = (newPlace) => {
    fetch(url + "/places", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlace),
    }).then(() => {
      getPlaces();
    });
  };

  const handleEdit = (place) => {
    fetch(url + "/places/" + place._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    }).then(() => {
      getPlaces();
    });
  };

  const selectPlace = (place) => {
    setSelectedPlace(place);
  };

  const deletePlace = (place) => {
    fetch(url + "/places/" + place._id, {
      method: "delete",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    }).then(() => {
      getPlaces();
    });
  };

  return (
    <div className="App">
      <h1>Oh, the places you'll go...</h1>
      <h2>Favorite Escapes</h2>
      <Link to="/addplace">
        <button>Add Favorite Place</button>
      </Link>
      <hr />
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display
                {...rp}
                places={places}
                selectPlace={selectPlace}
                deletePlace={deletePlace}
              />
            )}
          />
          <Route
            exact
            path="/addplace"
            render={(rp) => (
              <Form
                {...rp}
                label="Add Place"
                place={emptyPlace}
                handleSubmit={handleAdd}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form
                {...rp}
                label="update"
                place={selectedPlace}
                handleSubmit={handleEdit}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
