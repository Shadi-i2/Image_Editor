let saturate = document.getElementById("saturate")
let contrast = document.getElementById("contrast")
let brightness = document.getElementById("brightness")
let sepia = document.getElementById("sepia")
let grayscale = document.getElementById("grayscale")
let blur = document.getElementById("blur")
let hueRotate = document.getElementById("hue-rotate")
let download = document.querySelector(".download")
let reset = document.querySelector(".reset")
let upLoad = document.getElementById("upload")
let imgBox = document.querySelector(".img-box")
let imgSrc = document.querySelector(".image")
let filters = document.querySelectorAll("ul li input")
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')

reset.addEventListener("click", resetValue)

function resetValue() {
    saturate.value = '100'
    contrast.value = '100'
    brightness.value = '100'
    sepia.value = '0'
    grayscale.value = '0'
    blur.value = '0'
    hueRotate.value = '0'
    applyFilters()
}

window.onload = function () {
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
}

upLoad.addEventListener("change", function () {
    resetValue()
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upLoad.files[0])
    file.onload = function () {
        imgSrc.src = file.result;
    }
    imgSrc.onload = function () {
        canvas.width = imgSrc.width;
        canvas.height = imgSrc.height;
        ctx.drawImage(imgSrc, 0, 0, canvas.width, canvas.height)
        imgSrc.style.display = "none";
    }
})

filters.forEach((filter) => {
    filter.addEventListener("change", () => {
        applyFilters()
    })
})

function applyFilters() {
    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
    ctx.drawImage(imgSrc, 0, 0, canvas.width, canvas.height);
}

download.onclick = function () {
    download.href = canvas.toDataURL("image/png");
    download.download = "filter_image"
}