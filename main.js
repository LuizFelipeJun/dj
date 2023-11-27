var canvas, video, poseNet, music;
var music1 = "";
var music2 = "";
var music1Status = "";
var music2Status = "";
var scoreRightWrist = 0;
var scoreLeftWrist = 0;
var xRightWrist = 0;
var xLeftWrist = 0;
var yRightWrist = 0;
var yLeftWrist = 0;

function preload() {
    music1 = loadSound("musica1.mp3");
    music2 = loadSound("musica2.mp3");
}

function setup() {
    canvas = createCanvas(550, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Pose net foi inicializado");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        xRightWrist = results[0].pose.rightWrist.x;
        xLeftWrist = results[0].pose.leftWrist.x;
        yRightWrist = results[0].pose.rightWrist.y;
        yLeftWrist = results[0].pose.leftWrist.y;
    }
}

function play() {
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function draw() {
    image(video, 0, 0, 600, 500);
    music1Status = music1.isPlaying();
    music2Status - music2.isPlaying();
    fill("black");
    stroke("white");
    if(scoreRightWrist > 0.2) {
        circle(xRightWrist, yRightWrist, 20);
        music2.stop();
        if(music1Status == false) {
            music1.play();
            document.getElementById("musica").innerHTML = "Tocando musica: Lovely Bastards";
        }
    }
    if(scoreLeftWrist > 0.2) {
        circle(xLeftWrist, yLeftWrist, 20);
        music1.stop();
        if(music2Status == false) {
            music2.play();
            document.getElementById("musica").innerHTML = "Tocando musica: Rap Snitch Knishes";
        }
    }
}