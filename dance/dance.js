const celebrateSource = "../svd_720.mp4";

function consoleCelebrate() {
  const ROW_PIXELS = 20;
  const COL_PIXELS = 10;

  const whoomp = document.querySelector("#whoomp");

  if (whoomp) {
    console.log("There it is");
  }

  whoomp.addEventListener("loadeddata", onVideoLoaded, false);
  whoomp.src = celebrateSource;

  function onVideoLoaded() {
    const width = whoomp.clientWidth;
    const height = whoomp.clientHeight;

    let backCanvas = document.createElement("canvas");
    backCanvas.width = width;
    backCanvas.height = height;
    const backContext = backCanvas.getContext("2d");

    setTimeout(draw, 20, whoomp, width, height, backContext);
  }

  // const DARK_TO_LIGHT = "@*!y;,-':` ".split('');
  const DARK_TO_LIGHT = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~                ".split(
    ""
  );

  const NORMALISER = DARK_TO_LIGHT.length / 256;

  function getChar(luminance) {
    const index = Math.floor(luminance * NORMALISER);
    return DARK_TO_LIGHT[index];
  }

  function drawToCanvas(sourceImageData) {
    const sourcePixels = sourceImageData.data;
    const numCols = sourceImageData.width;
    const numRows = sourceImageData.height;

    let rowStr = "\n\n\n\n\n\n\n ";

    for (let row = 0; row < numRows; row += ROW_PIXELS) {
      const rowOffset = row * numCols * 4;
      for (let col = 0; col < numCols; col += COL_PIXELS) {
        const offset = rowOffset + 4 * col;
        const r = sourcePixels[offset];
        const g = sourcePixels[offset + 1];
        const b = sourcePixels[offset + 2];
        const luminance = Math.ceil(0.299 * r + 0.587 * g + 0.114 * b);

        let c = getChar(luminance);

        if (r === 255 && g === 255 && b === 255) {
          c = " ";
        }

        rowStr += c;
      }

      rowStr += "\n ";
    }

    console.log(
      "%c" + rowStr,
      "font-family: monospace; font-size: 8px; color: black"
    );
  }

  function draw(video, width, height, backContext) {
    backContext.drawImage(video, 0, 0, width, height);
    drawToCanvas(backContext.getImageData(0, 0, width, height));
    setTimeout(draw, 40, video, width, height, backContext);
  }
}

setTimeout(consoleCelebrate, 60);
