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

  const deleteToDo = async (e)=>{
    const {listId} = 
    await axios.post('/api/v1/todo//create/delete',{
      params : {
        listId
      }
    })
    .then( (res)=>{
      console.log(res)
    } )
    .catch( (error)=>{
      console.log("Somthing went worng while deleting the ToDo",error)
    } )
  }
  const updateToDo = async (e)=>{
    
  }

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
                <img src="https://www.google.com/url?sa=i&url=
                          https%3A%2F%2Fwww.pngwing.com%2Fen%2F
                          free-png-prlnm&psig=AOvVaw2yvCG6T7NFER
                          1EWwuvVyae&ust=1710227193740000&source=
                          images&cd=vfe&opi=89978449&ved=0CBMQjRxqF
                          woTCJjQl_XS64QDFQAAAAAdAAAAABAE" 
                          alt="delete" 
                          onClick={deleteToDo}/>
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2
                          Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dupdate&psig=
                          AOvVaw1Fked6Wt5UBjSLBvk2pW5h&ust=1710227277595000
                          &source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqF
                          woTCJjG_dzU64QDFQAAAAAdAAAAABAE" 
                          alt="Update" 
                          onClick={updateToDo}/>
              </div>

            } )
          }
        </div>
      </form>
      
    </div>
  );
};

export default TodoForm;