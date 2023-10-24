"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class GalleryManager {
    constructor() {
        this.gallery = [];
        this.selectedCategory = 0;
        this.add = 'oc-p7-portfolio.vincent-deramaux-portfolio.fr';
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.gallery = yield this.callApiGallery();
            this.genererGalleryDom();
        });
    }
    callApiGallery() {
        return __awaiter(this, void 0, void 0, function* () {
            let gallery = null;
            let galleryJson = window.localStorage.getItem('gallery');
            if (galleryJson == null) {
                try {
                    const response = yield fetch(`https://${this.add}/api/works`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok) {
                        gallery = yield response.json();
                        galleryJson = JSON.stringify(gallery);
                        window.localStorage.setItem("gallery", galleryJson);
                        return gallery;
                    } else {
                        throw new Error('Erreur réseau : ' + response.statusText);
                    }
                } catch (err) {
                    throw new Error("ERROR : " + err.message);
                }
            }
            return JSON.parse(galleryJson);
        });
    }
    genererGallery(category = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let galleryFilter = null;
            if (category == 0) {
                galleryFilter = this.gallery;
            } else {
                galleryFilter = this.gallery.filter((item) => item.category.id == category);
            }
            return galleryFilter;
        });
    }
    genererGalleryDom(id = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            const galleryFilter = yield this.genererGallery(id);
            const token = window.localStorage.getItem('token');
            const sectionFiches = document.querySelector(`.gallery`);
            if (sectionFiches !== null) {
                sectionFiches.innerHTML = "";
            } else {
                return 0;
            }
            for (let i = 0; i < galleryFilter.length; i++) {
                const item = galleryFilter[i];
                const tableauElement = document.createElement("figure");
                const divElement = document.createElement("div");
                const imageElement = document.createElement("img");
                imageElement.src = item.imageUrl;
                const nomElement = document.createElement("figcaption");
                // if (token === null) {
                nomElement.innerText = item.title;
                // } else {
                //     nomElement.innerText = "Editer";
                // }
                divElement.appendChild(imageElement);
                divElement.appendChild(nomElement);
                tableauElement.appendChild(divElement);
                sectionFiches.appendChild(tableauElement);
            }
        });
    }
}
// Usage
const galleryManager = new GalleryManager();
galleryManager.initialize();
filterManager.onSelectedCategoryChange = (newCategoryId) => {
    galleryManager.genererGalleryDom(newCategoryId);
};