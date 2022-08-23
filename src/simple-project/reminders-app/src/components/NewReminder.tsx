import React, { useState } from "react";

interface NewReminderProps {
    onAddReminder : (title : string) => void
}

function NewReminder({onAddReminder} : NewReminderProps): JSX.Element {
  const [title, setTitle] = useState("");
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if(!title) return;
    onAddReminder(title)
    setTitle("")
  };
  return (
    <form onSubmit={submitForm}>
      <label htmlFor="title"></label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        id="title"
        className="form-control"
      />
      <button type="submit" className="btn btn-danger rounded-pill my-4">
        Add Reminder
      </button>
    </form>
  );
}

export default NewReminder;
