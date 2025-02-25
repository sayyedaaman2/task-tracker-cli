const fs = require("fs");
const path = require("path");
const readline = require('node:readline');
const {stdin:input, stdout:output} = require('node:process')
const TASKS_FILE = path.join(__dirname, "tasks.json");


const rl = readline.createInterface({
    input , output
})


// Ensure tasks.json exists
if (!fs.existsSync(TASKS_FILE)) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
}

function loadTasks() {
  return JSON.parse(fs.readFileSync(TASKS_FILE, "utf8"));
}

function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

function addTask(description) {
    if(!description){
        console.error(`Description is requied!`);
        promptUser();
    }
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length + 1,
    description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

function updateTask(id, description) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log("Task updated successfully.");
  } else {
    console.log("Task not found.");
  }
}

function deleteTask(id) {
  let tasks = loadTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  if (tasks.length < initialLength) {
    saveTasks(tasks);
    console.log("Task deleted successfully.");
  } else {
    console.log("Task not found.");
  }
}

function markTask(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task marked as ${status}.`);
  } else {
    console.log("Task not found.");
  }
}

function listTasks(filter = null) {
  const tasks = loadTasks();
  const filteredTasks = filter ? tasks.filter((task) => task.status === filter) : tasks;
  console.log(filteredTasks.length ? filteredTasks : "No tasks found.");
}

function showCommands() {
    console.clear();
    console.log(`======================================== Task App ========================================`)
    console.log("Available Commands:");
    console.log("1. add <task>        - Add a new task with the specified description.");
    console.log("2. delete <taskId>   - Delete a task by its ID.");
    console.log("3. update <taskId> <new task> - Update the description of a task by its ID.");
    console.log("4. list               - List all tasks.");
    console.log("5. list <status>      - List tasks filtered by status (e.g., 'completed', 'pending').");
    console.log("6. help               - Show the available commands.");
    console.log("7. quit               - Close the app");

  }


  

function handleMenu(command,...args){
    switch (command) {
        case "add":
          addTask(args.join(" "));
          break;
        case "update":
          updateTask(Number(args[0]), args.slice(1).join(" "));
          break;
        case "delete":
          deleteTask(Number(args[0]));
          break;
        case "mark-in-progress":
          markTask(Number(args[0]), "in-progress");
          break;
        case "mark-done":
          markTask(Number(args[0]), "done");
          break;
        case "list":
          listTasks(args[0]);
          break;
        case "help":
            showCommands();
            break;
        case "quit":
            process.exit(0);
            break;
        default:
          console.log("Invalid command. Available commands: add, update, delete, mark-in-progress, mark-done, list");
      }
}


// Function to parse input while preserving quoted text
function parseInput(input) {
  const regex = /"([^"]+)"|(\S+)/g; // Matches words or quoted text
  let matches = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    matches.push(match[1] ? match[1] : match[2]); // Remove quotes from captured groups
  }

  return matches;
}

// Function to read and process user input
function readCommand() {
  rl.question("task-cli :-> ", (input) => {
    let args = parseInput(input);
    let command = args[0];
    let taskId = args.length > 1 ? args[1] : null;
    let taskDescription = args.length > 2 ? args.slice(2).join(" ") : null;

    handleMenu(command,taskId,taskDescription)
    readCommand()
  });
}

// Start CLI
showCommands();
readCommand();
