import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:8000/api/todos/'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    axios.get(API).then(res => setTodos(res.data))
  }, [])

  const addTodo = () => {
    if (!input.trim()) return
    axios.post(API, { title: input, completed: false })
      .then(res => setTodos([...todos, res.data]))
      .then(() => setInput(''))
  }

  const deleteTodo = (id) => {
    axios.delete(API + id + '/')
      .then(() => setTodos(todos.filter(t => t.id !== id)))
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Todo List</h1>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App