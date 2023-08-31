import { callApiLoginMsgErr } from "../vue/vue.logout.js";

export async function callApiCategories(){

    let categories = null;
    let categoriesJson = window.localStorage.getItem('categories');
 
    if (categoriesJson === null) {

         try{

            const reponse = await fetch('http://localhost:5678/api/categories', {
                 method: "GET",
                 headers: { "Content-Type": "application/json" }
            });
            categories = await reponse.json();

            // Transformation des identifiants en JSON
            categoriesJson = JSON.stringify(categories);
            
            window.localStorage.setItem("categorie", categoriesJson);

         }catch(err){
           
             console.log("ERROR : " + err.message)

         }

    } else {
        categories = JSON.parse(categoriesJson);
    }

    // genererBtnFilter(categories);
    return categories;

}

export async function callApiGallery(){

    let gallery = null;
    let galleryJson = window.localStorage.getItem('gallery');
 
    if (galleryJson == null) {

         try{

            const reponse = await fetch('http://localhost:5678/api/works', {
                 method: "GET",
                 headers: { "Content-Type": "application/json" }
            });
            gallery = await reponse.json();

            // Transformation des identifiants en JSON
            galleryJson = JSON.stringify(gallery);
            window.localStorage.setItem("gallery", galleryJson);
            return gallery;

         }catch(err){
           
             console.log("ERROR : " + err.message)


         }

    }

    return JSON.parse(galleryJson);
    
}

export async function callApiLogin(email,password){

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
             let token = await reponse.json();

             // Transformation des identifiants en JSON
             jeton = JSON.stringify(token);
             if (((jeton.substring(0, 9) === '{"error":'))||((jeton.substring(0, 11) === '{"message":'))) {
                 console.log("Vous avez entré de mauvais identifiants");

                 callApiLoginMsgErr("block","Vous avez entré de mauvais identifiants");

             }else{

                 callApiLoginMsgErr();
                 // Stockage des informations dans le localStorage
                 window.localStorage.setItem("token", jeton);
             }

         }catch(err){

             callApiLoginMsgErr("block","Probléme de connection : veuillez essayer plus tard");

             console.log("ERROR : " + err.message)

         }

         // Récupération des identifiants depuis l'API

     } else {
         jeton = JSON.parse(jeton);
     }

     document.querySelector(".lien-login").textContent = "logout";

}


export async function callApiAdd(file,title,category){

    const data = new FormData()
    data.append('image', file);
    data.append('title', title);
    data.append('category', category);

    try{

        const token = JSON.parse(localStorage.getItem("token"));

        const reponse = await fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: {
                    "Authorization": `Bearer ${token.token}`,
                    },
            body: data,
    
        });    

        return reponse;

    }catch(err){

        throw new Error("Error : " + err.message);

    }

}

export async function callApiSupp(num,token){

    try{
      const rep = await fetch(`http://localhost:5678/api/works/${num}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          headers: {"accept": "*/*"},
          headers: {"Authorization": `Bearer ${token}`}
      });
  
      const valid = await rep;
   
      return valid;
  
    }catch(err){
      
      throw new Error("Error : " + err.message);
      
    }

}