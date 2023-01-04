import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';

function App() {
  const [value, setValue]: any = useState('');
  const [todos, setTodos]: any = useState([]);
  const [loading, setLoading]: any = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await axios
          .get(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
          .then((res) => {
            setTodos(res.data);
          })
          .finally(() => {
            setLoading(true);
          });
      } catch (e) {
        alert(e);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const addTodo = () => {
    if (value !== '') {
      setTodos([...todos, { title: value }]);
      setValue('');
    }
  };

  const deleteTodo = (todoIndex: number) => {
    const newTodos = todos.filter((_: any, index: any) => index !== todoIndex);
    setTodos(newTodos);
  };

  const removeTodo = () => {
    setTodos([]);
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={(event: any) => handleSubmit(event)}>
        <h1>TODO ЛИСТ</h1>
        <label>
          <input type="text" value={value} onChange={handleChange} />
          <button type="submit" onClick={addTodo}>
            ДОБАВИТЬ
          </button>
          <button type="button" onClick={removeTodo}>
            ОЧИСТИТЬ
          </button>
        </label>
      </form>

      <div className="todos">
        {loading
          ? todos.map((todo: any, index: number) => {
              return (
                <div key={index} className="todo">
                  <div className="title">
                    <input type="checkbox" />
                    <h3>
                      {index + 1}. {todo.title}
                    </h3>
                  </div>

                  <div className="delete" onClick={() => deleteTodo(index)}>
                    <AiFillDelete />
                  </div>
                </div>
              );
            })
          : 'loading...'}
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
