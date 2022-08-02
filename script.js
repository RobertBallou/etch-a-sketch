let container = document.getElementById('container');
let pickColor = document.getElementById('pick-color')
let pickGridColor = document.getElementById('grid-color')
let sizeValue = document.getElementById('size-value')
let sizeSlider = document.getElementById('size-slider')
let gridItem = document.getElementsByClassName('grid-item');

let size = 16;
let color = '#323643';
let gridColor = '#FFFFFF'
let colorMode = 'color';
let gridLines = false;
let mouseDown = false;

//when mouse is press down mouseDown is set to true. When up it's false.
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//start game with default size.
createGrid(size);

//create grid that also attaches eventlistener to grid as well as clears grid before making new grid.
function createGrid(size){
    container.innerHTML = "";
    if(size < 101){
        for (let i = 0; i < (size*size); i++){
            let div = document.createElement('div');
            div.className = "grid-item";
            div.style.backgroundColor = `${gridColor}`;
            div.addEventListener('mouseover', changeColor)
            div.addEventListener('mousedown', changeColor)
            container.appendChild(div);
        }
    } toggleGridLines();
}

//function for changing background color
function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown) return;
    if (colorMode === 'color'){
        e.target.style.backgroundColor = color;
        e.target.classList.add("colored");
    } else if (colorMode === 'rainbow'){
        let a = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let c = Math.floor(Math.random()*256);
        e.target.style.backgroundColor = `rgb(${a}, ${b}, ${c})`;
        e.target.classList.add("colored");
    } else if (colorMode === 'eraser'){
        e.target.style.backgroundColor = gridColor;
        e.target.classList.remove('colored');
    }
}

//function to add grid lines based off if gridLines is true or false.
function toggleGridLines(){
    if (gridLines === true){
        Array.from(document.getElementsByClassName("grid-item")).forEach((item) => {
                item.style.border = "1px solid black";
            });
    } else if (gridLines === false){
        Array.from(document.getElementsByClassName("grid-item")).forEach((item) => {
                item.style.border = "none";
            });
    }
}

//function to change the background color
function changeBackgroundColor(){
    Array.from(document.getElementsByClassName("grid-item")).forEach((item) => {
        if (item.className != "grid-item colored"){
            item.style.backgroundColor = `${gridColor}`;
        }
    });
}

//event listener allowing you to clear hovered grid.
document.getElementById('reset-grid').onclick = () => {
    createGrid(size);
}

//event listener to pick a color for the pen
pickColor.oninput = (e) => {
    color = e.target.value;

}

//event listener to pick a color for the background
pickGridColor.oninput = (e) => {
    gridColor = e.target.value;
    changeBackgroundColor();

}

//event listener to change the displayed size on slider
sizeSlider.onmousemove = (e) => {
    sizeValue.innerHTML = `Grid Size: ${e.target.value} x ${e.target.value}`;
}

//event listener to change the grid to set size selected
sizeSlider.onchange = (e) => {
    size = e.target.value;
    container.style.gridTemplateRows = `repeat(${e.target.value}, 1fr`;
    container.style.gridTemplateColumns = `repeat(${e.target.value}, 1fr`;
    createGrid(e.target.value);
}

//when color button is clicked the colorMode is changed
document.getElementById('color').oninput = () => {
    colorMode = 'color'
}

//when rainbow button is clicked the colorMode is changed
document.getElementById('rainbow').oninput = () => {
    colorMode = 'rainbow'
}

//when eraser button is clicked the colorMode is changed
document.getElementById('eraser').oninput = () => {
    colorMode = 'eraser'
}

//when gridlines is clicked add gridlines to grid-items.
document.getElementById('grid-lines').onchange = () => {
    if(gridLines === true){
        gridLines = false;
    }else if(gridLines === false){
        gridLines = true;
    }toggleGridLines();
}