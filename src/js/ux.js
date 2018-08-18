function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("overlay").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none";
}

function toggleOverlay() {
  if (document.getElementById("overlay").style.display === "block") {
    closeNav();
  } else {
    openNav();
  }
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the hamburger
var hamburger = document.getElementById("hamburger");

// Get the offset position of the navbar
var sticky = hamburger.offsetTop;

// Add the sticky class to the hamburger when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    hamburger.classList.add("sticky");
  } else {
    hamburger.classList.remove("sticky");
  }
}
