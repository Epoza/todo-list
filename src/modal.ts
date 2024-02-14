import './style.css';
import { categories, Category } from './category';
import { tasks } from './task';

export const modal = (() => {
    function category(action: string, categoryClass?: Category) {
        const contentType = 'category';
        const capitalizedContentType = 'Category';

        // get the category name and color if available
        let currentCategoryClass = categoryClass || {} as Category;;
        const categoryName = currentCategoryClass?.name ?? '';
        const categoryColor = currentCategoryClass?.color ?? ''

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
        document.getElementById('close')!.addEventListener('click', handleClose);

        function getModalContent(action: string): string {
            switch (action) {
                case 'add':
                    return generateCategoryForm('Create New', 'Create', '');
                case 'edit':
                    // Handle 'edit' action
                    return generateCategoryForm('Edit', 'Edit', categoryName)
                case 'remove':
                    // Handle 'remove' action
                    return "remove not added yet";
                default:
                    throw new Error(`Error: '${action}' is not a listed action`);
            }
        }

        function generateCategoryForm(headerText: string, buttonText: string, defaultValue: string): string {
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
        
            console.log(categoryColor)
        
            // Check if the color is white or the current category's color (if not empty), add "selected" class
            // Check if the color is white or the current category's color, add "selected" class
            const colorSquaresHTML = colors.map(color => `
            <div class="color-square ${color === categoryColor ? 'selected' : ''}" style="background-color: ${color}" data-color="${color}"></div>
            `).join('');

            return colorSquaresHTML;

    
        }
        
        // ... (existing event handler functions)

        function handleFormSubmission(event: Event) {
            event.preventDefault();
            const nameInput = document.getElementById(`${contentType}Name`) as HTMLInputElement;
            
            const selectedColorSquare = document.querySelector('.color-square.selected') as HTMLDivElement;
            if (selectedColorSquare) {
                const selectedColor = selectedColorSquare.getAttribute('data-color');
                if (action === 'edit') {
                    // Update the selected category class
                    if (currentCategoryClass) {
                        categories.editCategory(currentCategoryClass, nameInput.value, selectedColor!);
                        toggleModal();
                    } else {
                        console.error("Error: No category class provided for editing.");
                    }
                } else if (action === 'add') {
                    // Create a new category
                    categories.createCategory(nameInput.value, selectedColor!);
                    toggleModal();
                }
            } else {
                alert('Please select a color.');
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

        // Move the code to add color square listeners outside the if block
        if (getModal) {
            const modalStyle = window.getComputedStyle(getModal);
            if (modalStyle.display === 'flex') {
                console.log('hello');
                console.log(categoryColor);
                addColorSquareListeners();
            }
        }

        // Add other modal methods (removeCategory, removeTask, etc.)
        function handleCancel(event: Event) {
            event.preventDefault();
            toggleModal();
        }

        function handleClose(event: Event) {
            event.preventDefault();
            toggleModal();
        }

    }

    function addTask() {
        // Similar structure to addCategory, but for 'task'
    }

    function editCategory(category: Category) {
        // Similar structure to addCategory, but with 'edit' action and category parameter
    }

    function toggleModal() {
        const getModal = document.querySelector<HTMLDivElement>('#modal-container');
        getModal!.style.display = getModal!.style.display === 'flex' ? 'none' : 'flex';
    }

    return {
        category,
        addTask,
        editCategory,
    };
})();

  