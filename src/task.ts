import './style.css';
import { modal } from './modal';

export class Task {
    name: string;
    categoryIndex: string;
    important: boolean;
    date?: string;
    description?: string;

    // Properties to track default categories
    taskInCategory0: boolean = false;
    taskInCategory1: boolean = false;
    taskInCategory2: boolean = false;

    constructor(name: string, categoryIndex: string, important: boolean, date?: string, description?: string) {
        this.name = name;
        this.categoryIndex = categoryIndex;
        this.important = important;
        this.date = date;
        this.description = description;
    }
}

export const tasks = (() => {
    let tasksList: Task[] = [];

    addTaskToList('First', '3', true, '02-20-2024', 'Hello There')
    addTaskToList('Second', '3', false, '02-21-2024', 'Hello There')
    addTaskToList('Third', '3', true, '02-22-2024', 'Hello There')
    addTaskToList('yoyoyo', '4', false, '02-24-2024', 'Hello Thre')
    addTaskToList('Four, fifthcat', '5', false, '02-22-2024', 'five')
    addTaskToList('Fifth, fifthcat', '5', true, '02-24-2024', 'fivess')

    function addTaskToList(name: string, categoryIndex: string, important: boolean, date?: string, description?: string): void {
        const newTask = new Task(name, categoryIndex!, important, date, description);
        tasksList.push(newTask);
        createTask(newTask);
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
                const clickedTaskContainer = event.currentTarget as HTMLElement;
                const updatedCategoryIndex = clickedTaskContainer.id.split('-')[1];
                handleButtonClick(event);
            
                // Pass the updated categoryIndex to updateTasks
                requestAnimationFrame(() => {
                    updateTasks(updatedCategoryIndex);
                });
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
        const uncheckedTaskIcon = document.createElement('img');
        uncheckedTaskIcon.src = "../images/uncheckedBox.svg";
        uncheckedTaskIcon.alt = 'unchecked task icon';
        uncheckedTaskIcon.id = 'unchecked';
        uncheckedTask.appendChild(uncheckedTaskIcon);
        taskContent.appendChild(uncheckedTask);

        // button svg holder
        const taskSvgButtonContainer = document.createElement('div');
        taskSvgButtonContainer.classList.add('svgButtonContainer');

        // Create HTML structure for description
        const descriptionButton = document.createElement('div');
        descriptionButton.classList.add('svgButton', 'taskButton');
        descriptionButton.id = 'descriptionButton';
        const descriptionIcon = document.createElement('img');
        descriptionIcon.src = "../images/description.svg";
        descriptionIcon.alt = 'description dropdown icon';
        descriptionButton.appendChild(descriptionIcon);
        taskSvgButtonContainer.appendChild(descriptionButton)

        // HTML structure for edit and delete
        const taskEdit = document.createElement('div');
        taskEdit.classList.add('svgButton', 'taskButton');
        taskEdit.id = 'editButton';
        const taskEditIcon = document.createElement('img');
        taskEditIcon.src = "../images/edit.svg";
        taskEditIcon.alt = 'edit task icon';
        taskEdit.appendChild(taskEditIcon);
        taskSvgButtonContainer.appendChild(taskEdit);

        // delete button
        const taskRemove = document.createElement('div');
        taskRemove.classList.add('svgButton', 'taskButton');
        taskRemove.id = 'removeButton';
        // possibly change to just data-remove
        taskRemove.setAttribute('data-remove-task', taskIndex.toString());
        
        const taskRemoveIcon = document.createElement('img');
        taskRemoveIcon.src = "../images/remove.svg";
        taskRemoveIcon.alt = 'unchecked task icon';
        taskRemove.appendChild(taskRemoveIcon);
        taskSvgButtonContainer.appendChild(taskRemove);

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
            RemoveButton = 'removeButton'
        }

        if (button) {
            const buttonId = button.id;

            switch (buttonId) {
                case ButtonId.checkButton:
                    // toggle between unchecked and checked
                    const checkTaskIcon = button.querySelector('img');
                    if (checkTaskIcon) {
                        const currentIcon = checkTaskIcon.src;
                        const toggleIcon = currentIcon.includes('uncheckedBox.svg')
                            ? "../images/checkedBox.svg"
                            : "../images/uncheckedBox.svg";
                        checkTaskIcon.src = toggleIcon;
                        checkTaskIcon.id = checkTaskIcon.id === 'unchecked' ? 'checked' : 'unchecked';
                        checkTaskIcon.alt = checkTaskIcon.alt === 'unchecked task icon' ? 'checked task icon' : 'unchecked task icon';

                        // change styling
                        const myTask = button.closest('.myTask') as HTMLElement
                        const myTaskText = myTask?.querySelectorAll('span'); // Change to querySelectorAll when description is added
                        if(myTaskText){
                            myTaskText.forEach(spanElement => {
                                spanElement.style.textDecoration = checkTaskIcon.id === 'checked' ? 'line-through' : 'none';
                            });
                            
                            myTask!.style.backgroundColor = checkTaskIcon.id === 'checked'? 'rgba(0, 0, 0, 0.3)' : 'initial';
                            // remove important
                            taskElement.classList.remove('important-task');
                            taskElement.classList.add('normal-task');
                        }
                    }
                    
                    break;
                case ButtonId.DescriptionButton:
                    // Toggle the display of the description dropdown
                    const taskContainer = button.closest('.myTask') as HTMLElement;
                    const descriptionDropdown = taskContainer.querySelector('.descriptionDropdown') as HTMLElement;
                    if (descriptionDropdown) {
                        descriptionDropdown.style.display = descriptionDropdown.style.display === 'none' ? 'block' : 'none';
                    }
                    break;
                case ButtonId.EditButton:
                    // go to editTask
                    console.log('Edit task');
                    modal.task('edit', currentTask);
                    break;
                case ButtonId.RemoveButton:
                    modal.task('remove', currentTask);// pass in currentTask
                    break;
                // Add more cases for additional buttons
                default:
                    break;
            }
        }
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
        updateTasks(currentTask.categoryIndex.toString())
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

        const addSvgButton = document.getElementById('task');
        if (tasksList.length > 0 && taskContainer) {
            if (addSvgButton) {
                addSvgButton.classList.remove("noTasks");
                addSvgButton.classList.add('hasTasks');
            }
        } else {
            addSvgButton!.classList.add("noTasks");
            addSvgButton!.classList.remove('hasTasks');
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
    }


    function checkCategoryForTasks(categoryIndex: string): boolean{
        console.log(tasksList.some(task => task.categoryIndex === categoryIndex))
        return tasksList.some(task => task.categoryIndex === categoryIndex);
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