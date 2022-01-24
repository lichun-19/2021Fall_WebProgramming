//let galleryImgs = document.querySelectorAll("ImgsGallery");
let displayImg = document.getElementById("display");
let lastSelected = document.getElementById("first");
lastSelected.classList.add("selected");

function ChangeImg(image) {
  displayImg.src = image.src;
  lastSelected.classList.remove("selected");
  image.classList.add("selected");
  lastSelected = image;
}

let lastSelectedPage = document.getElementById("currentPage");
lastSelectedPage.style.backgroundColor = "#4a4949";

function changePage(page) {
  lastSelectedPage.style.backgroundColor = "rgba(199, 198, 198, 0.666)";
  page.style.backgroundColor = "#4a4949";
  lastSelectedPage = page;
}

function EmPage(page) {
  alert("This album is empty!");
}
