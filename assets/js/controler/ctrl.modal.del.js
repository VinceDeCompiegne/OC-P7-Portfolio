import {
  callApiSupp,
  callApiGallery
} from "../module/mdl.api.js";
import {
  genererGalleryDom
} from '../vue/vue.gallery.js';
import {
  genererGalleryModal
} from "../vue/vue.modal.del.js";

export async function modalDeltrachCall() {

  let btnTrash = document.querySelectorAll(".fa-trash");

  btnTrash.forEach(trash => trash.addEventListener("click", async function (event) {

    let token = JSON.parse(localStorage.getItem("token"));

    try {

      const valid = await callApiSupp(trash.dataset.id, token.token);

      if (valid.ok) {
        localStorage.removeItem("gallery");
        let result = await genererGalleryModal();
        result = await genererGalleryDom();
        //console.log(result);
      }

    } catch (err) {
      throw new Error("Error : " + err.message);
    }

  }));
}

// lien sur le modal pour supprimer toute la gallery
const suppTout = document.getElementsByClassName("modal-suppTout")[0];

suppTout.addEventListener('click', async (event) => {

  modalDelSuppAll();

});


export async function modalDelSuppAll() {

  let token = JSON.parse(localStorage.getItem("token"))

  try {

    let btnTrash = document.querySelectorAll(".fa-trash");

    let gallery = await callApiGallery();

    let galleryFilter = gallery;

    for (let i = 0; i < galleryFilter.length;) {

      let valid = await callApiSupp(btnTrash[i].dataset.id, token.token);

      if (valid.ok) {
        i++;
      }
    };

    localStorage.removeItem("gallery");
    let result = await genererGalleryDom();
    return await genererGalleryModal();

  } catch (err) {

    throw new Error("Error : " + err.message);

  }

}

export async function modalFilterGalery(category = 0) {

  try {

    let gallery = await callApiGallery();
    //console.log(gallery.length);
    let galleryFilter = null;

    if (category == 0) {
      galleryFilter = gallery;
    } else {
      galleryFilter = gallery.filter((tableau) => parseInt(tableau.category.id) === category);
    }

    return galleryFilter;

  } catch (err) {

    throw new Error("Error : " + err.message);

  }

}

document.addEventListener('keydown', (event) => {

  const modalDel = document.getElementById("myModal");

  if (modalDel.style.display == "block") {
    var name = event.key;
    var code = event.code;
    if ((event.key == "Escape") || (event.key == "Esc")) {
      modalDel.style.display = "none";
    }
    if (event.key == "Tab") {
      event.preventDefault();
    }
    //Alert the key name and key code on keydown
    //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
  };

}, false)


// Get the modal
const modalDel = document.getElementById("myModal");
const modalAddPhoto = document.getElementById("myModalAdd");
// Get the button that opens the modal
const btn = document.getElementsByClassName("edition-button-edition")[0];

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  genererGalleryModal(0);
  modalDel.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  genererGalleryDom(0);
  modalDel.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {

  if (event.target == modalDel) {
    genererGalleryDom(0);
    modalDel.style.display = "none";
  }
  if (event.target == modalAddPhoto) {
    genererGalleryDom(0);
    modalAddPhoto.style.display = "none";
  }

}