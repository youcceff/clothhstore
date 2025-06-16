// cart.js

// ✅ نحمل السلة من التخزين المحلي أو ننشئ واحدة جديدة
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ إضافة منتج إلى السلة
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  updateCartUI(); // في حالة يوجد عنصر يعرض السلة
}

// ✅ تحديث عناصر السلة في الواجهة (إن وجدت)
function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartCount || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "flex justify-between items-center";
    li.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
    `;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toFixed(2);
}

// ✅ إظهار/إخفاء قائمة السلة (dropdown)
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cartBox = document.getElementById("cart-box");

  if (cartBtn && cartBox) {
    cartBtn.addEventListener("click", () => {
      cartBox.classList.toggle("hidden");
    });
  }

  updateCartUI(); // عند تحميل الصفحة
});
