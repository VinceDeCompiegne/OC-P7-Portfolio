import {
    logout
} from "../vue/vue.logout.js";
import {
    genererGalleryDom
} from "../vue/vue.gallery.js";

let lienLogin = document.querySelector(".lien-login");
/* le clic sur le lien logout, détruit le token et réactive le lien vers la page login */
lienLogin.addEventListener("click", async function (event) {

    let jeton = window.localStorage.getItem('token');

    if (jeton !== null) {
        event.preventDefault();
        localStorage.removeItem("token");
        // lienLogin.textContent = "login";
    }

    logout();

});