import {
  callApiCategories,
  callApiAdd
} from "../module/mdl.api.js";
import {
  createOptSelect,
  ModalAddOpen,
  resetModalAdd,
  modalAddPhotoSelected,
  modalAddClose
} from "../vue/vue.modal.add.js";
import {
  genererGalleryDom
} from '../vue/vue.gallery.js';
import {
  genererGalleryModal
} from "../vue/vue.modal.del.js";

export async function genererOptionMySelect() {

  const collection = await callApiCategories();
  // Récupération de l'élément du DOM qui accueillera les fiches
  const modalMySelect = document.getElementById("mySelect");
  modalMySelect.innerHTML = "";

  for (let i = 0; i < collection.length; i++) {

    const optSelect = collection[i];

    createOptSelect(optSelect.id, optSelect.name)
  }

  return true;

}

// Get the file
const modalMyFile = document.getElementById("myFile");
modalMyFile.addEventListener("change", (event) => {

  modalAddPhotoSelected();

});

//Get img after selection
const modalMyPhotoAff = document.getElementById("modalAdd-img-aff");
modalMyPhotoAff.addEventListener("click", (event) => {

  resetModalAdd();

});

// Get the button that opens the modal
const btn = document.getElementsByClassName("modal-btnAjouter")[0];
btn.addEventListener("click", async function (event) {

  let result = await ModalAddOpen();

});

// Get the <span> element that closes the modal
const arrowRetour = document.getElementsByClassName("modalAdd-arrow")[0];
arrowRetour.onclick = function () {
  modalAdd.style.display = "none";
  modalDelete.style.display = "block";

  modalForm.reset();
}


const modalDelete = document.getElementById("myModal");
// Get the modal
const modalAdd = document.getElementById("myModalAdd");
//get the form
const modalForm = document.getElementById("formAdd");
// Get the file
// const modalMyFile = document.getElementById("myFile");

modalForm.addEventListener("submit", async (event) => {

  event.preventDefault();


  try {

    const reponse = await callApiAdd(modalMyFile.files[0],
      event.target[1].value,
      event.target[2].value);


    if (await reponse.json()) {
      localStorage.removeItem("gallery");
      let result = await genererGalleryDom();
      result = await genererGalleryModal();
      //console.log(result);
      modalAddClose();
      return true;
    }

  } catch (err) {

    throw new Error("ERROR : " + err.message);

  }


});