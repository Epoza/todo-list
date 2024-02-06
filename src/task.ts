import './style.css';
//import { modal } from './modal';

export class Task {
    constructor(public name: string, public description?: string) {
        this.name = name;
        this.description = description;
    }
}

export const tasks = (() => {
    let tasksList: Task[] = [];

    createTask('test task')
    function createTask(name: string, description?: string): void {
        // get the currently selected category
        const selectedCategory = document.querySelector('.myCategories.categorySelected');
    
        if (selectedCategory) {
            // extract the category index from the data-category attribute
            const categoryIndex = selectedCategory.getAttribute('data-category');
            
            // use for taskContainer placement
            const taskInfo = document.getElementById('taskInfo');

            const newTask = new Task(name, description);
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
                console.log(`Created new task container for category index ${categoryIndex}`);
            } else {
                console.log(`Using existing task container for category index ${categoryIndex}`);
            }
    
            // create new HTML structure for the task
            const taskItem = document.createElement('div');
            taskItem.classList.add("myTask");
            taskItem.setAttribute('data-task', taskIndex.toString());
            taskItem.setAttribute('assigned-category', categoryIndex!.toString());

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
            taskItem.appendChild(uncheckedTask);

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
            const editTask = document.createElement('div');
            editTask.classList.add('svgButton');
            editTask.id = 'editButton';
            const editTaskIcon = document.createElement('img');
            editTaskIcon.src = "../images/edit.svg";
            editTaskIcon.alt = 'edit task icon';
            editTask.appendChild(editTaskIcon);
            taskSvgButtonContainer.appendChild(editTask);

            // delete button
            const removeTask = document.createElement('div');
            removeTask.classList.add('svgButton');
            removeTask.id = 'removeButton';
            // possibly change to just data-remove
            removeTask.setAttribute('data-remove-task', taskIndex.toString());
            const removeTaskIcon = document.createElement('img');
            removeTaskIcon.src = "../images/remove.svg";
            removeTaskIcon.alt = 'unchecked task icon';
            removeTask.appendChild(removeTaskIcon);
            taskSvgButtonContainer.appendChild(removeTask);
    
            // display the task name
            const taskName = document.createElement('span');
            taskName.textContent = newTask.name;
            taskItem.appendChild(taskName);

            // append button container to task
            taskItem.appendChild(taskSvgButtonContainer);
    
            taskContainer.appendChild(taskItem);
            console.log(`Task created for category index ${categoryIndex}: ${newTask.name} ${newTask.description}`);
            console.log(tasksList);
            tasksList.push(newTask);
            // update tasks
            updateTasks(categoryIndex!)
            // Add event listener to handle button clicks
            taskContainer?.addEventListener('click', handleButtonClick);
        } else {
            console.error('No category selected for the task.');
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
                        const taskContainerText = taskContainer?.querySelector('span'); // Change to querySelectorAll when description is added
                        if(taskContainerText){
                            taskContainerText.style.textDecoration = checkTaskIcon.id === 'checked' ? 'line-through' : 'none';
                            taskContainer!.style.backgroundColor = checkTaskIcon.id === 'checked'? 'rgba(0, 0, 0, 0.3)' : 'initial';
                        }
                    }
                    
                    break;
                case ButtonId.DescriptionButton:
                    // show drop down 
                    console.log('Description');
                    break;
                case ButtonId.EditButton:
                    // go to editTask
                    console.log('Edit');
                    break;
                case ButtonId.RemoveButton:
                    // go to removeTask
                    console.log('Remove');
                    break;
                // Add more cases for additional buttons
                default:
                    break;
            }
        }
    }
    

    function removeTask(): void {
    
    }

    function updateTasks(categoryIndex: string): void {
        // Checks to see what tasks to show based on category selected
        const allTaskContainers = document.querySelectorAll('.taskContainer');

        allTaskContainers.forEach((container) => {
            const isVisible = container.id === `taskContainer-${categoryIndex}`;
            const containerElement = container as HTMLElement;
            containerElement.style.display = isVisible ? 'block' : 'none';
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
        removeTask,
        updateTasks,
        editTask,
    };
})();
