var socket;

let myQuestion = "what color is the sky today? Type and press ENTER."

let contents = "";


function setup() {
    createCanvas(500, 400);


    socket = io.connect('https://solid-funicular-jj7j7xqpvqw6fprwp-3000.app.github.dev/');
    socket.on('mouse', newDrawing);
    socket.on('key', newText);

    background(150);
    fill(255, 150, 0);
    textSize(14);
}

function newDrawing(data) {
    noStroke();
    fill("black");
    ellipse(data.x, data.y, 30, 30);
}

function newText(words) {
    fill(255)
    text(words.c, random(0, width), random(100, height))
}

function draw() {
    background(50, 50, 50, 2)
    text(myQuestion, 50, 50)
}

function mouseDragged() {
    noStroke();
    fill("white");
    ellipse(mouseX, mouseY, 30, 30);

    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);
    console.log('sending ' + mouseX + ' , ' + mouseY);
}


function keyTyped() {
    contents = contents + key;
    if (keyCode === ENTER) {
        let splitString = split(contents, 'E');
        text(splitString[0], random(0, width), random(100, height), 400, 200);

        var words = {
            c: splitString[0]
        }

        socket.emit('key', words);
        console.log('sending ' + splitString[0]);
        contents = "";
    }

}