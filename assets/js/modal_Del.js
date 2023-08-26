import { callApiGallery, genererGallery } from './gallery.js';

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementsByClassName("edition-button-edition")[0];
// lien sur le modal pour supprimer toute la gallery
const suppTout = document.getElementsByClassName("modal-suppTout")[0];
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

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
  //console.log(gallery.length);
  let galleryFilter = null;

  if (category == 0){
      galleryFilter = gallery;
  }else{
      galleryFilter = gallery.filter((tableau) => parseInt(tableau.category.id) === category);
  }

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

  }

  let deleted = await TrachApiCall();
  if (deleted==true){
    //console.log(result);
    return result;
  }


}catch(err){
  //console.log(err.message + " - " + err);
}
}


async function TrachApiCall(){

  let btnTrash = document.querySelectorAll(".fa-trash");

  btnTrash.forEach(trash => trash.addEventListener("click", async function (event) {
      
      let token = JSON.parse(localStorage.getItem("token"))
      
      try{

        const valid = await supprime(trash.dataset.id,token.token);

         if (valid.ok){
              localStorage.removeItem("gallery");
              let result = await genererGalleryModal();
              //console.log(result);
              return true;
         }   

      }catch(err){
        //console.log(err.message);
        return false;
      }
      
  }));
}

suppTout.addEventListener('click', async (event) => {

  let token = JSON.parse(localStorage.getItem("token"))

  try{

      let btnTrash = document.querySelectorAll(".fa-trash");

      let gallery = await callApiGallery();

      let galleryFilter = gallery;
  
      for (let i=0;i<galleryFilter.length;){

        let valid = await supprime(btnTrash[i].dataset.id,token.token); 

        if (valid.ok){
          i++;
        }  
      };

    }catch(err){
      //console.log(err.message);
      return false;
    }

    localStorage.removeItem("gallery");
    return await genererGalleryModal();

});

async function supprime(num,token){

  try{
    const rep = await fetch(`http://localhost:5678/api/works/${num}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        headers: {"accept": "*/*"},
        headers: {"Authorization": `Bearer ${token}`}
    })

    const valid = await rep;
        
    if (valid.ok){
      return(valid);
    }else{
      return(valid);
    }
  }catch(err){
    //console.log(err.message);
    return false;
  }
}