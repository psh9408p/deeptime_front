import * as cv from "opencv.js"

const GradeOMRTakePicture = () => {
  window.cv = cv

  document.body.classList.add("loading")

  let imgElement = document.getElementById("imageOriginal")
  let inputElement = document.getElementById("imageInput")
  inputElement.addEventListener(
    "change",
    (e) => {
      imgElement.src = URL.createObjectURL(e.target.files[0])
    },
    false
  )
  let mat

  imgElement.onload = function () {
    mat = cv.imread(imgElement)
    cv.imshow("imageCanvas", mat)
  }

  function getImageDataFromImg(imgId) {
    // 1) Create a canvas, either on the page or simply in code
    //var canvas = document.createElement("canvas");
    var canvas = document.getElementById("imageCanvas")
    var ctx = canvas.getContext("2d")

    // 2) Copy your image data into the canvas
    var myImgElement = document.getElementById(imgId)
    var w = myImgElement.naturalWidth,
      h = myImgElement.naturalHeight
    ctx.drawImage(myImgElement, w, h)

    console.log(`${h}--${w}`)

    var imgdata = ctx.getImageData(0, 0, w, h)

    return imgdata
  }

  function drawCorners(markers) {
    var canvas = document.getElementById("imageCanvas")
    var context = canvas.getContext("2d")
    var corners, corner, i, j

    context.lineWidth = 3

    for (i = 0; i !== markers.length; ++i) {
      corners = markers[i].corners

      context.strokeStyle = "red"
      context.beginPath()

      for (j = 0; j !== corners.length; ++j) {
        corner = corners[j]
        context.moveTo(corner.x, corner.y)
        corner = corners[(j + 1) % corners.length]
        context.lineTo(corner.x, corner.y)
      }

      context.stroke()
      context.closePath()

      context.strokeStyle = "green"
      context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4)
    }
  }

  document.getElementById("slabHolderBtn").onclick = function () {
    this.disabled = true

    // var a = AR.AR

    // var dector = new a.Detector()
    // var imgData = getImageDataFromImg("imageOriginal")
    // var markers = dector.detect(imgData)

    // console.log(markers)
    // console.log(markers.length)

    // drawCorners(markers)

    // this.disabled = false
    return
  }

  document.getElementById("button").onclick = function () {
    this.href = document.getElementById("imageCanvas").toDataURL()
    this.download = "image.png"
  }

  document.body.classList.remove("loading")
}
export default GradeOMRTakePicture
