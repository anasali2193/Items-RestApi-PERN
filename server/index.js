const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


//middleware
app.use(cors());
app.use(express.json()); //req.body

//routes

//create todo
app.post('/todos',async (req,res)=>{
    //await
    try{
        const  {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) values ($1) returning *",[description]); //$1 a place holder 
        res.json(newTodo.rows[0]);

    }
    catch(err){
        console.error(err.message);
    }
})


//get all todos
app.get('/todos', async(req,res)=>{
    try{
        const allTodos = await pool.query("select * from todo");
        res.json(allTodos.rows)
    }
    catch(err){
        console.error(err.message);
    }
});
//get a todos
app.get('/todos/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const todo = await pool.query("select * from todo where todo_id = $1",[id]);
        res.json(todo.rows)
    }
    catch(err){
        console.error(err.message);
    }
});

//update todo
app.put('/todos/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("update todo set description= $1 where todo_id = $2",[description,id]);
        res.json('todo updated')
    }
    catch(err){
        console.error(err.message);
    }
})

//delete todo

app.delete('/todos/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("delete from todo where todo_id = $1",[id]);
        res.json('todo deleted')
    }
    catch(err){
        console.error(err.message);
    }
})


app.listen(5000,()=>{
    console.log('server has been started')
});

