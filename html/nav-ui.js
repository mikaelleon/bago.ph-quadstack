function toggleNav() {
  var ul = document.querySelector("nav ul");
  var ov = document.querySelector(".nav-overlay");
  if (ul) ul.classList.toggle("active");
  if (ov) ov.classList.toggle("active");
}
