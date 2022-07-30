let container = document.getElementById('container');
let pickColor = document.getElementById('pick-color')
let sizeValue = document.getElementById('size-value')
let sizeSlider = document.getElementById('size-slider')

let size = 16;
let color = 'black';

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

        //old way i did event listener
        // document.querySelectorAll('.grid-item').forEach(item => {
        //     item.addEventListener('mouseover', event => {
        //         item.style.backgroundColor = color;
        //         console.log(item);
        //     })
        // })

    }   
}

//function for changing background color
function changeColor(e){
    console.log(e.type)
    if(e.type === 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = color;
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