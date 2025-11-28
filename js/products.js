async function cargarProductos() {
  try {
    const response = await fetch("data/products.json");
    const productos = await response.json();

    const contenedor = document.querySelector(".cards");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(prod => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${prod.img}" alt="${prod.name}">
        <p>${prod.name}</p>
        <button class="price-btn">$${prod.price.toLocaleString()}</button>
        <button class="add-cart-btn"
          data-name="${prod.name}"
          data-price="${prod.price}"
          data-img="${prod.img}">
          ➕ Agregar al carrito
        </button>
      `;

      contenedor.appendChild(card);
    });

    initAddButtons();

  } catch (err) {
    console.error("Error cargando productos:", err);
    const contenedor = document.querySelector(".cards");
    if (contenedor) {
      contenedor.innerHTML = "<p style='text-align:center;'>Error cargando productos</p>";
    }
  }
}


function initAddButtons() {
  const buttons = document.querySelectorAll(".add-cart-btn");

  buttons.forEach(btn => {
  
    if (btn.dataset.listenerAttached) return;
    btn.dataset.listenerAttached = "true";

    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price, 10);
      const img = btn.dataset.img;

  
      addToCart(name, price, img);

      const originalText = btn.textContent;
      btn.textContent = "✅ Agregado";
      btn.style.background = "linear-gradient(45deg, #00ff88, #00ccff)";

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
      }, 1000);
    });
  });
}

document.addEventListener("DOMContentLoaded", cargarProductos);