var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
c.translate(300, 230);
c.width
// min
var maxCircle = 6;
var radius = 100;
// medium
// var maxCircle = 20;
// var radius = 150;
// large
// var maxCircle = 80;
// var radius = 300;
var size = 20;

for (var i = 1; i <= maxCircle; i++) {
    c.fillStyle = 'hsl(' + 360 * Math.random() + ',100%,50%)';
    c.beginPath();
    c.arc(0, radius, size, 0, 2 * Math.PI, false);
    c.rotate(2 * Math.PI / maxCircle);
    c.fill();
}