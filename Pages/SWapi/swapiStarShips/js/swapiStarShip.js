
/*
variables
 */
let starshipURL = 'https://swapi.co/api/starships/';
let shipList;
let shipInTable = [];

/*
fonciton utilitaires
 */
function getId(id){
    return document.getElementById(id);
}

/*
gestion de page
 */
document.addEventListener("DOMContentLoaded", init);

function init(){
    loadShips();
}

/*
evenementielles
 */

/**
 * récupération des données
 */
function loadShips(){
    let xhr = new XMLHttpRequest();
    xhr.open('get', starshipURL, true);
    xhr.onload = addShip;
    xhr.send();
}


/**
 * affichage des ships
 */
function addShip() {
    shipList = JSON.parse(this.responseText);
    shipList = shipList.results;

    let shipStringBuilder = "<span id='starShipForm'>";
    let i = 0;
    for(let ship of shipList){
        ship.id = i;
        i++;
        shipStringBuilder += "<li class='ship'> <input type='button' value='add' class='shipAdd' onclick=addToShipTable("+ship.id+")></input> "+ship.name.toLowerCase()+"</li>"
    }

    shipStringBuilder += "</spawn>";
    getId("starShipForm").innerHTML = shipStringBuilder;
}

/**
 * add ship to comparative table
 */
function addToShipTable (id){
    for(let ship of shipList){
        if(ship.id == id){
            shipInTable.push(ship);
            break;
        }
    }

    shipTableBuilder();
}

/**
 * affichage de la table des ships
 */
function shipTableBuilder(){
    let shipTableBuilderHelper = "<table> <tr> <th>Name</th> <th>Model</th> <th>Cost</th> <th>Length</th> <th>ShipCLass</th> <th>Crew</th> </tr>";

    for(let ship of shipInTable){
        shipTableBuilderHelper += "<tr> <th>"+ship.name.toLowerCase()+"</th> <th>"+ship.model.toLowerCase()+"</th> <th>"+((ship.cost_in_credits)/1000)+" k credits</th> <th>"+ship.length+"m</th> <th>"+ship.starship_class.toLowerCase()+"</th> <th>"+ship.crew+"</th> </tr>";
    }

    shipTableBuilderHelper += "</table>"
    getId('tableShip').innerHTML = shipTableBuilderHelper;
}

function clearTable(){
    shipInTable = [];
    shipTableBuilder();
}