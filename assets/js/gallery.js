

genererGallery();

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

export async function genererGallery(category = 0) {

    // let galleryJson = window.localStorage.getItem('gallery');
    
    let gallery = await  callApiGallery();

    // let gallery = JSON.parse(galleryJson);

    let galleryFilter = null;

    if (category == 0){
        galleryFilter =  gallery;
    }else{
        galleryFilter = gallery.filter((tableau) => tableau.category.id == category);
    }
    console.log(galleryFilter);
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(`.gallery`);
    sectionFiches.innerHTML="";

    for (let i = 0; i < galleryFilter.length; i++) {

        const tableau = galleryFilter[i];
        
        // Création d’une balise dédiée à une pièce automobile
        const tableauElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = tableau.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = tableau.title;

        tableauElement.appendChild(imageElement);
        tableauElement.appendChild(nomElement);
        sectionFiches.appendChild(tableauElement);

    }
}
// }