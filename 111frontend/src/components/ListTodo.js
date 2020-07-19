import React,{useState,useEffect} from 'react';
import EditTodo from './EditTodo';

const ListTodo =() =>{
    const [todos, settodos] = useState([])
    const getTodos = async()=>{
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json();
            settodos(jsonData);           
        } catch (error) {
            console.log(error.message);
        }
    };

    //delete 
    const deleteTodo = async(id)=>{
        try {
            const deleteTodo= await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            });
            settodos(todos.filter(todo=> todo.todo_id !== id));           
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        getTodos();
    },[])
   
  return (
    <div className="container-fluid" >
    ListTodo

    <table className="table mt-5 text-center" >
  <thead className="thead-dark">
    <tr>

      <th scope="col">Description</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
{todos.map((todo)=>(
    <tr key={todo.todo_id}>
      <td>{todo.description}</td>
      <td><EditTodo todo = {todo}/></td>
      <td><button className="btn btn-danger" onClick={(e)=>deleteTodo(todo.todo_id)}>Delete</button></td>
    </tr>
))

 }
  </tbody>
</table>

    </div>
  );
}

export default ListTodo;
