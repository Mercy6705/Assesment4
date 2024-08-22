// Select elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');

let tasks = [];

// Function to render tasks
const renderTasks = (filter = 'all') => {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="editTask(${task.id})">Edit</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

// Function to add a task
const addTask = () => {
    const text = taskInput.value.trim();
    if (text) {
        const task = {
            id: Date.now(),
            text,
            completed: false
        };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    }
};

// Function to toggle task completion
const toggleTask = id => {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    renderTasks();
};

// Function to delete a task
const deleteTask = id => {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
};

// Function to edit a task
const editTask = id => {
    const newText = prompt('Edit task:', tasks.find(task => task.id === id).text);
    if (newText) {
        tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
        renderTasks();
    }
};

// Event listeners
addTaskButton.addEventListener('click', addTask);

filterButtons.forEach(button => {
    button.addEventListener('click', e => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderTasks(e.target.dataset.filter);
    });
});

// Initial render
renderTasks();
