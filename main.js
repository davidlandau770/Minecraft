const grid = document.getElementById("grid");

const tools = {
    hoe: 0,
    ax: 0,
    spade: 0,
    scissors: 0
};

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
    generateTrees();
}

initialSetup()

const square = document.getElementsByClassName("square");
for (let i of square) {
    i.addEventListener("click", (e) => {
        if (e.target.classList[1] === "grass") {
            const id = document.getElementById(e.target.id)
            console.log(id);
        }
        // console.log(e.target.classList[1]);
    })
}

// --- Trees ---
function generateTrees() {
    const grassBlocks = [...document.querySelectorAll(".grass")];
    const numTrees = Math.max(1, Math.floor(grassBlocks.length / 20));
    for (const _ of Array(numTrees)) {
        let ground;
        // Pick a grass block without nearby trees (5-block spacing)
        do {
            ground = grassBlocks[Math.floor(Math.random() * grassBlocks.length)];
        } while (ground.hasAttribute("hasATree"));
        markTree(ground, 5); // Mark tree + spacing
        generateOakTree(ground);
    }
}
// Generate single oak tree
function generateOakTree(ground) {
    let idx = parseInt(ground.id.split("-")[1]) - 100;
    const height = 4 + Math.floor(Math.random() * 3); // Trunk height 4-6
    for (let i = 0; i < height; i++, idx -= 100) setRow(idx, "oak-log");

    const leafPattern = [3, 3, 2, 2, 1]; // Leaf width per layer
    leafPattern.forEach((width, i) => {
        for (let x = -width; x <= width; x++) {
            setRow(idx + 100 - i * 100 + x, "oak-leaves");
        }
    });
}
// Set block type and image for a row
function setRow(idx, type) {
    const square = document.getElementById("square-" + idx);
    if (!square || !square.classList.contains("Heaven")) return;
    square.className = "square " + type;
    while (square.firstChild) square.removeChild(square.firstChild);
    const img = document.createElement("img");
    img.src = `imgs/${type}.webp`;
    img.classList.add("img");
    square.appendChild(img);
}
// Mark tree + spacing to prevent nearby trees
function markTree(ground, spacing = 5) {
    const idx = parseInt(ground.id.split("-")[1]);
    for (let offset = -spacing; offset <= spacing; offset++) {
        const square = document.getElementById("square-" + (idx + offset));
        if (square) square.setAttribute("hasATree", true);
    }
}