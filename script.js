// Book Data
const books = [
  {
    id: 1,
    title: "Data Structures",
    author: "Mark Allen",
    price: 450,
    image: "images/data_Structures.jpg",
    desc: "A clear explanation of data structures and algorithms. Ideal for beginners and interview preparation."
  },
  {
    id: 2,
    title: "DBMS",
    author: "Korth",
    price: 550,
    image: "images/dbms.jpg",
    desc: "Covers database concepts, normalization, and SQL. Essential for computer science students."
  },
  {
    id: 3,
    title: "Java Programming",
    author: "James Gosling",
    price: 600,
    image: "images/java.jpg",
    desc: "A complete guide to Java programming language. Covers OOP concepts with real examples."
  },
  {
    id: 4,
    title: "JavaScript Essentials",
    author: "Douglas Crockford",
    price: 500,
    image: "images/javascript.jpg",
    desc: "Learn JavaScript fundamentals and best practices. Helps in building dynamic web applications."
  },
  {
    id: 5,
    title: "SQL Basics",
    author: "Ben Forta",
    price: 400,
    image: "images/sql.jpg",
    desc: "Step-by-step guide to learning SQL queries. Perfect for beginners in databases."
  },

  // 📖 NEW BOOKS ADDED BELOW

  {
    id: 6,
    title: "Can Love Happen Twice?",
    author: "Ravinder Singh",
    price: 250,
    image: "images/can_love_happen_twice.jpg",
    desc: "An emotional love story about loss and second chances. A touching tale of healing and hope."
  },
  {
    id: 7,
    title: "I Too Had a Love Story",
    author: "Ravinder Singh",
    price: 220,
    image: "images/i_too_had_a_lovestory.jpg",
    desc: "A true love story that touches the heart deeply. Shows the beauty and pain of pure love."
  },
  {
    id: 8,
    title: "The Power of Subconscious Mind",
    author: "Joseph Murphy",
    price: 350,
    image: "images/The_power_of_subconsious_mind.jpg",
    desc: "Explains how subconscious thoughts shape your life. Teaches positive thinking for success."
  },
  {
    id: 9,
    title: "Miracle of Mind",
    author: "Joseph Murphy",
    price: 299,
    image: "images/Miracle_of_mind.jpg",
    desc: "Shows the hidden power of the human mind. Helps improve confidence, health, and happiness."
  }
];
// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// LOGIN
function loginUser() {
  alert("Login Successful!");
  window.location.href = "products.html";
  return false;
}

// LOAD PRODUCTS PAGE
const productList = document.getElementById("product-list");

if (productList) {
  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p><b>Author:</b> ${book.author}</p>
      <p>${book.desc}</p>
      <p class="price">₹${book.price}</p>
      <button onclick="addToCart(${book.id})">Add to Cart</button>
    `;

    productList.appendChild(div);
  });
}

// ADD TO CART FUNCTION
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const book = books.find(b => b.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(book.title + " added to cart!");
}
// DISPLAY CART
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const totalAmountEl = document.getElementById("total-amount");

  if (!cartItems || !totalAmountEl) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      
      <div class="cart-info">
        <h3>${item.title}</h3>
        <p>₹${item.price} × ${item.qty}</p>
      </div>

      <div class="cart-qty">Qty: ${item.qty}</div>
      <div class="cart-subtotal">₹${subtotal}</div>

      <button class="remove-btn" onclick="removeFromCart(${index})">
        Remove
      </button>
    `;

    cartItems.appendChild(div);
  });

  totalAmountEl.innerText = total;
}

// REMOVE ITEM
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// LOAD CART PAGE
const cartItems = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");

if (cartItems && totalAmount) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = ""; // clear previous UI
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-info">
        <h3>${item.title}</h3>
        <p>₹${item.price} × ${item.qty}</p>
      </div>
      <div class="cart-qty">Qty: ${item.qty}</div>
      <div class="cart-subtotal">₹${subtotal}</div>
    `;

    cartItems.appendChild(div);
  });

  totalAmount.innerText = total;
}
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // remove selected item
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // refresh UI
}
// CHECKOUT
function checkout() {
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  displayCart();
}

// LOAD CART ON PAGE LOAD
window.onload = displayCart;

