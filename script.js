// NAVBAR
let bar = document.getElementById('bar');
let nav = document.getElementById('navbar');
let close = document.getElementById('close');

let close1 = document.getElementById('close1');
let close2 = document.getElementById('close2');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

if (close1) {
  close1.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

if (close2) {
  close2.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// JAVASCRIPT CART

// SELECT ELEMENTS:
const productsEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subtotalEl = document.querySelector('.subtotal');

// RENDER PRODUCTS IN SHOP:
function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
        <div class="pro" >
            <img src="${product.imgSrc}" alt="${product.name}">
            <div class="des">
                <span>HeritageBird</span>
                <h5>${product.name}</h5>
                <h4>₹${product.price}</h4>
            </div>
            <div onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-arrow-down icon-1"></i></div>
        </div>    
    `;
  });
}
renderProducts();

// CART ARRAY:
let cart = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();

// ADD TO CART:
function addToCart(id) {
  // check if product alredy exists in cart ->
  if (cart.some((item) => item.id === id)) {
    alert('Product alredy in cart!');
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  updateCart();
}

// UPDATE CART:
function updateCart() {
  renderCartItems();
  renderSubtototal();

  // save avrt to local storage ->
  localStorage.setItem('CART', JSON.stringify(cart));
}

// CALCULATE RENDERED SUBTOTAL:
function renderSubtototal() {
  let totalPrice = 0,
    totalItems = 0,
    shipping = 50;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  if (totalPrice >= 500) {
    totalPrice = totalPrice;
    subtotalEl.innerHTML = `
      <table class="f100">
          <tr>
              <td>Total Items</td>
              <td>${totalItems}</td>
          </tr>
          <tr>
              <td>Shipping</td>
              <td>free</td>
          </tr>
          <tr class="f300">
              <td>Total</td>
              <td>${totalPrice}</td>
          </tr>
    </table>
    <p class="f100">free shipping on orders over 500!</p>
    <button class="btn1 f200 mt1">Proceed to checkout</button>
  `;
  } else if (totalPrice === 0) {
    subtotalEl.innerHTML = `
        <table class="f100">
            <tr>
                <td>Total Items</td>
                <td>0</td>
            </tr>
            <tr class="f300">
                <td>Total</td>
                <td>0</td>
            </tr>
      </table>
      <p class="f100">free shipping on orders over 500!</p>
  `;
  } else {
    totalPrice += shipping;

    subtotalEl.innerHTML = `
        <table class="f100">
            <tr>
                <td>Total Items</td>
                <td>${totalItems}</td>
            </tr>
            <tr>
                <td>Shipping</td>
                <td>${shipping}</td>
            </tr>
            <tr class="f300">
                <td>Total</td>
                <td>${totalPrice}</td>
            </tr>
      </table>
      <p class="f100">free shipping on orders over 500</p>
      <button class="btn1 f200 mt1">Proceed to checkout</button>
    `;
  }
}

// RENDER CART ITEMS:
function renderCartItems() {
  cartItemsEl.innerHTML = ''; // clears cart element.
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <tr>
            <td ><i class="fa-solid fa-xmark hover1 fs100" onclick="removeItemFromCart(${item.id})"></i></td>
            <td><img src="${item.imgSrc}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
              <div class="units">
                  <div class="Minus" onclick="changeNumberOfUnits('minus', ${item.id})"><i class="fa-solid fa-minus" ></i></div>
                  <div class="NOU">${item.numberOfUnits}</div>
                  <div class="Plus" onclick="changeNumberOfUnits('plus', ${item.id})"><i class="fa-solid fa-plus" ></i></div>
              </div>
            </td>
        </tr>
    `;
  });
}

// REMOVE CART ITEMS:
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === 'minus' && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === 'plus' && numberOfUnits < item.inStock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

// onclick="window.location.href='sproduct1.html'"
