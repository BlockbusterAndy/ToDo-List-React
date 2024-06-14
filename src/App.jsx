import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit, FaTasks } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      try {
        let t = JSON.parse(tasks);
        setTasks(t);
      } catch (error) {
        console.error("Failed to parse tasks from localStorage", error);
        setTasks([]);
      }
    }
  }, [])

  const saveToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const toggleShowFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    console.log("Edit button clicked");
    console.log(id);
    let t = tasks.filter(i => i.id === id);
    setTask(t[0].task);
    const updatedTasks = tasks.filter(item => item.id !== id);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const handleDelete = (e, id) => {
    console.log("Delete button clicked");
    console.log(id);
    const updatedTasks = tasks.filter(item => item.id !== id);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const handleAdd = () => {
    console.log("Add button clicked");
    const newTasks = [...tasks, { id: uuidv4(), task, isCompleted: false }];
    setTasks(newTasks);
    setTask("");
    console.log(newTasks);
    saveToLocalStorage(newTasks);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && task.length > 3) {
      handleAdd();
    }
  }

  const handleChange = (e) => {
    setTask(e.target.value);
  }

  const handleCheckbox = (e) => {
    console.log(e.target.checked);
    console.log(e.target.name);
    const updatedTasks = tasks.map(item => {
      if (item.id === e.target.name) {
        item.isCompleted = e.target.checked;
      }
      return item;
    });
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-6 rounded-lg bg-gray-200 shadow-xl p-5 min-h-[80vh] w-[75vw]">

        <div className="p-2 m-4">
          <h2 className=" flex items-center gap-2 text-lg font-semibold my-2 addTask">Add Task <IoMdAddCircle /> </h2>
          <div className="flex gap-6">
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={task}
              className="shadow-sm rounded-lg bg-gray-100 p-2 w-1/2"
              type="text"
            />
            <button className="shadow-lg rounded-lg hover:border-black p-2 bg-green-600 hover:bg-sky-800 hover:text-slate-200 px-4 disabled:bg-sky-400" onClick={handleAdd} disabled={task.length<=3}>
              Save
            </button>
          </div>
        </div>

        <div className="p-2 m-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">Your Tasks <FaTasks /> </h2>
          <input onChange={toggleShowFinished} className="my-2" type="checkbox" checked={showFinished} /> <span className=" font-normal text-sm ">Show finished tasks</span>
          <hr className="h-1 bg-gray-600 mb-4 opacity-60"/>

          <div className="tasks">
            {tasks.length === 0 && <div className="text-xl my-4 text-center font-bold">No tasks to show</div>}
            {tasks.map(item => {
              return(showFinished || !item.isCompleted) && <div key={item.id} className="flex w-1/2 justify-between my-2 text-xl">
                  <div className="flex gap-5">
                    <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id={item.id} />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.task}
                    </div>
                  </div>
                  <div className="flex buttons mx-2">
                    <button className="flex items-center gap-1 text-sm font-semibold rounded-md p-1 mx-1 bg-yellow-500 hover:border-black hover:bg-yellow-700 hover:text-white" onClick={(e) => { handleEdit(e, item.id) }}>
                      <FaRegEdit />Edit
                    </button>
                    <button className="flex items-center gap-1 text-sm font-semibold rounded-md p-1 mx-1 bg-red-500 hover:border-black hover:bg-red-900 hover:text-white" onClick={(e) => { handleDelete(e, item.id) }}>
                      <MdDelete />Delete
                    </button>
                  </div>
                </div>
            })}
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
