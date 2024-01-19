import './style.css'
import { categories } from './category';


export function modal(contentType: string) {
    // capitilize first letter
    const capitalizedContentType = contentType.charAt(0).toUpperCase() + contentType.slice(1);

    // for task and category moda
    let getModal = document.querySelector<HTMLDivElement>('#modal-container');
    // generate different modal depending on which button was clicked
    if(contentType == 'task'){
        getModal!.innerHTML = 
        `
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
        `
    } else if (contentType == 'category'){
        getModal!.innerHTML = 
        `
        <div id="modal-content">
         <div id="modalHeader">
          <h2>Create New ${capitalizedContentType}</h2>
          <div class="svgButton" id="close"><img src="../images/close.svg" alt="close modal icon"></div>
         </div>
         <form id="${contentType}Form">
          <label for="${contentType}Name">${capitalizedContentType} Name*</label>
          <input type="text" id="${contentType}Name" name="${contentType}Name" required>
          <div class="modal${capitalizedContentType}buttons">
           <button class="modal-button" id="cancel">Cancel</button>
           <button class="modal-button" type="submit">Create ${capitalizedContentType}</button>
          </div>
         </form>
        </div>
        `
        // event listener for form submission
        const categoryForm = document.getElementById(`${contentType}Form`) as HTMLFormElement;
        categoryForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('form')
            // get entered category name
            const categoryNameInput = document.getElementById(`${contentType}Name`) as HTMLInputElement;

            // creates category in category.ts
            categories.createCategory(categoryNameInput.value);

            toggleModal();
         });
    }
    toggleModal()
    // show/hide modal
    function toggleModal() {
        var modalContainer = document.getElementById('modal-container');
        if (modalContainer?.style.display === 'flex') {
            modalContainer.style.display = 'none';
        } else {
            modalContainer!.style.display = 'flex';
        }
    }
    document.getElementById('cancel')!.addEventListener('click', function (event) {
        event.preventDefault();
        toggleModal();
    });
    document.getElementById('close')!.addEventListener('click', function (event) {
        event.preventDefault();
        toggleModal();
    });

}