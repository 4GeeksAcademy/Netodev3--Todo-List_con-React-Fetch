import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKey = (event) => {
    const updateValue = {
      done: true,
      label: inputValue,
    };
    if (event.key === "Enter") {
      setTodos([...todos, updateValue]);
      updateTodo();
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const listaActualizada = todos.filter(
      (t, currentIndex) => index !== currentIndex
    );
    setTodos(listaActualizada);
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const urlTodos =
    "https://playground.4geeks.com/apis/fake/todos/user/Netodev3";

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    fetch(urlTodos)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((err) => err);
  };

  useEffect(() => {
    newTask();
  }, [todos]);

  const newTask = () => {
    fetch(urlTodos, {
      method: "POST",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        return err;
      });
  };

  const updateTodo = () => {
    const newTodo = {
      done: false,
      label: inputValue,
    };
    fetch(urlTodos, {
      method: "PUT",
      body: JSON.stringify([...todos, newTodo]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div className="container">
      <h1>ToDo's</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKey}
          />
        </li>
        {todos.map((value, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {value.label}
            <button
              className="btn btn-light"
              onClick={() => handleDelete(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="divCenter d-flex justify-content-center m-3">
        <button className="btn btn-success" onClick={handleDeleteAll}>
          Delete All
        </button>
      </div>

      <div className="etiqueta form-control col-2" style={{ width: "100px" }}>
        {todos.length} item left
      </div>
    </div>
  );
};

export default Home;
