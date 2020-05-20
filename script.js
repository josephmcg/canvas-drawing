window.addEventListener("load", () => {
  const clearButton = document.querySelector("#clear");
  const blackButton = document.querySelector("#blackColor");
  const whiteButton = document.querySelector("#whiteColor");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = "./img.jpg";

  img.onload = () => {
    const [img_scaled_width, img_scaled_height] = drawImageToScale(img, ctx);
    canvas.width = img_scaled_width;
    canvas.height = img_scaled_height;
    window.addEventListener("resize", drawImageToScale(img, ctx));
  };

  // eventListeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousemove", draw);

  // variables
  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }

  clearButton.addEventListener("click", () =>
    clearCanvas(img, ctx, canvas.width, canvas.height)
  );
  blackButton.addEventListener("click", () => (ctx.strokeStyle = "#000000"));
  whiteButton.addEventListener("click", () => (ctx.strokeStyle = "#ffffff"));
});

function drawImageToScale(img, ctx) {
  const img_width = 650;
  const scaleFactor = img_width / img.width;
  const img_height = img.height * scaleFactor;
  ctx.drawImage(img, 0, 0, img_width, img_height);
  return [img_width, img_height];
}

function clearCanvas(img, ctx, img_scaled_width, img_scaled_height) {
  ctx.clearRect(0, 0, img_scaled_width, img_scaled_height);
  drawImageToScale(img, ctx);
}
