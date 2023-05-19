window.focus;
const REPLYAMOUNT = 100;
const ALBUM_CHARACTER_LIMIT = 35;
const ARTIST_CHARACTER_LIMIT = 25;

let searchbar = document.getElementById("search");

let resultBox = document.getElementById("result-box");

let hero = document.getElementById("hero");
let resultTitle = document.getElementById("result-title");

// Create a new URL object
var url = new URL("https://example.com");

// Create a new URLSearchParams object
var params = new URLSearchParams();

// Add query parameters
params.append("param1", "value1");
params.append("param2", "value2");

// Set the query parameters on the URL
url.search = params.toString();

// Get the final custom URL
console.log(url.href);

let dark_side = {
  album: "The Dark Side of the Moon",
  artist: "Pink Floyd",
  price: "280",
  picture: "Images/DarkSide.jpg",
  year: "1973",
};

let led_zeppelin_4 = {
  album: "Led Zeppelin 4",
  artist: "Led Zeppelin",
  price: "301",
  picture: "Images/LedZep4.jpg",
  year: "1971",
};

let rumours = {
  album: "Rumours",
  artist: "Fleetwood Mac",
  price: "228",
  picture: "Images/Rumours.png",
  year: "1977",
};

let close_edge = {
  album: "Close to the Edge",
  artist: "Yes",
  price: "214",
  picture: "Images/close.jpg",
  year: "1972",
};

let AbbeyRoad = {
  album: "Abbey Road",
  artist: "The Beatles",
  price: "281",
  picture: "Images/Abbey.jpg",
  year: "1969",
};

let AllOfMe = {
  album: "All of Me",
  artist: "Masayoshi Takanaka",
  price: "257",
  picture: "Images/AllofMe.jpg",
  year: "1979",
};

let BackInBlack = {
  album: "Back In Black",
  artist: "AC/DC",
  price: "219",
  picture: "Images/BackInBlack.png",
  year: "1980",
};

let BatOutOfHell = {
  album: "Bat Out Of Hell",
  artist: "Meat Loaf",
  price: "242",
  picture: "Images/Bat.jpg",
  year: "1977",
};

let Fragile = {
  album: "Fragile",
  artist: "Yes",
  price: "204",
  picture: "Images/Fragile.jpg",
  year: "1971",
};

let GoodKidd = {
  album: "good kid, m.A.A.d city",
  artist: "Kendrick Lamar",
  price: "303",
  picture: "Images/GoodKid.jpg",
  year: "2012",
};

let HotelCal = {
  album: "Hotel California",
  artist: "Eagles",
  price: "261",
  picture: "Images/HotelCalifornia.jpg",
  year: "1976",
};

let igor = {
  album: "Igor",
  artist: "Tyler the Creator",
  price: "225",
  picture: "Images/igor.jpg",
  year: "2019",
};

let Illmatic = {
  album: "Illmatic",
  artist: "Nas",
  price: "207",
  picture: "Images/Illmatic.jpg",
  year: "1994",
};

let QueenHits = {
  album: "Greatest Hits",
  artist: "Queen",
  price: "223",
  picture: "Images/QueenGreatest.jpg",
  year: "2014",
};

let Sabaton = {
  album: "Carolus Rex (Swedish)",
  artist: "Sabaton",
  price: "250",
  picture: "Images/sabaton.jpg",
  year: "2012",
};

let SNF = {
  album: "Saturday Night Fever",
  artist: "Bee Gees",
  price: "532",
  picture: "Images/SaturdayNightFever.jpg",
  year: "1977",
};

let bodyguard = {
  album: "The Bodyguard",
  artist: "Whitney Houston",
  price: "404",
  picture: "Images/TheBodyguard.jpg",
  year: "1992",
};

let thriller = {
  album: "Thriller",
  artist: "Michael Jackson",
  price: "238",
  picture: "Images/Thriller.png",
  year: "1982",
};

let start_albums = [
  dark_side,
  led_zeppelin_4,
  rumours,
  close_edge,
  AbbeyRoad,
  AllOfMe,
  BackInBlack,
  BatOutOfHell,
  Fragile,
  GoodKidd,
  HotelCal,
  igor,
  Illmatic,
  QueenHits,
  Sabaton,
  SNF,
  bodyguard,
  thriller,
];

start_albums.forEach((album) => {
  resultBox.innerHTML += `<div class="product"><img class="product-image" src="${
    album.picture
  }" alt="Picture of ${album.album} by ${
    album.artist
  }" /> <div class="product-title"><h2>${
    album.album
  }</h2></div> <div class="product-artist"><h3>${
    album.artist
  }</h3></div><div class="product-information"> <div class="product-information-divs">${
    album.price + "kr"
  }
  </div><div class="product-information-divs product-type">LP</div></div>
  <div id="display-none">This is to store information: Year: ${
    album.year
  }, , Actual title: ${album.album}, title
  Actual artist: ${album.artist}, artist</div>`;
});

let products = document.querySelectorAll(".product");
products.forEach((product) => {
  product.addEventListener("click", (event) => {
    localStorage.setItem("selectedProduct", product.innerHTML);
    window.location.href = "product.html";
  });
});

addEventListener("load", (e) => {
  if (localStorage.getItem("justSearched") == "true") {
    localStorage.setItem("justSearched", false);
    console.log(localStorage.getItem("justSearched"));
    searchCall(localStorage.getItem("searchTerm"));
  }

  document.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && searchbar === document.activeElement) {
      searchterm = searchbar.value;
      searchCall(searchterm);
    }
  });
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
    resultBox.innerHTML = "";
    resultBox.classList.add("no-results");
    resultBox.classList.remove("grid-box");
    resultBox.innerHTML = "<h2>Server Error. Sorry for any trouble.</h2>";
  }
}

async function searchCall(searchterm) {
  let result = await search(searchterm);
  hero.style.display = "none";
  resultBox.innerHTML = "";
  if (result.albums.totalCount === 0) {
    resultTitle.style.display = "none";
    resultBox.classList.add("no-results");
    resultBox.classList.remove("grid-box");
    resultBox.innerHTML = "<h2>NO RESULTS</h2>";
  } else {
    resultTitle.style.display = "block";
    resultTitle.innerHTML = `Results for ${searchterm}`;

    resultBox.classList.remove("no-results");
    resultBox.classList.add("grid-box");
    for (
      let albumIndex = 0;
      albumIndex < result.albums.items.length;
      albumIndex++
    ) {
      let title = result.albums.items[albumIndex].data.name;
      let used_title = "";
      if (title.length > ALBUM_CHARACTER_LIMIT) {
        for (var i = 0; i < ALBUM_CHARACTER_LIMIT; i++) {
          used_title += title.charAt(i);
        }
        used_title += "...";
      } else {
        used_title = title;
      }
      let artist =
        result.albums.items[albumIndex].data.artists.items[0].profile.name;
      let used_artist = "";
      if (artist.length > ARTIST_CHARACTER_LIMIT) {
        for (var i = 0; i < ARTIST_CHARACTER_LIMIT; i++) {
          used_artist += artist.charAt(i);
        }
        used_artist += "...";
      } else {
        used_artist = artist;
      }
      resultBox.innerHTML += `<div class="product"><img class="product-image" src="${
        result.albums.items[albumIndex].data.coverArt.sources[0].url
      }" alt="Bild på ${
        result.albums.items[albumIndex].data.name
      }" /> <div class="product-title"><h2>${used_title}</h2></div><div class="product-artist"><h3>${used_artist}</h3></div><div class="product-information"> <div class="product-information-divs">${
        Math.floor(
          result.albums.items[albumIndex].data.date.year / 10 +
            (result.albums.items[albumIndex].data.artists.items[0].profile.name
              .length *
              result.albums.items[albumIndex].data.name.length) /
              3
        ) + "kr"
      }</div><div class="product-information-divs product-type">LP</div></div>
    <div id="display-none">This is to store information: Year: ${
      result.albums.items[albumIndex].data.date.year
    }, Actual title: ${title}, title
    Actual artist: ${artist}, artist`;
    }

    let products = document.querySelectorAll(".product");
    products.forEach((product) => {
      product.addEventListener("click", (event) => {
        localStorage.setItem("selectedProduct", product.innerHTML);
        window.location.href = "product.html";
      });
    });
  }
  console.log(result);
}
