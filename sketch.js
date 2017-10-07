var c;
var jellyfish;
var trees = [];
//var img;
var pause = false;
var frameCount = 0;
var speed;
var uptree, downtree;
var pic;
var userimg;
var msgcount = 2;

function preload() {
    // torus = loadImage('https://i.imgur.com/2wilz63.png');
    // s1 = loadImage('https://i.imgur.com/idouxLd.png');
    // s2 = loadImage('https://i.imgur.com/zJihfcd.png');
    // s3 = loadImage('https://i.imgur.com/nraDhvS.png');
    torus = loadImage('torus.png');
    s1 = loadImage('s1.png');
    s2 = loadImage('s2.png');
    s3 = loadImage('s3.png');
    // uptree = loadImage('https://i.imgur.com/S4rBJPI.png');
    uptree = loadImage('spooky_tree_upright.png');
    // downtree = loadImage('https://i.imgur.com/BfKbpOu.png');
    downtree = loadImage('spooky_tree_inverted.png');
    // bg = loadImage('https://i.imgur.com/87efIKe.jpg');
    bg = loadImage('background.jpeg');

}

function setup() {
    c = createCanvas(innerWidth, innerHeight);
    jellyfish = new Jellyfish();
    chbox = createCheckbox();
    chbox.position(width - 20, 53);
    chbox.checked(true);
    score = createP('Score: <span id="score">0</span>');
    score.position(width-150, 10);
    slider = createSlider(0, 10, 4, 1);
    slider.position(width - 150, 50);
    pic = floor(random(4));
    trees.push(new Tree());
    trees.push(new Tree());
    trees[1].x = width / 2 + 1360 / 4;
    trees[0].x = width / 2;

    c.drop(gotFile);
}

window.onresize = function () {
    if (width != innerWidth || height != innerHeight) {
        c.size(innerWidth, innerHeight);

        chbox.position(width - 20, 53);

        slider.position(width - 150, 50);
        jellyfish.r = 24 * height / 600;

        trees.splice(0, trees.length);
        trees.push(new Tree());
        trees.push(new Tree());
        trees[1].x = width / 2 + 1360 / 4;
        trees[0].x = width / 2;
    }
};

function gotFile(file) {
    if (file.type === 'image') {
        userimg = createImg(file.data).hide();
    } else {
        alert("Not an image file!");
    }
}

function draw() {
    if (!pause) {
        imageMode(CORNER);
        background(bg);

        speed = slider.value();

        for (var i = trees.length - 1; i >= 0; i--) {
            trees[i].show();
            trees[i].update();

            if (trees[i].hits(jellyfish)) {
                pic = floor(random(4));
            }

            if (trees[i].offscreen()) {
                trees.splice(i, 1);
            }
            score = document.getElementById('score');
            number = score.innerHTML;

            if(parseInt(number) < -15000) {
                alert('your final score was below 100000, you lose, this page will refresh. Please try again');
                window.location.reload(true);
            } else if (parseInt(number) > 25000) {
                alert('Congratulations, you have beaten the game, you win! This page will refresh for a fresh start');
                window.location.reload(true);
            }
        }

        jellyfish.update();
        jellyfish.show();

        if (frameCount % floor(1360 / (4 * speed)) == 0) {
            score = document.getElementById('score');
            number = score.innerHTML;
            score.innerHTML = parseInt(number) + (slider.value() * 70);
            trees.push(new Tree());
        }

        if (chbox.checked()) tutorial();
        else chbox.remove();

        frameCount++;
    }
}

function tutorial() {
    textSize(20);
    if (frameCount < 200)
        text("Press spacebar or click the mouse to jump", 0, height / 2);

    else if (frameCount == 250) {
        pause = true;
        text("Unpause the game by pressing p (you can pause the same way", 0, height / 2);
    }

    if (frameCount < 1250 && frameCount > 900 && frameCount % 3 == 0)
        text("Control Speed", width - 150 - 20 * sin(map(frameCount, 900, 1250, 0, 2 * 3.1416)), 30);


    if (frameCount > 1500) chbox.remove();
}

function keyPressed() {
    if (key == " " && !pause) {
        jellyfish.up();
    }
    if (key == "p" || key == "P") {
        pause = !pause;
        if (pause && msgcount) {
            alert("Easter egg: Try dropping an image on this page ;)");
            msgcount--;
        }
    }
}

function mousePressed() {
    jellyfish.up();
}
