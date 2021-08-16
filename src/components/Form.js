import React, { useState } from "react";

const Form = (props) => {
  // set up the state for the form
  const [formData, setFormData] = useState(props.place);

  const handleSubmit = (event) => {
    event.preventDefault(); //prevent form from refresh
    props.handleSubmit(formData); //submit to parent
    props.history.push("/"); //push back to main page
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="img"
        value={formData.img}
        onChange={handleChange}
      />
      <input type="submit" value={props.label} />
    </form>
  );
};

export default Form;
