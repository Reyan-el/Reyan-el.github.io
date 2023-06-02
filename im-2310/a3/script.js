// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variable to track if drawing or erasing is active
let isDrawing = false;
let isErasing = false;

// Store the selected color
let selectedColor = '#58F0F0';

// Store the cursor size
let cursorSize = 5;

// Store the drawn paths for undo functionality
let drawnPaths = [];

// Function to start drawing
function startDrawing(event) {
    if (isErasing) return;
    isDrawing = true;
    draw(event);
}

// Function to start erasing
function startErasing(event) {
    isErasing = true;
    erase(event);
}

// Function to stop drawing or erasing
function stopDrawingOrErasing() {
    isDrawing = false;
    isErasing = false;
    // Save the current path to the drawnPaths array for undo functionality
    drawnPaths.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

// Function to draw on the canvas
function draw(event) {
    if (!isDrawing) return;

    // Get the position of the mouse pointer relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Draw a small circle at the current position with the selected color
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, cursorSize, 0, 2 * Math.PI);
    ctx.fill();
}

// Function to erase on the canvas
function erase(event) {
    if (!isErasing) return;

    // Get the position of the mouse pointer relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Set the color to white (background color) to simulate erasing
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, cursorSize, 0, 2 * Math.PI);
    ctx.fill();
}

// Function to handle color selection
function selectColor(event) {
    selectedColor = event.target.style.backgroundColor;
    isErasing = false; // Disable eraser when a color is selected
}

// Function to increase cursor size
function increaseSize() {
    cursorSize += 2;
}

// Function to decrease cursor size
function decreaseSize() {
    if (cursorSize > 2) {
        cursorSize -= 2;
    }
}

// Function to fill the entire canvas with selected color
function fillCanvas() {
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to undo the last drawn path
function undo() {
    if (drawnPaths.length > 0) {
        ctx.putImageData(drawnPaths.pop(), 0, 0);
    }
}

// Add event listeners to start and stop drawing/erasing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawingOrErasing);
canvas.addEventListener('mouseleave', stopDrawingOrErasing);
canvas.addEventListener('mousemove', draw);

// Add event listeners to color palette options
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
    option.addEventListener('click', selectColor);
});

// Add event listeners to cursor size buttons
const increaseBtn = document.getElementById('increase-btn');
const decreaseBtn = document.getElementById('decrease-btn');
increaseBtn.addEventListener('click', increaseSize);
decreaseBtn.addEventListener('click', decreaseSize);

// Add event listener to fill button
const fillBtn = document.getElementById('fill-btn');
fillBtn.addEventListener('click', fillCanvas);

// Add event listener to undo button
const undoBtn = document.getElementById('undo-btn');
undoBtn.addEventListener('click', undo);
