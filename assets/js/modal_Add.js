import { genererGallery } from './gallery.js';
import { genererGalleryModal } from './modal_Del.js';

import { callApiCategories } from './collection.js';

const modalDelete = document.getElementById("myModal");
// Get the modal
const modalAdd = document.getElementById("myModalAdd");
//get the form
const modalForm = document.getElementById("formAdd");
// Get the file
const modalMyFile = document.getElementById("myFile");
//Get the Title
const modalMyTitle = document.getElementById("myTitle");
//Get the name
const modalMyName = document.getElementById("myName");
//Get the photo
const modalMyPhoto = document.getElementById("modalAdd-img");
//Get div after selection
const modalMyCaptionPhotoAff = document.getElementsByClassName("modalAdd-cadre-image-aff")[0];
//Get img after selection
const modalMyPhotoAff = document.getElementById("modalAdd-img-aff");
//Get the caption select photo
const modalAddPhotoSelect = document.getElementsByClassName("modalAdd-cadre-image-select")[0];

// Get the button that opens the modal
const btn = document.getElementsByClassName("modal-btnAjouter")[0];
// Get the <span> element that closes the modal
const arrowRetour = document.getElementsByClassName("modalAdd-arrow")[0];

const modalMySelect = document.getElementById("mySelect");

// When the user clicks the button, open the modal 
btn.onclick = async function () {
    modalDelete.style.display = "none";
    resetModalAdd();
    let result = await genererOptionMySelect()
    modalAdd.style.display = "block";
  };
  
  // When the user clicks on <span> (x), close the modal
  arrowRetour.onclick = function() {
    modalAdd.style.display = "none";
    modalDelete.style.display = "block";

    modalForm.reset();
  }

  modalMyFile.addEventListener("change",(event)=>{
    modalMyPhotoAff.src=`./assets/images/${modalMyFile.files[0].name}`;
    modalAddPhotoSelect.style.opacity= 0;
    modalAddPhotoSelect.style.zIndex= -1;
    modalMyCaptionPhotoAff.style.opacity= 1;
    modalMyCaptionPhotoAff.style.zIndex= 1;
  });

  modalMyPhotoAff.addEventListener("click",(event)=>{

    resetModalAdd();

  });

export const resetModalAdd = () => {
  modalMyPhotoAff.src="";
  modalAddPhotoSelect.style.opacity= 1;
  modalAddPhotoSelect.style.zIndex= 1;
  modalMyCaptionPhotoAff.style.opacity= 0;
  modalMyCaptionPhotoAff.style.zIndex= -1;

  modalForm.reset();
}

modalForm.addEventListener("submit", async (event) => {

  event.preventDefault();


  try{

    const data = new FormData()
    data.append('image', modalMyFile.files[0]);
    data.append('title', event.target[1].value);
    data.append('category', event.target[2].value);

    const token = JSON.parse(localStorage.getItem("token"));


    const reponse = await fetch('http://localhost:5678/api/works', {
         method: "POST",
         headers: {
                   "Authorization": `Bearer ${token.token}`,
                   },
         body: data,

    });

    // console.log(result);

    if(await reponse.json()){
      localStorage.removeItem("gallery");
      let result = await genererGallery();
      result = await genererGalleryModal();
      //console.log(result);
      modalAdd.style.display = "none";
      modalDelete.style.display = "block";
      return true;
    }

}catch(err){
   
    console.log("ERROR : " + err.message)

}


});


async function genererOptionMySelect() {

    const collection =  await callApiCategories();
    // Récupération de l'élément du DOM qui accueillera les fiches
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

    modalMySelect.appendChild(optElement);

}