import './style.css';
import { categories, Category } from './category';
import { Task, tasks } from './task';

export const modal = (() => {
    function showModal(action: string, contentType: string, capitalizedContentType: string, currentClass?: Category | Task) {
        const getModal = document.querySelector<HTMLDivElement>('#modal-container');
        getModal?.classList.remove("hidden");

        const modalContent = getModalContent(action, contentType, capitalizedContentType, currentClass);
        getModal!.innerHTML = modalContent;

        // event listener for form submission
        const formSubmission = document.getElementById(`${contentType}Form`) as HTMLFormElement;
        formSubmission.addEventListener('submit', handleFormSubmission);

        toggleModal();

        // event listeners for cancel and close buttons
        document.getElementById('cancel')!.addEventListener('click', handleCancel);
        document.getElementById('close')!.addEventListener('click', handleCancel);

        function getModalContent(action: string, contentType: string, capitalizedContentType: string, currentClass?: Category | Task): string {
            const classInfo = currentClass || {} as Category | Task;
            const name = classInfo?.name ?? '';
            const color = (classInfo as Category)?.color ?? '';
            const description = (classInfo as Task)?.description ?? '';

            if (action === 'remove') {
                return `
                    <div id="modal-content">
                        <div id="modalHeader">
                            <h2 class="large-text">${action === 'remove' ? 'Remove' : 'Edit'} ${capitalizedContentType}</h2>
                            <div class="svgButton" id="close"><img src="../images/close.svg" alt="close modal icon"></div>
                        </div>
                        <form id="${contentType}Form">
                            <div>${action === 'remove' ? `Remove this ${contentType}: "${name}"` : ''}</div>
                            <div class="modal${capitalizedContentType}Buttons">
                                <button class="modal-button" id="cancel">Cancel</button>
                                <button class="modal-button" type="submit">${action === 'remove' ? 'Remove' : 'Edit'} ${capitalizedContentType}</button>
                            </div>
                        </form>
                    </div>
                `;
            }

            return `
                <div id="modal-content">
                    <div id="modalHeader">
                        <h2 class="large-text">${action === 'add' ? 'Create New' : 'Edit'} ${capitalizedContentType}</h2>
                        <div class="svgButton" id="close"><img src="../images/close.svg" alt="close modal icon"></div>
                    </div>
                    <form id="${contentType}Form">
                        <label for="${contentType}Name">${capitalizedContentType} Name*</label>
                        <input type="text" id="${contentType}Name" name="${contentType}Name" value="${name}" maxlength="30" required>
                        ${contentType === 'task' ? `
                            <label for="${contentType}Description">${capitalizedContentType} Description:</label>
                            <textarea id="${contentType}Description" name="${contentType}Description" rows="4" placeholder="Optional">${description}</textarea>
                        ` : `
                            <label for="${contentType}Color">${capitalizedContentType} Color</label>
                            <div class="color-options">
                                ${generateColorSquares(color)}
                            </div>
                        `}
                        <div class="modal${capitalizedContentType}Buttons">
                            <button class="modal-button" id="cancel">Cancel</button>
                            <button class="modal-button" type="submit">${action === 'add' ? 'Create' : 'Edit'} ${capitalizedContentType}</button>
                        </div>
                    </form>
                </div>
            `;
        }

        function generateColorSquares(selectedColor: string): string {
            const colors = ['black', 'slategray', 'white', '#ec7e7e', '#ecb67e', '#ece07e', '#95ec7e', '#7ea9ec', '#c57eec', '#ec7eb6'];
            return colors.map(color => `
                <div class="color-square ${color === selectedColor ? 'selected' : ''}" style="background-color: ${color}" data-color="${color}"></div>
            `).join('');
        }

        function handleFormSubmission(event: Event) {
            event.preventDefault();
        
            if (action === 'remove') {
                handleRemoveSubmission(currentClass!);
            } else {
                // both task and category have a name
                const nameInput = document.getElementById(`${contentType}Name`) as HTMLInputElement;
                if (contentType === 'category') {
                    handleCategoryAction(nameInput);
                } else if (contentType === 'task') {
                    handleTaskAction(nameInput);
                }
            }
        }
        
        function handleCategoryAction(nameInput: HTMLInputElement) {
            const selectedColorSquare = document.querySelector('.color-square.selected') as HTMLDivElement;
        
            if (selectedColorSquare) {
                const selectedColor = selectedColorSquare.getAttribute('data-color');
        
                if (action === 'edit' && currentClass instanceof Category) {
                    categories.editCategory(currentClass, nameInput.value, selectedColor!);
                    toggleModal();
                } else if (action === 'add') {
                    categories.createCategory(nameInput.value, selectedColor!);
                    toggleModal();
                }
            } else {
                alert('Please select a color.');
            }
        }
        
        function handleTaskAction(nameInput: HTMLInputElement) {
            // possibly change to let
            const taskDescriptionInput = document.getElementById(`${contentType}Description`) as HTMLInputElement;
            if(action === 'edit' && currentClass instanceof Task){
                console.log('task edit')
                tasks.editTask(currentClass, nameInput.value, taskDescriptionInput.value)
                toggleModal();
            } else if (action === 'add') {
                const selectedCategory = document.querySelector('.myCategories.categorySelected');
                const categoryIndex = selectedCategory!.getAttribute('data-category');
                tasks.createTask(nameInput.value, categoryIndex!, taskDescriptionInput.value);
                toggleModal();
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
        if (getModal && contentType === 'category') {
            const modalStyle = window.getComputedStyle(getModal);
            if (modalStyle.display === 'flex') {
                addColorSquareListeners();
            }
        }
    }

    function handleRemoveSubmission(currentClass: Category | Task) {
        if (currentClass instanceof Category) {
            categories.removeCategory(currentClass);
        } else if (currentClass instanceof Task) {
            tasks.removeTask(currentClass);
        } else {
            console.error('Error: No class provided for removal');
        }
        toggleModal();
    }

    function handleCancel(event: Event) {
        event.preventDefault();
        toggleModal();
    }

    function toggleModal() {
        const getModal = document.querySelector<HTMLDivElement>('#modal-container');
        getModal!.style.display = getModal!.style.display === 'flex' ? 'none' : 'flex';
    }

    return {
        category: (action: string, categoryClass?: Category) => showModal(action, 'category', 'Category', categoryClass),
        task: (action: string, taskClass?: Task) => showModal(action, 'task', 'Task', taskClass),
    };
})();