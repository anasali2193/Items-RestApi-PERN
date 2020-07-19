import React,{useState} from 'react';

const InputTodo =() =>{


    const [description, setdescription] = useState("")

    const onsubmitForm = async(e)=>{
        e.preventDefault();
        try{
            const body = {description}
            const response = await fetch("http://localhost:5000/todos",{
            method: "POST",
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
    <h1 className="text-center mt-5">PERN Todo</h1>
      <form className="d-flex mt-5" onSubmit={onsubmitForm}>
          <input type='text' 
          className="form-control"
          value={description}
           onChange={e=> setdescription(e.target.value)}>
           </input>
          <button className="btn btn-success">add</button>
      </form>
    </div>
  );
}

export default InputTodo;
