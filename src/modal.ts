import './style.css';
import { categories } from './category';

export function modal(contentType: string) {
    const capitalizedContentType = contentType.charAt(0).toUpperCase() + contentType.slice(1);

    const getModal = document.querySelector<HTMLDivElement>('#modal-container');

    const modalContent = getModalContent(contentType, capitalizedContentType);
    getModal!.innerHTML = modalContent;

    // Event listener for form submission
    const formSubmission = document.getElementById(`${contentType}Form`) as HTMLFormElement;
    formSubmission.addEventListener('submit', handleFormSubmission);

    toggleModal();

    // Event listeners for cancel and close buttons
    document.getElementById('cancel')!.addEventListener('click', handleCancel);
    document.getElementById('close')!.addEventListener('click', handleClose);

    function getModalContent(contentType: string, capitalizedContentType: string): string {
        if (contentType === 'task') {
            return `
                <div id="modal-content">
                 <div id="modalHeader">
                 <h2>Create New ${capitalizedContentType}</h2>
                 <div class="svgButton" id="close"><img src="../images/close.svg" alt="close modal icon"></div>
                 </div>
                 <form id="${contentType}Form">
                  <label for="${contentType}Name">${capitalizedContentType} Name*</label>
                  <input type="text" id="${contentType}Name" name="${contentType}Name" placeholder="Clean room" required>
                  <label for="${contentType}Description">${capitalizedContentType} Description:</label>
                  <textarea id="${contentType}Description" name="${contentType}Description" rows="4" placeholder="Optional"></textarea>
                  <div class="modal${capitalizedContentType}Buttons">
                   <button class="modal-button" id="cancel">Cancel</button>
                   <button class="modal-button" type="submit">Create ${capitalizedContentType}</button>
                  </div>
                 </form>
                </div>
            `;
        } else if (contentType === 'category') {
            return `
                <!-- Category modal content -->
                <div id="modal-content">
                    <div id="modalHeader">
                        <h2 class="large-text">Create New ${capitalizedContentType}</h2>
                        <div class="svgButton" id="close"><img src="../images/close.svg" alt="close modal icon"></div>
                    </div>
                    <form id="${contentType}Form">
                        <label for="${contentType}Name">${capitalizedContentType} Name*</label>
                        <input type="text" id="${contentType}Name" name="${contentType}Name" required>
                        <label for="${contentType}Color">${capitalizedContentType} Color</label>
                        <div class="color-options">
                            ${generateColorSquares()}
                        </div>
                        <div class="modal${capitalizedContentType}Buttons">
                            <button class="modal-button" id="cancel">Cancel</button>
                            <button class="modal-button" type="submit">Create ${capitalizedContentType}</button>
                        </div>
                    </form>
                </div>
            `;
        }
        return '';
    }

    function generateColorSquares(): string {
        // uses an array of colors to set each square to their specified color
        const colors = ['black', 'slategray', 'white', '#ec7e7e', '#ecb67e', '#ece07e', '#95ec7e', '#7ea9ec', '#c57eec', '#ec7eb6'];

        return colors.map(color => `
            <div class="color-square" style="background-color: ${color}" data-color="${color}"></div>
        `).join('');
    }

    function handleFormSubmission(event: Event) {
        event.preventDefault();
        const categoryNameInput = document.getElementById(`${contentType}Name`) as HTMLInputElement;
        const selectedColorSquare = document.querySelector('.color-square.selected') as HTMLDivElement;

        if (selectedColorSquare) {
            const selectedColor = selectedColorSquare.getAttribute('data-color');
            categories.createCategory(categoryNameInput.value, selectedColor!);
            toggleModal();
        } else {
            alert('Please select a color.');
        }
    }

    function toggleModal() {
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer?.style.display === 'flex') {
            modalContainer.style.display = 'none';
        } else {
            modalContainer!.style.display = 'flex';
            addColorSquareListeners();
        }
    }

    function handleCancel(event: Event) {
        event.preventDefault();
        toggleModal();
    }

    function handleClose(event: Event) {
        event.preventDefault();
        toggleModal();
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
}
