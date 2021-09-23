const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const trippyButton = document.querySelector('.trippy');

let trippyClick = false;

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error("Rats! You denied the webcam!", err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    //take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    //alter pixels

    // pixels = redEffect(pixels);
    if (trippyClick) {
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;
    } else {
        ctx.globalAlpha = 1;
    }

    // pixels = greenScreen(pixels);

    //return pixels
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  //play sound
  snap.currentTime = 0;
  snap.play();

  //take data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "sexy-pic");
  link.innerHTML = `<img src="${data}" alt="Colin" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 0; //r
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //g
    pixels.data[i + 2] = pixels.data[i + 2] + 0; //b
  }
  return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; //r
        pixels.data[i + 100] = pixels.data[i + 1]; //g
        pixels.data[i - 450] = pixels.data[i + 2]; //b
      }
      return pixels;
}

function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }

getVideo();

video.addEventListener("canplay", paintToCanvas);
trippyButton.addEventListener('click', () => {
    trippyClick = !trippyClick;
})