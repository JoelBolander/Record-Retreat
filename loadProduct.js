let Product_Title = document.getElementById("title");
let Product_Artist = document.querySelectorAll(".artist");
let Product_Price = document.getElementById("price");
let Product_Image = document.getElementById("image");
let Product_Year = document.getElementById("year");
let Product_Link = document.getElementById("link");

let addToCartButton = document.getElementById("add-to-cart-button");

let title;
let artist;
let price;
let image;
let year;

addEventListener("load", (e) => {
  product = localStorage.getItem("selectedProduct");

  titleRegex = /<h1>(.*?)<\/h1>/;
  const artistRegex = /<h2>(.*?)<\/h2>/;
  const priceRegex = /(\d+)kr/;
  const imageRegex = /src="(.*?)"/;
  const yearRegex = /Year: (.*?),/;

  const titleMatch = product.match(titleRegex);
  const artistMatch = product.match(artistRegex);
  const priceMatch = product.match(priceRegex);
  const imageMatch = product.match(imageRegex);
  const yearMatch = product.match(yearRegex);

  title = titleMatch[1];
  artist = artistMatch[1];
  price = priceMatch[1];
  image = imageMatch[1];
  year = yearMatch[1];

  Product_Title.innerHTML = title;
  Product_Artist.forEach((element) => {
    element.innerHTML += artist;
  });
  Product_Price.innerHTML = price + "kr";
  Product_Image.setAttribute("src", image);
  Product_Year.innerHTML = "Date: " + year;
  Product_Link.setAttribute("href", `https://open.spotify.com/search/${title}`);
  Product_Link.innerHTML = title;

  addToCartButton.addEventListener("click", (e) => {
    addToCart([title, artist, price, image]);
    active_cart = getCart();
    console.log(active_cart);
    for (let cart_item in active_cart) {
      console.log(active_cart[cart_item]);
    }
  });
});
