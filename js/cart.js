let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}


function initAddButtons() {
  const buttons = document.querySelectorAll(".add-cart-btn");
  buttons.forEach(btn => {
    
    if (btn.dataset.listenerAttached) return;
    btn.dataset.listenerAttached = "true";

    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price, 10) || 0;
      const img = btn.dataset.img || "";

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
    });
  });
}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initAddButtons();
    updateCartCount();
  });
} else {
  initAddButtons();
  updateCartCount();
}
