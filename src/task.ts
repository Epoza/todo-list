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

            // Create HTML structure for description
    
            // display the task name
            const taskName = document.createElement('span');
            taskName.textContent = newTask.name;
            taskItem.appendChild(taskName);
    
            taskContainer.appendChild(taskItem);
            console.log(`Task created for category index ${categoryIndex}: ${newTask.name} ${newTask.description}`);
            console.log(tasksList);
            tasksList.push(newTask);
            // update tasks
            updateTasks(categoryIndex!)
            
        } else {
            console.error('No category selected for the task.');
        }
    }

    function removeTask(event: Event): void {
    
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
        removeTask,
        updateTasks,
        editTask,
    };
})();
