class FilterManager {

    constructor() {
        this.categories = null;
        this.selectedCategoryId = 0; // Par défaut, "Tous" est sélectionné
        this.add = 'localhost:5678';
    }

    async initialize() {
        this.categories = await this.callApiCategories();
        this.renderFilterButtons();
    }

    async callApiCategories() {
        // Le code de récupération des catégories reste inchangé
        let categories = null;
        let categoriesJson = window.localStorage.getItem('categories');

        if (categoriesJson === null) {

            try {

                const response = await fetch(`http://${this.add}/api/categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {

                    categories = await response.json();

                    // Transformation des identifiants en JSON
                    categoriesJson = JSON.stringify(categories);

                    window.localStorage.setItem("categorie", categoriesJson);

                } else {

                    throw new Error('Erreur réseau : ' + response.statusText);

                }

            } catch (err) {

                throw new Error("ERROR : " + err.message);

            }

        } else {
            categories = JSON.parse(categoriesJson);
        }

        // genererBtnFilter(categories);
        return categories;

    }

    renderFilterButtons() {
        const sectionFiltre = document.querySelector(".filtre");
        sectionFiltre.innerHTML = "";

        this.createButton(0, "Tous");

        for (let i = 0; i < this.categories.length; i++) {
            const category = this.categories[i];
            this.createButton(category.id, category.name);
        }

        this.selectButton(this.selectedCategoryId);
    }

    createButton(id, name) {
        const sectionFiltre = document.querySelector(".filtre");
        const divElement = document.createElement("div");
        divElement.dataset.id = id;

        divElement.addEventListener("click", () => {
            this.handleButtonClick(id);
        });

        const txtElement = document.createElement("p");
        txtElement.innerText = name;
        divElement.classList.add('filtre-btn');

        sectionFiltre.appendChild(divElement);
        divElement.appendChild(txtElement);
    }

    handleButtonClick(id) {
        this.selectButton(id);
        return id; // Retourne la valeur id
    }

    selectButton(id) {
        let btn = document.querySelectorAll(".filtre-btn");
        btn.forEach((button, index) => {
            if (index === id) {
                button.classList.add("selected");
            } else {
                button.classList.remove("selected");
            }
        });
        if (typeof this.onSelectedCategoryChange === 'function') {
            if (this.selectedCategoryId !== id) {
                this.onSelectedCategoryChange(id); // Appeler la fonction de gestion d'événements
            }
        }
        this.selectedCategoryId = id;
    }

    // Ajouter un getter pour id
    get selectedId() {
        console.log("ID depuis FilterManager:", this.selectedCategoryId);
        return this.selectedCategoryId;
    }
}

// Usage
const filterManager = new FilterManager();
filterManager.initialize();