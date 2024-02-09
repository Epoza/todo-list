import './style.css';
//import { modal } from './modal';

export class Task {
    constructor(public name: string, public categoryIndex: string, public description?: string) {
        this.name = name;
        this.description = description;
    }
}

export const tasks = (() => {
    let tasksList: Task[] = [];

    createTask('First', '0', 'Hello There')
    createTask('Second', '3', 'Hello Thre')
    createTask('Third, fourthcat', '4', 'four')
    createTask('Four, fifthcat', '5', 'five')
    createTask('Fifth, fifthcat', '5', 'fivess')
    function createTask(name: string, categoryIndex: string, description?: string): void {
        // use for taskContainer placement
        const taskInfo = document.getElementById('taskInfo');

        const newTask = new Task(name, categoryIndex!, description);
        const taskIndex = tasksList.length;

        // create or retrieve the task container for the selected category
        const taskContainerId = `taskContainer-${categoryIndex}`;
        let taskContainer = document.getElementById(taskContainerId);

        if (!taskContainer) {
            // create new task container only if it doesn't exist
            taskContainer = document.createElement('div');
            taskContainer.id = taskContainerId;
            taskContainer.classList.add('taskContainer')
            taskInfo?.insertBefore(taskContainer, document.getElementById('task'));

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
            console.log(`Using existing task container for category index ${categoryIndex}`);
        }

        // create new HTML structure for the task
        const taskItem = document.createElement('div');
        taskItem.classList.add("myTask");
        taskItem.setAttribute('data-task', taskIndex.toString());
        taskItem.setAttribute('assigned-category', categoryIndex!.toString());

        const taskContent = document.createElement('div');
        taskContent.id = 'taskContent'

        // html structure for checkbox
        // changed to check task when user clicks
        const uncheckedTask = document.createElement('div');
        uncheckedTask.classList.add('svgButton');
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
        descriptionButton.classList.add('svgButton');
        descriptionButton.id = 'descriptionButton';
        const descriptionIcon = document.createElement('img');
        descriptionIcon.src = "../images/description.svg";
        descriptionIcon.alt = 'description dropdown icon';
        descriptionButton.appendChild(descriptionIcon);
        taskSvgButtonContainer.appendChild(descriptionButton)

        // HTML structure for edit and delete
        const taskEdit = document.createElement('div');
        taskEdit.classList.add('svgButton');
        taskEdit.id = 'editButton';
        const taskEditIcon = document.createElement('img');
        taskEditIcon.src = "../images/edit.svg";
        taskEditIcon.alt = 'edit task icon';
        taskEdit.appendChild(taskEditIcon);
        taskSvgButtonContainer.appendChild(taskEdit);

        // delete button
        const taskRemove = document.createElement('div');
        taskRemove.classList.add('svgButton');
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
        taskName.textContent = newTask.name;
        taskContent.appendChild(taskName);

        // append button container to task
        taskContent.appendChild(taskSvgButtonContainer);

        taskItem.appendChild(taskContent);

        // description dropdown & text
        const descriptionDropdown = document.createElement('div');
        descriptionDropdown.classList.add('descriptionDropdown');
        descriptionDropdown.style.display = 'none'; // Initially hide the dropdown

        const descriptionContent = document.createElement('span');
        descriptionContent.textContent = description || 'No description available';
        descriptionDropdown.appendChild(descriptionContent);
        taskItem.appendChild(descriptionDropdown);
        tasksList.push(newTask);

        // append
        taskContainer.appendChild(taskItem);
        // update tasks
        updateTasks(categoryIndex!)
    }

    function removeAllTasks(categoryIndex: string, categoryRemoved: boolean) {
        // Remove all tasks in the specified category
        const tasksToRemove = tasksList.filter(task => task.categoryIndex === categoryIndex);
        tasksToRemove.forEach(taskToRemove => {
            const taskToRemoveIndex = tasksList.indexOf(taskToRemove);
            tasksList.splice(taskToRemoveIndex, 1);

            const taskElement = document.querySelector(`.myTask[data-task="${taskToRemoveIndex}"`);
            taskElement?.remove();

            

            console.log(`Removed task with index ${taskToRemoveIndex}`);
            console.log(tasksList);
        });

        // Update category index for tasks with index greater than the removed category
        if(categoryRemoved == true){
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
            // Remove the task container associated with the category
            const taskContainer = document.getElementById(`taskContainer-${categoryIndex}`);
            taskContainer?.remove()
            

        }
        

        
    }

    function handleButtonClick(event: Event) {
        const target = event.target as HTMLElement;
        const button = target.closest('.svgButton');

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
                        const taskContainer = button.closest('.myTask') as HTMLElement
                        const taskContainerText = taskContainer?.querySelectorAll('span'); // Change to querySelectorAll when description is added
                        if(taskContainerText){
                            taskContainerText.forEach(spanElement => {
                                spanElement.style.textDecoration = checkTaskIcon.id === 'checked' ? 'line-through' : 'none';
                            });
                            
                            taskContainer!.style.backgroundColor = checkTaskIcon.id === 'checked'? 'rgba(0, 0, 0, 0.3)' : 'initial';
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
                    console.log('Edit');
                    break;
                case ButtonId.RemoveButton:
                    removeTask(event)
                    break;
                // Add more cases for additional buttons
                default:
                    break;
            }
        }
    }

    function removeTask(event: Event): void {
        console.log('remove task')
        const target = event.target as HTMLElement;
        const taskRemoveButton = target.closest('.svgButton[data-remove-task]');
    
        if (taskRemoveButton) {
            const dataIndex = taskRemoveButton.getAttribute('data-remove-task');

            if (dataIndex !== null) {
                const taskIndex = parseInt(dataIndex, 10);
    
                // Remove the task from the tasksList array
                const taskElement = document.querySelector(`.myTask[data-task="${taskIndex}"`);
                taskElement?.remove();
    
                // Remove the task element from the array
                tasksList.splice(taskIndex, 1);
    
                console.log(`Removed task with index ${taskIndex}`);
                console.log(tasksList);
    
                // updates data values when removing items
                const taskElements = document.querySelectorAll('.myTask');
                taskElements.forEach((taskElement, newIndex) => {
                    taskElement.setAttribute('data-task', newIndex.toString());
    
                    // update data-remove attribute of the remove button
                    const removeButton = taskElement.querySelector('.svgButton[data-remove-task]');
                    if (removeButton) {
                        removeButton.setAttribute('data-remove-task', newIndex.toString());
                    }
                });
            }
        }
    }
    

    function updateTasks(categoryIndex: string): void {
        console.log('update tasks category index' + categoryIndex)
        // Checks to see what tasks to show based on category selected
        const allTaskContainers = document.querySelectorAll('.taskContainer');
        
        allTaskContainers.forEach((container) => {
            const isVisible = container.id === `taskContainer-${categoryIndex}`;
            const containerElement = container as HTMLElement;
            containerElement.style.display = isVisible ? 'block' : 'none';
            
            // remove empty taskContainer
            if (!containerElement.hasChildNodes()) {
                containerElement.remove();
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

    function editTask(): void {
 
    }

    return {
        createTask,
        handleButtonClick,
        removeAllTasks,
        removeTask,
        updateTasks,
        editTask,
    };
})();
