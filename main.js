const grid = document.getElementById("grid")

const tools = {
    hoe: 0,
    ax: 0,
    spade: 0,
    scissors: 0
}

function generateTheWorld() {
    grid.innerText = "";
    for (let i = 0; i < 3000; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.id = "row-" + i;
        if (i < 100 * 10) {
            square.classList.add("Heaven");            
        }
        else if (i < 100 * 11) {
            square.classList.add("grass");
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/grass.webp");
            img.classList.add("img");
            square.appendChild(img);
        }
        else if (i < 100 * 15) {
            square.classList.add("dirt");
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/dirt.webp");
            img.classList.add("img");
            square.appendChild(img);
        }
        else if (i < 100 * 28) {
            square.classList.add("stone");
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/stone.webp");
            img.classList.add("img");
            square.appendChild(img);
        }
        else if (i < 100 * 30) {
            square.classList.add("bedrock")
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/bedrock.webp");
            img.classList.add("img");
            square.appendChild(img);
        }
        grid.appendChild(square);
    }
}
generateTheWorld()
