import React, { useEffect, useState } from 'react';
import axios from "axios"

const TodoForm =  ({ addTodo, hideTodoList, showTodoList }) => {
  const [todo, setTodo] = useState('');
  const[todoList , setToDoList] = useState([])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId')
    await axios.get('/api/v1/todo/create',{
     todo,
     params : {
      userId
     }
    }).then( (res)=>{
      console.log(res)
    } ).catch( (error)=>{
      console.log("something went worng while adding todo : ",error)
    })
  };

  const showTodoList = async(e) =>{
    const userId = localStorage.getItem('userId')
    await axios.get('/api/v1/todo//create/getList')
    .then( (res)=>{
      setToDoList(res)
      const div = document.createElement('div')
      for(let i=0;i<res.length;i++){
        <div id= {res.data.data[i]._id}> { res.data.data[i].toto } </div>
      }
      console.log(res)
    } )
    .catch( (error)=>{
      console.log("Something went worng while fetching Todo",error)
    } )
  }

  useEffect( async(e)=>{
    const userId = localStorage.getItem('userId')
    await axios.get('/api/v1/todo//create/getList')
    .then( (res)=>{
      setToDoList(res.data.data)
      const div = document.createElement('div')
      
      console.log(res)
    } )
    .catch( (error)=>{
      console.log("Something went worng while fetching Todo",error)
    } )
  },[] )

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

          {
            todo.map( (todo , index)=>{
              <div id= {todo._id}>
                <h3>todo.todo</h3>
              </div>
            } )
          }
        </div>
      </form>
      
    </div>
  );
};

export default TodoForm;