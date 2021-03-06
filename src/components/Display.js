import React from "react";

const Display = (props) => {
  const { places } = props;

  const loaded = () => (
    <div>
      {places.map((place) => (
        <article>
          <img src={place.img} alt="" style={{ width: "300px" }} />
          <h1>{place.name}</h1>
          <h2>{place.description}</h2>
          <button
            onClick={() => {
              props.selectPlace(place);
              props.history.push("/edit");
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              props.deletePlace(place);
            }}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  );

  const loading = <h1>Loading...</h1>;

  return places.length > 0 ? loaded() : loading;
};

export default Display;
