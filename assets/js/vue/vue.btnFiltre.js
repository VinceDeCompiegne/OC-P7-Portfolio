import {
    genererGalleryDom
} from "./vue.gallery.js";

export function createBtnDom(id, name) {

    const sectionFiltre = document.querySelector(".filtre");
    const divElement = document.createElement("div");
    divElement.dataset.id = id;


    divElement.addEventListener("click", function (event) {
        BtnFilterClick(id);
        genererGalleryDom(id);
    });

    const txtElement = document.createElement("p");
    txtElement.innerText = name;
    divElement.classList.add('filtre-btn');

    sectionFiltre.appendChild(divElement);
    divElement.appendChild(txtElement);

}

function BtnFilterClick(id) {
    let btn = document.getElementsByClassName("selected");
    for (let i = 0; i < btn.length; i++) {
        btn[i].classList.remove("selected");
    }
    let btnSelected = document.getElementsByClassName('filtre-btn');
    // console.log(btn[id]);
    btnSelected[id].classList.add("selected");
}