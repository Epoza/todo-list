import './style.css';
import { modal } from './modal';

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
            svgButtonContainer.appendChild(categoryRemove);

            categoryItem.appendChild(svgButtonContainer);

            // Add click event listener to the edit button
            categoryEdit.addEventListener('click', () => modal('category', newCategory));
        }

        

        categoryListContainer?.appendChild(categoryItem);
        categoriesList.push(newCategory);
        console.log(categoriesList);
        updateCategories();


    }

    function removeCategory(event: Event): void {
        const target = event.target as HTMLElement;
        const categoryRemoveButton = target.closest('.svgButton[data-remove]');

        if (categoryRemoveButton) {
            const dataIndex = categoryRemoveButton.getAttribute('data-remove');

            if (dataIndex !== null) {
                const index = parseInt(dataIndex, 10);

                // remove the corresponding element from the DOM
                const categoryElement = document.querySelector(`.myCategories[data-category="${index}"]`);
                categoryElement?.remove();

                // remove the element from the array
                categoriesList.splice(index, 1);

                updateCategories();
            }
        }
    }

    // Add event listener to categoryContainer for event delegation
    const categoryContainer = document.getElementById('categoryContainer');
    categoryContainer?.addEventListener('click', removeCategory);

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
