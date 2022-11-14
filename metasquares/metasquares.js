class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

function init() {
  
  board = [];
  turn = 1;
  counted = [];
  score = [];
  squares = [];
  for (let i = 0; i < 6; i++) {
    let arr = [];
    for (let j = 0; j < 6; j++) {
      arr.push(0);
    }
    board.push(arr);
  }

  for (let i = 0; i < 6; i++) {
    let a = [];
    for (let j = 0; j < 6; j++) {
      let ar = [];
      for (let k = 0; k < 6; k++) {
        let arr = [];
        for (let l = 0; l < 6; l++) {
          arr.push(0);
        }
        ar.push(arr);
      }
      a.push(ar);
    }
    counted.push(a);
  }
  for (let i = 0; i <= players; i++) {
    score.push(0);
  }
  
  
}


var board = [];
var board_size = 6;
var spacing = 80;
var turn = 1;
var players = 2;
var colors = [new Color(0, 0, 0, 127), new Color(255, 0, 0, 127), new Color(0, 255, 0, 127), new Color(0, 0, 255, 127)];
var counted = [];
var score = [];
var squares = [];

function setup() {
  createCanvas(800, 600);

  init();

}

function draw() {
  background(220);
  gameboard();
  textstuff();
  reset();

}

function gameboard() {

  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      let c = colors[board[y][x]];
      // print(c);
      fill(c.r, c.g, c.b, c.a);
      ellipse(100 + x * 80, 100 + y * 80, 20);
    }
  }

  let coord = mouseOnWhichNode();

  if (coord[0] != -1 && coord[1] != -1) {
    // console.log(coord);
    let curY = coord[0],
      curX = coord[1];
    let c = colors[board[curY][curX]];
    // print(c);
    fill(c.r, c.g, c.b, c.a);

    ellipse(100 + curX * 80, 100 + curY * 80, 40);
  }

  for (let i of squares) {
    let c = colors[board[i[0]][i[1]]];
    fill(c.r, c.g, c.b, 32);
    drawSquare(i[0] + 1, i[1] + 1, i[2] + 1, i[3] + 1);
  }

}

function mouseOnWhichNode() {
  let x = -1,
    y = -1;
  if ((mouseX - 10) % 80 <= 20) {
    x = int((mouseX - 90) / 80);
  }
  if (x > 5) x = -1;
  if ((mouseY - 10) % 80 <= 20) {
    y = int((mouseY - 90) / 80);
  }
  if (y > 5) y = -1;
  return [y, x];
}

function mousePressed() {
  let arr = mouseOnWhichNode();
  if (arr[0] != -1 && arr[1] != -1) {
    if (!board[arr[0]][arr[1]]) {
      board[arr[0]][arr[1]] = turn;
      // turn++;
      turn %= players;
      turn++;
      // console.log(arr);
      // console.log(board[0], board[1]);
    }
  }
  calculation();
}

function calculation() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] != 0) {
        // console.log("bruh", i, j);
        for (let k = 0; k < 6; k++) {
          for (let l = 0; l < 6; l++) {
            if (k != 0 || l != 0) {
              // console.log("bruhmomento");

              let p = i + k,
                q = j + l,
                r = i + l,
                s = j - k,
                t = i + k + l,
                u = j - k + l;
              // if (k == 1 && l == 1) print("wot", i, j, p, q, r, s, t, u);
              let oof = (inb(p) && inb(q) && inb(r) && inb(s) && inb(t) && inb(u) && counted[i][j][t][u] == 0);

              if (oof) {
                // print("oof", oof, i, j, k, l);
                // console.log("OEUORIWU", i, j, p, q, r, s, t, u);
                let a = board[i][j];
                let b = board[p][q];
                let c = board[r][s];
                let d = board[t][u];
                // console.log("abcd", a, b, c, d);
                if (a == b && b == c && c == d) {
                  // console.log("bruhmomentoshit");
                  counted[i][j][t][u] = true;
                  counted[p][q][r][s] = true;
                  score[a] += k * k + l * l;
                  squares.push([i, j, t, u]);
                  // println(k, l, k * k + l * l);
                  // console.log("BHURBHUGBRHUBBUHBUHUBHUHBHU", score, squares);
                }
              }
            }
          }
        }
      }
    }
  }
}

function inb(a) {
  return 0 <= int(a) && int(a) < 6;
}

function drawSquare(a, b, c, d) {
  // print("bruhmomented", a, b, c, d);
  // print("bruhwitherheuihri owo");
  let firstX = (600 / 2 - board_size * spacing / 2 - spacing / 2);
  let firstY = (height / 2 - board_size * spacing / 2 - spacing / 2);
  let l = d + c - a - b;
  l /= 2;
  let k = c - l - a;
  beginShape();
  vertex(firstX + b * spacing, firstY + a * spacing);
  vertex(firstX + (b + l) * spacing, firstY + (a + k) * spacing);
  vertex(firstX + (d) * spacing, firstY + (c) * spacing);
  vertex(firstX + (b - k) * spacing, firstY + (a + l) * spacing);
  endShape(CLOSE);
}

function textstuff() {
  let c = colors[turn];
  fill(c.r, c.g, c.b);
  textSize(20);
  text("player " + turn + "'s turn!", 580, 100);
  for (let i = 1; i <= players; i++) {
    c = colors[i];
    fill(c.r, c.g, c.b);
    textSize(20);
    text("player " + i + ":   " + score[i], 580, 100 + i * 50);
  }
}
function reset(){
  fill(255,255,255);
  rect(580,400,200,100);
  fill(0,0,0);
  textSize(20);
  text("click to", 650,425);
  textSize(30);
  text("RESET", 630,460);
  if(mouseX>580 && mouseX<780 && mouseY>400 && mouseY<500){
    if(mouseIsPressed){
      init();
    }
  }
}
