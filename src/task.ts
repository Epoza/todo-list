import './style.css';
import { modal } from './modal';

export class Task {
    name: string;
    categoryIndex: string;
    important: boolean;
    date?: string;
    description?: string;
    checked: boolean;

    // Properties to track default categories
    taskInCategory0: boolean = false;
    taskInCategory1: boolean = false;
    taskInCategory2: boolean = false;
    

    constructor(name: string, categoryIndex: string, checked: boolean, important: boolean, date?: string, description?: string) {
        this.name = name;
        this.categoryIndex = categoryIndex;
        this.checked = checked
        this.important = important;
        this.date = date;
        this.description = description;
    }
}

export const tasks = (() => {
    let tasksList: Task[] = [];

    // SVG's
    const uncheckedBoxSvg = '<svg class="toggleCheckedBox taskButtonClick unchecked" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>'

    const checkedBoxSvg = '<svg class="toggleCheckedBox taskButtonClick checked" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>'

    const descriptionSvg = '<svg class="taskButtonClick" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80 240-320l57-57 183 183 183-183 57 57L480-80ZM298-584l-58-56 240-240 240 240-58 56-182-182-182 182Z"/></svg>'

    const editSvg = '<svg class="taskButtonClick" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>'

    const removeSvg = '<svg class="taskButtonClick" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>'

    const mainCategorySvg = '<svg class="taskButtonClick" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-200h133.847v-237.692h212.306V-200H720v-360L480-740.769 240-560v360Zm-59.999 59.999v-449.998L480-815.767l299.999 225.768v449.998H526.154v-237.693h-92.308v237.693H180.001ZM480-470.385Z"/></svg>'

    function addTaskToList(name: string, categoryIndex: string, important: boolean, date?: string, description?: string): void {
        const newTask = new Task(name, categoryIndex!, false, important, date, description);
        tasksList.push(newTask);
        createTask(newTask);
        saveTasksList();
    }
    
    function createTask(currentTask: Task, defaultCategory?: string): void {
        
        const taskIndex = tasksList.indexOf(currentTask);
        // use for taskContainer placement
        const taskInfo = document.getElementById('taskInfo');
        console.log(taskInfo)

        // create or retrieve the task container for the selected category
        const taskContainerId = `taskContainer-${defaultCategory ? defaultCategory: currentTask.categoryIndex}`;
        let taskContainer = document.getElementById(taskContainerId);

        if (!taskContainer) {
            console.log(`creating new task container for category index ${defaultCategory ? defaultCategory: currentTask.categoryIndex}`)
            // create new task container only if it doesn't exist
            taskContainer = document.createElement('div');
            taskContainer.id = taskContainerId;
            taskContainer.classList.add('taskContainer')
            const taskElement = document.getElementById('taskHeaderContainer');
            taskElement?.insertAdjacentElement('afterend', taskContainer);

            // Add event listener only when creating a new task container
            taskContainer.addEventListener('click', (event) => {
                // Check if the clicked element is meant to be clicked
                const target = event.target as HTMLElement;
                if (target.classList.contains('taskButtonClick')) {
                    handleButtonClick(event);
                }
            });
        } else {
            console.log(`Using existing task container for category index ${defaultCategory ? defaultCategory: currentTask.categoryIndex}`);
        }
        console.log(taskIndex)
        // create new HTML structure for the task
        const taskItem = document.createElement('div');
        taskItem.classList.add("myTask");
        taskItem.setAttribute('data-task', taskIndex.toString());
        taskItem.setAttribute('assigned-category', defaultCategory ? defaultCategory: currentTask.categoryIndex);

        const taskContent = document.createElement('div');
        taskContent.id = 'taskContent'

        // add class for important tasks
        taskItem.classList.add(currentTask.important ? 'important-task' : 'normal-task');

        // html structure for checkbox
        // changed to check task when user clicks
        const uncheckedTask = document.createElement('div');
        uncheckedTask.classList.add('svgButton', 'taskButton');
        uncheckedTask.id = 'checkButton';
        console.log(currentTask.checked)
        uncheckedTask.innerHTML = currentTask.checked ? checkedBoxSvg : uncheckedBoxSvg;
        taskContent.appendChild(uncheckedTask);

        // button svg holder
        const taskSvgButtonContainer = document.createElement('div');
        taskSvgButtonContainer.classList.add('svgButtonContainer');

        // Create HTML structure for description
        const descriptionButton = document.createElement('div');
        descriptionButton.classList.add('svgButton', 'taskButton');
        descriptionButton.id = 'descriptionButton';
        descriptionButton.innerHTML = descriptionSvg;
        taskSvgButtonContainer.appendChild(descriptionButton)
        
        if(!defaultCategory){
            // HTML structure for edit and delete
            const taskEdit = document.createElement('div');
            taskEdit.classList.add('svgButton', 'taskButton');
            taskEdit.id = 'editButton';
            taskEdit.innerHTML = editSvg;
            taskSvgButtonContainer.appendChild(taskEdit);

            // delete button
            const taskRemove = document.createElement('div');
            taskRemove.classList.add('svgButton', 'taskButton');
            taskRemove.id = 'removeButton';
            // possibly change to just data-remove
            taskRemove.setAttribute('data-remove-task', taskIndex.toString());
            taskRemove.innerHTML = removeSvg;
            taskSvgButtonContainer.appendChild(taskRemove);
        } else {
            // goes to category of main task
            const mainCategoryButton = document.createElement('div');
            mainCategoryButton.classList.add('svgButton', 'taskButton');
            mainCategoryButton.id = 'mainCategoryButton';
            mainCategoryButton.innerHTML = mainCategorySvg;
            taskSvgButtonContainer.appendChild(mainCategoryButton)
        }
        

        // display the task name
        const taskName = document.createElement('span');
        taskName.classList.add('nameText');
        taskName.textContent = currentTask.name;
        taskContent.appendChild(taskName);

        // display the selected date
        const taskDate = document.createElement('span');
        taskDate.classList.add('dateText');
        taskDate.textContent = currentTask.date ?? '';
        taskContent.appendChild(taskDate);

        // append button container to task
        taskContent.appendChild(taskSvgButtonContainer);

        taskItem.appendChild(taskContent);

        // description dropdown & text
        const descriptionDropdown = document.createElement('div');
        descriptionDropdown.classList.add('descriptionDropdown');
        descriptionDropdown.style.display = 'none'; // Initially hide the dropdown

        const descriptionContent = document.createElement('span');
        descriptionContent.classList.add("descriptionText")
        descriptionContent.textContent = currentTask.description || 'No description available';
        descriptionDropdown.appendChild(descriptionContent);
        taskItem.appendChild(descriptionDropdown);

        // append
        taskContainer.appendChild(taskItem);
        
        // add the tasks to default categories if applicable
        if (parseInt(defaultCategory ? defaultCategory : currentTask.categoryIndex, 10) > 2) {
            addTaskToDefaultCategory(currentTask)
        } 
        // update tasks
        updateTasks(defaultCategory ? defaultCategory: currentTask.categoryIndex);
    }

    function addTaskToDefaultCategory(currentTask: Task, edit?: boolean) {
        console.log(currentTask);
    
        // Remove tasks from the specified category based on assigned-category
        if (edit) {
            if (currentTask.date !== getCurrentDate() && currentTask.taskInCategory1) {
                removeTaskFromDefaultCategory(currentTask, '1');
                currentTask.taskInCategory1 = false;
            }
            if (!currentTask.important && currentTask.taskInCategory2) {
                removeTaskFromDefaultCategory(currentTask, '2');
                currentTask.taskInCategory2 = false;
            }
        }
    
        // Add task to default category if it meets criteria
        if (currentTask && currentTask.categoryIndex !== '0' && !currentTask.taskInCategory0) {
            createTask(currentTask, '0');
            currentTask.taskInCategory0 = true;
        }
        if (currentTask.date === getCurrentDate() && currentTask.categoryIndex !== '1' && !currentTask.taskInCategory1) {
            createTask(currentTask, '1');
            currentTask.taskInCategory1 = true;
        }
        if (currentTask.important && currentTask.categoryIndex !== '2' && !currentTask.taskInCategory2) {
            createTask(currentTask, '2');
            currentTask.taskInCategory2 = true;
        }
        updateTasks(currentTask.categoryIndex);
    }

    function removeTaskFromDefaultCategory(currentTask: Task, categoryIndex: string): void {
        console.log(categoryIndex);
        // Remove the task from the specified category based on the task's properties
        const categoryContainer = document.getElementById(`taskContainer-${categoryIndex}`);
        console.log(categoryContainer)
        const taskElement = categoryContainer?.querySelector(`.myTask[data-task="${tasksList.indexOf(currentTask)}"]`);
        console.log(tasksList.indexOf(currentTask))
        console.log(taskElement)
        if (taskElement) {
            console.log('Task removed from that default category');
            taskElement.remove();
            saveTasksList();
        } else {
            console.error('Could not find the task in that category');
        }
    }

    function getCurrentDate(){
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
    
        return `${mm}-${dd}-${yyyy}`;
    }

    function handleButtonClick(event: Event) {
        const target = event.target as HTMLElement;
        const button = target.closest('.svgButton');

        // get the current task
        const taskElement = button!.closest('.myTask') as HTMLElement;
        const dataIndex = taskElement.getAttribute('data-task');
        const taskIndex = parseInt(dataIndex!, 10);
        const currentTask = tasksList[taskIndex];
        console.log(currentTask)
                    
        enum ButtonId {
            checkButton = 'checkButton',
            DescriptionButton = 'descriptionButton',
            EditButton = 'editButton',
            RemoveButton = 'removeButton',
            mainCategoryButton = 'mainCategoryButton'
        }

        if (button) {
            const buttonId = button.id;

            switch (buttonId) {
                case ButtonId.checkButton:
                    const checkTaskIcon = button.querySelector('svg') as SVGElement;
                    console.log(checkTaskIcon)
                    changeCheckedState(currentTask, true);
                    break;
                case ButtonId.DescriptionButton:
                    // Toggle the display of the description dropdown
                    const taskContainer = button.closest('.myTask') as HTMLElement;
                    const descriptionDropdown = taskContainer.querySelector('.descriptionDropdown') as HTMLElement;
                    if (descriptionDropdown) {
                        descriptionDropdown.style.display = descriptionDropdown.style.display === 'none' ? 'block' : 'none';
                    }
                    break;
                case ButtonId.mainCategoryButton:
                    // Go to the categoryIndex of the task
                    console.log('clicked maincategory button')
                    const firstCategoryElement = document.querySelector(`.myCategories[data-category="${currentTask.categoryIndex}"]`) as HTMLElement;
                    if (firstCategoryElement) {
                        firstCategoryElement.click();
                        updateTasks(currentTask.categoryIndex)
                    }
                    break;
                case ButtonId.EditButton:
                    // go to editTask
                    modal.task('edit', currentTask);
                    break;
                case ButtonId.RemoveButton:
                    modal.task('remove', currentTask);// pass in currentTask
                    break;
                default:
                    break;
            }
        }
    }

    function changeCheckedState(currentTask: Task, clicked = false){
        // If clicked then toggle
        if(clicked){
            currentTask.checked = !currentTask.checked;  
            const isChecked = currentTask.checked;
            // Toggle the SVG for all tasks with the same data-task
            const taskIndex = tasksList.indexOf(currentTask);
            const tasksWithSameIndex = document.querySelectorAll(`.myTask[data-task="${taskIndex}"]`);
            tasksWithSameIndex.forEach(taskElement => {
                const taskIcon = taskElement.querySelector('svg') as SVGElement;
                if (taskIcon) {
                    const toggleIcon = isChecked ? checkedBoxSvg : uncheckedBoxSvg;
                    taskIcon.outerHTML = toggleIcon;
                }
            });      
            
        }
        // change the styling depending on if checked or not
        const taskIndex = tasksList.indexOf(currentTask);
        const tasksWithSameIndex = document.querySelectorAll(`.myTask[data-task="${taskIndex}"]`);
        tasksWithSameIndex.forEach(taskElement => {
            const taskText = taskElement?.querySelectorAll('span');
            if (taskText) {
                taskText.forEach(spanElement => {
                    spanElement.style.textDecoration = currentTask.checked ? 'line-through' : 'currentColor'
                });
                // set the new taskIcon
                (taskElement as HTMLElement).style.backgroundColor = currentTask.checked ? 'rgba(0, 0, 0, 0.3)' : '';
            } 
        });
        saveTasksList();
    }

    function removeTask(currentTask: Task): void {
        const taskIndex = tasksList.indexOf(currentTask);

        // Remove the task from the tasksList array only once
        tasksList.splice(taskIndex, 1);
   
        // Find all tasks with the same data-task attribute value
        const tasksToRemove = document.querySelectorAll(`.myTask[data-task="${taskIndex}"]`);
        tasksToRemove.forEach(taskElement => {
            // Get the task index from the data-task attribute
            const dataIndex = taskElement.getAttribute('data-task');
            const taskIndexToRemove = parseInt(dataIndex!, 10);
    
            // remove each task with the same data-task from the screen
            taskElement.remove();
    
            console.log(`Removed task with index ${taskIndexToRemove}`);
        });
        console.log(tasksList);
    
        // Update data values when removing items
        const taskElements = document.querySelectorAll('.myTask');
        taskElements.forEach(taskElement => {
            const dataIndex = taskElement.getAttribute('data-task');
            const currentIndex = parseInt(dataIndex!, 10);

            // Shift down the tasks with a higher index than the removed task
            if (currentIndex > taskIndex) {
                const newIndex = currentIndex - 1;
                taskElement.setAttribute('data-task', newIndex.toString());

                // Update data-remove attribute of the remove button
                // possibly remove this code below in the future
                const removeButton = taskElement.querySelector('.svgButton[data-remove-task]');
                if (removeButton) {
                    removeButton.setAttribute('data-remove-task', newIndex.toString());
                }
            }
        });
        updateTasks(currentTask.categoryIndex.toString());
        saveTasksList();
    }
    
    function updateTasks(categoryIndex: string): void {
        console.log('update tasks category index' + categoryIndex)
        // Checks to see what tasks to show based on category selected
        const allTaskContainers = document.querySelectorAll('.taskContainer');
        
        allTaskContainers.forEach((container) => {
            const isVisible = container.id === `taskContainer-${categoryIndex}`;
            const containerElement = container as HTMLElement;
            containerElement.style.display = isVisible ? 'block' : 'none';
            
            // Check if the container has child tasks
        const hasChildTasks = containerElement.querySelector('.myTask') !== null;

        // Remove the task container only if it has no child tasks
        if (!hasChildTasks) {
            containerElement.remove();
            console.log(`Removed empty task container ${containerElement.id}`);
        }
        });

        // Change the add task button styling
        let taskContainer = document.getElementById(`taskContainer-${categoryIndex}`);

        // hide/show task message when there are no tasks
        const addTaskMessage = document.getElementById('addTaskMessage'); 
        // Check if tasks exist
        if (tasksList.length > 0 && taskContainer) {
            // Tasks exist, show tasks
            if (addTaskMessage) {
                addTaskMessage.style.display = "none";
            }
        } else {
            // No tasks, show a message
            if (addTaskMessage) {
                addTaskMessage.style.display = "block";
            }
        }
    }

    function editTask(currentTask: Task, newName: string, newImportant: boolean, newDate?: string, newDescription?: string): void {
        const taskIndex = tasksList.indexOf(currentTask);
    
        if (taskIndex !== -1) {
            // Update the task with the new info
            currentTask.name = newName;
            currentTask.important = newImportant;
            currentTask.date = newDate;
            currentTask.description = newDescription;
    
            // Find all tasks with the same data-task attribute value
            const tasksToEdit = document.querySelectorAll(`.myTask[data-task="${taskIndex}"]`);
            tasksToEdit.forEach(taskElement => {
                // Update the displayed name
                const taskNameElement = taskElement.querySelector('.nameText');
                if (taskNameElement) {
                    taskNameElement.textContent = newName;
                }
    
                // Update the task importance
                taskElement.classList.remove('important-task', 'normal-task');
                taskElement.classList.add(newImportant ? 'important-task' : 'normal-task');
    
                // Update the date
                const taskDateElement = taskElement.querySelector('.dateText');
                if (taskDateElement) {
                    taskDateElement.textContent = newDate || '';
                }
    
                // Update the description dropdown content
                const descriptionContentElement = taskElement.querySelector('.descriptionText');
                if (descriptionContentElement) {
                    descriptionContentElement.textContent = newDescription || 'No description available';
                }
            });
            addTaskToDefaultCategory(currentTask, true);
    
            console.log(`Edited task with index ${taskIndex}`);
            console.log(tasksList);
            saveTasksList();
        } else {
            console.error('Error: Task not found for editing.');
        }
    }

    function removeAllTasks(categoryIndex: string, categoryRemoved: boolean) {
        // Get the specified tasks in the category
        const tasksToRemove = tasksList.filter(task => task.categoryIndex === categoryIndex);
        // Iterate over each task and remove it
        tasksToRemove.forEach(taskToRemove => {
            removeTask(taskToRemove)
        });
    
        // Only when removing a category
        if (categoryRemoved) {
            // Remove the task container associated with the category
            const taskContainer = document.getElementById(`taskContainer-${categoryIndex}`);
            taskContainer?.remove();
            // update the other tasks and associated categories
            updateTasksAfterCategoryRemoval(categoryIndex);
        } else {
            saveTasksList();
        }
        
    }

    function updateTasksAfterCategoryRemoval(categoryIndex: string){
        // Update category index for tasks with index greater than the removed category
        tasksList.forEach(task => {
            if (parseInt(task.categoryIndex, 10) > parseInt(categoryIndex, 10)) {
                task.categoryIndex = (parseInt(task.categoryIndex, 10) - 1).toString();
            }
        });
        // Shift down taskContainer elements with IDs greater than categoryIndex
        const allTaskContainers = document.querySelectorAll('.taskContainer');
        allTaskContainers.forEach(container => {
            const containerIndex = parseInt(container.id.split('-')[1], 10);
            if (containerIndex > parseInt(categoryIndex, 10)) {
                // Shift down the container by updating its ID
                const newContainerIndex = containerIndex - 1;
                container.id = `taskContainer-${newContainerIndex}`;

                // Update assigned-category attribute of the tasks within the container
                const tasksInContainer = container.querySelectorAll('.myTask');
                tasksInContainer.forEach(taskElement => {
                    taskElement.setAttribute('assigned-category', newContainerIndex.toString());
                });
            }
        });
        updateTasks(categoryIndex)
        saveTasksList();
    }


    function checkCategoryForTasks(categoryIndex: string): boolean{
        console.log(tasksList.some(task => task.categoryIndex === categoryIndex))
        return tasksList.some(task => task.categoryIndex === categoryIndex);
    }

    function saveTasksList(){
        localStorage.setItem('tasksList', JSON.stringify(tasksList));
    }

    function retrieveTasksList(){
        // retrieve the tasks from localStorage
        const storedTasks = localStorage.getItem('tasksList');
        if (storedTasks) {
            const storedTasksParsed: Task[] = JSON.parse(storedTasks);
            tasksList = storedTasksParsed.map(taskData => {
                return new Task(taskData.name, taskData.categoryIndex, taskData.checked, taskData.important, taskData.date, taskData.description);
            });
            tasksList.forEach((currentTask) => {
                createTask(currentTask);
                // Update UI after creating each task
                updateTasks(currentTask.categoryIndex);
                // Toggle checked state if necessary
                if(currentTask.checked){
                    changeCheckedState(currentTask);
                }
            });
        }
    }
    
    // Check if tasksList exists in localStorage and retrieve it
    const storedTasks = localStorage.getItem('tasksList');
    if (storedTasks) {
        retrieveTasksList();        
    } else {
        console.log("no tasks to retrieve")
    }

    return {
        addTaskToList,
        createTask,
        handleButtonClick,
        removeAllTasks,
        removeTask,
        updateTasks,
        updateTasksAfterCategoryRemoval,
        checkCategoryForTasks,
        editTask,
    };
})();