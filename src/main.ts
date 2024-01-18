import './style.css'
import { modal } from "./modal.ts";

// handle click events
document.body.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  
  // Code for modal
  if (target.classList.contains('showModal') || (target.parentElement && target.parentElement.classList.contains('showModal'))) {
    // Get the ID of the clicked button
    const buttonId = target.id || (target.parentElement && target.parentElement.id);

    // Perform different actions based on the button ID
    switch (buttonId) {
      case 'category': // newCategory button clicked
        modal(buttonId)
        console.log('Clicked newCategory button');
        break;
      case 'task': // newTask button clicked
        modal(buttonId)
        console.log('Clicked newTask button');
        break;
      // Add more cases as needed
    }
  }
});
