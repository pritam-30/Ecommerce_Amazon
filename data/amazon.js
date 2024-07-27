import { addItem } from "./cart.js";
//import {cartItems} from './checkout.js';
import { products } from "./products.js";

// Generate HTML for products
let html = "";
products.forEach((product) => {
  html += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-${product.id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart-${
            product.id
          }" style = "font-size : 16px ; margin-bottom : 10px ; height : 15px ; color : green ; 
          display:flex; align-items:center; gap:3px" >
           </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id ="${product.id}">
            Add to Cart
          </button>
        </div>`;
});
document.querySelector(".products-grid").innerHTML = html;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const ID = button.dataset.productId;
    addItem(ID);
    setTime(ID);
  });
});

function setTime(ID) {
  let time = setTimeout(() => {
    document.querySelector(
      `.added-to-cart-${ID}`
    ).innerHTML = `<img src="images/icons/checkmark.png" width=18px>   Added`;
    setTimeout(() => {
      document.querySelector(`.added-to-cart-${ID}`).innerHTML = "";
      clearTimeout(time);
    }, 3000);
  });
}
