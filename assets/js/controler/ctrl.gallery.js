import {
    callApiGallery
} from "../module/mdl.api.js";
import {
    genererGalleryDom
} from "../vue/vue.gallery.js";


genererGalleryDom();
// genererGallery();

export async function genererGallery(category = 0) {

    let gallery = await callApiGallery();

    let galleryFilter = null;

    if (category == 0) {
        galleryFilter = gallery;
    } else {
        galleryFilter = gallery.filter((tableau) => tableau.category.id == category);
    }

    return galleryFilter;

}