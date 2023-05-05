window.focus;

let arm = document.querySelector(".needle");

var yellow_submarine = new Audio("audio/yellow_submarine.mp3");

let skiva = document.querySelector(".inv-div");

const REPLYAMOUNT = 100;

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
  const url = `https://spotify23.p.rapidapi.com/search/?q=${searchterm}&type=albums&offset=0&limit=${REPLYAMOUNT}&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "05a72e4533msh68aebca25ef2355p1d0485jsnf2229bc7680d",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  while (true) {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

let searchbar = document.getElementById("search");

let resultBox = document.getElementById("result-box");

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchCall();
  }
});

async function searchCall() {
  result = await search(searchbar.value);
  console.log(result.albums.items[0].data);
  resultBox.innerHTML = "";
  if (result.albums.totalCount === 0) {
    resultBox.innerHTML = "NO RESULTS";
  }
  for (
    let albumIndex = 0;
    albumIndex < result.albums.items.length;
    albumIndex++
  ) {
    resultBox.innerHTML += `<div class="product"><img class="productimage" src="${
      result.albums.items[albumIndex].data.coverArt.sources[0].url
    }" alt="Bild på ${
      result.albums.items[albumIndex].data.name
    }" /> <div class="producttitle"><h2>${
      result.albums.items[albumIndex].data.name
    }</h2></div> <div class="productartist"><h3>${
      result.albums.items[albumIndex].data.artists.items[0].profile.name
    }</h3></div><div class="productinformation"> <div class="productinformationdivs">${
      Math.floor(
        result.albums.items[albumIndex].data.date.year / 10 +
          (result.albums.items[albumIndex].data.artists.items[0].profile.name
            .length *
            result.albums.items[albumIndex].data.name.length) /
            3
      ) + "kr"
    }</div><div class="productinformationdivs producttype">LP</div></div></div>`;
  }
  console.log(result);
}
