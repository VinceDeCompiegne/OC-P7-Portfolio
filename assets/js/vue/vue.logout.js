import { genererGalleryDom } from "./vue.gallery.js";

let lienLogin = document.querySelector(".lien-login"); 
let bandeauEdition = document.querySelectorAll(".editionBondeau");

/* appel de la fonction à l'ouverture de page */
logout();

export function logout(){

    let jeton = window.localStorage.getItem('token');

    if(jeton !== null){
        lienLogin.textContent = "logout";
        let i = null;
        if (bandeauEdition.length > 0) bandeauEdition.forEach(a => a.style.display="flex");
    }else{
        lienLogin.textContent = "login";
        if (bandeauEdition.length > 0) bandeauEdition.forEach(a => a.style.display="none");
    }

    const sectionFiltre = document.querySelector(".filtre");
    if (sectionFiltre!==null){
        if (jeton!==null) {sectionFiltre.style.opacity = 0} else {sectionFiltre.style.opacity = 1};
        genererGalleryDom(0);
    }
    

}

export function callApiLoginMsgErr(visible="none",msg=""){

    const loginMessageErreur = document.querySelector(".login-message-erreur");

    loginMessageErreur.textContent = msg;
    loginMessageErreur.style.display = (visible==="none")?"none":"block";

}