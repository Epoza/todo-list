import './style.css'
import { modal } from "./modal.ts";
import { tasks } from './task.ts';

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
        modal.category('add');
        event.stopPropagation(); // Stop the click event from propagating
        break;
      case 'task': // newTask button clicked
        modal.task('add')
        event.stopPropagation(); // Stop the click event from propagating
        break;
    }
  }
});

// light/dark mode
const moonIcon = document.querySelector('.moon') as HTMLElement;
const sunIcon = document.querySelector('.sun') as HTMLElement;

const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

// toggle light/dark mode
const themeToggle = () => {
  moonIcon.classList.toggle('display-none');
  sunIcon.classList.toggle('display-none');
}

// initial theme check
const themeCheck = () => {
  if (userTheme === 'dark' || (!userTheme && systemTheme)){
    document.documentElement.classList.add('dark');
    moonIcon.classList.add('display-none');
    return;
  }
  sunIcon.classList.add('display-none');
}

// manual theme check
const themeSwitch = () => {
  if(document.documentElement.classList.contains('dark')){
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeToggle();
    return;
  }
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
  themeToggle();
}

// switch theme on button click
moonIcon.addEventListener('click', () => {
  themeSwitch();
});

sunIcon.addEventListener('click', () => {
  themeSwitch();
});

// check theme on initial load
themeCheck();

const toggleSidebarButton = document.getElementById("toggleSidebarButton") as HTMLElement;
const sidebar = document.getElementById("sidebar") as HTMLElement;

// pass in click or resize to determine styling
function toggleSidebar(shouldClose: boolean) {
  const sidebarButtonIcon = toggleSidebarButton.querySelector('img');

  sidebar.style.display = shouldClose ? "block" : "none";
  sidebar.classList.toggle("closed", !shouldClose);
  sidebarButtonIcon!.src = shouldClose ? "../images/sidebar_close.svg" : "../images/sidebar.svg";
}

// Add an event listener to toggle the sidebar on button click
toggleSidebarButton.addEventListener('click', () => {
    const isClosed = sidebar.style.display === "none" || sidebar.classList.contains("closed");
    toggleSidebar(isClosed)
});

// Add a resize event listener to adjust the sidebar based on screen size changes
window.addEventListener('resize', () => {
  // Adjust the sidebar based on the window size
  const windowWidth = window.innerWidth;
  const shouldCloseSidebar = windowWidth >= 768; // Adjust this threshold based on your requirements
  toggleSidebar(shouldCloseSidebar);
});



// change category and show the tasks
const categoryContainer = document.getElementById('categoryContainer');
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
    if(categoryIndex){
      //remove the add task button from default categories other than All
      toggleAddTaskButton(categoryIndex)
      // checks to see what tasks to show based on category selected
      tasks.updateTasks(categoryIndex)
      
    }

    
  }
});
const selectedCategoryElement = document.querySelector('.categorySelected') as HTMLElement | null;

if (selectedCategoryElement) {
    selectedCategoryElement.click();
}

function toggleAddTaskButton(categoryIndex: string){
  const addTaskButton = document.getElementById('task');
  if(categoryIndex === '1' || categoryIndex === '2'){
      addTaskButton!.style.display = 'none';
  } else{
    addTaskButton!.style.display = 'block';
  }
}