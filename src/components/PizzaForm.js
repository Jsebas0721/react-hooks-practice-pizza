import React, { useState } from "react";

function PizzaForm({editedPizza, setEditedPizza, onUpdatePizza}) {

  

  const [isChecked, setIsChecked] = useState(true);

  


  function handleSubmit(e){
    e.preventDefault();
    
    fetch(`http://localhost:3001/pizzas/${editedPizza.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedPizza)
    })
    .then(resp => resp.json())
    .then(pizzaForm => onUpdatePizza(pizzaForm))

    console.log("pizza Edited:", editedPizza);
   
  }
  
  function handleChange(e){
    console.log(e.target.value);
    
    if(e.target.value === "vegetarian"){
      setEditedPizza({
        ...editedPizza,
        [e.target.name]: true
      })
    }else if(e.target.value === "not vegetarian"){
      setEditedPizza({
        ...editedPizza,
        [e.target.name]: false
      })
    }else{
      setEditedPizza({
        ...editedPizza,
        [e.target.name]: e.target.value
      })
    }

  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={editedPizza.topping}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={editedPizza.size} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="vegetarian"
              checked={editedPizza.vegetarian  ? "checked" : ""}
              onChange={handleChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="not vegetarian"
              checked={editedPizza.vegetarian ? "" : "checked"}
              onChange={handleChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
