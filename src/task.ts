import './style.css';
import { modal } from './modal';

export class Category {
    constructor(public title: string, public description: string) {
        this.title = title;
        this.description = description;
    }
}

export const tasks = (() => {
    let tasksList: Category[] = [];
    
    function createTask(title: string, description: string): void {
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
