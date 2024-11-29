export default function Tasks({ tasks, onDelete }) {
  return (
    <section>
      {/* Single header for tasks */}
      <h2 className="header-primary">Tasks</h2>
      {tasks.length === 0 && (
        <p className="text-stone-800 dark:text-stone-300 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-4 rounded-md bg-stone-100 dark:bg-stone-800">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span className="text-stone-700 dark:text-stone-200">{task.text}</span>
              <button
                className="text-stone-700 hover:text-red-500 dark:text-stone-300"
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
