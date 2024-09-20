import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleChange = (event) => {
    setCurrentTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTask.trim() !== '') {
      setTasks([...tasks, currentTask]);
      setCurrentTask('');
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const handleEditChange = (event) => {
    setEditingText(event.target.value);
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null); 
  };

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentTask}
          onChange={handleChange}
          placeholder="Agregar una nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={editingText}
                onChange={handleEditChange}
              />
            ) : (
              task
            )}
            {editingIndex === index ? (
              <button className="save-btn" onClick={() => handleSaveEdit(index)}>
                Guardar
              </button>
            ) : (
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                Editar
              </button>
            )}
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
