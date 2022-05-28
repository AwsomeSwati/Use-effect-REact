import React, { useEffect } from 'react';
import {useState} from "react";

const Todos = () => {
 
const [newTodo,setNewTodo] = useState("")    
const [todos,setTodos] = useState([])
const [page, setPage] = useState(1)



const saveInfo = () => {

    fetch ("http://localhost:8080/lists?",{
        method:"POST",
        headers:{
            "content-type": "application/json",
        },
        body:JSON.stringify({
            name : newTodo,
            isCompleted :false,
        }),
    })

    .then((r) => r.json())
    .then((d)=>{
        setTodos([...todos,d])
        setNewTodo("");
    })

}
useEffect(()=>{
    fetch(`http://localhost:8080/lists?_page=${page}&_limit=3`)
    .then((r)=> r.json())
    .then((d)=>{
        
    });
},[page])

const handleChange = (value) => {
  setPage(value)
}
  return (
    <div>Todos
        <div>
            <input value={newTodo} onChange={({target})=>setNewTodo (target.value)}  />
            <button onClick={saveInfo}>+</button>
            {todos.map((todo) =>(
               <div key={todo.id}> {todo.name} </div> 
            ))}
        </div>
        <div>
            <button onClick={() => handleChange(1)}>1</button>
            <button onClick={() => handleChange(2)}>2</button>
            <button onClick={() => handleChange(3)}>3</button>
        </div>
    </div>
  )
}

export default Todos