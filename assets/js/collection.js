import { genererGallery } from './gallery.js';

let result = await genererBtnFilter();

export async function callApiCategories(){

    let categories = null;
    let categoriesJson = window.localStorage.getItem('categories');
 
    if (categoriesJson === null) {

         try{

            const reponse = await fetch('http://localhost:5678/api/categories', {
                 method: "GET",
                 headers: { "Content-Type": "application/json" }
            });
            categories = await reponse.json();

            // Transformation des identifiants en JSON
            categoriesJson = JSON.stringify(categories);
            
            window.localStorage.setItem("categorie", categoriesJson);

         }catch(err){
           
             console.log("ERROR : " + err.message)

         }

    } else {
        categories = JSON.parse(categoriesJson);
    }

    // genererBtnFilter(categories);
    return categories;

}

async function genererBtnFilter() {

    const collection =  await callApiCategories();
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiltre = document.querySelector(".filtre");
    sectionFiltre.innerHTML="";

    createBtnDom(0,"Tous");

    for (let i = 0; i < collection.length; i++) {

        const btnFilter = collection[i];

        createBtnDom(btnFilter.id,btnFilter.name)
    }

    return true;

}

function createBtnDom(id,name){

    const sectionFiltre = document.querySelector(".filtre");
    const divElement = document.createElement("div");
    divElement.dataset.id = id;
    
    divElement.addEventListener("click",function() {genererGallery(id);});

    const txtElement = document.createElement("p");
    txtElement.innerText = name;
    divElement.classList.add('filtre-btn');

    sectionFiltre.appendChild(divElement);
    divElement.appendChild(txtElement);

}