import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

  const [pizzas, setPizzas] = useState([]);
  const [editedPizza , setEditedPizza] = useState({
    id: "",
    topping: "",
    size: "",
    vegetarian: ""
  });

  useEffect(()=>{
    fetch("http://localhost:3001/pizzas")
    .then(resp => resp.json())
    .then(pizzaList => setPizzas(pizzaList))
  },[])

  function editPizza(pizzaObject){
    setEditedPizza({...editedPizza,
      id: pizzaObject.id,
      topping: pizzaObject.topping,
      size: pizzaObject.size,
      vegetarian: pizzaObject.vegetarian
    })

    
    console.log(pizzaObject);
  }

  function updatePizzaList(pizzaObject){

    const updatedPizzas = pizzas.map(pizza =>{
      if(pizza.id === pizzaObject.id){
        return pizzaObject;
      }else{
        return pizza;
      }
    })

    setPizzas(updatedPizzas);
  }

  return (
    <>
      <Header />
      <PizzaForm editedPizza={editedPizza} setEditedPizza={setEditedPizza} onUpdatePizza={updatePizzaList}/>
      <PizzaList pizzas={pizzas} onEditPizza={editPizza}/>
    </>
  );
}

export default App;
