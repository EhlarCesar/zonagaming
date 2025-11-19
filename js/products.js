async function cargarProductos() {
  try {
    const response = await fetch("data/products.json");
    const productos = await response.json();

    const contenedor = document.querySelector(".cards");
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
    console.error("error", err);
  }
}

document.addEventListener("DOMContentLoaded", cargarProductos);
