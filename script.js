const addTaskBtn = document.getElementById("submit__button");
const modifyTaskBtn = document.getElementById("modify__task");

const taskName = document.getElementById("todo__title");
const tasksContainer = document.getElementById("list__items-wrapper");

let storedData = localStorage.getItem("tasks")
	? JSON.parse(localStorage.getItem("tasks"))
	: localStorage.setItem("tasks", JSON.stringify([]));

// Adding a task
let taskId = 0;

addTaskBtn.addEventListener("click", () => {
	let storedTaskData = {};
	const taskTitle = taskName.value;

	if (taskTitle) {
		storedTaskData.id = ++taskId;
		storedTaskData.title = taskTitle;
		storedTaskData.status = "In progress";
		console.log(storedTaskData);
		storedData.push(storedTaskData);
		localStorage.setItem("tasks", JSON.stringify(storedData));
		taskName.value = "";
		renderTasks();
	} else if (taskTitle === "") {
		alert("You need to insert a new task");
	}
});

// Modify a task
// const modifyTask = () => {};
// modifyTaskBtn.addEventListener("click", () => {});

// Render tasks
const renderTasks = () => {
	tasksContainer.innerHTML = "";
	for (let data of storedData) {
		const taskHtml = `
      <li class='task__item data-id=${data.id}'>
    <label class="id__container">${data.id}</label>
    <p>${data.title}</p>
      <button class="delete_button" id="delete__task">
    
    </button>
      </li>`;

		//   <i class="fa-solid fa-xmark custom__checkmark"></i>

		tasksContainer.insertAdjacentHTML("beforeend", taskHtml);
	}
};

renderTasks();

// Delete a task
const deleteTaskBtns = document.querySelectorAll(".delete_button");
deleteTaskBtns.forEach((button) => {
	console.log(button);
});

tasksContainer.addEventListener("click", (event) => {
	if (event.target.classList.contains("delete_button")) {
		console.log(event.target);
		const taskId = event.target.parentElement.dataset.id;
		console.log(taskId);

		storedData = JSON.parse(localStorage.getItem("tasks"));
		const updatedData = storedData.filter(
			(task) => task.id !== parseInt(taskId)
		);
		localStorage.setItem("tasks", JSON.stringify(updatedData));
		event.target.parentElement.remove();
	}
});
