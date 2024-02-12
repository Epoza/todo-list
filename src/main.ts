import './style.css'
import { modal } from "./modal.ts";
import { tasks } from './task.ts';

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
      // modal.addCategory();
        modal.category('add');
        event.stopPropagation(); // Stop the click event from propagating
        break;
      case 'task': // newTask button clicked
      //modal.addTask()
        //modal(buttonId);
        event.stopPropagation(); // Stop the click event from propagating
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
    // display the text on the screen
    let taskCategoryHeader = document.getElementById('taskCategoryHeader');
    // set the text content of taskCategoryHeader
    taskCategoryHeader!.textContent = categoryName || '';

    // test for click
    const categoryIndex = categoryElement.getAttribute('data-category');
    console.log('Clicked category', categoryIndex);
    if(categoryIndex){
      // checks to see what tasks to show based on category selected
      tasks.updateTasks(categoryIndex)
    }
    
  }
});
const selectedCategoryElement = document.querySelector('.categorySelected') as HTMLElement | null;

if (selectedCategoryElement) {
    selectedCategoryElement.click();
}