import './style.css'

export const categories = (() => {
    let categoriesList: Category[] = [];
    let categoryNum = 0;

    class Category {
        constructor(public name: string) {
            this.name = name;
        }
    }

    function createCategory(name: string): void {
        console.log('createCategory');
        const newCategory = new Category(name);
        const categoryListContainer = document.getElementById('categoryContainer');
        // makes new HTML structure
        const categoryItem = document.createElement('div');
        categoryItem.classList.add("myCategories");
        categoryItem.setAttribute('data-category', categoryNum.toString());
        // displays the category name
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
        svgButtonContainer.appendChild(categoryEdit)
        // remove svg button
        const categoryRemove = document.createElement('div');
        categoryRemove.classList.add('svgButton');
        const removeIcon = document.createElement('img');
        removeIcon.src = "../images/remove.svg"
        removeIcon.alt = 'remove category icon';
        categoryRemove.appendChild(removeIcon);
        svgButtonContainer.appendChild(categoryRemove)

        categoryItem.appendChild(svgButtonContainer);

        categoryListContainer?.appendChild(categoryItem);
        categoriesList.push(newCategory);
        categoryNum++;
    }

    function removeCategory(name: string): void {
        // work on this next
        categoriesList = categoriesList.filter(category => category.name !== name);
    }

    function editCategories(): Category[] {
        return categoriesList;
    }

    return {
        createCategory,
        removeCategory,
        editCategories
    };
})();


