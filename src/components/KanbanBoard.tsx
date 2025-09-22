import tasks from "../data/tasks.json";
import type { Task } from "../types/task";

const KanbanBoard = () => {
  // Group tasks by status
  const todoTasks = (tasks as Task[]).filter((t) => t.status === "TODO");
  const inProgressTasks = (tasks as Task[]).filter(
    (t) => t.status === "IN_PROGRESS"
  );
  const doneTasks = (tasks as Task[]).filter((t) => t.status === "DONE");

  const columns = [
    { title: "Todo", tasks: todoTasks, color: "border-blue-500" },
    { title: "In Progress", tasks: inProgressTasks, color: "border-amber-500" },
    { title: "Done", tasks: doneTasks, color: "border-green-500" },
  ];

  // Function to get initials from name
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  };

  // Status badge colors
  const statusColors: Record<Task["status"], string> = {
    TODO: "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100",
    IN_PROGRESS:
      "bg-amber-100 text-amber-700 dark:bg-amber-600 dark:text-amber-100",
    DONE: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
  };

  return (
    <div className='w-3/4 mx-auto'>
      {/* Header */}
      <h1 className='text-center text-4xl font-bold py-10 text-gray-900 dark:text-white'>
        Kanban Board
      </h1>

      {/* Columns */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {columns.map((col) => (
          <div
            key={col.title}
            className={`rounded-xl border-1 ${col.color} bg-gray-50 dark:bg-zinc-900 shadow-md`}>
            <h2 className='uppercase text-center text-xl font-semibold py-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700'>
              {col.title}
            </h2>
            <div className='p-4 space-y-4'>
              {col.tasks.length > 0 ? (
                col.tasks.map((task) => (
                  <div
                    key={task.id}
                    className='rounded-lg bg-white dark:bg-zinc-700 shadow hover:shadow-lg transition p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <h3 className='font-semibold text-lg text-gray-800 dark:text-gray-100'>
                        {task.title}
                      </h3>
                      {/* Status Badge */}
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          statusColors[task.status]
                        }`}>
                        {task.status.replace("_", " ")}
                      </span>
                    </div>

                    <p className='text-sm text-gray-600 dark:text-gray-300 mb-3'>
                      {task.description}
                    </p>

                    <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
                      {/* User initials in a circle */}
                      <div className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-500 font-bold text-gray-800 dark:text-white'>
                        {getInitials(task.asignedTo.name)}
                      </div>

                      {/* Created Date */}
                      <span>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-sm text-gray-500 dark:text-gray-400 italic text-center'>
                  No tasks
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
