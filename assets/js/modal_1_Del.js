import { callApiGallery, genererGallery } from './gallery.js';

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
  genererGallery(0);
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

export async function genererGalleryModal(category = 0) {
try{
  const sectionFiches = document.querySelector(`#modal-gallery`);
  sectionFiches.innerHTML="";

  let gallery = await callApiGallery();

  let galleryFilter = null;

  if (category == 0){
      galleryFilter = gallery;
  }else{
      galleryFilter = gallery.filter((tableau) => parseInt(tableau.category.id) === category);
  }
  span.style.width = width;
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
      poubelleElement.ariaHidden="true";

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
      span.style.width = width;
  }

  let result = TrachApiCall();

}catch(err){
  console.log(err.message + " - " + err);
}
}
var width = null
async function TrachApiCall(){

  let btnTrash = document.querySelectorAll(".fa-trash");
  width = span.style.width;
  btnTrash.forEach(trash => trash.addEventListener("click", async function (event) {
      
      let token = JSON.parse(localStorage.getItem("token"))

      try{
        const reponse = await fetch(`http://localhost:5678/api/works/${trash.dataset.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            headers: {"accept": "*/*"},
            headers: {"Authorization": `Bearer ${token.token}`}
            
        })

        const valid = await reponse;
        
        if (valid.ok){
          localStorage.removeItem("gallery");
          genererGalleryModal();
        }   

      }catch(err){
        console.log(err.message + " - " + err.line);
        return false;
      }
      return true;
  }));
}