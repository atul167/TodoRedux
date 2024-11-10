// src/App.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';

import { addTodo, updateTodo, clearTodo } from './features/TodoSlice';
import { PlusCircle, CheckCircle, XCircle, Trash2 } from 'lucide-react';

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState('');
  const [taskdone, setTaskDone] = useState(0);

  useEffect(() => {
    let ans = 0;
    todos.forEach((todo) => {
      if (todo.completed) ans++;
    });
    setTaskDone(ans);
  }, [todos]);

  const completedPercentage = Math.min(
    todos.length > 0 ? (taskdone / todos.length) * 100 : 0,
    100
  );

  const handleAddTodo = () => {
    if (todos.length < 5) {
      if (taskInput.trim() === '') {
        alert('Please enter a task.');
        return;
      }
      dispatch(addTodo(taskInput));
      setTaskInput('');
    } else {
      alert('You can only add 5 todos per day.');
    }
  };

  const handleUpdateTodo = (e, id) => {
    const text = e.target.value;
    dispatch(updateTodo({ id, todo: text }));
  };

  const handleToggleCompleted = (id) => {
    const todo = todos.find((item) => item.id === id);
    if (todo) {
      dispatch(updateTodo({ id, completed: !todo.completed }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-8 px-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h1 className="flex flex-col items-center text-3xl font-bold text-gray-800 mb-2">
            Not your average Todo App
          </h1>
          <p className="flex flex-col items-center text-gray-600 mb-6">
            You can only make 5 todos per day. No need to delete todos; they will be deleted the next day automatically.
          </p>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Tasks Completed</span>
              <span>{`${taskdone}/${todos.length}`}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                style={{ width: `${completedPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter a task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleAddTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Add Task
            </button>
          </div>

          <div>
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`rounded-lg p-4 transition-all ${
                  todo.completed ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleCompleted(todo.id)}
                    className={`p-1 rounded-full transition-colors ${
                      todo.completed
                        ? 'text-green-500 hover:bg-green-100'
                        : 'text-red-500 hover:bg-red-100'
                    }`}
                  >
                    {todo.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6" />
                    )}
                  </button>

                  <input
                    type="text"
                    value={todo.todo}
                    onChange={(e) => handleUpdateTodo(e, todo.id)}
                    className={`flex-1 bg-transparent border-b-2 px-2 py-1 h-8 ${
                      todo.completed
                        ? 'border-green-200'
                        : 'border-red-200'
                    }`}
                  />

                  <button
                    onClick={() => handleToggleCompleted(todo.id)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      todo.completed
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                </div>

                {!todo.completed && (
                  <div className="mt-4 bg-white rounded-lg p-2 shadow-sm">
                    <iframe
                      src="https://giphy.com/embed/rZdexojlQ1WcqXqSWO"
                      width="100%"
                      height="150"
                      className="rounded-lg"
                      style={{ border: 'none' }}
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
          </div>

          {todos.length > 0 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => dispatch(clearTodo())}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-gray-500 flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Clear All Todos
              </button>
            </div>
          )}
        </div>
      </div>
      <footer className="mt-8 text-gray-500 text-center">
        Made with ❤️ 
      </footer>
    </div>
  );
}

export default App;
