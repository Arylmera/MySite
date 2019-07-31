/* règles du jeux de la vie
Each cell with one or no neighbors dies, as if by solitude.
Each cell with four or more neighbors dies, as if by overpopulation.
Each cell with two or three neighbors survives.
 */

// param
let gridRow = 50;
let interval;
let intervalspeed = 300;
let dencity = -1.5; // 2 = max // -2 = min
// variables
let lifeGrid = [];

/**
 * constructeur de cellule pour le tableau
 * @param value
 * @constructor
 */
function Cell(value) {
    this.value = 0;
    //cellules voisines
    this.neighbour = 0;
}

// fonctions

/**
 * fonction d'initalisation et de lancement de la boucle de test de vie
 */
function init(){
    createLifeGrid();
    populateGrid(lifeGrid);
    checkCells(lifeGrid);
    pause();
    start();
}

/**
 * lancement de l'interval
 */
function start(){
    interval = setInterval(life, intervalspeed);
}

/**
 * arret de la boucle de vie
 */
function pause(){
    clearInterval(interval);
}

/**
 * racourcis de récupération de l'id
 * @param id
 * @returns {HTMLElement}
 */
function getID(id){
    return document.getElementById(id);
}

/**
 * initialise la grille carré
 */
function createLifeGrid(){
    lifeGrid = [];
    // remplis le tableau de ce tableau de cellules a 0
    for (let i = 0; i < gridRow; i++){
        let row = [];
        for (let j = 0; j < gridRow; j++){
            let cell = new Cell(0);
            row.push(cell);
        }
        lifeGrid.push(row);
    }
}

/**
 *
 * attribue une valeure aléatoire aux cellules
 * @param grid
 */
function populateGrid(grid){
    for (let row of grid){
        for (let cell of row){
            cell.value = Math.floor((Math.random()*2)+dencity);
        }
    }
}

/**
 * check des cellules voisines
 * @param grid
 */
function checkCells(grid) {
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){

            let voisins = 0;

            try { // top
                let x = i+1;
                if(grid[x][j].value){voisins++;}
            }
            catch (e) {

            }
            try { // bottom
                let x = i-1;
                if(grid[x][j].value){voisins++;}
            }
            catch (e) {

            }
            try { // left
                let x = j-1;
                if(grid[i][x].value){voisins++;}
            }
            catch (e) {

            }
            try { // right
                let x = j+1;
                if(grid[i][(x)].value){voisins++;}
            }
            catch (e) {

            }

            try { // top left
                let x = i-1;
                let y = j-1;
                if(grid[x][y].value){voisins++;}
            }
            catch (e) {

            }
            try { // bottom right
                let x = i-1;
                let y = j+1;
                if(grid[x][y].value){voisins++;}
            }
            catch (e) {

            }
            try { // left left
                let x = i+1;
                let y = j-1;
                if(grid[x][y].value){voisins++;}
            }
            catch (e) {

            }
            try { // right right
                let x = i+1;
                let y = j+1;
               if(grid[x][(y)].value){voisins++;}
            }
            catch (e) {

            }

            grid[i][j].neighbour = voisins;

        }
    }
}

/**
 * gestion des cellules au fur et a mesure du temps
 */
function life(){
    checkCells(lifeGrid);
    checkLife(lifeGrid);
    showLife(lifeGrid);

    console.log("life is running one more time");
}

/**
 * vérification de vie de la cellule ou création de vie de la cellule
 */
function checkLife(grid){
    for (let row of grid){
        for (let cell of row){
            // si 2 ou 3 voisin = vie
            if (cell.neighbour == 2 ||  cell.neighbour == 3){
                cell.value = 1;
            }
            // si seul ou 1 voisin = meurt
            //si 4 ou plus = meurt
            else {
                cell.value = 0;
            }
        }
    }
}

/**
 * mise a jour de la table de la page html
 * @param grid
 */
function showLife(grid){
    let lifeTable = "<table>"
    for (let row of grid){
        lifeTable += "<tr>"
        for(let cell of row){
            if (cell.value) {
                lifeTable += "<td id='lifeCell'></td>";
            }
            else {
                lifeTable += "<td id='deadCell'></td>";
            }
        }
        lifeTable += "</tr>"
    }

    lifeTable += "</table>"
    getID("lifeGridRender").innerHTML = lifeTable;
}

