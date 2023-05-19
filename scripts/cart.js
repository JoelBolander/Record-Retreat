let cart = localStorage.getItem("cart");
if (!cart) {
  cart = {};
} else {
  cart = JSON.parse(cart);
}

let searchbar = document.getElementById("search");

function addToCart(item) {
  if (cart[item[0]]) {
    cart[item[0]].quantity += 1;
  } else {
    cart[item[0]] = {
      title: item[0],
      artist: item[1],
      price: item[2],
      image: item[3],
      quantity: 1,
    };
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(item) {
  if (cart[item[0]]) {
    cart[item[0]].quantity -= 1;
    if (cart[item[0]].quantity === 0) {
      delete cart[item[0]];
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartQuantity(item, newQuantity) {
  if (newQuantity <= 0) {
    delete cart[item[0]];
  } else {
    cart[item[0]].quantity = newQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  return cart;
}

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (searchbar === document.activeElement) {
      localStorage.setItem("justSearched", true);
      localStorage.setItem("searchTerm", searchbar.value);
      window.location.href = "index.html";
    }
  }
});
