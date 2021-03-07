import React, { useState, useEffect } from "react";
import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  useEffect(() => {
    getLocalTodos();
  }, []);
  const filterHandler = (_status, _todos) => {
    switch(_status) {
      case 'completed':
        setFilteredTodos(_todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(_todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(_todos);
        break;
    }
  }
  const saveLocalTodos = (_todos) => {
    localStorage.setItem('todos', JSON.stringify(_todos));
  }
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') !== null) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }
  useEffect(() => {
    filterHandler(status, todos);
    saveLocalTodos(todos);
  }, [todos, status]);
  return (
    <div className="App">
      <header>
        <h1>Todolist</h1>
      </header>
      <Form 
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus} 
      />
      <TodoList 
        todos={todos}
        setTodos={setTodos} 
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;