class ModalManager {
  constructor() {
    this.modalDelete = document.getElementById("myModal");
    this.modalAdd = document.getElementById("myModalAdd");
    this.modalForm = document.getElementById("formAdd");
    this.modalMyFile = document.getElementById("myFile");
    this.modalMyPhotoAff = document.getElementById("modalAdd-img-aff");
    this.modalAddPhotoSelect = document.querySelector(".modalAdd-cadre-image-select");
    this.modalMyCaptionPhotoAff = document.querySelector(".modalAdd-cadre-image-aff");
    this.modalMySelect = document.getElementById("mySelect");
    this.btn = document.querySelector(".modal-btnAjouter");
    this.arrowRetour = document.querySelector(".modalAdd-arrow");
    this.modalDel = document.getElementById("myModal");
    this.modalAddPhoto = document.getElementById("myModalAdd");
    this.btnEdition = document.querySelector(".edition-boutton");
    this.span = document.querySelector(".close");
    this.closeAdd = document.querySelector(".close-add");
    this.add = 'localhost:5678';
  }

  initialize() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.modalMyFile.addEventListener("change", () => this.modalAddPhotoSelected());
    this.modalMyPhotoAff.addEventListener("click", () => this.resetModalAdd());
    this.btn.addEventListener("click", async () => await this.modalAddOpen());
    this.arrowRetour.onclick = () => this.modalAddClose();
    this.modalForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        const response = await this.callApiAdd(this.modalMyFile.files[0], event.target[1].value, event.target[2].value);
        if (await response.json()) {
          localStorage.removeItem("gallery");
          let result = await this.genererGalleryDom();
          result = await this.genererGalleryModal();
          this.modalAddClose();
        }
      } catch (err) {
        throw new Error("ERROR : " + err.message);
      }
    });

    this.btnEdition.onclick = () => {
      this.genererGalleryModal();
      this.modalDel.style.display = "block";
    };

    this.span.onclick = () => {
      this.genererGalleryDom();
      this.modalDel.style.display = "none";
      this.modalAddPhoto.style.display = "none";
    };

    this.closeAdd.onclick = () => {
      this.genererGalleryDom();
      this.modalDel.style.display = "none";
      this.modalAddPhoto.style.display = "none";
    };
    
    window.onclick = (event) => {
      if (event.target == this.modalDel || event.target == this.modalAddPhoto) {
        this.genererGalleryDom();
        this.modalDel.style.display = "none";
        this.modalAddPhoto.style.display = "none";
      }
    };

  }

  async callApiAdd(file, title, category) {
    const data = new FormData();
    data.append('image', file);
    data.append('title', title);
    data.append('category', category);

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`http://${this.add}/api/works`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token.token}`,
        },
        body: data,
      });

      if (response.ok) {
        return await response;
      } else {
        throw new Error('Erreur réseau : ' + response.statusText);
      }
    } catch (err) {
      throw new Error("Error : " + err.message);
    }
  }

  createOptSelect(id, name) {
    const optElement = document.createElement("option");
    optElement.value = id;
    optElement.textContent = name;
    this.modalMySelect.appendChild(optElement);
  }

  callApiCategories() {
    let categoriesJson = window.localStorage.getItem('categorie');
    return JSON.parse(categoriesJson);
  }

  genererOptionMySelect() {
    try {
      const collection = this.callApiCategories();
      const modalMySelect = this.modalMySelect;
      modalMySelect.innerHTML = "";

      for (let i = 0; i < collection.length; i++) {
        const optSelect = collection[i];
        this.createOptSelect(optSelect.id, optSelect.name);
      }

      return true;
    } catch (err) {
      throw new Error("Erreur lors de la génération des options : " + err.message);
    }
  }

  modalAddPhotoSelected() {
    this.modalMyPhotoAff.src = `./assets/images/${this.modalMyFile.files[0].name}`;
    this.modalAddPhotoSelect.style.opacity = 0;
    this.modalAddPhotoSelect.style.zIndex = -1;
    this.modalMyCaptionPhotoAff.style.opacity = 1;
    this.modalMyCaptionPhotoAff.style.zIndex = 1;
  }

  async modalAddOpen() {
    this.modalDelete.style.display = "none";
    this.resetModalAdd();
    this.modalAdd.style.display = "block";
  }

  modalAddClose() {
    this.modalAdd.style.display = "none";
    this.modalDelete.style.display = "block";
  }

  resetModalAdd() {
    this.modalMyPhotoAff.src = "";
    this.modalAddPhotoSelect.style.opacity = 1;
    this.modalAddPhotoSelect.style.zIndex = 1;
    this.modalMyCaptionPhotoAff.style.opacity = 0;
    this.modalMyCaptionPhotoAff.style.zIndex = -1;
    this.modalForm.reset();
    this.genererOptionMySelect();
  }

  async genererGallery() {

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

          // Transformation des identifiants en JSON
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
  }

  async genererGalleryDom() {
    const galleryFilter = await this.genererGallery();
    const jeton = window.localStorage.getItem('token');
    const sectionFiches = document.querySelector(`.gallery`);

    if (sectionFiches !== null) {
      sectionFiches.innerHTML = "";
    } else {
      return 0;
    }

    for (let i = 0; i < galleryFilter.length; i++) {
      const tableau = galleryFilter[i];
      const tableauElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      imageElement.src = tableau.imageUrl;
      const nomElement = document.createElement("figcaption");
      nomElement.innerText = tableau.title;
      tableauElement.appendChild(imageElement);
      tableauElement.appendChild(nomElement);
      sectionFiches.appendChild(tableauElement);
    }
  }

  async genererGalleryModal() {
    try {
      const sectionFiches = document.querySelector(`#modal-gallery`);
      sectionFiches.innerHTML = "";
      const galleryFilter = await this.genererGallery();
      for (let i = 0; i < galleryFilter.length; i++) {
        const tableau = galleryFilter[i];
        const tableauElement = document.createElement("figure");
        tableauElement.classList.add("figure");
        const divElement = document.createElement("div");
        const spanElement = document.createElement("span");
        // const croixElement = document.createElement("i");
        // croixElement.classList.add("fa-solid");
        // croixElement.classList.add("fa-arrows-up-down-left-right");
        const poubelleElement = document.createElement("i");
        poubelleElement.classList.add("fa-solid");
        poubelleElement.classList.add("fa-trash");
        poubelleElement.dataset.id = tableau.id;
        poubelleElement.ariaHidden = "true";
        const imageElement = document.createElement("img");
        imageElement.src = tableau.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = "éditer";
        tableauElement.appendChild(divElement);
        divElement.appendChild(spanElement);
        // spanElement.appendChild(croixElement);
        spanElement.appendChild(poubelleElement);
        tableauElement.appendChild(imageElement);
        tableauElement.appendChild(nomElement);
        sectionFiches.appendChild(tableauElement);
      }
      let deleted = await this.modalDeltrachCall();
    } catch (err) {
      throw new Error("error : " + err.message);
    }
  }

  async modalDeltrachCall() {
    let btnTrash = document.querySelectorAll(".fa-trash");
    btnTrash.forEach(trash => trash.addEventListener("click", async (event) => {
      let token = JSON.parse(localStorage.getItem("token"));
      try {
        const valid = await this.callApiSupp(trash.dataset.id, token.token);
        if (valid.ok) {
          localStorage.removeItem("gallery");
          let result = await this.genererGalleryModal();
          result = await this.genererGalleryDom();
        }
      } catch (err) {
        throw new Error("Error : " + err.message);
      }
    }));
  }

  async callApiSupp(num, token) {
    try {
      const response = await fetch(`http://${this.add}/api/works/${num}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const valid = await response;
        return valid;
      } else {
        throw new Error('Erreur réseau : ' + response.statusText);
      }
    } catch (err) {
      throw new Error("Error : " + err.message);
    }
  }
}

// Usage
const modalManager = new ModalManager();
modalManager.initialize();