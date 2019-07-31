

let currentValue = "0"
let saveArray = [];
let saveTable = "";

/**
 * addition
 */
function addition() {
    currentValue += "+";
    refresh();
    showValue();
}

/**
 * soustraction
 */
function soustraction() {
    currentValue += "-";
    refresh();
    showValue();
}

/**
 * multiplication
 */
function multiplication() {
    currentValue += "*";
    refresh();
    showValue();
}

/**
 * division
 */
function division() {
    currentValue += "/";
    refresh();
    showValue();
}

/**
 * suppression du dernier input
 */
function del() {
    currentValue = String(currentValue);
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, currentValue.length - 1);
    }
    else {
        currentValue = "0";
    }
    refresh();
    showValue();
}

/**
 * remise a 0
 */
function reset() {
    console.log("reset");
    currentValue = "0";
    refresh();
    showValue();
}

/**
 * ajoute une nouvelle entrée numérique
 * @param n
 */
function addNumber(n) {
    currentValue += n;
    refresh();
    showValue();
}

/**
 * ajout de la virgule
 */
function virg() {
    currentValue += ".";
    refresh();
    showValue();
}

/**
 * calcule
 */
function cal(){
    try {
        console.log(currentValue);

        let calcul = {cal: currentValue, asw:undefined};

        currentValue = eval(currentValue).toFixed(3);
        currentValue = String(currentValue);
        if (currentValue.slice(currentValue.length - 4, currentValue.length) === ".000") {
            currentValue = currentValue.slice(0, currentValue.length - 4);
        }

        calcul.asw = currentValue;
        saveArray.push(calcul);
        genSave();


        document.getElementById("tableSaves").innerHTML = saveTable;
    }
    catch (e) {
        currentValue = "ERROR";
    }
    refresh();
    showValue();
    console.log(currentValue);
}

/**
 * rafraichis l affichage
 */
function refresh() {
    currentValue = String(currentValue);
    if (currentValue[0] === "0" && currentValue.length > 1){
        currentValue = currentValue.slice(1,currentValue.length);
    }
}

function genSave(){
    saveTable = "<table>";
    saveTable += "<tr> <td>Calcul</td><td>Réponse</td> </tr>";
    for (let calcul of saveArray){
        saveTable += "<tr>";
        saveTable += "<td>"+ calcul.cal +"</td>";
        saveTable += "<td>"+ calcul.asw +"</td>";
        saveTable += "</tr>";
    }
    saveTable += "</table>";
}

/**
 * affiche le résultat
 */
function showValue() {
    document.getElementById("visual").value = currentValue;
}