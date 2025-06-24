const productsContainer = document.querySelector(".list-products");
const productTotalPriceItem = document.querySelector(".total");

const products = [
  {
    id: "voila",
    productName: "Nike Shoe",
    price: 100,
    description: "A nice pair of nike shoes",
    quantity: 0,
    isFavorite: false,
    productImage: "assets/baskets.png",
  },
  {
    id: "voilaaaa",
    productName: "Nike Socks",
    price: 20,
    description: "A nice pair of nike socks",
    quantity: 0,
    isFavorite: false,
    productImage: "assets/socks.png",
  },
  {
    id: "voilassss",
    productName: "Nike Bag",
    price: 50,
    description: "A nice pair of nike bag",
    quantity: 0,
    isFavorite: true,
    productImage: "assets/bag.png",
  },
];

function calculateTotalPrice() {
  let totalPrice = 0;
  for (let product of products) {
    totalPrice += product.price * product.quantity;
  }
  productTotalPriceItem.textContent = `${totalPrice}$`;
}

function renderCartProducts() {
  productsContainer.innerHTML = "";

  for (let product of products) {
    if (product) {
      const productCard = document.createElement("div");
      productCard.classList.add("card-body");
      productCard.setAttribute("data-id", product.id);

      productCard.innerHTML = `
        <div class="card" style="width: 18rem">
          <img
            src=${product.productImage}
            class="card-img-top"
            alt="${product.productName}"
          />
          <div class="card-body">
            <h5 class="card-title">${product.productName}</h5>
            <p class="card-text">${product.description}</p>
            <h4 class="unit-price">${product.price}$</h4>
            <div class="quantity-controls">
              <i class="fas fa-plus-circle quantity-plus"></i>
              <span class="quantity">${product.quantity}</span>
              <i class="fas fa-minus-circle quantity-minus"></i>
            </div>
            <div class="item-actions">
              <i class="fas fa-trash-alt delete-item"></i>
              <i class="fas fa-heart like-item ${
                product.isFavorite ? "liked" : ""
              }"></i>
            </div>
          </div>
        </div>
      `;
      productsContainer.appendChild(productCard);

      const quantityPlusButton = productCard.querySelector(".quantity-plus");
      const quantityMinusButton = productCard.querySelector(".quantity-minus");
      const deleteButton = productCard.querySelector(".delete-item");
      const likeButton = productCard.querySelector(".like-item");

      quantityPlusButton.addEventListener("click", () => {
        product.quantity++;
        renderCartProducts();
        calculateTotalPrice();
      });

      quantityMinusButton.addEventListener("click", () => {
        if (product.quantity > 0) {
          product.quantity--;
          renderCartProducts();
          calculateTotalPrice();
        }
      });

      deleteButton.addEventListener("click", () => {
        const productIndex = products.findIndex(
          (item) => item.id === product.id
        );
        if (productIndex > -1) {
          products.splice(productIndex, 1);
          renderCartProducts();
          calculateTotalPrice();
        }
      });

      likeButton.addEventListener("click", () => {
        product.isFavorite = !product.isFavorite;
        renderCartProducts();
      });
    }
  }
  calculateTotalPrice();
}

window.addEventListener("load", renderCartProducts);
