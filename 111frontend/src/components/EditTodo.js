import React,{useState} from 'react';

const EditTodo =({todo}) =>{

    const [description, setdescription] = useState(todo.description)

    const updateDescription = async(e)=>{
        e.preventDefault();
        try{
            const body = {description}
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
            method: "PUT",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(body)
            
            })
            window.location= "/";
       
        }
        catch(err){
            console.error(err.message)
        }
    }
  return (
    <div className="container-fluid" >

<button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
  Edit 
</button>

<div className="modal" id={`id${todo.todo_id}`}  onClick={()=> setdescription(todo.description)}>
  <div className="modal-dialog">
    <div className="modal-content">

      <div className="modal-header">
        <h4 className="modal-title">Edit</h4>
        <button type="button" className="close" data-dismiss="modal" onClick={()=> setdescription(todo.description)}>&times;</button>
      </div>

      <div className="modal-body">
        <input type ='text ' className="form-control" value={description} onChange={(e)=> setdescription(e.target.value)}></input>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e)=>updateDescription(e)}>Edit</button>
        <button type="button" className="btn btn-danger" data-dismiss="modal"  onClick={()=> setdescription(todo.description)}>close</button>

      </div>

    </div>
  </div>
</div>
    </div>
  );
}

export default EditTodo;
