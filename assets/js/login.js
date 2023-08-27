let formulaireConnexion = document.querySelector(".formulaire-connexion");


formulaireConnexion.addEventListener("submit", async function (event) {
    event.preventDefault();
    callApiLogin(formulaireConnexion.email.value,formulaireConnexion.password.value);
 
});

 async function callApiLogin(email,password){

       // création de l'objet pour l'appel fetch
       const formulaireIdentification ={
        "email": email,
        "password": password
        }

        let jeton = window.localStorage.getItem('token');
    

        if (jeton === null) {

            try{

                const reponse = await fetch('http://localhost:5678/api/users/login', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formulaireIdentification)
                });
                token = await reponse.json();

                            // Transformation des identifiants en JSON
                jeton = JSON.stringify(token);
                if (((jeton.substring(0, 9) === '{"error":'))||((jeton.substring(0, 11) === '{"message":'))) {
                    console.log("Vous avez entré de mauvais identifiants");
                    
                    document.querySelector(".login-message-erreur").textContent="Vous avez entré de mauvais identifiants";
                    document.querySelector(".login-message-erreur").style.display="block";
                    
                }else{
                    document.querySelector(".login-message-erreur").style.display="none";
                    // Stockage des informations dans le localStorage
                    window.localStorage.setItem("token", jeton);
                }

                

            }catch(err){

                document.querySelector(".login-message-erreur").textContent="Probléme de connection : veuillez essayer plus tard";
                document.querySelector(".login-message-erreur").style.display="block";
                
                console.log("ERROR : " + err.message)

            }
   
            // Récupération des identifiants depuis l'API

        } else {
            jeton = JSON.parse(jeton);
        }

        lienLogin.textContent = "logout";



}