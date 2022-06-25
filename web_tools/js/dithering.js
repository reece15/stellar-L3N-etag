const bwrPalette = [
  [0, 0, 0, 0],
  [255, 255, 255, 0],
  [255, 0, 0, 0]
]

const bwPalette = [
  [0, 0, 0, 0],
  [255, 255, 255, 0],
]

function get_near_color(color, palette) {
  let minDistanceSquared = 255*255 + 255*255 + 255*255 + 1;

  let bestIndex = 0;
  for (let i = 0; i < palette.length; i++) {
      let rdiff = (color[0] & 0xff) - (palette[i][0] & 0xff);
      let gdiff = (color[1] & 0xff) - (palette[i][1] & 0xff);
      let bdiff = (color[2] & 0xff) - (palette[i][2] & 0xff);
      let distanceSquared = rdiff*rdiff + gdiff*gdiff + bdiff*bdiff;
      if (distanceSquared < minDistanceSquared) {
          minDistanceSquared = distanceSquared;
          bestIndex = i;
      }
  }
  return bestIndex;

}

function updatePixel(imageData, index, color) {
  imageData[index] = color[0];
  imageData[index+1] = color[1];
  imageData[index+2] = color[2];
  imageData[index+3] = color[3];
}

function dithering(ctx, width, height, threshold, type) {
  const bayerThresholdMap = [
    [  15, 135,  45, 165 ],
    [ 195,  75, 225, 105 ],
    [  60, 180,  30, 150 ],
    [ 240, 120, 210,  90 ]
  ];

  const lumR = [];
  const lumG = [];
  const lumB = [];
  for (let i=0; i<256; i++) {
    lumR[i] = i*0.299;
    lumG[i] = i*0.587;
    lumB[i] = i*0.114;
  }
  const imageData = ctx.getImageData(0, 0, width, height);

  const imageDataLength = imageData.data.length;

  // Greyscale luminance (sets r pixels to luminance of rgb)
  for (let i = 0; i <= imageDataLength; i += 4) {
    imageData.data[i] = Math.floor(lumR[imageData.data[i]] + lumG[imageData.data[i+1]] + lumB[imageData.data[i+2]]);
  }

  const w = imageData.width;
  let newPixel, err;

  for (let currentPixel = 0; currentPixel <= imageDataLength; currentPixel+=4) {

    if (type ==="none") {
      // No dithering
      imageData.data[currentPixel] = imageData.data[currentPixel] < threshold ? 0 : 255;
    } else if (type ==="bayer") {
      // 4x4 Bayer ordered dithering algorithm
      var x = currentPixel/4 % w;
      var y = Math.floor(currentPixel/4 / w);
      var map = Math.floor( (imageData.data[currentPixel] + bayerThresholdMap[x%4][y%4]) / 2 );
      imageData.data[currentPixel] = (map < threshold) ? 0 : 255;
    } else if (type ==="floydsteinberg") {
      // Floyda€"Steinberg dithering algorithm
      newPixel = imageData.data[currentPixel] < 129 ? 0 : 255;
      err = Math.floor((imageData.data[currentPixel] - newPixel) / 16);
      imageData.data[currentPixel] = newPixel;

      imageData.data[currentPixel       + 4 ] += err*7;
      imageData.data[currentPixel + 4*w - 4 ] += err*3;
      imageData.data[currentPixel + 4*w     ] += err*5;
      imageData.data[currentPixel + 4*w + 4 ] += err*1;
    } else {
      // Bill Atkinson's dithering algorithm
      newPixel = imageData.data[currentPixel] < threshold ? 0 : 255;
      err = Math.floor((imageData.data[currentPixel] - newPixel) / 8);
      imageData.data[currentPixel] = newPixel;

      imageData.data[currentPixel       + 4 ] += err;
      imageData.data[currentPixel       + 8 ] += err;
      imageData.data[currentPixel + 4*w - 4 ] += err;
      imageData.data[currentPixel + 4*w     ] += err;
      imageData.data[currentPixel + 4*w + 4 ] += err;
      imageData.data[currentPixel + 8*w     ] += err;
    }

    // Set g and b pixels equal to r
    imageData.data[currentPixel + 1] = imageData.data[currentPixel + 2] = imageData.data[currentPixel];
  }

  ctx.putImageData(imageData, 0, 0);
}

function canvas2bytes(canvas, rotate=1) {
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const arr = [];
  let buffer = [];

  for (let x = canvas.width - 1; x >= 0; x--) {
    for (let y = 0; y < canvas.height; y++) {
      const index = (canvas.width * 4 * y) + x * 4;
      buffer.push(imageData.data[index] > 0 ? 1 : 0);
      if (buffer.length === 8) {
        arr.push(parseInt(buffer.join(''), 2));
        buffer = [];
      }
    }
  }
  return arr;
}

function scaleImageData(canvas, scale) {
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const scaled = ctx.createImageData(imageData.width * scale, imageData.height * scale);
  const subLine = ctx.createImageData(scale, 1).data
  for (let row = 0; row < imageData.height; row++) {
      for (let col = 0; col < imageData.width; col++) {
          let sourcePixel = imageData.data.subarray(
              (row * imageData.width + col) * 4,
              (row * imageData.width + col) * 4 + 4
          );
          for (let x = 0; x < scale; x++) subLine.set(sourcePixel, x*4)
          for (let y = 0; y < scale; y++) {
              let destRow = row * scale + y;
              let destCol = col * scale;
              scaled.data.set(subLine, (destRow * scaled.width + destCol) * 4)
          }
      }
  }

  return scaled;
}