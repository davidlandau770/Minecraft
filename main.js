const grid = document.getElementById("grid");

const conBlocks = {
    hoe: 0,
    ax: 0,
    spade: 0,
    scissors: 0
};

function generateTheWorld() {
    grid.innerText = "";
    for (let i = 0; i < 3000; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.id = "row-" + i;

        if (i < 100 * 10) {
            square.classList.add("Heaven"); // Sky
        }
        else if (i < 100 * 11) {
            square.classList.add("grass"); // Grass layer
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/grass.webp");
            img.classList.add("img");
            square.appendChild(img);
        }
        else if (i < 100 * 15) {
            square.classList.add("dirt"); // Dirt layer
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/dirt.webp");
            img.classList.add("img");
            square.appendChild(img);
        }
        else if (i < 100 * 28) {
            square.classList.add("stone"); // Stone layer
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/stone.webp");
            img.classList.add("img");
            square.appendChild(img);
        }
        else if (i < 100 * 30) {
            square.classList.add("bedrock"); // Bedrock layer
            const img = document.createElement("img");
            img.setAttribute("src", "imgs/bedrock.webp");
            img.classList.add("img");
            square.appendChild(img);
        }
        grid.appendChild(square);
    }
    generateTrees();
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
    const row = document.getElementById("row-" + idx);
    if (!row || !row.classList.contains("Heaven")) return;
    row.className = "square " + type;
    while (row.firstChild) row.removeChild(row.firstChild);
    const img = document.createElement("img");
    img.src = `imgs/${type}.webp`;
    img.classList.add("img");
    row.appendChild(img);
}
// Mark tree + spacing to prevent nearby trees
function markTree(ground, spacing = 5) {
    const idx = parseInt(ground.id.split("-")[1]);
    for (let offset = -spacing; offset <= spacing; offset++) {
        const row = document.getElementById("row-" + (idx + offset));
        if (row) row.setAttribute("hasATree", true);
    }
}

generateTheWorld();

const tools = document.querySelectorAll(".tools");
tools.addEventListener("click", (e) => {
    const tool = e.target.id;
    if (tool === "hoe" || tool === "ax" || tool === "spade" || tool === "scissors") {
}


function setupToolSelection(idblock) {
        if (condition) {
            
        }
}