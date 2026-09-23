"use client";

import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/api";
import { StatusFilter } from "@/components/tasks/StatusFilter";
import { TaskList } from "@/components/tasks/TaskList";
import { CreateTaskForm } from "@/components/tasks/CreateTastForm";

export function TaskDashboard() {
  const {
    filteredTasks,
    filter,
    loading,
    error,
    updatingTaskId,
    creating,
    setFilter,
    fetchTasks,
    updateTaskStatus,
    createTask,
  } = useTasks();

  const handleToggle = (task: Task) => {
    updateTaskStatus(task.id, !task.completed);
  };

  return (
    <section className="stack">
      <header className="card">
        <h1 className="card-title">Task Dashboard</h1>
      </header>

      <CreateTaskForm creating={creating} onCreate={createTask} />

      <StatusFilter value={filter} onChange={setFilter} />

      {loading ? (
        <section className="card">
          <p className="empty-text">Loading tasks...</p>
        </section>
      ) : null}

      {error ? (
        <section className="card error-box">
          <p className="error-text">{error}</p>
          <button type="button" className="button" onClick={fetchTasks}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? (
        <TaskList tasks={filteredTasks} updatingTaskId={updatingTaskId} onToggle={handleToggle} />
      ) : null}
    </section>
  );
}