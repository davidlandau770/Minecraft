const grid = document.getElementById("grid");

const tools = {
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
// Generate all trees on grass
function generateTrees() {
    const grassBlocks = document.querySelectorAll(".grass");
    const numTrees = Math.max(1, Math.floor(grassBlocks.length / 20));
    for (const _ of Array(numTrees)) {
        const ground = grassBlocks[Math.floor(Math.random() * grassBlocks.length)];
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
    row.innerHTML = `<img src="imgs/${type}.webp" class="img">`;
}

generateTheWorld();
