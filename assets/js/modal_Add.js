import { callApiCategories } from './collection.js';

const modalDel = document.getElementById("myModal");
// Get the modal
const modalAdd = document.getElementById("myModalAdd");

// Get the button that opens the modal
const btn = document.getElementsByClassName("modal-btnAjouter")[0];
// Get the <span> element that closes the modal
const arrowRetour = document.getElementsByClassName("modalAdd-arrow")[0];

const modalMySelect = document.getElementById("mySelect");

// When the user clicks the button, open the modal 
btn.onclick = async function () {
    modalDel.style.display = "none";
    let result = await genererOptionMySelect()
    modalAdd.style.display = "block";
  };
  
  // When the user clicks on <span> (x), close the modal
  arrowRetour.onclick = function() {
    modalAdd.style.display = "none";
    modalDel.style.display = "block";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modalAdd) {
        modalAdd.style.display = "none";
    }
  }


  async function genererOptionMySelect() {

    const collection =  await callApiCategories();
    // Récupération de l'élément du DOM qui accueillera les fiches
    // const sectionFiltre = document.querySelector(".filtre");
    modalMySelect.innerHTML="";

    for (let i = 0; i < collection.length; i++) {

        const optSelect = collection[i];

        createOptSelect(optSelect.id,optSelect.name)
    }

    return true;

}

function createOptSelect(id,name){

    
    const optElement = document.createElement("option");
    optElement.value = id;
    optElement.textContent = name;
    
    // divElement.addEventListener("click",function() {genererGallery(id);});

    // const txtElement = document.createElement("p");
    // txtElement.innerText = name;
    // divElement.classList.add('filtre-btn');

    modalMySelect.appendChild(optElement);
    // divElement.appendChild(txtElement);

}