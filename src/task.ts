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
    
    createTask('Task Name', 'Task Description');
    function createTask(name: string, description?: string): void {
        // get the currently selected category
        const selectedCategory = document.querySelector('.myCategories.categorySelected');
    
        if (selectedCategory) {
            // extract the category index from the data-category attribute
            const categoryIndex = selectedCategory.getAttribute('data-category');
            
            const todoHeader = document.getElementById('todoHeader');

            const newTask = new Task(name, description);
            const taskIndex = tasksList.length;
    
            // create or retrieve the task container for the selected category
            const taskContainerId = `taskContainer-${categoryIndex}`;
            // Check if the task container already exists
            let taskContainer = document.getElementById(taskContainerId);
    
            if (!taskContainer) {
                // create new task container only if it doesn't exist
                taskContainer = document.createElement('div');
                taskContainer.id = taskContainerId;
                taskContainer.classList.add('taskContainer');
                todoHeader?.appendChild(taskContainer);
                console.log(`Created new task container for category index ${categoryIndex}`);
            } else {
                console.log(`Using existing task container for category index ${categoryIndex}`);
            }
    
            // create new HTML structure for the task
            const taskItem = document.createElement('div');
            taskItem.classList.add("myTask");
            taskItem.setAttribute('data-task', taskIndex.toString());
            taskItem.setAttribute('assigned-category', categoryIndex!.toString());
    
            // display the task name
            const taskName = document.createElement('span');
            taskName.textContent = newTask.name;
            taskItem.appendChild(taskName);
    
            taskContainer.appendChild(taskItem);
            console.log(`Task created for category index ${categoryIndex}: ${newTask.name} ${newTask.description}`);
            console.log(tasksList);
            tasksList.push(newTask);
    
            // Check if tasksList has entries, later check if category has a taskConatiner
            if (tasksList.length > 0) {
                // Find the element using its ID
                const addSvgButton = document.getElementById('task');
    
                // Check if the element exists
                if (addSvgButton) {
                    // restyle the button
                    addSvgButton.classList.remove("noTasks");
                    addSvgButton.classList.add('hasTasks');
                    addSvgButton.style.width = '24px'; // Adjust the width
                    addSvgButton.style.height = '24px'; // Adjust the height
                }
            }
            
        } else {
            console.error('No category selected for the task.');
        }
    }
        
    
    

    function removeTask(event: Event): void {
    
    }

    function updateTasks(): void {

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
