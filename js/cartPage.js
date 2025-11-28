function renderCart() {
  const container = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  if (!container || !totalPrice) return;

  container.innerHTML = "";
  let total = 0;

  if (!cart || cart.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Tu carrito está vacío</p>";
    totalPrice.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="../${item.img}" alt="${item.name}" />
      <div class="cart-info">
        <p><strong>${item.name}</strong></p>
        <p>Precio: $${item.price.toLocaleString()}</p>
        <p>Cantidad: ${item.quantity}</p>
        <p>Subtotal: $${(item.price * item.quantity).toLocaleString()}</p>
        <div class="cart-actions">
          <button class="price-btn decrease-btn" data-index="${index}">➖</button>
          <button class="price-btn increase-btn" data-index="${index}">➕</button>
          <button class="remove-btn" data-index="${index}">❌ Eliminar</button>
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  totalPrice.textContent = total.toLocaleString();


  attachCartEvents();
}

function attachCartEvents() {
 
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      removeFromCart(index);
      renderCart();
    });
  });


  document.querySelectorAll(".increase-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      increaseQuantity(index);
      renderCart();
    });
  });


  document.querySelectorAll(".decrease-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      decreaseQuantity(index);
      renderCart();
    });
  });
}

const buyBtn = document.getElementById("buy-btn");
if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    if (confirm("¿Confirmar compra?")) {
      clearCart();
      alert("¡Compra realizada con éxito!");
      window.location.href = "../index.html";
    }
  });
}

document.addEventListener("DOMContentLoaded", renderCart);