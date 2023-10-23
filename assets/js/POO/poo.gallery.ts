type Gallerie = {
    id: number,
    title: string,
    imageUrl: string,
    categoryId: number,
    userId: number,
    category: {
      id: number,
      name: string
    }
  }

class GalleryManager {

    gallery : Gallerie[];
    selectedCategory : number;
    add : string;

    constructor() {
        this.gallery = [];
        this.selectedCategory = 0;
        this.add = 'localhost:5678';
    }

    async initialize() {
        this.gallery = await this.callApiGallery();
        this.genererGalleryDom();
    }

    async callApiGallery() {
        let gallery = null;
        let galleryJson = window.localStorage.getItem('gallery');

        if (galleryJson == null) {
            try {
                const response = await fetch(`http://${this.add}/api/works`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    gallery = await response.json();
                    galleryJson = JSON.stringify(gallery);
                    window.localStorage.setItem("gallery", galleryJson);
                    return gallery;
                } else {
                    throw new Error('Erreur réseau : ' + response.statusText);
                }
            } catch (err : any) {
                throw new Error("ERROR : " + err.message);
            }
        }

        return JSON.parse(galleryJson);
    }

    async genererGallery(category = 0) {
        let galleryFilter = null;

        if (category == 0) {
            galleryFilter = this.gallery;
        } else {
            galleryFilter = this.gallery.filter((item) => item.category.id == category);
        }

        return galleryFilter;
    }

    async genererGalleryDom(id = 0) {
        const galleryFilter = await this.genererGallery(id);
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
            const imageElement = document.createElement("img");
            imageElement.src = item.imageUrl;
            const nomElement = document.createElement("figcaption");

            // if (token === null) {
            nomElement.innerText = item.title;
            // } else {
            //     nomElement.innerText = "Editer";
            // }

            tableauElement.appendChild(imageElement);
            tableauElement.appendChild(nomElement);
            sectionFiches.appendChild(tableauElement);
        }
    }
}

// Usage
const galleryManager = new GalleryManager();
galleryManager.initialize();

filterManager.onSelectedCategoryChange = (newCategoryId : number) => {
    galleryManager.genererGalleryDom(newCategoryId);
};

