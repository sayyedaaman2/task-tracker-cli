# Task Tracker CLI

A simple command-line interface (CLI) application built using Node.js for managing tasks. This CLI allows users to view, add, update the status, and delete tasks from a `tasks.json` file. This project was built using core Node.js modules like `fs` and `readline`. 
https://roadmap.sh/projects/task-tracker

## Features

- Add a new task with a description
- Update the description of an existing task
- Delete a task by its ID
- Mark a task as "in-progress" or "done"
- List all tasks or filter them by their status (e.g., "todo", "in-progress", "done")
- View available commands using the `help` command
- Exit the application using the `quit` command

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sayyedaaman2/task-tracker-cli.git
   ```

2. **Navigate into the project folder**:

   ```bash
   cd task-tracker-cli
   ```

3. **Install dependencies**:

   This project uses `nodemon` for automatic reloading during development. Install the required dependencies using:

   ```bash
   npm install
   ```

4. **Run the application**:

   To start the application, run:

   ```bash
   npm start
   ```

   Or, to run in development mode with `nodemon`:

   ```bash
   npm run dev
   ```

## Usage

Once the app starts, you will see a menu with the following options:

## Available commands:

- **add <task>**: Add a new task with the specified description.
- **update <taskId> <new task>**: Update the description of a task by its ID.
- **delete <taskId>**: Delete a task by its ID.
- **mark-in-progress <taskId>**: Mark a task as "in-progress".
- **mark-done <taskId>**: Mark a task as "done".
- **list**: List all tasks.
- **list <status>**: List tasks filtered by status (e.g., "todo", "in-progress", "done").
- **help**: Show the available commands.
- **quit**: Close the app.

### Example:

```
Task Tracker
1. View Tasks
2. Add Task
3. Update Task Status
4. Delete Task
5. Exit
Choose an option:
```

#### Add a task:
```
task-cli :-> add "Buy groceries"
Task added successfully (ID:1)
```
#### update a task:
```
task-cli :-> update 1 "Buy groceries and fruits"
Task updated successfully.
```
#### delete a task:
```
task-cli :-> delete 1
Task deleted successfully.

```

#### Mark a task as in-progress:
```
task-cli :-> mark-in-progress 1
Task marked as in-progress.

```

#### List all tasks:
```
task-cli :-> list
[ { id: 1, description: 'Buy groceries', status: 'todo', createdAt: '...', updatedAt: '...' } ]

```
#### List tasks by status:
```
task-cli :-> list "in-progress"
[ { id: 1, description: 'Buy groceries', status: 'in-progress', createdAt: '...', updatedAt: '...' } ]

```
#### Show help:
```
task-cli :-> help
======================================== Task App ========================================
Available Commands:
1. add <task>        - Add a new task with the specified description.
2. delete <taskId>   - Delete a task by its ID.
3. update <taskId> <new task> - Update the description of a task by its ID.
4. list               - List all tasks.
5. list <status>      - List tasks filtered by status (e.g., 'completed', 'pending').
6. help               - Show the available commands.
7. quit               - Close the app

```
#### Exit the app:
```
task-cli :-> quit

```
## Task File Format

Tasks are stored in a `tasks.json` file in the following format:

```json
[
  {
    "id": "1",
    "title": "Task Title",
    "description": "Task description",
    "status": "todo"
  }
]
```

## Dependencies


- fs - File system module (native Node.js)
- path - Path module (native Node.js)
- readline - Readline module (native Node.js)

## License

This project is licensed under the ISC License.

---
