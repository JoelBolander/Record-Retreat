addEventListener("load", (e) => {
  updateCartDisplay();
});

function updateCartDisplay() {
  let cart = getCart();

  cart_div = document.getElementById("cart-body");

  cart_div.innerHTML = "";
  if (Object.keys(cart).length !== 0) {
    for (let cart_item in cart) {
      let info = cart[cart_item].artist + " - " + cart[cart_item].title;
      let info_use = "";
      if (info.length > 35) {
        for (let i = 0; i < 35; i++) {
          info_use += info[i];
        }
        info_use += "...";
      } else {
        info_use = info;
      }
      cart_div.innerHTML += `<div class="cart-item">
          <img
            class="cart-item-image"
            src="${cart[cart_item].image}"
            alt="Picture of The Dark Side of the Moon"
          />
            <h2 class="cart-item-info">
              ${info_use}
            </h2>
          <h3 class="cart-item-price">${
            cart[cart_item].price * cart[cart_item].quantity
          }</h3>
          <div class="minus regulators"></div>
          <input class="number-input" type="number"/>
          <div class="plus regulators"></div>
          <div id="display-none" class="title-for-deletion">${JSON.stringify({
            info: [cart[cart_item].title, cart[cart_item].quantity],
          })}</div>
        </div>`;
    }
    let inputs = [...document.getElementsByClassName("number-input")];
    let items = [...document.getElementsByClassName("title-for-deletion")];
    let minuses = [...document.getElementsByClassName("minus")];
    let pluses = [...document.getElementsByClassName("plus")];

    inputs.forEach((input, index) => {
      input.value = JSON.parse(items[index].innerHTML).info[1];
      let previousValue = parseInt(input.value);

      pluses[index].addEventListener("click", (e) => {
        input.value = parseInt(input.value) + 1;
        const event = new Event("blur", { bubbles: true });
        input.dispatchEvent(event);
      });

      minuses[index].addEventListener("click", (e) => {
        input.value = parseInt(input.value) - 1;
        const event = new Event("blur", { bubbles: true });
        input.dispatchEvent(event);
      });

      input.addEventListener("blur", (e) => {
        const currentValue = parseInt(e.target.value);
        if (currentValue < previousValue) {
          if (Math.abs(currentValue - previousValue) >= 2) {
            updateCartQuantity(
              JSON.parse(items[index].innerHTML).info,
              currentValue
            );
          } else {
            removeFromCart(JSON.parse(items[index].innerHTML).info);
          }
        } else {
          if (Math.abs(currentValue - previousValue) >= 2) {
            updateCartQuantity(
              JSON.parse(items[index].innerHTML).info,
              currentValue
            );
          } else {
            addToCart(JSON.parse(items[index].innerHTML).info);
          }
        }

        updateCartDisplay();

        previousValue = currentValue;
      });
    });
  } else {
    cart_div.innerHTML = '<h1 class="no-results">NO ITEMS IN CART</h1>';
  }
}
