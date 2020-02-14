var canvas = document.getElementById('zone');
var ctx = canvas.getContext('2d');

var width = (height = 20);
var x = Math.trunc(Math.random() * canvas.width / width) * width;
var y = Math.trunc(Math.random() * canvas.height / height) * height
var moveX = (moveY = 0);
var trace = [0, 0];
var sizetrace = 5;
var jumptrace = 1;
var lastmove = 0;
var AppleX = Math.trunc(Math.random() * canvas.width / width) * width;
var AppleY = Math.trunc(Math.random() * canvas.height / height) * height;
var score = 0;
var timeout = 0;
var randomcolor = 0;
var radial = ctx.createRadialGradient(200, 100, 50, 200, 100, 775);
var life = 5;
var collisiontrace = false;
var speed = 100;
var level = 1;
var sizelevel = 50;


radial.addColorStop(0, '#34495e');
radial.addColorStop(0.25, '#2c3e50');

window.onload = function () {
    var interval = setInterval(game, 100);
    document.addEventListener("keydown", keyboard);
    /*this.highscores()*/
}

function game() {
    if (life != 0) {
        document.getElementById("highscore").innerHTML = localStorage.getItem("highscore");
        x += moveX * width;
        y += moveY * height;
        trace.push({
            x: x,
            y: y
        });
        while (trace.length > sizetrace) {
            trace.shift();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = radial;
        ctx.arc(200, 100, 335, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#f1c40f";
        for (var i = 0; i < trace.length; i++) {
            if (i == trace.length - 1) {
                switch (randomcolor) {
                    case 0:
                        ctx.fillStyle = "#d35400";
                        break;
                    case 1:
                        ctx.fillStyle = "#9b59b6";
                        break;
                    default:
                        ctx.fillStyle = "#1abc9c";
                }
            }
            ctx.fillRect(trace[i].x, trace[i].y, width - 4, height - 4);
        }
        ctx.beginPath();
        ctx.arc(AppleX + 10, AppleY + 10, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#e74c3c";
        ctx.fill();
        ctx.closePath();
        if (x == AppleX && y == AppleY) {
            timeout = 0;
            randomcolor++;
            randomcolor %= 3;
            sizetrace += jumptrace;
            AppleX = Math.trunc(Math.random() * canvas.width / width) * width;
            AppleY = Math.trunc(Math.random() * canvas.height / height) * height;
            score += 10;
        } else if (timeout++ > 100) {
            timeout = 0;
            AppleX = Math.trunc(Math.random() * canvas.width / width) * width;
            AppleY = Math.trunc(Math.random() * canvas.height / height) * height;
        }
        ctx.font = '16px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('Score: ' + score, 5, 20);
        ctx.font = '20px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('Niveau: ' + parseInt(Math.trunc(score / 100) + 1), canvas.width / 2 - 40, 20);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#2ecc71';
        ctx.fillText('V', AppleX + 3, AppleY + 3);
        ctx.save();
        ctx.scale(1, 1.5);
        ctx.beginPath();
        ctx.arc(AppleX + 10 + 3, (AppleY + 10) / 1.5, 10 / 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ed7365";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        ctx.font = '16px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('vies restante: ' + life, canvas.width - 130, 20);
        if (trace.length > 5) {
            for (var i = 0; i < trace.length - 1; i++) {
                if ((trace[i].x == trace[trace.length - 1].x && trace[i].y == trace[trace.length - 1].y) && (lastmove != 80)) {
                    collisiontrace = true;
                    break;
                }
            }
        }
        if (x < 0 || x > (canvas.width - width) || y < 0 || y > (canvas.height - height) || collisiontrace == true) {
            console.log(collisiontrace);
            timeout = 0;
            trace = [];
            x = Math.trunc(Math.random() * canvas.width / width) * width;
            y = Math.trunc(Math.random() * canvas.height / height) * height;
            trace.push({
                x: x,
                y: y
            });
            sizetrace = 5;
            AppleX = Math.trunc(Math.random() * canvas.width / width) * width;
            AppleY = Math.trunc(Math.random() * canvas.height / height) * height;
            life--;
            collisiontrace = false;
        }
        if (parseInt(Math.trunc(score / sizelevel) + 1) > level) {
            level++;
            speed = speed - speed / 5;
            clearTimeout(interval);
            interval = setInterval(game, speed);
        }
        
    } else if (life == 0) {
        //var file = new XMLHttpRequest();
        if (typeof(Storage) !== "undefined") {
            var hs = localStorage.getItem("highscore");
            if (hs < score) {
                localStorage.setItem("highscore", score);
            }
        }
        ctx.font = '40px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('GAME OVER', canvas.width / 2 - 130, canvas.height / 2);
        if (interval) {
            clearTimeout(interval);
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    this.console.log("okok");
    document.getElementById("first-highscorename").value = "PUTE";
    document.getElementById("first-highscore").innerHTML = "PUPUTE";
    console.log('DOM fully loaded and parsed');
});

function highscores() {
    fetch('highscores.txt')
            .then(response => response.text())
            .then(text => {
                const hs = text.split('\n');
                console.log(hs[9]);
                let hs1 = hs[0].split(':');
                console.log("tesdsst " + hs1[0]);
                let hs2 = hs[1].split(':');
                let hs3 = hs[2].split(':');
                let hs4 = hs[3].split(':');
                let hs5 = hs[4].split(':');
                let hs6 = hs[5].split(':');
                let hs7 = hs[6].split(':');
                let hs8 = hs[7].split(':');
                let hs9 = hs[8].split(':');
                let hs10 = hs[9].split(':');
                document.getElementById("firsthsn").innerHTML = hs1[0];
                document.getElementById("firsths").innerHTML = hs1[1];
                document.getElementById("secondhsn").innerHTML = hs2[0];
                document.getElementById("secondhs").innerHTML = hs2[1];
                document.getElementById("thirdhsn").innerHTML = hs3[0];
                document.getElementById("thirdhs").innerHTML = hs3[1];
                document.getElementById("fourhs").innerHTML = hs4[0];
                document.getElementById("fourhsn").innerHTML = hs4[1];
                document.getElementById("fivehs").innerHTML = hs5[0];
                document.getElementById("fivehsn").innerHTML = hs5[1];
                document.getElementById("sixhs").innerHTML = hs6[0];
                document.getElementById("sixhsn").innerHTML = hs6[1];
                document.getElementById("sevenhs").innerHTML = hs7[0];
                document.getElementById("sevenhsn").innerHTML = hs7[1];
                document.getElementById("eighths").innerHTML = hs8[0];
                document.getElementById("eighthsn").innerHTML = hs8[1];
                document.getElementById("ninehs").innerHTML = hs9[0];
                document.getElementById("ninehsn").innerHTML = hs9[1];
                document.getElementById("tenhs").innerHTML = hs10[0];
                document.getElementById("tenhsn").innerHTML = hs10[1];
            })
}



function restart() {
    moveX = (moveY = 0);
    trace = [0, 0];
    sizetrace = 5;
    jumptrace = 1;
    lastmove = 0;
    AppleX = Math.trunc(Math.random() * canvas.width / width) * width;
    AppleY = Math.trunc(Math.random() * canvas.height / height) * height;
    score = 0;
    timeout = 0;
    randomcolor = 0;
    life = 5;
    collisiontrace = false;
    speed = 100;
    level = 1;
    sizelevel = 50;
}

function keyboard(evt) {
    switch (evt.keyCode) {
        case 38:
            if (lastmove == 40) {
                break;
            }
            moveX = 0;
            moveY = -1;
            lastmove = evt.keyCode;
            break;
        case 37:
            if (lastmove == 39) {
                break;
            }
            moveX = -1;
            moveY = 0;
            lastmove = evt.keyCode;
            break;
        case 40:
            if (lastmove == 38) {
                break;
            }
            moveX = 0;
            moveY = 1;
            lastmove = evt.keyCode;
            break;
        case 39:
            if (lastmove == 37) {
                break;
            }
            moveX = 1;
            moveY = 0;
            lastmove = evt.keyCode;
            break;
        case 80:
            moveX = 0;
            moveY = 0;
            lastmove = evt.keyCode;
            break;
        case 27:
            restart();
            break;
    }
}