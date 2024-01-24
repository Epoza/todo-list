import './style.css';

export const categories = (() => {
    let categoriesList: Category[] = [];

    class Category {
        constructor(public name: string, public color: string) {
            this.name = name;
            this.color = color;
        }
    }

    // Default category
    createCategory('Other', '#ec7e7e');

    function createCategory(name: string, color: string): void {
        const newCategory = new Category(name, color);
        const categoryListContainer = document.getElementById('categoryContainer');

        // create new HTML structure
        const categoryIndex = categoriesList.length;
        const categoryItem = document.createElement('div');
        categoryItem.classList.add("myCategories");
        categoryItem.style.backgroundColor = `${color}`
        categoryItem.setAttribute('data-category', categoryIndex.toString());

        // display the category name
        const categoryName = document.createElement('span');
        categoryName.textContent = newCategory.name;
        categoryItem.appendChild(categoryName);

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

        categoryListContainer?.appendChild(categoryItem);
        categoriesList.push(newCategory);
        console.log(categoriesList);
        updateCategories();

        // Add click event listener to the edit button
        categoryEdit.addEventListener('click', () => editCategory(newCategory, categoryItem));
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

    function editCategory(category: Category, categoryItem: HTMLElement): void {
        // display prompt for user, (change to modal later)
        const newName = prompt('Enter the new name:', category.name);
        const newColor = prompt('Enter the new color (hex code or color name):', category.color);

        // update the category with the new information
        if (newName !== null && newColor !== null) {
            category.name = newName;
            category.color = newColor;

            // update the UI with the modified category information
            const categoryName = categoryItem.querySelector('span');
            categoryName!.textContent = newName;
            categoryItem.style.backgroundColor = newColor;
        }
    }

    return {
        createCategory,
        removeCategory,
        updateCategories,
        editCategory
    };
})();
