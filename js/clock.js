let canvasHoures;
let ctx;
let canvasCirlces;
let ctxCircles
let heightWindows;
let widthWindows;
let day;
let month;
let year;
let hours;
let minutes;
let secondes;
let millisecondes;
let center

const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mais", "Juin",
    "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"
];
/**
 *
 *
 *  paramètres
 *
 */
// nombre de cercles
let numberOfCircles = 300;
let circleArray = [];
// couleur des cercles
let mouvingCircleFillColor = [
    "#bf0000",
    "#ad0000",
    "#9c0000",
    "#8b0000",
    "#630000",
    "#400000"
];
// couleur de l horloge
let clockColor = "#000000";
let clockAccent = "#ff898e";
/**
 *
 *
 * Objets et constructeurs
 *
 *
 */

function MouvingCircle(x,y,dx,dy,radius,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color

    this.draw = function () {
        ctxCircles.beginPath();
        ctxCircles.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        ctxCircles.fillStyle = color;
        ctxCircles.strokeStyle = color;
        ctxCircles.stroke();
        ctxCircles.fill();
    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interaction avec la souris
        if (mouse.mouseX - this.x < 50 && mouse.mouseX - this.x > -50 && mouse.mouseY - this.y < 50 && mouse.mouseY - this.y > -50 && this.radius < 100){
            this.radius += 2;
            this.dx += 2;
            this.dy += 2;
        }
        else if (this.radius > radius){
            this.radius -= 1;
            this.dx = dx;
            this.dy = dy;
        }

        this.draw();
    }
}

let mouse = {
    mouseX :undefined,
    mouseY :undefined
}
/**
 *
 *
 *
 * Functions
 *
 *
 *
 */

/**
 * Event listenenr
 */
document.addEventListener("DOMContentLoaded", function () {
    canvasHoures = document.getElementById('canvasHoures');
    ctx = canvasHoures.getContext('2d');
    canvasHoures.width = window.innerWidth;
    canvasHoures.height = window.innerHeight;

    canvasCirlces = document.getElementById('canvasCircles');
    ctxCircles = canvasCirlces.getContext('2d');
    canvasCirlces.width = window.innerWidth;
    canvasCirlces.height = window.innerHeight;

    heightWindows = window.innerHeight;
    widthWindows = window.innerWidth;
    main();
})
window.addEventListener("mousemove", function (event) {
    mouse.mouseX = event.x;
    mouse.mouseY = event.y;
})
/**
 * lancement des fonctrions
 */
function main() {
    center = {x: canvasHoures.width/2, y: canvasHoures.height/2};
    getTime();
    setInterval(drawnClock, 1000);
    // création de numberOfCircles cerlces
    for (let i = 0; i < numberOfCircles; i++){
        let x = Math.random() * widthWindows;
        let y = Math.random() * heightWindows;
        let dx = (Math.random() -0.5) * 4;
        let dy = (Math.random()-0.5) * 4;
        let radius = 10;
        let color = mouvingCircleFillColor[Math.floor(Math.random()*7)];
        circleArray.push(new MouvingCircle(x,y,dx,dy,radius,color));
    }
    circleAnimate();
}

/**
 * met a jour l'heure
 */
function getTime(){
    let date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    secondes = date.getSeconds();
    millisecondes = date.getMilliseconds();
    day = date.getDay();
    month = monthNames[date.getMonth()];
    year = date.getFullYear();
}

/**
 * dessine l horloge sur bases dees donées et des fonctions draw
 */
function drawnClock(){
    getTime();
    ctx.clearRect(0,0,canvasHoures.width,canvasHoures.height);
    ctx.lineCap = "round";

    // background of the clock
    ctx.beginPath();
    ctx.arc(center.x,center.y,140,0,Math.PI*2);
    ctx.fillStyle = clockAccent;
    ctx.fill();

    drawSecondes();
    drawMinutes();
    drawHoures();
    drawFaceClock();

    drawCurrentDate();
}

/**
 * draw face of the clock
 */
function drawFaceClock(){
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = clockColor;
    ctx.arc(center.x,center.y,140,0,Math.PI*2);
    ctx.stroke();

    //center
    ctx.beginPath();
    ctx.arc(center.x,center.y,4,0,Math.PI*2);
    ctx.fillStyle = clockAccent;
    ctx.strokeStyle = clockColor;
    ctx. lineWidth = 3;
    ctx.fill();
    ctx.stroke();

    // dash
    for (let i = 0; i < 60; i++){
        let r = 135;
        let l = 5;

        ctx.strokeStyle = clockColor;
        if (i%5 === 0){
            r -= 1;
            l *= 4;
            ctx.strokeStyle = clockColor;
        }
        let vec = new Vector(r, Math.PI * 2 * (i/60) - Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(vec.getX()+center.x, vec.getY()+center.y);
        vec.setMag(r + l);
        ctx.lineTo(vec.getX()+center.x, vec.getY()+center.y);
        ctx.stroke();
    }

    // number
    ctx.font = "18px Noto Sans";
    ctx.fillStyle = clockColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 1; i <= 12; i++){
        let v = new Vector(113,Math.PI * 2 * (i/12) - Math.PI / 2);
        ctx.fillText(i, v.getX()+center.x, v.getY()+center.y);
    }
}

/**
 * draw des secondes
 */
function drawSecondes() {
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = clockColor;
    ctx.beginPath()
    let angle = Math.PI*2 * (secondes/60) - Math.PI / 2;
    let vector = new Vector(95, angle)
    ctx.moveTo(center.x,center.y);
    ctx.lineTo(vector.getX() + center.x , vector.getY() + center.y);
    ctx.stroke();
}

/**
 * draw des minutes
 */
function drawMinutes() {
    ctx.lineWidth = 4;
    ctx.strokeStyle = clockColor;
    ctx.beginPath()
    let angle = Math.PI*2 * (minutes/60) - Math.PI / 2;
    let vector = new Vector(95, angle)
    ctx.moveTo(center.x,center.y);
    ctx.lineTo(vector.getX() + center.x , vector.getY() + center.y);
    ctx.stroke();
}

/**
 * draw des heures
 */
function drawHoures() {
    ctx.lineWidth = 6;
    ctx.strokeStyle = clockColor;
    ctx.beginPath()
    let angle = Math.PI*2 * (hours/12) - Math.PI / 2;
    let vector = new Vector(95, angle)
    ctx.moveTo(center.x,center.y);
    ctx.lineTo(vector.getX() + center.x , vector.getY() + center.y);
    ctx.stroke();
}

function drawCurrentDate() {
    ctx.font = '48px serif';
    let currentDate = String(day+" "+month+" "+year);
    ctx.fillText(currentDate,widthWindows/2,(heightWindows/2)+200);
}

/**
 * anime les cerlces
 */
function circleAnimate(){
    requestAnimationFrame(circleAnimate);
    ctxCircles.clearRect(0,0,innerWidth,innerHeight);

    for (let circle in circleArray){
        circleArray[circle].update();
    }


}
