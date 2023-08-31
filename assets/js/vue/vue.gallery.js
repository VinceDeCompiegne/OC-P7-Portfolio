import {genererGallery} from "../controler/ctrl.gallery.js";

export async function genererGalleryDom(id = 0){

    const galleryFilter = await genererGallery(id);

    const jeton = window.localStorage.getItem('token');

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(`.gallery`);
    sectionFiches.innerHTML="";

    for (let i = 0; i < galleryFilter.length; i++) {

        const tableau = galleryFilter[i];
        
        // Création d’une balise dédiée à une pièce automobile
        const tableauElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = tableau.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = (jeton === null)?tableau.title:"Editer";

        tableauElement.appendChild(imageElement);
        tableauElement.appendChild(nomElement);
        sectionFiches.appendChild(tableauElement);

    }
}