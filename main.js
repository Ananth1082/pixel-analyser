document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const canvas = document.getElementById("imageCanvas");
    const ctx = canvas.getContext("2d");
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        // Set canvas size to maintain aspect ratio of the image
        const aspectRatio = img.width / img.height;
        const maxCanvasWidth = 500; // Maximum width or height you want to allow
        const maxCanvasHeight = 500;

        if (img.width > img.height) {
          canvas.width = maxCanvasWidth;
          canvas.height = maxCanvasWidth / aspectRatio;
        } else {
          canvas.height = maxCanvasHeight;
          canvas.width = maxCanvasHeight * aspectRatio;
        }

        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const loc = canvas.getBoundingClientRect();

        // Add event listener for canvas click
        canvas.addEventListener("click", (e) => {
          const x = e.clientX - loc.left;
          const y = e.clientY - loc.top;
          updateRGBAValues(
            getPixelRGB(
              pixelData.data,
              Math.floor(x),
              Math.floor(y),
              canvas.width
            )
          );
        });
      };
      img.src = e.target.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });

const getPixelRGB = (imageData, x, y, canvasWidth) => {
  let pos = 4 * (canvasWidth * y + x);
  return imageData.slice(pos, pos + 4); // Returns an array [R, G, B, A]
};

const updateRGBAValues = (values) => {
  const r = document.getElementById("R-value");
  const g = document.getElementById("G-value");
  const b = document.getElementById("B-value");
  const a = document.getElementById("A-value");
  const block = document.getElementById("color-block");
  
  const rval=values[0]
const gval=values[1]
const bval=values[2]
const aval=values[3]
  
  r.innerText = rval;
  g.innerText = gval;
  b.innerText = bval;
  a.innerText = aval;
  block.style.backgroundColor = `rgba(${rval},${gval},${bval},${aval})`
};
