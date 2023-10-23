
class ModalManager {

  modalDelete: HTMLElement|null;
  modalAdd: HTMLElement|null;
  modalForm : HTMLElement|null;
  modalMyFile: any|null;
  modalMyPhotoAff: any;
  modalAddPhotoSelect: HTMLElement|null;
  modalMyCaptionPhotoAff: HTMLElement|null;
  modalMySelect: HTMLElement|null;
  btn: HTMLElement|null;
  arrowRetour: HTMLElement|null;
  modalDel: HTMLElement|null;
  modalAddPhoto: HTMLElement|null;
  btnEdition: HTMLElement|null;
  span: HTMLElement|null;
  closeAdd: HTMLElement|null;
  add: string;

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
    this.add = 'oc-p8-kasa.vincent-deramaux-portfolio.fr';
  }

  initialize() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.modalMyFile?.addEventListener("change", () => this.modalAddPhotoSelected());
    this.modalMyPhotoAff?.addEventListener("click", () => this.resetModalAdd());
    this.btn?.addEventListener("click", async () => await this.modalAddOpen());
    if (this.arrowRetour !== null){
      this.arrowRetour.onclick = () => this.modalAddClose();
    }
    this.modalForm?.addEventListener("submit", async (event :any) => {
      event.preventDefault();
      try {
        const response = await this.callApiAdd(this.modalMyFile.files[0], event.target[1].value, event.target[2].value);
        if (await response.json()) {
          localStorage.removeItem("gallery");
          await this.genererGalleryDom();
          await this.genererGalleryModal();
          this.modalAddClose();
        }
      } catch (err :any) {
        throw new Error("ERROR : " + err.message);
      }
    });
    if (this.btnEdition !== null){
          this.btnEdition.onclick = () => {
          this.genererGalleryModal();
          if(this.modalDel !== null){
            this.modalDel.style.display = "block";
          }
          
        };
    }

    if(this.span !== null){
      this.span.onclick = () => {
        this.genererGalleryDom();
        if(this.modalDel !== null){
          this.modalDel.style.display = "none";
        }
        if(this.modalAddPhoto !== null){
          this.modalAddPhoto.style.display = "none";
        }
      };
    }

    if(this.closeAdd !== null){
      this.closeAdd.onclick = () => {
        this.genererGalleryDom();
        if(this.modalDel !== null){
          this.modalDel.style.display = "none";
        }
        if(this.modalAddPhoto !== null){
          this.modalAddPhoto.style.display = "none";
        }
      };
    }

    
    window.onclick = (event) => {
      if (event.target == this.modalDel || event.target == this.modalAddPhoto) {
        this.genererGalleryDom();
        if(this.modalDel !== null){
          this.modalDel.style.display = "none";
        }
        if(this.modalAddPhoto !== null){
          this.modalAddPhoto.style.display = "none";
        }
      }
    };

  }

  async callApiAdd(file : any, title : string, category : number) {
    const data = new FormData();
    data.append('image', file);
    data.append('title', title);
    data.append('category', String(category));

    try {

      let json : string|null = localStorage.getItem("token");
      const token = (json!==null)?JSON.parse(json):"";

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
    } catch (err : any) {
      throw new Error("Error : " + err.message);
    }
  }

  createOptSelect(id : number, name : string) {
    const optElement = document.createElement("option");
    if(optElement !== null){
      optElement.value = String(id);
      optElement.textContent = name;
    }
    if(this.modalMySelect !== null){
          this.modalMySelect.appendChild(optElement);
    } 
  }

  callApiCategories() {
    let categoriesJson : string|null = window.localStorage.getItem('categorie');
    return (categoriesJson !== null)?JSON.parse(categoriesJson):"";
  }

  genererOptionMySelect() {
    try {
      const collection = this.callApiCategories();
      const modalMySelect = this.modalMySelect;
      if(modalMySelect !== null){
        modalMySelect.innerHTML = "";
      }
      
      for (let i = 0; i < collection.length; i++) {
        const optSelect = collection[i];
        this.createOptSelect(optSelect.id, optSelect.name);
      }

      return true;
    } catch (err : any) {
      throw new Error("Erreur lors de la génération des options : " + err.message);
    }
  }

  modalAddPhotoSelected() {
    if(this.modalMyPhotoAff !== null){
      this.modalMyPhotoAff.src = `./assets/images/${this.modalMyFile.files[0].name}`;
    }
    if(this.modalAddPhotoSelect !== null){
      this.modalAddPhotoSelect.style.opacity = "0";
    }
    if(this.modalAddPhotoSelect !== null){
      this.modalAddPhotoSelect.style.zIndex = "-1";
    }
    if(this.modalMyCaptionPhotoAff !== null){
      this.modalMyCaptionPhotoAff.style.opacity = "1";
    }
    if(this.modalMyCaptionPhotoAff !== null){
      this.modalMyCaptionPhotoAff.style.zIndex = "1";
    }
  }

  async modalAddOpen() {
    if(this.modalDelete !== null){
        this.modalDelete.style.display = "none";
    }
    this.resetModalAdd();
    if(this.modalAdd !== null){
        this.modalAdd.style.display = "block";
    }
  }

  modalAddClose() {
    if(this.modalAdd !== null){
      this.modalAdd.style.display = "none";
    }
    if(this.modalDelete !== null){
      this.modalDelete.style.display = "block";
    }
  }

  resetModalAdd() {
    this.modalMyPhotoAff.src = "";
    if(this.modalAddPhotoSelect !== null){
      this.modalAddPhotoSelect.style.opacity = "1";
      this.modalAddPhotoSelect.style.zIndex = "1";
    }
    if(this.modalMyCaptionPhotoAff !== null){
      this.modalMyCaptionPhotoAff.style.opacity = "0";
      this.modalMyCaptionPhotoAff.style.zIndex = "-1";
    }
    // if(this.modalForm !== null){
    //   this.modalForm.reset();
    // }
    
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
      } catch (err : any) {
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
      if(sectionFiches !== null){
        sectionFiches.innerHTML = "";
      }
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
        if(sectionFiches !== null){
          sectionFiches.appendChild(tableauElement);
        }
      }
      let deleted = await this.modalDeltrachCall();
    } catch (err : any) {
      throw new Error("error : " + err.message);
    }
  }

  async modalDeltrachCall() {
    let btnTrash = document.querySelectorAll(".fa-trash");
    btnTrash.forEach((trash) => trash.addEventListener("click", async (event : any) => {
      let json = localStorage.getItem("token");
      let token = (json!==null)?JSON.parse(json):"";
      try {
        const valid = await this.callApiSupp(event.target.dataset.id, token.token);
        if (valid.ok) {
          localStorage.removeItem("gallery");
          await this.genererGalleryModal();
          await this.genererGalleryDom();
        }
      } catch (err : any) {
        throw new Error("Error : " + err.message);
      }
    }));
  }

  async callApiSupp(num : number , token : string) {
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
    } catch (err : any) {
      throw new Error("Error : " + err.message);
    }
  }
}

// Usage
const modalManager = new ModalManager();
modalManager.initialize();
