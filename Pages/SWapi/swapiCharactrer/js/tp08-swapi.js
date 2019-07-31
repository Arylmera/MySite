
/*
variables
 */

let movieListid = "movies";
let moviesURL = "https://swapi.co/api/films/";
let jediListId = "jedi";
let jediInfoId = "jediInfo";
let filmData;
let nbrJedi;
let jediData;
let jediSelectedInfo = {};
let jediInfoCount;
let penddingRequestJedi;

/*
Utilitaires
 */

/**
 * retourne le lien au document par sont id
 * @param id
 * @return {HTMLElement}
 */
function getId(id){
    return document.getElementById(id);
}

/*
gestion de la page
 */

document.addEventListener('DOMContentLoaded', init);

/**
 * fonction d initalisation des champs lors du chargement de la page
 */
function init(){
    getId(movieListid).addEventListener('change', loadJedi); // au changement de film, chargement de la liste des acteurs
    loadMovies(); // chargement de la list des films
}

/**
 * remplissage de la liste des films a partir de la DB
 */
function loadMovies(){
    getId(movieListid).innerHTML = "<p id="+movieListid+"> Loading film ...</p>";
    let xhr = new XMLHttpRequest(); // création de l obj xhr
    xhr.open('get',moviesURL,true); // récup a partir du lien
    xhr.onload = fullListFilm; // fonction a exécuter lors de la récup
    xhr.send(); // exécution de la  requete
}

/*
fonction evenementielles
 */

/**
 * function de remplissage de la liste déroulante des films
 */
function fullListFilm(){
    filmData = JSON.parse(this.responseText); // recupération du resulat du xhr
    filmData = filmData.results; // récup des resultats du resulat du xhr

    // création de la liste des films
    let selectOptionList = "<select id="+movieListid+" name ="+movieListid+">";
    for (let i = 0; i < filmData.length ; i++){
        selectOptionList += "<option value="+filmData[i].episode_id+">"+filmData[i].title+"</option>";
    }
    selectOptionList += "</select>"
    //affichage de la liste des films
    getId(movieListid).innerHTML = selectOptionList;
    loadJedi();
}


/**
 * ajout d'un nouveau personnage
 */
function addJedi(){
    let charactData = JSON.parse(this.responseText);
    jediData.push(charactData);

    if (jediData.length == nbrJedi){
        jediData.sort(sortJedi);
        // construction du bloc html d'affichage
        let jediListBuilder = "<p id="+jediListId+">Character List :";
        for(let i = 0; i < jediData.length; i++){
            jediListBuilder += "<li class='jedi' value='"+jediData[i].name.toLowerCase()+"' onclick='getJediInfo("+i+")'> "+jediData[i].name.toLowerCase()+" </li>";
        }
        jediListBuilder += "</p>";
        // affichage dans la page html
        getId(jediListId).innerHTML = jediListBuilder;

        listIta();
    }
}

/**
 * fonction de remplissage des personages en fonction des films
 */
function loadJedi(){
    jediData = [];
    let idMovie = getId(movieListid).value;
    console.log("film selected = "+idMovie);
    let charactList;
    let found = false
    // recherche du film demandé
    for (let i = 0;!found; i++){
        if (filmData[i].episode_id == idMovie){
            charactList = filmData[i].characters;
            found = true;
        }
    }
    // gif de chargement
    getId(jediListId).innerHTML = "<p id="+jediListId+"> Loading ... </p>";
    // récup du nombre d acteurs
    nbrJedi = charactList.length;
    // chargement de la liste des characters
    for(let i = 0; i < charactList.length; i++){
        let xhr = new XMLHttpRequest();
        xhr.open('get',charactList[i],true); // récup a partir du lien
        xhr.onload = addJedi;
        xhr.send();
    }
}

/**
 * tri des jedi nom
 */
function sortJedi(a,b){
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

/**
 * mettre la liste en italique de la liste <li class"jedi">
 */
function listIta(){
    let elem = document.getElementsByClassName('jedi');
    for(let element of elem){
        element.style.fontStyle = "italic";
    }
}

/**
 * création de la fiche de personnage
 * @param id
 */
function getJediInfo(id) {
    let jedi = jediData[id];
    getId(jediInfoId).innerHTML = "<form id="+jediInfoId+"> Loading ... </form>";
    getId(jediInfoId).style.visibility = 'visible';
    jediSelectedInfo = jedi;
    // reset des conteur de requete
    jediInfoCount = 0;
    penddingRequestJedi = 0;
    // construction de la fiche de personnage
    let xhr = new XMLHttpRequest();
    xhr.open('get',jedi.homeworld,true);
    xhr.onload = jediAddHomeWorld;
    xhr.send();
    penddingRequestJedi++; // nombre de requete a exécuter

    let xhr2 = new XMLHttpRequest();
    xhr2.open('get',jedi.species,true);
    xhr2.onload = jediAddSpecies;
    xhr2.send();
    penddingRequestJedi++; // nombre de requete a exécuter

}

function jediAddHomeWorld() {
    let homeWorld = JSON.parse(this.responseText);
    jediSelectedInfo.homeworld = homeWorld;
    jediInfoCount++; // request éxécutée
    showJediInfo();
}

function jediAddSpecies(){
    let species;
    species = JSON.parse(this.responseText);
    jediSelectedInfo.species = species;
    jediInfoCount++; // request exécutée
    showJediInfo();

}

function showJediInfo(){
    if (penddingRequestJedi == jediInfoCount) { // si toutes les requetes on été faites
        let jediStringBuilder = "<form id=" + jediInfoId + ">"
        jediStringBuilder += "<p style='font-size: 1.5em;text-decoration: underline; text-align: center'>" + jediSelectedInfo.name.toLowerCase() + "</p>";
        jediStringBuilder += "<li>gender : " + jediSelectedInfo.gender + "</li>";
        jediStringBuilder += "<li>species : " + jediSelectedInfo.species.name + " (" + jediSelectedInfo.species.classification.toLowerCase() + ") </li>"
        jediStringBuilder += "<li>" + (jediSelectedInfo.height) / 100 + "m for " + jediSelectedInfo.mass + "kg</li>";
        jediStringBuilder += "<li> born the " + jediSelectedInfo.birth_year + " on " + jediSelectedInfo.homeworld.name.toLowerCase() + "</li>";
        jediStringBuilder += "<li>Skin color : " + jediSelectedInfo.skin_color.toLowerCase() + "</li>";
        jediStringBuilder += "<li>Eye color : " + jediSelectedInfo.eye_color.toLowerCase() + "</li>";
        jediStringBuilder += "<li>Hair color : " + jediSelectedInfo.hair_color.toLowerCase() + "</li>";
        // affichage de la fiche de personnage
        jediStringBuilder += "</form>";
        getId(jediInfoId).innerHTML = jediStringBuilder
    }
}