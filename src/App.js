import React, { useState } from "react";
import { BsX } from "react-icons/bs";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import data from "./data";

function App() {
  const [list, setList] = useState(data);
  const [newTask, setNewTask] = useState("");

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);
    const items = Array.from(list);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setList(items);
  };
  const handleDelete = (id) => {
    console.log("id", id);
    const newList = list.filter((item) => list.indexOf(item) !== id);

    setList(newList);
    console.log("new", newList);
  };
  const handleAddTask = () => {
    // setNewTask(newTask.toString());
    console.log("new task", newTask);
    list.push(newTask);
    // const updatedList=list.push(newTask)
    const newlist = list.filter((item) => item);
    setList(newlist);
    console.log("updated list", list);
    setNewTask("");
  };
  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="task">
        <input
          type="text"
          className="inputbox"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add New Task"
        />
        <button className="Addbtn" onClick={handleAddTask}>
          Add
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              className="section"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.length === 0 && <NoData />}
              {list.map((item, index) => {
                const id = index.toString();
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        className="item"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p className="id">{index + 1}</p>
                        <p>{item}</p>
                        <BsX
                          className="icon"
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const NoData = () => {
  return (
    <div>
      <h3>ALL TASK COMPLETED</h3>
    </div>
  );
};
export default App;
