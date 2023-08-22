let lienLogin = document.querySelector(".lien-login"); 
let bandeauEdition = document.querySelectorAll(".edition-bondeau-administration")  
/* appel de la fonction à l'ouverture de page */
logout();

/* le clic sur le lien logout, détruit le token et réactive le lien vers la page login */
lienLogin.addEventListener("click", async function (event) {
 
    let jeton = window.localStorage.getItem('token');

    if(jeton !== null){
        event.preventDefault();
        localStorage.removeItem("token");
        lienLogin.textContent = "login";
        if (bandeauEdition.length > 0) {bandeauEdition[0].style.display="none"}
    }
    
});

/* Affichage du lien login/logout en fonction de si le token est enregistré*/
function logout(){

    let jeton = window.localStorage.getItem('token');

    if(jeton !== null){
        lienLogin.textContent = "logout";
        if (bandeauEdition.length > 0) {bandeauEdition[0].style.display="flex"}
    }else{
        lienLogin.textContent = "login";
        if (bandeauEdition.length > 0) {bandeauEdition[0].style.display="none"}
    }

}