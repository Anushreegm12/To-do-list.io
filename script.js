const newTask = document.getElementById("input");
const addTask = document.getElementById("add-btn");
const taskLists = {
    daily: document.getElementById("daily-task-list"),
    weekly: document.getElementById("weekly-task-list"),
    monthly: document.getElementById("monthly-task-list")
};

let currentCategory = "daily"; // Default category is daily

// Change the category based on the selected button
document.getElementById("daily-btn").addEventListener("click", () => setCategory("daily"));
document.getElementById("weekly-btn").addEventListener("click", () => setCategory("weekly"));
document.getElementById("monthly-btn").addEventListener("click", () => setCategory("monthly"));

function setCategory(category) {
    currentCategory = category;
    
    // Remove active class from all buttons and add it to the selected one
    document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`${category}-btn`).classList.add("active");
    
    // Hide all task lists and only show the selected one
    Object.keys(taskLists).forEach(key => {
        taskLists[key].style.display = key === category ? "block" : "none";
    });
}

// Add a task to the list when the button is clicked
addTask.addEventListener("click", () => {
    addToList();
});

// Add a task to the list when Enter key pressed
newTask.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addToList();
    }
});

function addToList() {
    let text = newTask.value;
    if (text) {
        // Create the list item
        const listItem = document.createElement("li");
        listItem.className = "task-item";
        
        const checkbox = document.createElement("button");
        checkbox.className = "btn-check";
        checkbox.innerHTML = `<i class="fa-solid fa-check"></i>`;
        
        const span = document.createElement("span");
        span.className = "text";
        span.textContent = text;
        
        const closeButton = document.createElement("button");
        closeButton.className = "btn-close";
        closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

        // Append the buttons and text to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(closeButton);

        // Append the list item to the current category's task list
        taskLists[currentCategory].appendChild(listItem);

        // Clear the input field
        newTask.value = "";

        // Add functionality for the close button click (removes the task)
        closeButton.addEventListener("click", () => {
            taskLists[currentCategory].removeChild(listItem);
        });

        // Add functionality for checkbox click (marking task as complete)
        checkbox.addEventListener("click", () => {
            listItem.classList.toggle("active");
        });
    }
}
