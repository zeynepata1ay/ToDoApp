import Tasks from "../tasks/Tasks.jsx";
import NewTask from "../tasks/NewTask.jsx";

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}) {
  const formattedDate = project?.dueDate
    ? new Date(project.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="w-[35rem] mt-16">
      {/* Project Header */}
      <header className="pb-4 mb-4 border-b-2 border-stone-300 dark:border-stone-600">
        <div className="flex items-center justify-between">
          <h1 className="header-primary">{project.title}</h1>
          <button
            className="text-stone-600 hover:text-red-500 dark:text-stone-300"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="text-subtle">{formattedDate}</p>
        <p className="text-stone-600 dark:text-stone-400 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>

      {/* Add New Task Section */}
      <section className="my-8">
        <h2 className="header-primary">Add New Task</h2>
        {project?.id ? (
          <NewTask projectId={project.id} />
        ) : (
          <p className="text-stone-600 dark:text-stone-400">
            Select a project to add tasks.
          </p>
        )}
      </section>

      {/* Tasks List */}
      <section>
        {tasks?.length > 0 ? (
          <Tasks onDelete={onDeleteTask} tasks={tasks} />
        ) : (
          <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-md">
            <p className="text-stone-600 dark:text-stone-400">
              No tasks available. Add a new task above.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
