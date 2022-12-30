import React, { useState } from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrash, faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import './App.css';
import AddComponent from './Components/AddComponents';
function App() {
  // Task (ToDo List) State
  const [toDo, setToDo] = useState([
    // { "id": 1, "title": "Task 1", "status": true },
    // { "id": 2, "title": "Task 2", "status": false }
  ]);

  //Temp State
  const [newTask, setnewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //Add task
  ////////////////////////// 
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry]);
      setnewTask('');
    }
  }

  //Delete task
  //////////////////////////
  const deleteTask = (id) => {
    let newTasks = toDo.filter(a => a.id !== id)
    setToDo(newTasks);
  }

  //Mark task as done or completed
  //////////////////////////
  const markDone = (id) => {
    let newTasks = toDo.map((task) => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTasks);
  }

  // Cancel update
  //////////////////////////
  const cancellUpdate = () => {
    setUpdateData('');
  }

  //Change task for update
  //////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // Update task
  //////////////////////////
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id != updateData.id);
    let updateObject = [...filterRecords, updateData];
    setToDo(updateObject);
    setUpdateData('');
  }
  return (
    <div className="container App">
      <br /><br />
      <h2>to do (react app js)</h2>
      <br /><br />

      {updateData && updateData ? (
        <>
          {/* Update Task */}
          <div className="row">
            <div className="col">
              <input type="text"
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                onClick={updateTask}
                className="btn btn-lg btn-success mr-20"
              >Update</button>
              <button
                onClick={cancellUpdate}
                className="btn btn-lg btn-warning"
              >Cancel</button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Add Task */}
          <AddComponent
            value={newTask}
            setnewTask={setnewTask}
            addTask={addTask}
          />
          </>
      )}

      {/* Display ToDos */}
      {toDo && toDo.length ? '' : 'No Task...'}
      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? "done" : ""}>
                  <span className="taskNumber">{index + 1}</span>
                  <span className="taskText">{task.title}</span>
                </div>
                <div className="iconsWrap">
                  <span title="Completed / Not Completed"
                    onClick={(e) => markDone(task.id)}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  {task.status ? null :
                    <span title="Edit"
                      onClick={() => setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>}
                  <span title="Delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          )
        })
      }
    </div>
  );
}

export default App;
