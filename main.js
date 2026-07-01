// ============================================
// CHANGE — shared site behaviour
// ============================================

const PRODUCTS = {
  "wellness-wash": { name: "Wellness Wash", cat: "Wellness Wash", price: 299, was: 399, icon: "assets/change-icon.png" },
  "deodorant-spray": { name: "Deodorant Spray", cat: "Deodorant", price: 249, was: 329, icon: "assets/change-icon.png" },
  "daily-wipes": { name: "Daily Wipes", cat: "Daily Wipes", price: 149, was: 199, icon: "assets/change-icon.png" },
  "comfort-powder": { name: "Comfort Powder", cat: "Comfort Powder", price: 199, was: 269, icon: "assets/change-icon.png" },
  "starter-bundle": { name: "Starter Bundle", cat: "Bundle", price: 599, was: 799, icon: "assets/change-icon.png" }
};

// ---------- Cart (localStorage) ----------
const Cart = {
  key: "change_cart",
  get() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch (e) { return {}; }
  },
  save(cart) { localStorage.setItem(this.key, JSON.stringify(cart)); },
  add(id, qty = 1) {
    const cart = this.get();
    cart[id] = (cart[id] || 0) + qty;
    this.save(cart);
    this.refreshBadge();
  },
  setQty(id, qty) {
    const cart = this.get();
    if (qty <= 0) { delete cart[id]; } else { cart[id] = qty; }
    this.save(cart);
    this.refreshBadge();
  },
  remove(id) {
    const cart = this.get();
    delete cart[id];
    this.save(cart);
    this.refreshBadge();
  },
  count() {
    const cart = this.get();
    return Object.values(cart).reduce((a, b) => a + b, 0);
  },
  refreshBadge() {
    const el = document.querySelector("[data-cart-count]");
    const n = this.count();
    if (el) {
      if (n > 0) { el.textContent = n; el.style.display = "inline-block"; }
      else { el.style.display = "none"; }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Cart.refreshBadge();

  // Mobile nav toggle
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => mobileNav.classList.toggle("open"));
  }

  // Add-to-cart buttons
  document.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-add-to-cart");
      Cart.add(id, 1);
      const original = btn.textContent;
      btn.textContent = "Added ✓";
      setTimeout(() => { btn.textContent = original; }, 1200);
    });
  });

  // Newsletter form
  document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.parentElement.querySelector(".form-msg");
      if (msg) {
        msg.textContent = "You're on the list. Change starts now.";
        msg.classList.add("show");
      }
      form.reset();
    });
  });

  // Contact form
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.querySelector("[data-contact-msg]");
      if (msg) { msg.textContent = "Message sent. We'll get back to you within 24 hours."; msg.classList.add("show"); }
      contactForm.reset();
    });
  }

  // Auth tabs (account page)
  document.querySelectorAll("[data-auth-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-auth-tab");
      document.querySelectorAll("[data-auth-tab]").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll("[data-auth-panel]").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`[data-auth-panel="${target}"]`).classList.add("active");
    });
  });

  // Auth forms (demo only, no backend)
  document.querySelectorAll("[data-auth-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("This is a front-end demo — connect a backend or auth provider to make this functional.");
    });
  });

  // Cart page render
  const cartRoot = document.querySelector("[data-cart-root]");
  if (cartRoot) renderCartPage();
});

function renderCartPage() {
  const cart = Cart.get();
  const itemsWrap = document.querySelector("[data-cart-items]");
  const emptyWrap = document.querySelector("[data-cart-empty]");
  const summaryWrap = document.querySelector("[data-cart-summary]");
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    if (itemsWrap) itemsWrap.style.display = "none";
    if (summaryWrap) summaryWrap.style.display = "none";
    if (emptyWrap) emptyWrap.style.display = "block";
    return;
  }

  if (emptyWrap) emptyWrap.style.display = "none";
  if (itemsWrap) itemsWrap.style.display = "block";
  if (summaryWrap) summaryWrap.style.display = "block";

  let subtotal = 0;
  itemsWrap.innerHTML = ids.map((id) => {
    const p = PRODUCTS[id];
    if (!p) return "";
    const qty = cart[id];
    subtotal += p.price * qty;
    return `
      <div class="cart-item" data-row="${id}">
        <div class="thumb"><img src="${p.icon}" alt="${p.name}"></div>
        <div>
          <div class="name">${p.name}</div>
          <div class="meta">${p.cat} · ₹${p.price}</div>
          <div class="qty-control">
            <button type="button" data-qty-minus="${id}">−</button>
            <span>${qty}</span>
            <button type="button" data-qty-plus="${id}">+</button>
          </div>
        </div>
        <div>
          <div class="item-price">₹${p.price * qty}</div>
          <button type="button" class="remove-btn" data-remove="${id}">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  if (summaryWrap) {
    summaryWrap.innerHTML = `
      <h3>Order Summary</h3>
      <div class="summary-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "Free" : "₹" + shipping}</span></div>
      <div class="summary-row total"><span>Total</span><span>₹${total}</span></div>
      <button class="btn btn-primary btn-block mt-40" type="button" onclick="alert('This is a front-end demo — connect a payment provider to enable checkout.')">Checkout</button>
    `;
  }

  itemsWrap.querySelectorAll("[data-qty-plus]").forEach((b) => b.addEventListener("click", () => {
    const id = b.getAttribute("data-qty-plus");
    Cart.setQty(id, Cart.get()[id] + 1);
    renderCartPage();
  }));
  itemsWrap.querySelectorAll("[data-qty-minus]").forEach((b) => b.addEventListener("click", () => {
    const id = b.getAttribute("data-qty-minus");
    Cart.setQty(id, Cart.get()[id] - 1);
    renderCartPage();
  }));
  itemsWrap.querySelectorAll("[data-remove]").forEach((b) => b.addEventListener("click", () => {
    Cart.remove(b.getAttribute("data-remove"));
    renderCartPage();
  }));
}
