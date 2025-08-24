const grid = document.getElementById("grid");

const countBlocks = {
    "stone": 0,
    "dirt": 0,
    "grass": 0,
    "oakLog": 0,
    "oakLeaves": 0
};

function addClassAndImg(square, type) {
    square.classList.add(type);
    const img = document.createElement("img");
    img.setAttribute("src", `imgs/${type}.webp`);
    img.classList.add(type);
    img.classList.add("img");
    square.appendChild(img);
}

function initialSetup() {
    grid.innerText = "";
    for (let i = 0; i < 3000; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.id = "square-" + i;
        if (i < 100 * 10) square.classList.add("heaven");
        else if (i < 100 * 11) addClassAndImg(square, "grass");
        else if (i < 100 * 15) addClassAndImg(square, "dirt");
        else if (i < 100 * 28) addClassAndImg(square, "stone");
        else if (i < 100 * 30) addClassAndImg(square, "bedrock");
        grid.appendChild(square);
    }
    generateTrees();
}

initialSetup()

let tool = ""
const tools = document.getElementsByClassName("tools")[0];
tools.addEventListener("click", (e) => {
    tool = e.target.id;
})

//המחסנית
let block = "";
const blocks = document.getElementsByClassName("block");
for (const oneBlock of blocks) {
    oneBlock.classList.add("removed");
    oneBlock.addEventListener("click", (e) => {
        block = oneBlock.id;
    })
}

const square = document.getElementsByClassName("square");
let eventBlock = "";
for (let i of square) {
    i.addEventListener("click", (e) => {
        removeBlocks(e);
        pushBlocks(e);
    })
}

const removeBlocks = (e) => {
    eventBlock = e.target.classList[0];
    if (tool === "toolsHoe" && eventBlock === "stone") {
        removeBlock(e.target, eventBlock);
    }
    else if (tool === "toolsSpade" && (eventBlock === "dirt" || eventBlock === "grass")) {
        removeBlock(e.target, eventBlock);
    }
    else if (tool === "toolsAx" && eventBlock === "oak-log") {
        removeBlock(e.target, eventBlock);
    }
    else if (tool === "toolsScissors" && eventBlock === "oak-leaves") {
        removeBlock(e.target, eventBlock);
    }
}

const pushBlocks = (e) => {
    eventBlock = e.target;
    if (block && countBlocks[block] > 0) {
        if (eventBlock.classList[0] === "square") {
            addClassAndImg(eventBlock, block)
            countBlocks[block]--
            minusStack(block, eventBlock)
        }
    }
}

function removeBlock(block, type) {
    block.classList.add("removed");
    countBlocks[type]++;
    const typeBlock = document.getElementById(type);
    plusStack(countBlocks[type], typeBlock)
}

function plusStack(typeCon, typeBlock) {
    if (typeCon === 1) {
        typeBlock.classList.add("counter");
        typeBlock.style.display = "flex";
        if (!typeBlock.querySelector("p")) {
            typeBlock.classList.add("counter");
            const counter = document.createElement("p")
            counter.innerText = typeCon;
            typeBlock.appendChild(counter);
        }
    }
    else if (typeCon >= 1) {
        typeBlock.querySelector("p").innerText = typeCon;
    }
    console.log("typeCon", typeCon);
    console.log('typeBlock', typeBlock);
    console.log('fdsfcscd');
}
function minusStack(typeCon, typeBlock) {
    const block = document.getElementById(typeCon);
    if (countBlocks[typeCon] === 0) {
        block.style.display = "none";

    }
    else {
        block.querySelector("p").innerText = countBlocks[typeCon];
    }
}

// עכבר בלחיצה על כלי
let currentCursor = null;
document.querySelectorAll('.icon').forEach(img => {
    img.addEventListener('click', () => {
        const src = img.getAttribute("src");
        if (currentCursor === src) {
            document.body.style.cursor = "auto";
            currentCursor = null;
        } else {
            document.body.style.cursor = `url(${src}) 16 16, auto`;
            currentCursor = src;
        }
    });
});

// --- Trees ---
function generateTrees() {
    const grassBlocks = [...document.querySelectorAll(".grass")];
    const numTrees = Math.max(4, Math.floor(grassBlocks.length / 20));
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
    if (!square || !square.classList.contains("heaven")) return;
    square.className = "square " + type;
    while (square.firstChild) square.removeChild(square.firstChild);
    const img = document.createElement("img");
    img.src = `imgs/${type}.webp`;
    img.classList.add(type);
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

