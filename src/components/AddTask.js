import { useState } from "react";
const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    // e is the event object
    // Prevents the page from refreshing when the form is submitted
    e.preventDefault();
    // If the text field is empty, an alert will pop up
    if (!text) {
      alert("Please add a task");
      return;
    }
    // If the day field is empty, an alert will pop up
    if (!day) {
      alert("Please add a day and time");
      return;
    }
    // If the reminder field is empty, an alert will pop up
    if (!reminder) {
      alert("Please add a reminder");
      return;
    }
    // If all fields are filled, the task will be added
    onAdd({ text, day, reminder });
    // After the task is added, the fields will be cleared
    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
