let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.qty = (existingItem.qty || 1) + 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartCount || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * (item.qty || 1);
    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b pb-2";
    div.innerHTML = `
      <div>
        <h4 class="font-bold">${item.name}</h4>
        <p>${item.price} DA × 
          <button onclick="changeQty(${index}, -1)" class="px-2">-</button>
          ${item.qty || 1}
          <button onclick="changeQty(${index}, 1)" class="px-2">+</button>
        </p>
      </div>
      <button onclick="removeItem(${index})" class="text-red-600 hover:underline">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  cartTotal.textContent = total.toFixed(2);
}

function changeQty(index, change) {
  cart[index].qty = (cart[index].qty || 1) + change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Initialize cart UI
document.addEventListener('DOMContentLoaded', updateCartUI);