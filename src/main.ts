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
        console.log('Clicked newCategory button');
        break;
      case 'task': // newTask button clicked
        modal(buttonId)
        console.log('Clicked newTask button');
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

    // Test for click
    const categoryIndex = categoryElement.getAttribute('data-category');
    console.log('Clicked category', categoryIndex);
  }
});
