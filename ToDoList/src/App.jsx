import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {

    const [todo,setTodo]=useState("")
    const [todos,setTodos]=useState([])
    const [ShowFinished,setShowFinished]=useState()

    useEffect(()=>{
      let todoString=localStorage.getItem("todos")
      if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
      }
    },[])

    const toggleFinished=(e)=>{
        setShowFinished(!ShowFinished)
    }

    const saveToLS=(params)=>{
      localStorage.setItem("todos",JSON.stringify(todos))
    }
  
    const handleEdit=(e,id)=>{
        let t=todos.filter(i=>i.id===id)
        setTodo(t[0].todo)

        let newTodos=todos.filter(item=>{
          return item.id!==id;
        });
        setTodos(newTodos)
        saveToLS()
    }

    const handleDelete=(e ,id)=>{
      
      console.log(`the id is ${id}`)
      let index=todos.findIndex(item=>{
        return item.id===id;
      })
      console.log(index)
      let newTodos=todos.filter(item=>{
        return item.id!==id;
      });
      //newTodos[index].isCompleted=!newTodos[index].isCompleted;
      setTodos(newTodos)
      console.log(newTodos)
      saveToLS()
    }

    const handleAdd=()=>{
      setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
      setTodo("")
      console.log(todos)
      saveToLS()
    }

    const handleChange=(e)=>{
      setTodo(e.target.value)
    }

    const handleCheckbox=(e)=>{
      console.log(e,e.target)
      let id=e.target.name;
      console.log(id)
      let index=todos.findIndex(item=>{
        return item.id===id;
      })
      console.log(index)
      let newTodos=[...todos];
      newTodos[index].isCompleted=!newTodos[index].isCompleted;
      setTodos(newTodos)
      console.log(newTodos,todos)
      saveToLS()
    }

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[70vh]">
        <div className="addTodo my-5">
          <div className="font-extrabold text-3xl py-4">
            !Task-SET YOUR TASKS RIGHT HERE
          </div>

          <h2 className="text-lg font-bold">Add a todo</h2>
            <input onChange={handleChange} value={todo} type="text" className="w-1/2 rounded-xl p-1" />
            <button onClick={handleAdd}  disabled={todo.length<3}className="bg-violet-800 hover:bg-violet-950 px-2 py-2 text-sm font-bold text-white rounded-xl mx-6 disabled:bg-violet-700">Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={ShowFinished}/>Show Finished
          <h1 className="text-lg font-bold">Your Todos</h1>
          <div className="todos">
              {todos.length===0 && <div className="m-5">No todos to display</div> }

            {todos.map(item =>{

           return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-3">
            <div className="flex gap-5">
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"line-through":""}>
                {item.todo}
              </div>
             </div>
               <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">Edit</button>
                 <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">Delete</button>
               </div>
               </div>
            })}
          </div>

      </div>
    </>
  )
}

export default App
