callApiGallery();

async function callApiGallery(){

    let galleryJson = window.localStorage.getItem('gallery');
 
    if (galleryJson === null) {

         try{

            const reponse = await fetch('http://localhost:5678/api/works', {
                 method: "GET",
                 headers: { "Content-Type": "application/json" }
            });
            gallery = await reponse.json();

            // Transformation des identifiants en JSON
            galleryJson = JSON.stringify(gallery);
            
            window.localStorage.setItem("gallery", galleryJson);

         }catch(err){
           
             console.log("ERROR : " + err.message)

         }

    } else {
        gallery = JSON.parse(galleryJson);
    }

    genererGallery(gallery,0);

}

function genererGallery(gallery,category = 0) {

    let galleryFilter = null;

    if (category === 0){
        galleryFilter = gallery;
    }else{
        galleryFilter = gallery.filter((tableau) => tableau.category.id == category);
    }
    

    for (let i = 0; i < galleryFilter.length; i++) {

        const tableau = galleryFilter[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".gallery");
        // Création d’une balise dédiée à une pièce automobile
        const tableauElement = document.createElement("figure");
        tableauElement.dataset.id = gallery[i].id;
        const imageElement = document.createElement("img");
        imageElement.src = tableau.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = tableau.title;

        sectionFiches.appendChild(tableauElement);
        tableauElement.appendChild(imageElement);
        tableauElement.appendChild(nomElement);

    }
}