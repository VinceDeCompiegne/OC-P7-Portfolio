import { callApiGallery } from './gallery.js';

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("edition-button-edition")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  genererGalleryModal(0);
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
  span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
document.addEventListener('keydown', (event) => {
  if ( modal.style.display == "block"){
    var name = event.key;
    var code = event.code;
    if ((event.key == "Escape")||(event.key == "Esc")){modal.style.display = "none";}
     if (event.key == "Tab"){event.preventDefault();}
     //Alert the key name and key code on keydown
     //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
  };
}, false);

export function genererGalleryModal(category = 0) {

  callApiGallery();
  let galleryJson = window.localStorage.getItem('gallery');
  let gallery = JSON.parse(galleryJson);

  let galleryFilter = null;

  if (category === 0){
      galleryFilter = gallery;
  }else{
      galleryFilter = gallery.filter((tableau) => tableau.category.id == category);
  }

  // Récupération de l'élément du DOM qui accueillera les fiches
  const sectionFiches = document.querySelector(`#modal-gallery`);
  sectionFiches.innerHTML="";

  for (let i = 0; i < galleryFilter.length; i++) {

      const tableau = galleryFilter[i];
      
      // Création d’une balise dédiée à une pièce automobile
      const tableauElement = document.createElement("figure");
      tableauElement.dataset.id = gallery[i].id;
      tableauElement.classList.add("figure");
      const divElement = document.createElement("div");
      const spanElement = document.createElement("span");
      const croixElement = document.createElement("i");
      croixElement.classList.add("fa-solid");
      croixElement.classList.add("fa-arrows-up-down-left-right");
      const poubelleElement = document.createElement("i");
      poubelleElement.classList.add("fa-solid");
      poubelleElement.classList.add("fa-trash");
      poubelleElement.ariaHidden="true";

      const imageElement = document.createElement("img");
      imageElement.src = tableau.imageUrl;
      const nomElement = document.createElement("figcaption");
      nomElement.innerText = "éditer";

      // nomElement.addEventListener("click",function() {EditerFigue(gallery[i].id);});

      
      tableauElement.appendChild(divElement);
      divElement.appendChild(spanElement);
      spanElement.appendChild(croixElement);
      spanElement.appendChild(poubelleElement);
      tableauElement.appendChild(imageElement);
      tableauElement.appendChild(nomElement);
      sectionFiches.appendChild(tableauElement);

  }
}