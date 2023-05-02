window.focus;

let arm = document.querySelector(".needle");

var yellow_submarine = new Audio("audio/yellow_submarine.mp3");

let skiva = document.querySelector(".inv-div");

skiva.addEventListener("mouseover", arm_in);
skiva.addEventListener("mouseout", arm_out);

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

// async function getAlbum() {
//     let x = await fetch('https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5', options);
//     let y = await x.text();
//     myDisplay(y);
// }

// let albums = await getAlbum()

async function search(searchterm) {
  const url = `https://spotify23.p.rapidapi.com/search/?q=${searchterm}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "05a72e4533msh68aebca25ef2355p1d0485jsnf2229bc7680d",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

let searchbar = document.getElementById("coolclass");

document.getElementById("knappen").addEventListener("click", async function () {
  await search(searchbar.innerHTML);
});
