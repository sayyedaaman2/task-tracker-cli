const fs = require('node:fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { randomUUID } = require('node:crypto');
const FILE_PATH = "tasks.json";

const rl = readline.createInterface({
    input, output
})

function createFile(answer) {
    answer = answer.toLowerCase();
    if (answer == "yes") {
        const defaultData = {
            id: 0,
            title: "Task 1",
            description: "This is a description",
            status: "idle"
        }
        fs.writeFile(FILE_PATH, JSON.stringify(defaultData, null, 2), { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.error(`⚠️ Unable to Create new ${FILE_PATH} file !`);
            } else {
                console.log(`SuccessFully Created new File.`)
            }
            rl.close();
        })
    }
    else if (answer == 'no') {
        console.log(`File creation cancelled.`)
        process.exit(0);
    } else {
        console.log("⚠️ Invalid input. Please enter 'yes' or 'no'.");
        rl.question(`Do you want to create ${FILE_PATH} file? (yes/no) `, createFile);
    }

}

fs.readFile(FILE_PATH, { encoding: 'utf8' }, (err, data) => {
    if (err) {
        console.error(`Unable to Read ${FILE_PATH} `);
        rl.question(`Do you want to create ${FILE_PATH} file ? (yes/no) `, createFile)
    }
    else {
        console.log(`Successfully read ${FILE_PATH}`)
        showMenu();
    }

})

function viewTask() {
    fs.readFile(FILE_PATH, { encoding: "utf8" }, (err, data) => {
        if (err) {
            console.error(`⚠️ Some error occurred while viewing data:`, err);
        } else {
            let tasks = [];

            try {
                tasks = JSON.parse(data); // Parse tasks from file
            } catch (error) {
                console.error("⚠️ Error parsing tasks data.");
            }

            if (tasks.length > 0) {
                console.log('\nTask List:');
                console.table(tasks); // Display tasks in table format
            } else {
                console.log("\nNo tasks available.");
            }
            showMenu(); // Return to menu after viewing tasks
        }
    });
}

function addTask() {
    rl.question('Write Title :-> ', (title) => {

        if (title.trim() === "") {
            console.error("⚠️ Title field is required!");
            addTask();

        } else {

            rl.question('Write Description :->', (description) => {

                const newTask = {
                    id: randomUUID(),
                    title,
                    description,
                    status: 'idle'
                }
                fs.readFile(FILE_PATH, { encoding: 'utf8' }, (err, data) => {
                    let tasks = [];
                    if (!err && data) {
                        try {
                            tasks = JSON.parse(data); // Parse existing tasks

                            if (!Array.isArray(tasks)) { // Ensure tasks is an array
                                tasks = [];
                            }
                        } catch (error) {
                            console.error("⚠️ Error parsing JSON. Resetting tasks list.");
                            tasks = [];
                        }
                    }
                    tasks.push(newTask);

                    fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8", (err) => {
                        if (err) {
                            console.error(`⚠️ Error saving task : `, err);
                        } else {
                            console.log(`✅ Task added successfully.`)
                        }
                        showMenu();
                    })
                })
            }

            )
        }

    })
}



function updateTaskStatus() {
    // Read existing tasks
    fs.readFile(FILE_PATH, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error("⚠️ Unable to read tasks:", err);
            rl.close();
            return;
        }

        let tasks = [];
        try {
            tasks = JSON.parse(data); // Parse tasks data
        } catch (error) {
            console.error("⚠️ Error parsing tasks. Resetting tasks list.");
            tasks = [];
        }

        // If no tasks are available, show a message and exit
        if (tasks.length === 0) {
            console.log("No tasks available to update.");
            rl.close();
            return;
        }

        // Display the tasks
        console.log("\nCurrent Tasks:");
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.title} - ${task.status}`);
        });

        // Ask for task number to update
        rl.question('\nEnter the task number to update status: ', (taskNumber) => {
            const taskIndex = parseInt(taskNumber) -1;
            if (taskIndex < 0 || taskIndex >= tasks.length) {
                console.log("⚠️ Invalid task number.");
                rl.close();
                return;
            }

            // Ask for new status
            rl.question('Enter new status (idle, in progress, completed): ', (status) => {
                // Validate status input
                const validStatuses = ['idle', 'in progress', 'completed'];
                if (!validStatuses.includes(status)) {
                    console.log("⚠️ Invalid status.");
                    rl.close();
                    return;
                }

                // Update task status
                tasks[taskIndex].status = status;

                // Save the updated tasks back to the file
                fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error("⚠️ Error saving updated task:", err);
                    } else {
                        console.log(`✅ Task status updated successfully!`);
                        showMenu();
                    }
                    // rl.close();
                });
            });
        });
    });
}


function deleteTask() {
    fs.readFile(FILE_PATH, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error(`⚠️ Some error occured while viewing data:`, err);

        } else {
            let tasks = [];

            try {
                tasks = JSON.parse(data);
            } catch (error) {
                console.error(`⚠️ Error parsing tasks data`);
            }

            if (tasks.length > 0) {
                console.log("\n Task List:");
                tasks.forEach((task, index) => {
                    console.log(`${index + 1}. ${task.title} - ${task.status}`);
                });
                rl.question('Enter the task number to delete : ', (taskNumber) => {
                    const index = parseInt(taskNumber) -1;

                    if (index >= 0 && index < tasks.length) {
                        const removedTask = tasks.splice(index, 1);

                        fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8", (err) => {
                            if (err) {
                                console.error("⚠️ Error saving updaed tasks : ", err);
                            } else {
                                console.log(`✅ Task ${removedTask[0].title} deleted successfully!`);
                            }
                            showMenu();
                        })
                    } else {
                        console.log("⚠️ Invalid task number. Try again");
                        showMenu();
                    }
                })
            } else {
                console.log('\nNo tasks available to delete.');
                showMenu();
            }
        }
    })
}

function showMenu() {
    console.log("\nTask Tracker");
    console.log("1. View Tasks");
    console.log("2. Add Task");
    console.log("3. Update Task Status")
    console.log("4. Delete Task");
    console.log("5. Exit");
    rl.question(`Choose an option: `, handleMenu)
}

function handleMenu(choice) {
    console.clear();

    switch (choice.trim()) {
        case '1':
            viewTask();
            break;
        case '2':
            addTask();
            break;
        case '3':
            updateTaskStatus();
            break;
        case '4':
            deleteTask();
            break;
        case '5':
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice! Try again.");
            showMenu();
    }
}
