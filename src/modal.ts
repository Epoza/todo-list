import './style.css';
import { categories, Category } from './category';
import { Task, tasks } from './task';

export const modal = (() => {
    function category(action: string, categoryClass?: Category) {
        const contentType = 'category';
        const capitalizedContentType = 'Category';

        // get the category name and color if available
        let currentCategoryClass = categoryClass || {} as Category;;
        const categoryName = currentCategoryClass?.name ?? '';
        const categoryColor = currentCategoryClass?.color ?? 'white'

        const getModal = document.querySelector<HTMLDivElement>('#modal-container');
        getModal?.classList.remove("hidden")
        const modalContent = getModalContent(action);
        getModal!.innerHTML = modalContent

        // event listener for form submission
        const formSubmission = document.getElementById(`categoryForm`) as HTMLFormElement;
        formSubmission.addEventListener('submit', handleFormSubmission);

        toggleModal();
    
        // event listeners for cancel and close buttons
        document.getElementById('cancel')!.addEventListener('click', handleCancel);
        document.getElementById('close')!.addEventListener('click', handleCancel);

        function getModalContent(action: string): string {
            switch (action) {
                case 'add':
                    return generateCategoryForm('Create New', 'Create', '');
                case 'edit':
                    // Handle 'edit' action
                    return generateCategoryForm('Edit', 'Edit', categoryName)
                case 'remove':
                    // Handle 'remove' action
                    return generateCategoryForm('Remove', 'Remove', categoryName)
                default:
                    throw new Error(`Error: '${action}' is not a listed action`);
            }
        }

        function generateCategoryForm(headerText: string, buttonText: string, defaultValue: string): string {
            if(action === 'remove'){
                return `
                <div id="modal-content">
                    <div id="modalHeader">
                        <h2 class="large-text">${headerText} ${capitalizedContentType}</h2>
                        <div class="svgButton" id="close"><img src="../images/close.svg" alt="close modal icon"></div>
                    </div>
                    <form id="${contentType}Form">
                        <div>Remove this category: "${categoryName}"</div>
                        <div class="modal${capitalizedContentType}Buttons">
                            <button class="modal-button" id="cancel">Cancel</button>
                            <button class="modal-button" type="submit">${buttonText} ${capitalizedContentType}</button>
                        </div>
                    </form>
                </div>
            `;
            }
            return `
                <div id="modal-content">
                    <div id="modalHeader">
                        <h2 class="large-text">${headerText} ${capitalizedContentType}</h2>
                        <div class="svgButton" id="close"><img src="../images/close.svg" alt="close modal icon"></div>
                    </div>
                    <form id="${contentType}Form">
                        <label for="${contentType}Name">${capitalizedContentType} Name*</label>
                        <input type="text" id="${contentType}Name" name="${contentType}Name" value="${defaultValue}" maxlength="30" required>
                        <label for="${contentType}Color">${capitalizedContentType} Color</label>
                        <div class="color-options">
                            ${generateColorSquares()}
                        </div>
                        <div class="modal${capitalizedContentType}Buttons">
                            <button class="modal-button" id="cancel">Cancel</button>
                            <button class="modal-button" type="submit">${buttonText} ${capitalizedContentType}</button>
                        </div>
                    </form>
                </div>
            `;
        }

        function generateColorSquares(): string {
            // uses an array of colors to set each square to their specified color
            
            const colors = ['black', 'slategray', 'white', '#ec7e7e', '#ecb67e', '#ece07e', '#95ec7e', '#7ea9ec', '#c57eec', '#ec7eb6'];
        
            // selects the current category color 
            const colorSquaresHTML = colors.map(color => `
            <div class="color-square ${color === categoryColor ? 'selected' : ''}" style="background-color: ${color}" data-color="${color}"></div>
            `).join('');

            return colorSquaresHTML;
        }

        function handleFormSubmission(event: Event) {
            event.preventDefault();
        
            if (action === 'remove') {
                handleRemoveSubmission(currentCategoryClass);
            } else {
                const nameInput = document.getElementById(`${contentType}Name`) as HTMLInputElement;
                const selectedColorSquare = document.querySelector('.color-square.selected') as HTMLDivElement;
        
                if (selectedColorSquare) {
                    const selectedColor = selectedColorSquare.getAttribute('data-color');
        
                    if (action === 'edit') {
                        handleEditSubmission(currentCategoryClass, nameInput, selectedColor);
                    } else if (action === 'add') {
                        handleAddSubmission(nameInput, selectedColor);
                    }
                } else {
                    alert('Please select a color.');
                }
            }
        }

        function addColorSquareListeners() {
            const colorSquares = document.querySelectorAll('.color-square');
    
            colorSquares.forEach(square => {
                square.addEventListener('click', () => {
                    colorSquares.forEach(s => s.classList.remove('selected'));
                    square.classList.add('selected');
                });
            });
        }

        // add event listener
        if (getModal) {
            const modalStyle = window.getComputedStyle(getModal);
            if (modalStyle.display === 'flex') {
                addColorSquareListeners();
            }
        }

    }

    function task(action: string, taskClass?: Task) {
        const contentType = 'task';
        const capitalizedContentType = 'Task';

        // get the task name and color if available
        let currentTaskClass = taskClass || {} as Task;
        const taskName = currentTaskClass?.name ?? '';
        const taskDescription = currentTaskClass?.description ?? ''

        const getModal = document.querySelector<HTMLDivElement>('#modal-container');
        getModal?.classList.remove("hidden")
        const modalContent = getModalContent(action);
        getModal!.innerHTML = modalContent

        // event listener for form submission
        const formSubmission = document.getElementById(`taskForm`) as HTMLFormElement;
        formSubmission.addEventListener('submit', handleFormSubmission);

        toggleModal();
    
        // event listeners for cancel and close buttons
        document.getElementById('cancel')!.addEventListener('click', handleCancel);
        document.getElementById('close')!.addEventListener('click', handleCancel);

        function getModalContent(action: string): string {
            switch (action) {
                case 'add':
                    return generateTaskForm('Create New', 'Create', '');
                case 'edit':
                    // Handle 'edit' action
                    //return generateTaskForm('Edit', 'Edit', taskName)
                case 'remove':
                    // Handle 'remove' action
                    return generateTaskForm('Remove', 'Remove', taskName)
                default:
                    throw new Error(`Error: '${action}' is not a listed action`);
            }
        }

        function generateTaskForm(headerText: string, buttonText: string, defaultValue: string): string {
            if(action === 'remove'){
                return `
                <div id="modal-content">
                    <div id="modalHeader">
                        <h2 class="large-text">${headerText} ${capitalizedContentType}</h2>
                        <div class="svgButton" id="close"><img src="../images/close.svg" alt="close modal icon"></div>
                    </div>
                    <form id="${contentType}Form">
                        <div>Remove this task: "${taskName}"</div>
                        <div class="modal${capitalizedContentType}Buttons">
                            <button class="modal-button" id="cancel">Cancel</button>
                            <button class="modal-button" type="submit">${buttonText} ${capitalizedContentType}</button>
                        </div>
                    </form>
                </div>
            `;
            }
            return `
                <div id="modal-content">
                    <div id="modalHeader">
                    <h2>${headerText} ${capitalizedContentType}</h2>
                    <div class="svgButton" id="close"><img src="../images/close.svg" alt="close modal icon"></div>
                    </div>
                    <form id="${contentType}Form">
                    <label for="${contentType}Name">${capitalizedContentType} Name*</label>
                    <input type="text" id="${contentType}Name" name="${contentType}Name" placeholder="Clean room" value="${defaultValue}" required>
                    <label for="${contentType}Description">${capitalizedContentType} Description:</label>
                    <textarea id="${contentType}Description" name="${contentType}Description" rows="4" placeholder="Optional"></textarea>
                    <div class="modal${capitalizedContentType}Buttons">
                    <button class="modal-button" id="cancel">Cancel</button>
                    <button class="modal-button" type="submit">${buttonText} ${capitalizedContentType}</button>
                    </div>
                    </form>
                </div>
            `;
        }

        function handleFormSubmission(event: Event) {
            event.preventDefault();
        
            if (action === 'remove') {
                console.log("remove task..")
                handleRemoveSubmission(currentTaskClass);
            } else {
                const nameInput = document.getElementById(`${contentType}Name`) as HTMLInputElement;
                const taskDescriptionInput = document.getElementById(`${contentType}Description`) as HTMLInputElement;
                if (action === 'edit') {
                    //handleEditSubmission(currentTaskClass, nameInput, selectedColor);
                } else if (action === 'add') {
                    // creating a new task
                    const selectedCategory = document.querySelector('.myCategories.categorySelected');
                    const categoryIndex = selectedCategory!.getAttribute('data-category');
                    tasks.createTask(nameInput.value, categoryIndex!, taskDescriptionInput.value);
                    toggleModal();
                }
            }
        }

    }

    function toggleModal() {
        const getModal = document.querySelector<HTMLDivElement>('#modal-container');
        getModal!.style.display = getModal!.style.display === 'flex' ? 'none' : 'flex';
    }

    function handleRemoveSubmission(currentClass: Category | Task) {
        // handle remove action
        if(currentClass instanceof Category){
            categories.removeCategory(currentClass);
            toggleModal();
        } else if (currentClass instanceof Task){
            tasks.removeTask(currentClass);
            toggleModal();
        } else {
            console.error('Error: No class provided for removal')
        }
        //  for Task, remove the task
    }
    
    function handleEditSubmission(currentClass: Category | Task, nameInput: HTMLInputElement, selectedColor: string | null) {
        // handle edit action
        if (currentClass instanceof Category) {
            categories.editCategory(currentClass, nameInput.value, selectedColor!);
            toggleModal();
        } else {
            console.error("Error: No class provided for editing.");
        }
        // add else if for task later
    }
    
    function handleAddSubmission(nameInput: HTMLInputElement, selectedColor: string | null) {
        // handle add action
        categories.createCategory(nameInput.value, selectedColor!);
        toggleModal();

        //handle add for task
    }

    function handleCancel(event: Event) {
        // user clicks X or cancel
        event.preventDefault();
        toggleModal();
    }

    return {
        category,
        task,
    };
})();

  