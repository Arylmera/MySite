let tacheList = {};
let tacheTableString;

/**
 * constrcuteur de nouvelles taches
 * @param nom
 * @param duree
 * @param prio
 * @param description
 * @param time
 * @param date
 * @constructor
 */
function Tache(nom,duree,prio,description,time,date){
    this.nom = nom;
    this.duree = duree;
    this.prio = prio;
    this.description = description;
    this.time = time;
    this.date = date;
}

/**
 * racourcis de l'appel par l'id
 * @param id
 * @returns {HTMLElement}
 */
function getID(id) {
    return document.getElementById(id);
}

/**
 * ajoute une tache depuis le formulaire a la liste des traches
 */
function newTache(){
    let date = new Date;
    let tacheDate = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
    let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

    let nom = getID("name").value;
    let duree = getID("duree").value;
    let prio = document.querySelector("input[name='prio']:checked").value;
    let description = getID("descritpion").value;

    let tache = new Tache(nom,duree,prio,description,time,tacheDate);
    let tacheName = time+"-"+tacheDate;

    tacheList[tacheName] = tache;

    console.log(tacheList);
    getID("tacheForm").reset();
}

/**
 * affiche une alerte de la description de la tache passée en paramètre
 * @param tache
 */
function showDescription(tache){
    alert(tacheList[tache].description);
}

/**
 * renvois la priorité sous forme d'un string
 * @param prio
 * @returns {string}
 */
function prioToString(prio) {
    if (prio === 2){
        return "Elevée";
    }
    else if (prio === 1){
        return "Moyenne";
    }
    return "faible";
}

/**
 * affiche la table des taches sur base du string qui lui est fournit
 * @param tacheTableString
 */
function showTableTache(){
    getID("tacheList").innerHTML = tacheTableString;
}

/**
 * supprime la trache de la liste de taches
 * @param tache
 */
function dltTacheFromList(tache) {
    delete tacheList[tache];
}

/**
 * rechargement du tableau et appel de la suppression de la tache voulant etre supprimée
 * @param tache
 */
function dltTache(tache) {
    if (dltTacheFromList(tache)){
        tacheTableString = buildTableTache();
        showTableTache();
    }
    else {
        tacheTableString = buildTableTache();
        showTableTache();
    }
}

/**
 * renvois le string de la table html a afficher sur base de la liste de tache actuelle
 * @returns {string}
 */
function buildTableTache(){
    let tableBuilder = "<table id='tacheList'>";
    tableBuilder += "<tr> <td>Nom</td> <td>Durée</td> <td>Prioritée</td> <td>Heure d'ajout</td> <td>Date d'ajout</td> <td>Description</td> <td>Supprimer</td> </tr>";
    let tacheListKey = Object.keys(tacheList);
    for (let tache of tacheListKey){
        tableBuilder += "<tr>"; // construction de la ligne de la tache sur base de ces paramètres
        tableBuilder += "<td>"+tacheList[tache].nom+"</td>";
        tableBuilder += "<td>"+tacheList[tache].duree+"</td>";
        tableBuilder += "<td>"+prioToString(tacheList[tache].prio)+"</td>";
        tableBuilder += "<td>"+tacheList[tache].time+"</td>";
        tableBuilder += "<td>"+tacheList[tache].date+"</td>";
        tableBuilder += "<td> <input type='button' data-message='"+tache+"' onclick={showDescription("+"'"+tache+"'"+")} value='description'> </td>"; // boutton pop-up de la description pour gagner de la place dans le tableau
        tableBuilder += "<td> <input type='button' class='dltButton' onclick={dltTache("+"'"+tache+"'"+")} value='supprimer'> </td>";
        tableBuilder += "</tr>" // fin de la tache
    }
    tableBuilder += "</table>";
    return tableBuilder;
}

/**
 * fonction appellée lors de la création de la nouvelle tache par le formulaire
 * @returns {boolean}
 */
function main(){
    newTache();
    tacheTableString = buildTableTache();
    showTableTache();
    return false;
}