import { useState, useEffect } from 'react';
import './App.css';

// Components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((item) => item.completed));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((item) => !item.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const saveTodos = () => {
    if (!localStorage.getItem('react-todos')) {
      localStorage.setItem('react-todos', JSON.stringify([]));
    } else {
      localStorage.setItem('react-todos', JSON.stringify(todos));
    }
  };

  const getTodos = () => {
    if (localStorage.getItem('react-todos')) {
      const allTodos = localStorage.getItem('react-todos');
      setTodos(JSON.parse(allTodos));

      // setTodos(JSON.parse(localStorage.getItem('react-todos')));
      // localStorage.setItem('react-todos', JSON.stringify([]));
    }
    //  else {
    //   localStorage.setItem('react-todos', JSON.stringify(todos));
    // }
  };

  return (
    <div className="App">
      <header>
        <h1>My Todo List </h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList todos={filteredTodos} setTodos={setTodos} />
    </div>
  );
}

export default App;
