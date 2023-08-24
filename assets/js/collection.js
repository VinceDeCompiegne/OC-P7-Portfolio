import { genererGallery } from './gallery.js';

callApiCategories();

async function callApiCategories(){

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

    genererBtnFilter(categories);

}

function genererBtnFilter(collection) {
  
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiltre = document.querySelector(".filtre");
    sectionFiltre.innerHTML="";

    createBtnDom(0,"Tous")

    for (let i = 0; i < collection.length; i++) {

        const btnFilter = collection[i];

        createBtnDom(btnFilter.id,btnFilter.name)
    }
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