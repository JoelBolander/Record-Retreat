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
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

let searchbar = document.getElementById("coolclass");

let resultBox = document.getElementById("result-box");

document.getElementById("knappen").addEventListener("click", async function () {
  result = await search(searchbar.innerHTML);
  resultBox.innerHTML = "";
  for (let albumIndex = 0; albumIndex < 20; albumIndex++) {
    resultBox.innerHTML += `<div class="product"><img class="productimage" src="${
      result.albums.items[albumIndex].data.coverArt.sources[0].url
    }" alt="Bild på ${
      result.albums.items[albumIndex].data.name
    }" /> <div class="producttitle"><h2>${
      result.albums.items[albumIndex].data.name
    }</h2></div> <div class="productartist"><h3>${
      result.albums.items[0].data.artists.items[0].profile.name
    }</h3></div><div class="productinformation"> <div class="productinformationdivs">${
      Math.floor(Math.random() * 200 + 100) + "kr"
    }</div><div class="productinformationdivs producttype">LP</div></div></div>`;
  }
  console.log(result);
  console.log(result.albums.items[0].data.artists.items[0].profile.name);
});
