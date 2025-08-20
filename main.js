const grid = document.getElementById("grid");

const conBlocks = {
    hoe: 0,
    ax: 0,
    spade: 0,
    scissors: 0
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
            removeBlock(e.target);
        }
        console.log(eventBlock);
        console.log(tool);

    })
}
function removeBlock(block) {
    imgId.className = "removed";
}

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

// Hebrew note: קליק קצר על תמונה -> מחליף את סמן העכבר לתמונה הזו
// קליק נוסף -> מחזיר לסמן רגיל

let currentCursor = null;

document.querySelectorAll('.icon').forEach(img => {
    img.addEventListener('click', () => {
        // אם כבר אותה תמונה נבחרה -> מחזירים לסמן רגיל
        if (currentCursor === img.getAttribute("src")) {
            document.body.style.cursor = 'default';
            currentCursor = null;
        } else {
            // קובעים סמן חדש מהתמונה שנלחצה
            // "0 0" = נקודת העיגון (אפשר להזיז אם רוצים למרכז)
            document.body.style.cursor = `url(${img.getAttribute("src")}) x y, auto`;
            console.log(img.getAttribute("src"));

            currentCursor = img.getAttribute("src");
        }
    });
});
