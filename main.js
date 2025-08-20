const grid = document.getElementById("grid")

const tools = {
    hoe: 0,
    ax: 0,
    spade: 0,
    scissors: 0
}

function addClassAndImg(square, type) {
    square.classList.add(type);
    const img = document.createElement("img");
    img.setAttribute("src", `imgs/${type}.webp`);
    img.classList.add("img");
    img.classList.add(type);
    square.appendChild(img);
}

function initialSetup() {
    grid.innerText = "";
    for (let i = 0; i < 3000; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.id = "square-" + i;
        if (i < 100 * 10) square.classList.add("Heaven");
        else if (i < 100 * 11) addClassAndImg(square, "grass");
        else if (i < 100 * 15) addClassAndImg(square, "dirt");
        else if (i < 100 * 28) addClassAndImg(square, "stone");
        else if (i < 100 * 30) addClassAndImg(square, "bedrock");
        grid.appendChild(square);
    }
}
initialSetup()

const square = document.getElementsByClassName("square");
for (let i of square) {
    i.addEventListener("click", (e) => {
        if (e.target.classList[1] = "grass") {
            // const id = 
        }
        console.log(e.target.classList[1]);
    })
}