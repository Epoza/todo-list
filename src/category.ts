import './style.css';
import { modal } from './modal';
import { tasks } from './task';

export class Category {
    name: string;
    color: string;
    defaultCategory?: boolean;
    constructor(name: string, color: string, defaultCategory?: boolean) {
        this.name = name;
        this.color = color;
        this.defaultCategory = defaultCategory;
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

    // Check if categoriesList exists in localStorage and retrieve it
    const storedCategories = localStorage.getItem('categoriesList');
    if (storedCategories) {
        retrieveCategoriesList();        
    } else {
        // If categoriesList doesn't exist in localStorage, create default categories
        addDefaultCategories()
    }
    
    // Function to add default categories
    function addDefaultCategories(): void {
        addCategoryToList('All', '#eaeaea', true);
        addCategoryToList('Today', '#ffe6e2', true);
        addCategoryToList('Important', '#fffeea', true);
    }

    function addCategoryToList(name: string, color: string, defaultCategory = false): void {
        // add the new category to the list
        const newCategory = new Category(name, color, defaultCategory);
        categoriesList.push(newCategory);
        createCategory(newCategory);
        saveCategoriesList();
    }

    function createCategory(currentCategory: Category): void {
        console.log(currentCategory)
        const categoryListContainer = document.getElementById('categoryContainer');

        // create new HTML structure
        const categoryIndex = categoriesList.length;
        const categoryItem = document.createElement('div');
        categoryItem.classList.add("myCategories");
        categoryItem.style.backgroundColor = `${currentCategory.color}`
        categoryItem.setAttribute('data-category', categoryIndex.toString());
        
        // check for default category
        if (currentCategory.defaultCategory) {
            insertDefaultCategorySvgs(categoryIndex, categoryItem);

            // set the first category to the selected category
            const firstCategoryItem = document.querySelector('.myCategories[data-category="0"]') as HTMLElement;
            if(firstCategoryItem){
                firstCategoryItem.classList.add('categorySelected');
                firstCategoryItem.click();
            }
             
        }

        // display the category name
        const categoryName = document.createElement('span');
        categoryName.textContent = currentCategory.name;
        categoryItem.appendChild(categoryName);

        if(!currentCategory.defaultCategory){
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
                modal.category('remove', currentCategory)
            });
            svgButtonContainer.appendChild(categoryRemove);

            categoryItem.appendChild(svgButtonContainer);

            // Add click event listener to the edit button
            categoryEdit.addEventListener('click', () => modal.category('edit', currentCategory));
        }
        categoryListContainer?.appendChild(categoryItem);

        // triggers click event on the new category
        if(currentCategory && categoryIndex > 2){
            categoryItem.click();
        }

        updateCategories();
        //saveCategoriesList();
    }

    function insertDefaultCategorySvgs(categoryIndex: number, categoryItem: HTMLElement) {
        // not done yet
        if (categoryIndex < defaultCategoryMappings.length) {
            const { className, svg} = defaultCategoryMappings[categoryIndex];
            
            // insert the default category svg
            categoryItem.classList.add('defaultCategory')
            const categoryDefaultSvg = document.createElement('div');
            categoryDefaultSvg.classList.add(className);
            categoryDefaultSvg.innerHTML = svg;
    
            categoryItem.appendChild(categoryDefaultSvg);
    
            // set the first category to the selected category
            categoryItem.classList.add('categorySelected');
            categoryItem.click();  
        } else {
            console.log("no defaultmapping 4 u");
        }
    }

    function removeCategory(currentCategory: Category): void {
        // Find the index of the current category in the categoriesList array
        const index = categoriesList.indexOf(currentCategory);
        console.log(currentCategory)
        console.log(categoriesList)
        console.log(index)

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
            saveCategoriesList();
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

    function editCategory(currentCategory: Category, newCategoryName: string, newCategoryColor: string): void {
        console.log(categoriesList)

        // find the categoryItem using the unique identifier (data-category)
        const index = categoriesList.indexOf(currentCategory);

        if (newCategoryName !== null && newCategoryColor !== null && index !== -1) {
            // update the category with the new information
            currentCategory.name = newCategoryName;
            currentCategory.color = newCategoryColor;

            // update the UI with the modified category information
            const categoryItem = document.querySelector(`.myCategories[data-category="${index}"]`) as HTMLElement;
            
            if (categoryItem) {
                const categoryName = categoryItem.querySelector('span');
                categoryName!.textContent = newCategoryName;
                categoryItem.style.backgroundColor = newCategoryColor;
                // update the screen
                categoryItem.click();
            }
            saveCategoriesList();
        }
    }
    
    function retrieveCategoriesList(): void {
        // retrieve the categories from localStorage
        const storedCategories = localStorage.getItem('categoriesList');
        if (storedCategories) {
            const storedCategoriesParsed: Category[] = JSON.parse(storedCategories);
            categoriesList = storedCategoriesParsed.map(categoryData => {
                return new Category(categoryData.name, categoryData.color, categoryData.defaultCategory);
            });
            categoriesList.forEach((currentCategory) => {
                createCategory(currentCategory);
            });
        }
    }

    function saveCategoriesList(): void {
        localStorage.setItem('categoriesList', JSON.stringify(categoriesList));
    }

    return {
        addCategoryToList,
        createCategory,
        removeCategory,
        updateCategories,
        editCategory,
    };
})();
