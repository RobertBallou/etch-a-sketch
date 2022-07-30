let container = document.getElementById('container');
let gridSize = document.getElementById('grid-size')

//create grid function that also attaches eventlistener
function createGrid(size){
    if(size < (size*size)){
        for (let i = 0; i < (size*size); i++){
            let div = document.createElement('div');
            div.className = "grid-item"
            container.appendChild(div);
        }
        document.querySelectorAll('.grid-item').forEach(item => {
            item.addEventListener('mouseover', event => {
                item.classList.add('colored');
                console.log(item);
            })
        })
    }   
}

createGrid(16);

gridSize.addEventListener('click', event => {
    let size = prompt("How many squares do you want per side of the grid? must be 100 or less");
    container.style.gridTemplateRows = `repeat(${size}, 1fr`;
    container.style.gridTemplateColumns = `repeat(${size}, 1fr`;
    container.innerHTML = "";
    createGrid(size);
})