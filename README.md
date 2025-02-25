# Task Tracker CLI

A simple command-line interface (CLI) application built using Node.js for managing tasks. This CLI allows users to view, add, update the status, and delete tasks from a `tasks.json` file. This project was built using core Node.js modules like `fs`, `readline`, and `crypto`.

## Features
- **View Tasks**: Display all the tasks with their status.
- **Add Task**: Add new tasks with a title, description, and default status (`idle`).
- **Update Task Status**: Update the status of a task to `idle`, `in progress`, or `completed`.
- **Delete Task**: Delete a task by its number from the list.

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

1. **View Tasks**: Displays the list of tasks with their status.
2. **Add Task**: Allows you to add a new task with a title, description, and default status of `idle`.
3. **Update Task Status**: Allows you to update the status of a task (idle, in progress, completed).
4. **Delete Task**: Allows you to delete a task by selecting the task number.
5. **Exit**: Exit the application.

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

- Upon selecting **1**, the list of tasks is displayed.
- Upon selecting **2**, you can add a task by entering the title and description.
- Upon selecting **3**, you can update a task's status by choosing its task number.
- Upon selecting **4**, you can delete a task by its number.

## Task File Format

Tasks are stored in a `tasks.json` file in the following format:

```json
[
  {
    "id": "random-unique-id",
    "title": "Task Title",
    "description": "Task description",
    "status": "idle"
  }
]
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Make your changes and commit them (`git commit -am 'Add feature xyz'`).
4. Push to the branch (`git push origin feature-xyz`).
5. Create a pull request.

## License

This project is licensed under the ISC License.

---

Let me know if you need any adjustments to this `README.md`!