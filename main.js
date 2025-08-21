const grid = document.getElementById("grid");

const countBlocks = {
    "stone": 0,
    "dirt": 0,
    "grass": 0,
    "oakLog": 0,
    "oakLeaves": 0
};

function addClassAndImg(i, square, type) {
    square.classList.add(type);
    const img = document.createElement("img");
    img.setAttribute("src", `imgs/${type}.webp`);
    img.id = "img-" + i;
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
        if (i < 100 * 10) square.classList.add("Heaven");
        else if (i < 100 * 11) addClassAndImg(i, square, "grass");
        else if (i < 100 * 15) addClassAndImg(i, square, "dirt");
        else if (i < 100 * 28) addClassAndImg(i, square, "stone");
        else if (i < 100 * 30) addClassAndImg(i, square, "bedrock");
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

const square = document.getElementsByClassName("square");
let eventBlock = "";
for (let i of square) {
    i.addEventListener("click", (e) => {
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
    })
}

function removeBlock(block, type) {
    block.className = "removed";
    countBlocks[type]++;
    const typeBlock = document.getElementById(type);
    console.log(countBlocks);
    blockNumbering(countBlocks[type], typeBlock)
}

function blockNumbering(typeCon, typeBlock) {
    if (typeCon === 1) {
        typeBlock.style.display = "flex";
        typeBlock.style.alignItems = "end"
        const counter = document.createElement("p")
        counter.innerText = typeCon;
        typeBlock.appendChild(counter)
    }
    else if (typeCon > 1) {
        typeBlock.querySelector("p").innerText = typeCon;
    }
}
//החלקים המסולקים מהמסך

const blocks = document.getElementsByClassName("block");
for (const block of blocks) {
    block.classList.add("removed");
}
//הוספת מחסנית
const stack = document.getElementsByClassName("blocks")[0].addEventListener("click", (e) => {
    const block = e.target;
    console.log(block);
});


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
    if (!square || !square.classList.contains("Heaven")) return;
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

