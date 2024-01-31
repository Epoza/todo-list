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
        // get the currently selected category and append the data to it
        const newTask = new Task(name, description);
        tasksList.push(newTask);
        console.log(tasksList)
        console.log(newTask.name + ' ' + newTask.description);
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
