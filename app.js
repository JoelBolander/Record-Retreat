window.focus;

const REPLYAMOUNT = 100;

let searchbar = document.getElementById("search");

let resultBox = document.getElementById("result-box");

let dark_side = {
  album: "The Dark Side of the Moon",
  artist: "Pink Floyd",
  price: "280",
  picture: "Images/DarkSide.jpg",
  year: "1973",
  link: "spotify:album:4LH4d3cOWNNsVw41Gqt",
};

let led_zeppelin_4 = {
  album: "Led Zeppelin 4",
  artist: "Led Zeppelin",
  price: "301",
  picture: "Images/LedZep4.jpg",
  year: "1971",
  link: "https://open.spotify.com/album/5EyIDBAqhnlkAHqvPRwdbX",
};

let rumours = {
  album: "Rumours",
  artist: "Fleetwood Mac",
  price: "228",
  picture: "Images/Rumours.png",
  year: "1977",
  link: "https://open.spotify.com/album/1bt6q2SruMsBtcerNVtpZB",
};

let close_edge = {
  album: "Close to the Edge",
  artist: "Yes",
  price: "214",
  picture: "Images/close.jpg",
  year: "1972",
  link: "https://open.spotify.com/album/6344rkGqCBDenGoS7eJlBN",
};

let start_albums = [
  dark_side,
  led_zeppelin_4,
  rumours,
  close_edge,
  dark_side,
  led_zeppelin_4,
  rumours,
  close_edge,
  dark_side,
  led_zeppelin_4,
  rumours,
  close_edge,
  dark_side,
  led_zeppelin_4,
  rumours,
  close_edge,
  dark_side,
  led_zeppelin_4,
  rumours,
  close_edge,
  dark_side,
  led_zeppelin_4,
  rumours,
  close_edge,
];

start_albums.forEach((album) => {
  resultBox.innerHTML += `<div class="product"><img class="productimage" src="${
    album.picture
  }" alt="Bild på ${album.album}" /> <div class="producttitle"><h1>${
    album.album
  }</h1></div> <div class="productartist"><h2>${
    album.artist
  }</h2></div><div class="productinformation"> <div class="productinformationdivs">${
    album.price + "kr"
  }
  </div><div class="productinformationdivs producttype">LP</div></div>
  <div id="display-none">This is to store information: Year: ${
    album.year
  }, </div>`;
});

let products = document.querySelectorAll(".product");
products.forEach((product) => {
  product.addEventListener("click", (event) => {
    localStorage.setItem("selectedProduct", product.innerHTML);
    window.location.href = "product.html";
  });
});

addEventListener("load", (event) => {
  if (localStorage.getItem("justSearched") == "true") {
    localStorage.setItem("justSearched", false);
    console.log(localStorage.getItem("justSearched"));
    searchCall(localStorage.getItem("searchTerm"));
  }
});

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

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchterm = searchbar.value;
    searchCall(searchterm);
  }
});

async function searchCall(searchterm) {
  result = await search(searchterm);
  resultBox.innerHTML = "";
  if (result.albums.totalCount === 0) {
    resultBox.classList.add("no-results");
    resultBox.classList.remove("gridbox");
    resultBox.innerHTML = "<h1>NO RESULTS</h1>";
  } else {
    resultBox.classList.remove("no-results");
    resultBox.classList.add("gridbox");
    for (
      let albumIndex = 0;
      albumIndex < result.albums.items.length;
      albumIndex++
    ) {
      resultBox.innerHTML += `<div class="product"><img class="productimage" src="${
        result.albums.items[albumIndex].data.coverArt.sources[0].url
      }" alt="Bild på ${
        result.albums.items[albumIndex].data.name
      }" /> <div class="producttitle"><h1>${
        result.albums.items[albumIndex].data.name
      }</h1></div> <div class="productartist"><h2>${
        result.albums.items[albumIndex].data.artists.items[0].profile.name
      }</h2></div><div class="productinformation"> <div class="productinformationdivs">${
        Math.floor(
          result.albums.items[albumIndex].data.date.year / 10 +
            (result.albums.items[albumIndex].data.artists.items[0].profile.name
              .length *
              result.albums.items[albumIndex].data.name.length) /
              3
        ) + "kr"
      }</div><div class="productinformationdivs producttype">LP</div></div>
    <div id="display-none">This is to store information: Year: ${
      result.albums.items[albumIndex].data.date.year
    }, `;
    }

    let products = document.querySelectorAll(".product");
    products.forEach((product) => {
      product.addEventListener("click", (event) => {
        console.log(product.innerHTML);
        localStorage.setItem("selectedProduct", product.innerHTML);
        window.location.href = "product.html";
      });
    });
  }
  console.log(result);
}
