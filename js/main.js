var startPoint = new Point(3, 3), endPoint = new Point(10, 10);
var isAbleToClick = true;
var canvas, ctx;
var canDrawWal = false;
var isWall;
var movingPoint = 0; 

const length = 56, height = 28, gridLenth = 25;
const time = 10;
const green = "#00FF00";
const cyan = "#5DBCD2";
const white = "#FFFFFF";
const black = "#000000";
const yellow = "#FFFF00";
const blue = "#163B66";

document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById("cnvs");
    ctx = canvas.getContext("2d");
    clear();
    document.getElementById('got').addEventListener('click', function() {
        var div = document.getElementById('tutorial'); 
        div.parentNode.removeChild(div); 
    });
    document.getElementById("clear").addEventListener("click", clear);
    document.getElementById("path").addEventListener("click", visualizePath);
    document.getElementById("cnvs").addEventListener('mouseup', function() {
        canDrawWal = movingPoint = 0;
    });
    document.getElementById("cnvs").addEventListener('mousedown', handleClick);
    document.addEventListener("mousemove", handleMouseMove);

    // Event listener for the random button
    document.getElementById("random").addEventListener("click", placeRandomEndPoint);
});

// Function to randomly place the green dot
function placeRandomEndPoint() {
    let randomX, randomY;
    do {
        randomX = Math.floor(Math.random() * length);
        randomY = Math.floor(Math.random() * height);
    } while (isWall[randomX][randomY] || startPoint.isEqual(new Point(randomX, randomY)));

    // Clear the old end point and draw the new one
    ctx.fillStyle = white;
    ctx.fillRect(endPoint.x * gridLenth + 1, endPoint.y * gridLenth + 1, gridLenth - 2, gridLenth - 2);
    endPoint = new Point(randomX, randomY);
    drawPoint(green, randomX, randomY);
}

function handleMouseMove(event) {
    let pos = getMousePos(event);
    if (pos.x >= canvas.left || pos.y >= canvas.height || pos.x < 0 || pos.y < 0) {
        movingPoint = 0;
        canDrawWal = false;
        return;
    }
    if (movingPoint == 0) {
        tryMakeWall(event);
    } else {
        tryMovePoint(event);
    }
}

function handleClick(event) {
    if (!isAbleToClick) return;
    let pos = getMousePos(event);
    if (startPoint.isEqual(new Point(Math.floor(pos.x / gridLenth), Math.floor(pos.y / gridLenth)))) {
        movingPoint = 1;
    } else if (endPoint.isEqual(new Point(Math.floor(pos.x / gridLenth), Math.floor(pos.y / gridLenth)))) {
        movingPoint = 2;
    } else {
        canDrawWal = true;
    }
}
