import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"
import { RiDeleteBinLine } from "react-icons/ri";

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios
      .get("/api/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const createItem = () => {
    axios
      .post("/api/items", { name: itemName, description })
      .then((response) => {
        console.log(response.data);
        setItemName("");
        setDescription("");
        fetchItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = (itemId) => {
    axios
      .delete(`/api/items/${itemId}`)
      .then((response) => {
        console.log(response.data);
        fetchItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Items</h1>
      <div className="inputs">
      <input placeholder="Enter Name" className="name-inp" type="text" value={itemName} onChange={handleItemNameChange} />
      <input placeholder="Enter Description"
      className="desc-inp"
        type="text"
        value={description}
        onChange={handleItemDescriptionChange}
      />
      <button className="submit" onClick={createItem}>Add Item</button>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <div className="container">
        {items.map((item) => (
          <div className="item" key={item._id}>
            <div className="name">{item.name} <RiDeleteBinLine
                onClick={() => deleteItem(item._id)}
                className="delete-icon"
              />  </div>
            <div className="desc">{item.description}</div>
          </div>
        ))}
        {
          items.length == 0 ? <center>No Data to Show</center> : null
        }
      </div>
    </div>
  );
}

export default App;
