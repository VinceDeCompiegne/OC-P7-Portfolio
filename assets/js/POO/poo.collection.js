"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class FilterManager {
    constructor() {
        this.categories = [];
        this.selectedCategoryId = 0; // Par défaut, "Tous" est sélectionné
        this.add = 'oc-p8-kasa.vincent-deramaux-portfolio.fr';
        this.onSelectedCategoryChange = null;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.categories = yield this.callApiCategories();
            this.renderFilterButtons();
        });
    }
    callApiCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            // Le code de récupération des catégories reste inchangé
            let categories = null;
            let categoriesJson = window.localStorage.getItem('categories');
            if (categoriesJson === null) {
                try {
                    const response = yield fetch(`https://${this.add}/api/categories`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok) {
                        categories = yield response.json();
                        // Transformation des identifiants en JSON
                        categoriesJson = JSON.stringify(categories);
                        window.localStorage.setItem("categorie", categoriesJson);
                    }
                    else {
                        throw new Error('Erreur réseau : ' + response.statusText);
                    }
                }
                catch (err) {
                    throw new Error("ERROR : " + err.message);
                }
            }
            else {
                categories = JSON.parse(categoriesJson);
            }
            // genererBtnFilter(categories);
            return categories;
        });
    }
    renderFilterButtons() {
        const sectionFiltre = document.querySelector(".filtre");
        if (sectionFiltre !== null) {
            sectionFiltre.innerHTML = "";
        }
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
        divElement.dataset.id = String(id);
        divElement.addEventListener("click", () => {
            this.handleButtonClick(id);
        });
        const txtElement = document.createElement("p");
        txtElement.innerText = name;
        divElement.classList.add('filtre-btn');
        if (sectionFiltre !== null) {
            sectionFiltre.appendChild(divElement);
            divElement.appendChild(txtElement);
        }
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
            }
            else {
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
