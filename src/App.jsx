import React from "react";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const handleEdit = () => {
    console.log("Edit button clicked");
  };
  const handleDelete = () => { 
    console.log("Delete button clicked");
  };

  const handleAdd = () => { 
    console.log("Add button clicked");
    setTasks([...tasks, task])
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-6 rounded-lg bg-teal-600 p-5 min-h-screen">
        <div className="p-2 m-4">
          <h2 className="text-lg font-semibold my-2 addTask" >Add Task</h2>
          <div className="flex gap-6">
            <input
              className=" shadow-lg rounded-lg bg-gray-300 p-2 w-1/3"
              type="text"
            />
            <button className=" shadow-lg rounded-lg hover:border-black p-2 bg-sky-400 hover:bg-sky-800 hover:text-slate-200 px-4" onClick={handleAdd}>
              Submit
            </button>
          </div>
        </div>

        <div className="p-2 m-4">

          <h2 className="text-lg font-semibold">Your Tasks</h2>

          <div className="tasks flex">
            <div className="text text-md my-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab,
              harum.
            </div>
            <div className="buttons ">
              <button className=" rounded-md p-1 mx-1 bg-yellow-500 hover:border-black hover:bg-yellow-700 hover:text-white" onClick={handleEdit}>
                Edit
              </button>
              <button className=" rounded-md p-1 mx-1 bg-red-500 hover:border-black hover:bg-red-900 hover:text-white" onClick={handleDelete}>
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
