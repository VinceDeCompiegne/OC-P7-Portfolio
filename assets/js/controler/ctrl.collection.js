import {
    callApiCategories
} from "../module/mdl.api.js";
import {
    createBtnDom
} from "../vue/vue.btnFiltre.js";

let result = await genererBtnFilter();

async function genererBtnFilter() {


    const collection = await callApiCategories();
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiltre = document.querySelector(".filtre");
    sectionFiltre.innerHTML = "";

    createBtnDom(0, "Tous");

    for (let i = 0; i < collection.length; i++) {

        const btnFilter = collection[i];

        createBtnDom(btnFilter.id, btnFilter.name)
    }

    return true;

}