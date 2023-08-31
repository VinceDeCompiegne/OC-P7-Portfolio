import { callApiLogin } from "../module/mdl.api.js";

let formulaireConnexion = document.querySelector(".formulaire-connexion");

formulaireConnexion.addEventListener("submit", async function (event) {
    event.preventDefault();
    await callApiLogin(formulaireConnexion.email.value,formulaireConnexion.password.value);
 
});

