
function rotatePoint(pt, o, a) {
    var angle = a * (Math.PI / 180); // Convert to radians

    var rotatedX =
        Math.cos(angle) * (pt.x - o.x) - Math.sin(angle) * (pt.y - o.y) + o.x;

    var rotatedY =
        Math.sin(angle) * (pt.x - o.x) + Math.cos(angle) * (pt.y - o.y) + o.y;

    return { x: rotatedX, y: rotatedY };
}

// This is just about drawing the circles at the corners.
function drawCorners(rect, angle) {
    var rectPos = rect.position();

    var x = 0,
        y = 0;
    for (var i = 0; i < 4; i = i + 1) {
        switch (i) {
            case 0:
                x = rectPos.x;
                y = rectPos.y;
                break;

            case 1:
                x = rectPos.x + rect.width();
                y = rectPos.y;
                break;

            case 2:
                x = rectPos.x + rect.width();
                y = rectPos.y + rect.height();
                break;

            case 3:
                x = rectPos.x;
                y = rectPos.y + rect.height();
                break;
        }

        var pt = rotatePoint({ x: x, y: y }, { x: rectPos.x, y: rectPos.y }, angle);
        circles[i].position(pt);
        console.log("pt", pt);
    }
}

// rotate and redraw the rectangle
function rotateUnderMouse() {
    // Get the stage position of the mouse
    var mousePos = stage.getPointerPosition();

    // get the stage position of the mouse
    var shapePos = rect.position();

    // compute the vector for the difference
    var rel = { x: mousePos.x - shapePos.x, y: mousePos.y - shapePos.y };

    // Now apply the rotation
    angle = angle + 90;

    circle.position({ x: mousePos.x, y: mousePos.y });
    circle.show();

    // and reposition the shape to keep the same point in the shape under the mouse
    var newPos = { x: mousePos.x + rel.y, y: mousePos.y - rel.x };

    rect.position(newPos);
    rect.rotation(angle);

    // re-calculate and draw the circle positions.
    drawCorners(rect, angle);

    stage.draw();
}

function setup() {
    // Set up a stage and a shape
    stage = new Konva.Stage({
        container: "canvas-container",
        width: 650,
        height: 300
    });

    layer = new Konva.Layer();
    stage.add(layer);

    newPos = { x: 80, y: 100 };
    rect = new Konva.Rect({
        width: 140,
        height: 50,
        x: newPos.x,
        y: newPos.y,
        draggable: true,
        stroke: "silver",
        fill: "cyan"
    });

    // not very dry, setting up the corner circles.
    circle = new Konva.Circle({
        x: newPos.x,
        y: newPos.y,
        radius: 10,
        fill: "magenta"
    });
    circles[0] = circle.clone();
    circles[0].fill("lime");
    layer.add(circles[0]);
    circles[1] = circle.clone();
    circles[1].fill("gold");
    layer.add(circles[1]);
    circles[2] = circle.clone();
    circles[2].fill("blue");
    layer.add(circles[2]);
    circles[3] = circle.clone();
    circles[3].fill("darkviolet");

    layer.add(circles[3]);

    layer.add(rect);
    layer.add(circle);
    circle.hide();

    drawCorners(rect, 0);

    stage.draw();

    rect.on("mousedown", function () {
        rotateUnderMouse();
    });
}

var stage,
    layer,
    rect,
    circles = [],
    angle = 0;

setup();
