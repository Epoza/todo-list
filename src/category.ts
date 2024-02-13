import './style.css';
import { modal } from './modal';
import { Task, tasks } from './task';

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
        { className: 'svgAll', iconSrc: '../images/all.svg', alt: 'all category icon' },
        { className: 'svgToday', iconSrc: '../images/today.svg', alt: 'today category icon' },
        { className: 'svgImportant', iconSrc: '../images/important.svg', alt: 'important category icon' },
    ];

    // Default categories
    createCategory('All', '#eaeaea', true);
    createCategory('Today', '#ffe6e2', true);
    createCategory('Important', '#fffeea', true);
    createCategory('Test', 'white', false)
    createCategory('Four', 'white', false)
    createCategory('Five', 'white', false)
    

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
            const { className, iconSrc, alt } = defaultCategoryMappings[categoryIndex];
            
            // insert the default category svg
            categoryItem.classList.add('defaultCategory')
            const categoryDefaultSvg = document.createElement('div');
            categoryDefaultSvg.classList.add(className);
            const defaultIcon = document.createElement('img');
            defaultIcon.src = iconSrc;
            defaultIcon.alt = alt;
            categoryDefaultSvg.appendChild(defaultIcon);
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
                removeCategory(event);
            });
            svgButtonContainer.appendChild(categoryRemove);

            categoryItem.appendChild(svgButtonContainer);

            // Add click event listener to the edit button
            categoryEdit.addEventListener('click', () => modal.category('edit', newCategory));
        }
        categoryListContainer?.appendChild(categoryItem);
        categoriesList.push(newCategory);
        updateCategories();
    }

    function removeCategory(event: Event): void {
        const target = event.target as HTMLElement;
        const categoryRemoveButton = target.closest('.svgButton[data-remove]');
        //const allCategory = document.querySelector(`[data-category="0"]`);

        if (categoryRemoveButton) {
            const dataIndex = categoryRemoveButton.getAttribute('data-remove');
            

            if (dataIndex !== null) {
                const index = parseInt(dataIndex, 10);
                console.log('removed category index' + index)

                // remove the corresponding element from the DOM
                const categoryElement = document.querySelector(`.myCategories[data-category="${index}"]`);
                categoryElement?.remove();

                // remove the element from the array
                categoriesList.splice(index, 1);

                if(tasks.checkCategoryForTasks(dataIndex) === true){
                    // put modal here and call it
                    // remove all tasks associated with the category
                    tasks.removeAllTasks(dataIndex, true);
                }

                updateCategories();
            }
        }
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
