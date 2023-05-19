let Product_Title = document.getElementById("title");
let Product_Artist = document.querySelectorAll(".artist");
let Product_Price = document.getElementById("price");
let Product_Image = document.getElementById("image");
let Product_Year = document.getElementById("year");
let Product_Link = document.getElementById("link");

let addToCartButton = document.getElementById("add-to-cart-button");
let addToCartDiv = document.getElementById("add-to-cart-div");
let successDiv = document.getElementById("added-to-cart");
let closeWindow1 = document.getElementsByClassName("close-window")[0];
let closeWindow2 = document.getElementsByClassName("close-window")[1];
let yes = document.getElementById("yes");
let no = document.getElementById("no");

let tabTitle = document.getElementById("tab-title");
let favicon = document.getElementById("favicon");

addEventListener("load", (e) => {
  product = localStorage.getItem("selectedProduct");

  const titleRegex = /title: (.*?), title/;
  const artistRegex = /artist: (.*?), artist/;
  const priceRegex = /(\d+)kr/;
  const imageRegex = /src="(.*?)"/;
  const yearRegex = /Year: (.*?),/;

  const titleMatch = product.match(titleRegex);
  const artistMatch = product.match(artistRegex);
  const priceMatch = product.match(priceRegex);
  const imageMatch = product.match(imageRegex);
  const yearMatch = product.match(yearRegex);

  let title = titleMatch[1];
  let artist = artistMatch[1];
  let price = priceMatch[1];
  let image = imageMatch[1];
  let year = yearMatch[1];

  Product_Title.innerHTML = title;
  Product_Artist.forEach((element) => {
    element.innerHTML += artist;
  });

  tabTitle.innerHTML = title;
  favicon.setAttribute("href", image);

  Product_Price.innerHTML = price + "kr";
  Product_Image.setAttribute("src", image);
  Product_Image.setAttribute("alt", `Image of ${title} by ${artist}`);
  Product_Year.innerHTML = "Date: " + year;
  Product_Link.setAttribute("href", `https://open.spotify.com/search/${title}`);
  Product_Link.innerHTML = title;

  addToCartButton.addEventListener("click", (e) => {
    addToCartDiv.style.display = "flex";
  });

  no.addEventListener("click", (e) => {
    addToCartDiv.style.display = "none";
  });

  yes.addEventListener("click", (e) => {
    addToCartDiv.style.display = "none";
    successDiv.style.display = "flex";
    addToCart([title, artist, price, image]);
  });

  closeWindow1.addEventListener("click", (e) => {
    addToCartDiv.style.display = "none";
  });

  closeWindow2.addEventListener("click", (e) => {
    successDiv.style.display = "none";
  });
});
