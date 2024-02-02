import './style.css'
import { modal } from "./modal.ts";

const categoryContainer = document.getElementById('categoryContainer');

// handle click events
document.body.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  
  // code for modal
  if (target.classList.contains('showModal') || (target.parentElement && target.parentElement.classList.contains('showModal'))) {
    // get the ID of the clicked button
    const buttonId = target.id || (target.parentElement && target.parentElement.id);

    // perform different actions based on the button ID
    switch (buttonId) {
      case 'category': // newCategory button clicked
        modal(buttonId)
        break;
      case 'task': // newTask button clicked
        modal(buttonId)
        break;
    }
  }
});

let selectedCategory: Element;

categoryContainer?.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  // check if the clicked element or its ancestor has the class 'myCategories'
  const categoryElement = target.closest('.myCategories');

  if (categoryElement) {
    // add a class to the selected category
    selectedCategory?.classList.remove('categorySelected');
    categoryElement.classList.add('categorySelected');
    selectedCategory = categoryElement;

    // update category header in the task section
    const categoryName = categoryElement.querySelector('span')?.textContent;
    // Display the text on the screen
    const todoHeader = document.getElementById('todoHeader');
    let taskCategoryHeader = document.getElementById('taskCategoryHeader');
    // Append the taskCategoryHeader element to todoHeader
    // Set the text content of taskCategoryHeader
    if (!taskCategoryHeader) {
      taskCategoryHeader = document.createElement('div');
      taskCategoryHeader.id = 'taskCategoryHeader';
      todoHeader?.appendChild(taskCategoryHeader);
    } 
    taskCategoryHeader.textContent = categoryName || '';

    // test for click
    const categoryIndex = categoryElement.getAttribute('data-category');
    console.log('Clicked category', categoryIndex);
  }
});
const selectedCategoryElement = document.querySelector('.categorySelected') as HTMLElement | null;

if (selectedCategoryElement) {
    selectedCategoryElement.click();
}