import {
  genererOptionMySelect
} from "../controler/ctrl.modal.add.js";


export function createOptSelect(id, name) {

  const optElement = document.createElement("option");
  optElement.value = id;
  optElement.textContent = name;

  const modalMySelect = document.getElementById("mySelect");
  modalMySelect.appendChild(optElement);

}


// Get the modal del photo
const modalDelete = document.getElementById("myModal");
// Get the modal add photo
const modalAdd = document.getElementById("myModalAdd");
//Get div after selection
const modalMyCaptionPhotoAff = document.getElementsByClassName("modalAdd-cadre-image-aff")[0];
//Get img after selection
const modalMyPhotoAff = document.getElementById("modalAdd-img-aff");
//Get the caption select photo
const modalAddPhotoSelect = document.getElementsByClassName("modalAdd-cadre-image-select")[0];
//get the form
const modalForm = document.getElementById("formAdd");
// Get the file
const modalMyFile = document.getElementById("myFile");

// When the user clicks on <span> (x), close the modal


export function modalAddPhotoSelected() {

  modalMyPhotoAff.src = `./assets/images/${modalMyFile.files[0].name}`;
  modalAddPhotoSelect.style.opacity = 0;
  modalAddPhotoSelect.style.zIndex = -1;
  modalMyCaptionPhotoAff.style.opacity = 1;
  modalMyCaptionPhotoAff.style.zIndex = 1;

}

export async function ModalAddOpen() {

  modalDelete.style.display = "none";
  resetModalAdd();
  let result = await genererOptionMySelect()
  modalAdd.style.display = "block";

}

export function modalAddClose() {
  modalAdd.style.display = "none";
  modalDelete.style.display = "block";
}

export function resetModalAdd() {

  modalMyPhotoAff.src = "";
  modalAddPhotoSelect.style.opacity = 1;
  modalAddPhotoSelect.style.zIndex = 1;
  modalMyCaptionPhotoAff.style.opacity = 0;
  modalMyCaptionPhotoAff.style.zIndex = -1;

  modalForm.reset();

}