let cart = {};

function addToCart(item) {
  if (cart[item]) {
    cart[item] += 1;
  } else {
    cart[item] = 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(item) {
  if (cart[item]) {
    cart[item] -= 1;
    if (cart[item] === 0) {
      delete cart[item];
    }
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
