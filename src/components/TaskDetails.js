import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Button from "./Button";

function TaskDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState({});
  const [error, setError] = useState(null);
  const params = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/tasks/${params.id}`);
      const data = await res.json();

      setTask(data);
      setIsLoading(false);
    };
    fetchTask();
  });
  return isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h3>{task.text}</h3>
      <p>{task.day}</p>
      <Button
        onClick={() => {
          Navigate(-1);
        }}
        text="Go Back"
      />
    </div>
  );
}

export default TaskDetails;
