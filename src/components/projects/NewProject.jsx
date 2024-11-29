import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import Input from "../shared/Input.jsx";
import Modal from "../shared/Modal.jsx";

export default function NewProject({ onAdd, onCancel }) {
  const { modalRef, openModal } = useModal();
  const [error, setError] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDueDate, setEnteredDueDate] = useState("");

  function handleSave() {
    // Validation
    if (!enteredTitle.trim()) {
      setError("Project title is required.");
      openModal();
      return;
    }

    if (!enteredDueDate) {
      setError("Due date is required.");
      openModal();
      return;
    }

    // If validation passes, add the project
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });

    // Clear the inputs
    setEnteredTitle("");
    setEnteredDescription("");
    setEnteredDueDate("");
  }

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Okay">
        <h2 className="header-primary">Error</h2>
        <p className="text-subtle">{error}</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button className="btn-primary" onClick={handleSave}>
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input
            type="text"
            value={enteredTitle}
            onChange={(e) => setEnteredTitle(e.target.value)}
            label="Title"
          />
          <Input
            value={enteredDescription}
            onChange={(e) => setEnteredDescription(e.target.value)}
            label="Description"
            textarea
          />
          <Input
            type="date"
            value={enteredDueDate}
            onChange={(e) => setEnteredDueDate(e.target.value)}
            label="Due Date"
          />
        </div>
      </div>
    </>
  );
}
