function buildTable(data) {
    var node = document.createElement("table");
    var tr = document.createElement("tr");
    var headers = Object.keys(data[0]);
    for (var i=0; i<headers.length; ++i) {
        var header = headers[i];
        var ch = document.createElement("th");
        ch.appendChild(document.createTextNode(header));
        tr.appendChild(ch);
    }
    node.appendChild(tr);
    data.forEach(function (rowdata) {
        tr = document.createElement("tr");
        for (var i=0; i<headers.length; ++i) {
            var header = headers[i];
            var cd = document.createElement("td");
            cd.appendChild(document.createTextNode(rowdata[header]));
            if (typeof rowdata[header] == "number") {
                cd.style.textAlign = "right";
            }
            tr.appendChild(cd);
        }
        node.appendChild(tr);
    });
    return node;
}
var TEST = [
    {Header1: "1, 1", Header2: "2, 1", Header3: "3, 1", Header4: "4, 1"},
    {Header1: "1, 2", Header2: "2, 2", Header3: "3, 2", Header4: "4, 2"},
    {Header1: "1, 3", Header2: "2, 3", Header3: "3, 3", Header4: "4, 3"},
    {Header1: "1, 4", Header2: "2, 4", Header3: "3, 4", Header4: "4, 4"},
];

function buildButtons(btn1, btn2, btn3, btn4, btn5) {
    var button = document.createElement("button");
    var text = document.createTextNode(btn1);
    button.appendChild(text);
    document.body.appendChild(button).setAttribute("id","up");

    var button = document.createElement("button");
    var text = document.createTextNode(btn2);
    button.appendChild(text);
    document.body.appendChild(button).setAttribute("id","down");

    var button = document.createElement("button");
    var text = document.createTextNode(btn3);
    button.appendChild(text);
    document.body.appendChild(button).setAttribute("id","left");

    var button = document.createElement("button");
    var text = document.createTextNode(btn4);
    button.appendChild(text);
    document.body.appendChild(button).setAttribute("id","right");

    var button = document.createElement("button");
    var text = document.createTextNode(btn5);
    button.appendChild(text);
    document.body.appendChild(button).setAttribute("id","mark");
}

document.body.appendChild(buildTable(TEST));

buildButtons("UP", "DOWN", "LEFT", "RIGHT", "MARK");

var row = 1;
var cell = 0;

document.getElementsByTagName("table")[0].setAttribute("id","table1");
document.getElementById('table1').rows[row].cells[cell].style.border = '1px solid black';

function moveRight() {
    if (cell < 3) {
      document.getElementById('table1').rows[row].cells[cell].style.border = 'none';
      document.getElementById('table1').rows[row].cells[cell + 1].style.border = '1px solid black';
      cell += 1;
      console.log(cell);
    }
    else {
      return;  
    } 
}

function moveLeft() {
    if (cell > 0) {
      document.getElementById('table1').rows[row].cells[cell].style.border = 'none';
      document.getElementById('table1').rows[row].cells[cell - 1].style.border = '1px solid black';
      cell -= 1;
      console.log(cell);
    }
    else {
      return;  
    } 
}

function moveUp() {
    if (row > 1) {
      document.getElementById('table1').rows[row].cells[cell].style.border = 'none';
      document.getElementById('table1').rows[row - 1].cells[cell].style.border = '1px solid black';
      row -= 1;
      console.log(row);
    }
    else {
      return;  
    } 
}

function moveDown() {
    if (row < 4) {
      document.getElementById('table1').rows[row].cells[cell].style.border = 'none';
      document.getElementById('table1').rows[row + 1].cells[cell].style.border = '1px solid black';
      row += 1;
      console.log(row);
    }
    else {
      return;  
    } 
}

function markCell() {
  document.getElementById('table1').rows[row].cells[cell].style.backgroundColor = "yellow";
}
    
document.getElementById("right").addEventListener("click", moveRight);
document.getElementById("left").addEventListener("click", moveLeft);
document.getElementById("up").addEventListener("click", moveUp);
document.getElementById("down").addEventListener("click", moveDown);
document.getElementById("mark").addEventListener("click", markCell);