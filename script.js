document.addEventListener("DOMContentLoaded", () => {
  // --- Element Selections ---
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskListContainer = document.getElementById("task-list-container");

  const noteInput = document.getElementById("note-input");
  const notesContainer = document.getElementById("notes-container");

  // --- Load data from Local Storage on page start ---
  loadData();

  // --- Event Listeners ---
  // Handle form submission for adding new tasks
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = ""; // Clear input field
      taskInput.focus();
      saveData(); // Save after adding
    }
  });

  // Handle 'Enter' key press for adding new notes
  noteInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const noteText = noteInput.value.trim();
      if (noteText !== "") {
        addNote(noteText);
        noteInput.value = ""; // Clear input field
        saveData(); // Save after adding
      }
    }
  });

  // Use event delegation to handle clicks on tasks (for completion and deletion)
  taskListContainer.addEventListener("click", (e) => {
    const target = e.target;
    // Check if a delete button was clicked
    if (target.classList.contains("delete-btn")) {
      target.parentElement.remove();
      saveData(); // Save after deleting
    }
    // Check if a task item was clicked
    else if (target.classList.contains("task-item")) {
      target.classList.toggle("completed");
      saveData(); // Save after toggling completion
    }
  });

  // Use event delegation to handle clicks on notes (for deletion)
  notesContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete-btn")) {
      target.parentElement.remove();
      saveData(); // Save after deleting
    }
  });

  // --- Functions ---
  /**
   * Creates and adds a new task to the DOM.
   * @param {string} text - The text content for the task.
   * @param {boolean} isCompleted - The completion status of the task.
   */
  function addTask(text, isCompleted = false) {
    // Create the main task element
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    // Add completion class if needed
    if (isCompleted) {
      taskItem.classList.add("completed");
    }

    // Create a span for the text to avoid issues with textContent
    const taskTextNode = document.createElement("span");
    taskTextNode.textContent = text;
    taskItem.appendChild(taskTextNode);

    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&times;"; // Use HTML entity for 'x'

    // Add the delete button to the task item
    taskItem.appendChild(deleteBtn);

    // Add the task item to the list
    taskListContainer.appendChild(taskItem);
  }

  /**
   * Creates and adds a new note to the DOM.
   * @param {string} text - The text content for the note.
   */
  function addNote(text) {
    // Create the main note element
    const noteItem = document.createElement("div");
    noteItem.className = "note-item";

    const noteTextNode = document.createElement("span");
    noteTextNode.textContent = text;
    noteItem.appendChild(noteTextNode);

    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&times;";

    // Add the delete button to the note item
    noteItem.appendChild(deleteBtn);

    // Add the note item to the container
    notesContainer.appendChild(noteItem);
  }

  /**
   * Saves all current tasks and notes to localStorage.
   */
  function saveData() {
    // Save tasks
    const tasks = [];
    document.querySelectorAll(".task-item").forEach((item) => {
      tasks.push({
        text: item.querySelector("span").textContent,
        completed: item.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Save notes
    const notes = [];
    document.querySelectorAll(".note-item").forEach((item) => {
      notes.push(item.querySelector("span").textContent);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  /**
   * Loads tasks and notes from localStorage and displays them.
   */
  function loadData() {
    // Load and display tasks
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      savedTasks.forEach((task) => addTask(task.text, task.completed));
    }

    // Load and display notes
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      savedNotes.forEach((note) => addNote(note));
    }
  }
});
