import './style.css'
import { modal } from "./modal.ts";
import { tasks } from './task.ts';

// Handle click events for adding task/category
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
        event.stopPropagation();
        break;
      case 'task': // newTask button clicked
        modal.task('add')
        event.stopPropagation();
        break;
    }
  }
});

// Light/dark mode
const moonIcon = document.querySelector('.moon') as HTMLElement;
const sunIcon = document.querySelector('.sun') as HTMLElement;

const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Toggle light/dark mode
const themeToggle = () => {
  moonIcon.classList.toggle('display-none');
  sunIcon.classList.toggle('display-none');
}

// Initial theme check
const themeCheck = () => {
  if (userTheme === 'dark' || (!userTheme && systemTheme)){
    document.documentElement.classList.add('dark');
    moonIcon.classList.add('display-none');
    return;
  }
  sunIcon.classList.add('display-none');
}

// Manual theme check
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

// Switch theme on button click
moonIcon.addEventListener('click', () => {
  themeSwitch();
});

sunIcon.addEventListener('click', () => {
  themeSwitch();
});

// Check theme on initial load
themeCheck();

// Show/hide sidebar and toggle svg
const toggleSidebarButton = document.getElementById("toggleSidebarButton") as HTMLElement;
const sidebar = document.getElementById("sidebar") as HTMLElement;

// Pass in click
function toggleSidebar(shouldClose: boolean) {
  const sidebarButtonOpen = toggleSidebarButton.querySelector('.sidebarOpen') as HTMLElement;
  const sidebarButtonClose = toggleSidebarButton.querySelector('.sidebarClose') as HTMLElement;

  sidebar.style.display = shouldClose ? "block" : "none";
  sidebar.classList.toggle("closed", !shouldClose);

  // Toggle between classes based on open/close state
  sidebarButtonOpen.style.display = shouldClose ? "none" : "block";
  sidebarButtonClose.style.display = shouldClose ? "block" : "none";
}

// Set initial state based on window size
toggleSidebar(window.innerWidth >= 768);

// Toggle the sidebar on button click
toggleSidebarButton.addEventListener('click', () => {
    const isClosed = sidebar.style.display === "none" || sidebar.classList.contains("closed");
    toggleSidebar(isClosed);
});

window.addEventListener('resize', () => {
  // Adjust the sidebar based on the window size
  const windowWidth = window.innerWidth;
  const shouldCloseSidebar = windowWidth < 768; 
  toggleSidebar(!shouldCloseSidebar);
});

// Change category and show the tasks
const categoryContainer = document.getElementById('categoryContainer');
let selectedCategory: Element;

categoryContainer?.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  // Check if the clicked element or its ancestor has the class 'myCategories'
  const categoryElement = target.closest('.myCategories');

  if (categoryElement) {
    // Add a class to the selected category
    selectedCategory?.classList.remove('categorySelected');
    categoryElement.classList.add('categorySelected');
    selectedCategory = categoryElement;
    
    // Update category header in the task section
    const categoryName = categoryElement.querySelector('span')?.textContent;
    // Display the text on the screen
    let taskCategoryHeader = document.getElementById('taskCategoryHeader');
    // Set the text content of taskCategoryHeader
    taskCategoryHeader!.textContent = categoryName || '';

    // Close the sidebar for small screens
    toggleSidebar(window.innerWidth >= 768);
    
    // Test for click
    const categoryIndex = categoryElement.getAttribute('data-category');
    if(categoryIndex){
      //Remove the add task button from default categories other than 'All'
      toggleAddTaskButton(categoryIndex)
      // Checks to see what tasks to show based on category selected
      tasks.updateTasks(categoryIndex)
    }
  }
});
const selectedCategoryElement = document.querySelector('.categorySelected') as HTMLElement | null;

if (selectedCategoryElement) {
    selectedCategoryElement.click();
}

//Remove the add task button from default categories other than 'All'
function toggleAddTaskButton(categoryIndex: string){
  const addTaskButton = document.getElementById('task');
  if(categoryIndex === '1' || categoryIndex === '2'){
      addTaskButton!.style.display = 'none';
  } else{
    addTaskButton!.style.display = 'block';
  }
}