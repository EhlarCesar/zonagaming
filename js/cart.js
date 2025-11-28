let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    el.textContent = total;
  }
}


function addToCart(name, price, img) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      img: img,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
}


function increaseQuantity(index) {
  cart[index].quantity++;
  saveCart();
  updateCartCount();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeFromCart(index);
  }
  saveCart();
  updateCartCount();
}


function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
}

updateCartCount();