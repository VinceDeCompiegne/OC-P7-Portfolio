const add = '82.64.219.243';
// const add = 'localhost';

import { callApiLoginMsgErr } from "../vue/vue.logout.js";

export async function callApiCategories(){

    let categories = null;
    let categoriesJson = window.localStorage.getItem('categories');
 
    if (categoriesJson === null) {

         try{

            const response = await fetch(`http://${add}:5678/api/categories`, {
                 method: "GET",
                 headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {

                categories = await response.json();

                // Transformation des identifiants en JSON
                categoriesJson = JSON.stringify(categories);
                
                window.localStorage.setItem("categorie", categoriesJson);

            }else{

                throw new Error('Erreur réseau : ' + response.statusText);

            }

         }catch(err){
           
            throw new Error("ERROR : " + err.message);

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

            const response = await fetch(`http://${add}:5678/api/works`, {
                 method: "GET",
                 headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {

                gallery = await response.json();

                // Transformation des identifiants en JSON
                galleryJson = JSON.stringify(gallery);
                window.localStorage.setItem("gallery", galleryJson);

                return gallery;

            } else {

                throw new Error('Erreur réseau : ' + response.statusText);

            }

         }catch(err){
           
             throw new Error("ERROR : " + err.message);

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

             const response = await fetch(`http://${add}:5678/api/users/login`, {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(formulaireIdentification)
             });

             if (response.ok) {

                let token = await response.json();

                // Transformation des identifiants en JSON
                jeton = JSON.stringify(token);

                callApiLoginMsgErr();

                window.localStorage.setItem("token", jeton);
 
            }else{
                if (response.status === 401) {
                    callApiLoginMsgErr("block","Vous avez entré de mauvais identifiants");
                }else{
                    callApiLoginMsgErr("block","Probléme de connection : veuillez essayer plus tard.");
                    throw new Error('Erreur réseau : ' + response.statusText);
                }
            }
            
         }catch(err){

            throw new Error("ERROR : " + err.message);

         }

         // Récupération des identifiants depuis l'API

     } else {
         return jeton;
     }

    //  document.querySelector(".lien-login").textContent = "logout";

}



export async function callApiAdd(file,title,category){

    const data = new FormData()
    data.append('image', file);
    data.append('title', title);
    data.append('category', category);

    try{

        const token = JSON.parse(localStorage.getItem("token"));

        const response = await fetch(`http://${add}:5678/api/works`, {
            method: "POST",
            headers: {
                    "Authorization": `Bearer ${token.token}`,
                    },
            body: data,
    
        });  

        if (response.ok) {

            return await response;

        }else{

            throw new Error('Erreur réseau : ' + response.statusText);

        }

    }catch(err){

        throw new Error("Error : " + err.message);

    }

}

export async function callApiSupp(num,token){

    try{
      const response = await fetch(`http://${add}:5678/api/works/${num}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          headers: {"accept": "*/*"},
          headers: {"Authorization": `Bearer ${token}`}
      });

    if (response.ok) {

        const valid = await response;
   
        return valid;
  
    }else{

        throw new Error('Erreur réseau : ' + response.statusText);

    }

    }catch(err){
      
      throw new Error("Error : " + err.message);
      
    }

}

