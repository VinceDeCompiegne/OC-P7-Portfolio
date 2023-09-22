import {
    callApiLogin
} from "../module/mdl.api.js";
import {
    logout
} from "../vue/vue.logout.js";

let formulaireConnexion = document.querySelector(".formulaire-connexion");

formulaireConnexion.addEventListener("submit", async function (event) {
    event.preventDefault();
    let result = await callApiLogin(formulaireConnexion.email.value, formulaireConnexion.password.value);
    logout();
});