'use client'
import { useState } from 'react';

function TaskManager() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    // Validate the input and check for null
    if (!taskInput || taskInput.trim() === "") {
      alert("Please enter a task");
      return;
    }
    setTasks([...tasks, { task: taskInput, editable: false }]);
    setTaskInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleEditable = (index) => {
    setTasks(tasks.map((task, i) => {
      if (i === index) {
        return { ...task, editable: !task.editable };
      }
      return task;
    }));
  };

  const handleEdit = (index, editedTask) => {
    setTasks(tasks.map((task, i) => {
      if (i === index) {
        return { ...task, task: editedTask, editable: false };
      }
      return task;
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const handleEditKeyPress = (event, index, editedTask) => {
    if (event.key === 'Enter') {
      handleEdit(index, editedTask);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="text"
        id="taskInput"
        value={taskInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Enter a task"
      />
      <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Add Task
      </button>
      <ul id="taskList" className="mt-4">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center justify-between bg-gray-100 rounded-md p-3 mb-2">
            {task.editable ? (
              <input
                type="text"
                value={task.task}
                onChange={(e) => handleEdit(index, e.target.value)}
                onBlur={() => toggleEditable(index)}
                onKeyPress={(e) => handleEditKeyPress(e, index, e.target.value)}
                autoFocus
                className="flex-1 mr-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            ) : (
              <span className="flex-1 mr-2">{task.task}</span>
            )}
            <div>
              <button onClick={() => toggleEditable(index)} className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Edit
              </button>
              <button onClick={() => deleteTask(index)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
