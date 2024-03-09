import './style.css';
import { modal } from './modal';
import { tasks } from './task';

export class Category {
    constructor(public name: string, public color: string) {
        this.name = name;
        this.color = color;
    }
}

export const categories = (() => {
    let categoriesList: Category[] = [];
    
    // easily insert default SVG's 
    const defaultCategoryMappings = [
        { className: 'svgAll', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-440 160-640v400h360v80H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v280h-80v-200L480-440Zm0-80 320-200H160l320 200ZM760-40l-56-56 63-64H600v-80h167l-64-64 57-56 160 160L760-40ZM160-640v440-240 3-283 80Z"/></svg>' },
        { className: 'svgToday', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>'},
        { className: 'svgImportant', svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z"/></svg>' },
    ];

    // Default categories
    createCategory('All', '#eaeaea', true);
    createCategory('Today', '#ffe6e2', true);
    createCategory('Important', '#fffeea', true);
    createCategory('Test', 'white', false)
    createCategory('Four', 'white', false)
    createCategory('Five', 'white', false)
    createCategory('No tasks', 'aliceblue', false)
    

    function createCategory(name: string, color: string, defaultCategory?: boolean): void {
        const newCategory = new Category(name, color);
        const categoryListContainer = document.getElementById('categoryContainer');

        // create new HTML structure
        const categoryIndex = categoriesList.length;
        const categoryItem = document.createElement('div');
        categoryItem.classList.add("myCategories");
        categoryItem.style.backgroundColor = `${color}`
        categoryItem.setAttribute('data-category', categoryIndex.toString());
        
        // check for default category
        if (defaultCategory && categoryIndex < defaultCategoryMappings.length) {
            const { className, svg} = defaultCategoryMappings[categoryIndex];
            
            // insert the default category svg
            categoryItem.classList.add('defaultCategory')
            const categoryDefaultSvg = document.createElement('div');
            categoryDefaultSvg.classList.add(className);
            categoryDefaultSvg.innerHTML = svg;

            categoryItem.appendChild(categoryDefaultSvg);

            // set the first category to the selected category
            if (categoryIndex === 0) {
                categoryItem.classList.add('categorySelected');
            }
        }

        // display the category name
        const categoryName = document.createElement('span');
        categoryName.textContent = newCategory.name;
        categoryItem.appendChild(categoryName);

        if(!defaultCategory){
            // holds the svg buttons
            const svgButtonContainer = document.createElement('div');
            svgButtonContainer.classList.add('svgButtonContainer');

            // edit svg button
            const categoryEdit = document.createElement('div');
            categoryEdit.classList.add('svgButton');
            const editIcon = document.createElement('img');
            editIcon.src = "../images/edit.svg"
            editIcon.alt = 'edit category icon';
            categoryEdit.appendChild(editIcon);
            svgButtonContainer.appendChild(categoryEdit);

            // remove svg button
            const categoryRemove = document.createElement('div');
            categoryRemove.classList.add('svgButton');
            categoryRemove.setAttribute('data-remove', categoryIndex.toString());
            const removeIcon = document.createElement('img');
            removeIcon.src = "../images/remove.svg"
            removeIcon.alt = 'remove category icon';
            categoryRemove.appendChild(removeIcon);
            // Add click event listener directly to categoryRemove
            categoryRemove.addEventListener('click', (event) => {
                // Prevent the click event from propagating to the parent elements
                event.stopPropagation();
                modal.category('remove', newCategory)
            });
            svgButtonContainer.appendChild(categoryRemove);

            categoryItem.appendChild(svgButtonContainer);

            // Add click event listener to the edit button
            categoryEdit.addEventListener('click', () => modal.category('edit', newCategory));
        }
        categoryListContainer?.appendChild(categoryItem);
        categoriesList.push(newCategory);

        // triggers click event on the new category
        if(newCategory && categoryIndex > 2){
            categoryItem.click();
        }

        updateCategories();
    }

    function removeCategory(currentCategory: Category): void {
        // Find the index of the current category in the categoriesList array
        const index = categoriesList.indexOf(currentCategory);

        if (index !== -1) {
            console.log('removed category index: ' + index);

            // Remove the corresponding element from the DOM
            const categoryElement = document.querySelector(`.myCategories[data-category="${index}"]`);
            categoryElement?.remove();

            // Remove the element from the array
            categoriesList.splice(index, 1);

            if (tasks.checkCategoryForTasks(index.toString()) === true) {
                // Remove all tasks associated with the category
                console.log(index.toString())
                tasks.removeAllTasks(index.toString(), true);
            } else {
                // update the other tasks and associated categories
                tasks.updateTasksAfterCategoryRemoval(index.toString())
            }
            
            //Select the first category after removal
            const firstCategoryElement = document.querySelector('.myCategories[data-category="0"]') as HTMLElement;
            if (firstCategoryElement) {
                firstCategoryElement.click();
            }

            updateCategories();
        }
        console.log(categoriesList)
    }


    function updateCategories(): void {
        const categoryElements = document.querySelectorAll('.myCategories');

        categoryElements.forEach((categoryElement, newIndex) => {
            categoryElement.setAttribute('data-category', newIndex.toString());

            // update data-remove attribute of the remove button
            const removeButton = categoryElement.querySelector('.svgButton[data-remove]');
            if (removeButton) {
                removeButton.setAttribute('data-remove', newIndex.toString());
            }
        });
    }

    function editCategory(category: Category, newCategoryName: string, newCategoryColor: string): void {
        console.log(categoriesList)

        // find the categoryItem using the unique identifier (data-category)
        const dataIndex = categoriesList.indexOf(category);

        if (newCategoryName !== null && newCategoryColor !== null && dataIndex !== -1) {
            // update the category with the new information
            category.name = newCategoryName;
            category.color = newCategoryColor;

            // update the UI with the modified category information
            const categoryItem = document.querySelector(`.myCategories[data-category="${dataIndex}"]`) as HTMLElement;
            
            if (categoryItem) {
                const categoryName = categoryItem.querySelector('span');
                categoryName!.textContent = newCategoryName;
                categoryItem.style.backgroundColor = newCategoryColor;
                // update the screen
                categoryItem.click();
            }
        }
        
    }
    
    function retrieveCategoriesList(): Category[] {
        return categoriesList;
    }

    return {
        createCategory,
        removeCategory,
        updateCategories,
        editCategory,
        retrieveCategoriesList
    };
})();
