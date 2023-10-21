song ="";
rightWristY = 0;
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoseses);

}
function draw() {
    image(video,0,0,600,500);
    fill("FF0000");
    stroke("FF0000");

    
    if(score_rightWrist > 0.2){
        circle(rightWristX, rightWristY,20);
        if (rightWristY >0 && rightWristY <=100){
            document.getElementById("Speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
    
        else if (rightWristY >100 && rightWristY <=200){
            document.getElementById("Speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
    
        else if (rightWristY >200 && rightWristY <=300){
            document.getElementById("Speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (rightWristY >300 && rightWristY <=400){
            document.getElementById("Speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if (rightWristY >400 && rightWristY <=500){
            document.getElementById("Speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(score_leftWrist > 0.2){

    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
    
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('Posenet is initialised');
}
function gotPoseses(results){
    if (results.length > 0){
        console.log(results);
        score_rightWrist = results[0].pose.keypoints[10].score
        score_leftWrist = results[0].pose.keypoints[9].score
        console.log("score_rightWrist = " + score_rightWrist + "score_leftWrist = " + score_leftWrist)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    }
}
