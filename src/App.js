import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState, useEffect } from "react";//useEffect is a hook that allows us to run a function when the component loads while useState is a hook that allows us to use state in a functional component
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Task from './components/Task';

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false); //useState returns an array with 2 values [0, 1] 0 is the state and 1 is the function that updates the state
  const [tasks, setTasks] = useState([]);//useState returns an array with 2 values [0, 1] 0 is the state and 1 is the function that updates the state
  
  useEffect(() => {
const getTasks = async () => {
  const tasksFromServer = await fetchTasks();
  setTasks(tasksFromServer);
};
    getTasks();
  }, []);//the empty array is a dependency array, it tells react that we want to run the useEffect function only once when the component loads

//Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch("http://localhost:5000/tasks");//fetch returns a promise
  const data = await res.json();//res.json() returns a promise
  
  return data;
};

//Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);//fetch returns a promise
  const data = await res.json();//res.json() returns a promise

  return data;
};

  //add task
  const addTask = async (task) => {//we need to pass the task object to the server
    const res = await fetch("http://localhost:5000/tasks", {//fetch returns a promise
      method: "POST",//we need to specify the method we are using
      headers: {"Content-type": "application/json"},//we need to specify the type of data we are sending to the server
      body: JSON.stringify(task),//we need to convert the task object to a JSON string
    });
    const data = await res.json();//res.json() returns a promise and we need to await it to get the data from the server and store it in a variable called data 
    setTasks([...tasks, data]);//we need to spread the tasks and add the new task

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = {id, ...task};//spread operator each . represents a new property (id, text, day, reminder)
    // setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = async (id) => {
await fetch(`http://localhost:5000/tasks/${id}`, {
  method: "DELETE",
});
    setTasks(tasks.filter((task) => task.id !== id));
  };

// Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id);
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updTask),//we need to convert the task object to a JSON string
  });

  const data = await res.json();//res.json() returns a promise and we need to await it to get the data from the server and store it in a variable called data

  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
    )
  );
};


return (
  <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      <Routes>
        <Route path="/" element = {
          <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ("No tasks")} 
        </>
        } 
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  </Router>
)
};

export default App;
