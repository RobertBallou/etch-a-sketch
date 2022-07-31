let container = document.getElementById('container');
let pickColor = document.getElementById('pick-color')
let sizeValue = document.getElementById('size-value')
let sizeSlider = document.getElementById('size-slider')

let size = 16;
let color = 'black';
let colorMode = 'color';

let mouseDown = false
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
            div.addEventListener('mouseover', changeColor)
            div.addEventListener('mousedown', changeColor)
            container.appendChild(div);
        }
    }   
}

//function for changing background color
function changeColor(e){
    console.log(colorMode)
    if(e.type === 'mouseover' && !mouseDown) return;
    if (colorMode === 'color'){
        e.target.style.backgroundColor = color;
    } else if (colorMode === 'rainbow'){
        let a = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let c = Math.floor(Math.random()*256);
        e.target.style.backgroundColor = `rgb(${a}, ${b}, ${c})`;
    }
}

//event listener allowing you to clear hovered grid.
document.getElementById('reset-grid').onclick = () => {
    createGrid(size);
}

//pick a color for the background
pickColor.oninput = (e) => {
    color = e.target.value;
    console.log(color);
}

//event listener to change the displayed size on slider
sizeSlider.onmousemove = (e) => {
    sizeValue.innerHTML = `${e.target.value} x ${e.target.value}`;
}

//event listener to change the grid to set size selected
sizeSlider.onchange = (e) => {
    size = e.target.value;
    container.style.gridTemplateRows = `repeat(${e.target.value}, 1fr`;
    container.style.gridTemplateColumns = `repeat(${e.target.value}, 1fr`;
    createGrid(e.target.value);
}

document.getElementById('color').oninput = () => {
    colorMode = 'color'
}

document.getElementById('rainbow').oninput = () => {
    colorMode = 'rainbow'
}