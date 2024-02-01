import './style.css';
import { modal } from './modal';

export class Task {
    constructor(public name: string, public description?: string) {
        this.name = name;
        this.description = description;
    }
}

export const tasks = (() => {
    let tasksList: Task[] = [];
    
    function createTask(name: string, description?: string): void {
        // get the currently selected category
        const selectedCategory = document.querySelector('.myCategories.categorySelected');

        if (selectedCategory) {
            // extract the category index from the data-category attribute
            const categoryIndex = selectedCategory.getAttribute('data-category');

            // create a new task with the associated category index
            const newTask = new Task(name, description);

            // Test categpry index
            console.log(`Task created for category index ${categoryIndex}: ${newTask.name} ${newTask.description}`);

            tasksList.push(newTask);

            // Check if tasksList has entries, Maybe check if the slected category has task entries instead
            if (tasksList.length > 0) {
                // Find the element using its ID
                const addSvgButton = document.getElementById('task');
                // Check if the element exists
                if (addSvgButton) {
                    // restyle the button
                    addSvgButton.classList.remove(".noTasks");
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
