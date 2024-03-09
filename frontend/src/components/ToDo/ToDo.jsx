import React, { useState } from 'react';

const TodoForm = ({ addTodo, hideTodoList, showTodoList }) => {
  const [todo, setTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() !== '') {
      addTodo(todo);
      setTodo('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="flex items-center">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="px-4 py-2 mr-2 border rounded-md w-64"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Add
          </button>
        </div>
      </form>
      <button onClick={showTodoList} className="px-4 py-2 bg-green-500 text-white rounded-md mr-2">
        Show Todos
      </button>
      <button onClick={hideTodoList} className="px-4 py-2 bg-red-500 text-white rounded-md">
        Hide Todos
      </button>
    </div>
  );
};

export default TodoForm;