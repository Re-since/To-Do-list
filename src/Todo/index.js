import { useStore } from '../store'
import { observer } from 'mobx-react-lite'
import uuid from 'react-uuid'
import { useState } from 'react'
import './index.css'

function Task() {
  const { taskStore } = useStore();

  function singleCheck(id) {
    taskStore.singleCheck(id);
  }

  function multiCheck(e) {
    taskStore.multiCheck(e.target.checked)
  }

  function deleteTask(id) {
    taskStore.deleteTask(id);
  }

  const [text, setText] = useState('');
  function addTask(e) {
    if (e.keyCode === 13) {

      taskStore.addTask(
        {
          id: uuid(),
          name: text,
          isDone: false
        }
      )

      setText('');
    }
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => { setText(e.target.value) }}
          onKeyUp={addTask}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={multiCheck}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {
            taskStore.list.map(item => (
              <li
                key={item.id}
                className={item.isDone ? "to do completed" : "to do"}
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    onChange={() => singleCheck(item.id)}
                    checked={item.isDone}
                  />
                  <label >{item.name}</label>
                  <button
                    className="destroy"
                    onClick={() => deleteTask(item.id)}
                  ></button>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
      <footer className='footer'>
        <span className='todo-count'>
          Completed Tasks: {taskStore.finishTaskNumber} -- All Tasks: {taskStore.list.length}
        </span>
      </footer>
    </section>
  )
}

export default observer(Task)
