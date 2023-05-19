window.focus;
let arm = document.querySelector(".needle");

var yellow_submarine = new Audio("audio/yellow_submarine.mp3");

let skiva = document.querySelector(".inv-div");

let hamburger = document.getElementsByClassName("hamburger")[0];

let nav = document.getElementsByClassName("nav")[0];

addEventListener("load", (e) => {
  skiva.addEventListener("mouseover", arm_in);
  skiva.addEventListener("mouseout", arm_out);
  hamburger.addEventListener("click", (e) => {
    console.log("yo mama");
    if (nav.style.display == "none" || nav.style.display == "") {
      nav.style.display = "block";
    } else {
      nav.style.display = "none";
    }
  });
});

function arm_in() {
  yellow_submarine.play();
  document.querySelector(".needle").setAttribute("id", "needle-animation");
  document.querySelector(".logo").setAttribute("id", "run-animation");
}

function arm_out() {
  yellow_submarine.pause();
  document.querySelector(".needle").setAttribute("id", "");
  document.querySelector(".logo").setAttribute("id", "");
}
