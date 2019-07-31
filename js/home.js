
/// event listener
document.addEventListener("DOMContentLoaded", addEvent);

/**
 * liste des foinctions a lancer au chargement
 */
function addEvent(){
    console.log("DOMready");
    addEnter();
}

/**
 * ajout écoute touche 'enter' de la bare de recherche
 */
function addEnter(){
    let field = getId("searchInput");
    field.addEventListener("keyup", function(event){
        if (event.keyCode === 13){
            console.log('performing search');
            search();
        }
    });
}

/**
 * fonction de construction de l url de recherche
 * @returns {boolean}
 */
function search(){
    let search = getId("searchInput").value;
    let searchSite = getId("searchSite").value;

    console.log(search + " || "  + searchSite);
    window.open(searchSite+search,"_blank");
    getId("searchInput").value = '';
    return false;
}

/**
 * retourne l element sur base de sont id
 * @param id
 * @returns {HTMLElement}
 */
function getId(id){
    return document.getElementById(id);
}