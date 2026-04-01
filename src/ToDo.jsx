import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ToDo.css";

export default function ToDoList() {
  let [ToDos, setToDos] = useState([{ task: "sample Task", id: uuidv4(), isDone: false }]);
  let [NewToDo, setNewToDo] = useState("");

  let addNewTask = () => {
    if (NewToDo.trim() === "") return;
    setToDos((prevToDos) => {
      return [...prevToDos, { task: NewToDo, id: uuidv4(), isDone: false }];
    });
    setNewToDo("");
  };

  let updateToDoValue = (event) => {
    setNewToDo(event.target.value);
  };

  let deleteToDo = (id) => {
    setToDos((prevToDos) => prevToDos.filter((ToDo) => ToDo.id !== id));
  };

  let toggleDone = (id) => {
    setToDos((prevToDos) =>
      prevToDos.map((ToDo) =>
        ToDo.id === id ? { ...ToDo, isDone: !ToDo.isDone } : ToDo
      )
    );
  };

  return (
    <div>
      <h4>To-Do List</h4>
      <input
        placeholder="Add a task!"
        value={NewToDo}
        onChange={updateToDoValue}
      />
      <br />
      <button onClick={addNewTask}>Add Task</button>
      <br /><br />
      <hr />
      <br /><br />
      <h4>Tasks To Do!</h4>
      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
        {ToDos.map((ToDo) => (
          <li key={ToDo.id}>
            <input
              type="checkbox"
              checked={ToDo.isDone}
              onChange={() => toggleDone(ToDo.id)}
            />
            &nbsp;&nbsp;
            <span style={{ textDecoration: ToDo.isDone ? "line-through" : "none" }}>
              {ToDo.task}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => deleteToDo(ToDo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}