import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Maneja el cambio en el campo de entrada
  const handleChange = (event) => {
    setCurrentTask(event.target.value);
  };

  // Maneja el envío del formulario para agregar una tarea
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTask.trim() !== '') {
      setTasks([...tasks, currentTask]);
      setCurrentTask(''); // Limpia el campo de entrada
    }
  };

  // Maneja la eliminación de una tarea
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Activa el modo de edición para una tarea específica
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  // Maneja el cambio del texto durante la edición
  const handleEditChange = (event) => {
    setEditingText(event.target.value);
  };

  // Guarda los cambios después de editar la tarea
  const handleSaveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null); // Sale del modo de edición
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
