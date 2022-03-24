import React, { useState } from "react";

function ItemForm( { onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSumbit(e) {
    e.preventDefault();
    //console.log(e.target.name.value);
    //console.log(e.target.category.value);
    //console.log("name:", name);
    //console.log("category:", category)
    const newItem = {
      "name": name,
      "category": category,
      "isInCart": false
    };
    //console.log(newItem);
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
    .then(res => res.json())
    .then(data => {
      onAddItem(data)
    });
  };


  return (
    <form className="NewItem" onSubmit={handleSumbit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
