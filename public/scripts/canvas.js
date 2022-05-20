const canvas = document.getElementById('canvas')

canvas.height = canvas.height
canvas.width =  canvas.width

const context = canvas.getContext('2d')

//Save Canvas
function loadCanvas(){
  var img = new Image;
  img.src = canvasData;
  context.drawImage(img,0,0);

  console.log(canvasData);
}

//Save Canvas
function saveCanvas(){
  canvasData = canvas.toDataURL("image/png");
  console.log(canvasData);
}

// Eraser
const erase = () => context.globalCompositeOperation = 'destination-out'

// Reset canvas
const resetCanvas = () => context.clearRect(0, 0, canvas.width, canvas.height)

// Change colors
const changeColor = color => {
  context.strokeStyle = color
  context.globalCompositeOperation = 'source-over'
}

// Change line width
context.lineWidth = 2
const changeWidth = value => context.lineWidth = value

// Draw logic
let isDrawing = false

const startDrawing = (event) => {
  isDrawing = true
  context.beginPath()
  context.moveTo(event.offsetX, event.offsetY)
}
const stopDrawing = () => {
  isDrawing = false
}
const draw = (event) => {
  if (!isDrawing) return
  context.lineTo(event.offsetX, event.offsetY)
  context.stroke()
}
const enterCanvas = (event) => {
  context.beginPath()
}

window.addEventListener("mousedown", startDrawing)
window.addEventListener("mouseup", stopDrawing)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseover", enterCanvas)