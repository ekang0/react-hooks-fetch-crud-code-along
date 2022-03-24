import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then(res => res.json())
    .then(data => {
      setItems(data);
    });
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  };

  function handleAddItem(newItem) {
    //console.log("ShoppingList:", newItem);
    setItems([...items, newItem]);
  };

  function handleUpdateItemCart(updateItem) {
    //console.log("handleUpdateItemCart", updateItem);
    const updatedItemList = items.map((item) => {
      if(item.id === updateItem.id){
        return updateItem
      } else {
        return item
      }
    });
    setItems(updatedItemList);
  };

  function handleDeleteItem(deleteItem){
    //console.log("handleDeleteItem", deleteItem);
    const updatedItemList = items.filter((item) => item.id !== deleteItem.id);
    setItems(updatedItemList);
  };

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onItemUpdate={handleUpdateItemCart} onDeleteItemUpdate={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
