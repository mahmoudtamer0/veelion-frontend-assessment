Review

I checked both modules (Task Dashboard and Activity Feed) before changing anything.

Bugs

Activity Feed had a lot of duplicate code There were two functions doing the same thing: formatTimeA and formatTimeB (same result), and applyFilterA and applyFilterB

Fake state just to force re-render There was a tick state that updates every 1.4 seconds with setInterval, and this was used to create a new state called forcedList just to make the component re-render. But React already re-renders when state changes

Performance
The setInterval in Activity Feed was causing unnecessary re-renders every 1.4 seconds, removed now (see bug above).
No React.memo on TaskItem, but with this small amount of tasks it does not really matter, so I did not add it.


Maintainability / Code quality

The fetch + error handling code is repeated in a few places: inside useTasks.ts (requestJson) and in backendApi.ts (getTasksFromBackend, updateTaskInBackend, getActivityFromBackend, createTaskInBackend). All of them do basically the same try/catch and error parsing. I left this as it is for now since it is working fine and touching it means changing every API call, but a shared helper function would make this cleaner.

Inline styles (style={{...}}) were used everywhere instead of CSS classes. I moved everything into globals.css with real classes (.card, .button, .badge, etc) and improved the colors, spacing and shadows a bit so it does not look like default styling anymore.


UX issues

Activity Feed had no loading state and no error state. If the fetch failed, it silently showed an empty list with no explanation. Added loading and error states, same pattern as Task Dashboard.
No way to add a new task from the Dashboard, had to use the API directly. Added a simple "Add Task" input + button above the task list.


What I added

Reports page (/reports): shows total tasks, tasks by status, and recent activity count, using the same loading/error pattern as the rest of the app. The backend response for byStatus includes in-progress but it is currently hardcoded to 0 on the backend side, so it will always show 0 here too — this is a backend data limitation, not a frontend bug.

Create Task form: small standalone component (CreateTaskForm.tsx), separate from the task list itself, with its own loading state while the request is in progress.


What I intentionally did not change
Did not merge the repeated fetch/error-handling code into one shared function (see Maintainability above). It works correctly as is, and I did not want to touch every API call for a task that asked to keep things simple.
Did not add tests, not asked for in the task.
Did not add debounce on the Activity Feed search input, not a real problem with this amount of data.

Thanks for reading!
Mahmoud Tamer 
mahmoud.tamer.developer@gmail.com
01123511914