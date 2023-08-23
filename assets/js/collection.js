
callApiCategories();

async function callApiCategories(){

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
}

