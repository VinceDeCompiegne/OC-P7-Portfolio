import {
    modalFilterGalery,
    modalDeltrachCall
} from "../controler/ctrl.modal.del.js"

export async function genererGalleryModal(category = 0) {
    try {
        const sectionFiches = document.querySelector(`#modal-gallery`);
        sectionFiches.innerHTML = "";

        const galleryFilter = await modalFilterGalery(category);

        for (let i = 0; i < galleryFilter.length; i++) {

            const tableau = galleryFilter[i];

            // Création d’une balise dédiée à une pièce automobile
            const tableauElement = document.createElement("figure");
            tableauElement.classList.add("figure");
            const divElement = document.createElement("div");
            const spanElement = document.createElement("span");
            const croixElement = document.createElement("i");
            croixElement.classList.add("fa-solid");
            croixElement.classList.add("fa-arrows-up-down-left-right");
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
            spanElement.appendChild(croixElement);
            spanElement.appendChild(poubelleElement);
            tableauElement.appendChild(imageElement);
            tableauElement.appendChild(nomElement);
            sectionFiches.appendChild(tableauElement);

        }

        let deleted = await modalDeltrachCall();

    } catch (err) {

        throw new Error("error : " + err.message);

    }

}