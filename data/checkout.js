import { cart, removeItem, updateQuantity, cartQuantity } from "./cart.js";
import { products } from "./products.js";

let cartHTML = "";

cart.forEach((item) => {
  const productId = item.id;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  cartHTML += ` <div class="cart-item-container js-remove-${
    matchingProduct.id
  }">
 <div class="delivery-date">
   Delivery date: Tuesday, June 21
 </div>

 <div class="cart-item-details-grid">
   <img class="product-image"
     src="${matchingProduct.image}">

   <div class="cart-item-details">
     <div class="product-name">
       ${matchingProduct.name}
     </div>
     <div class="product-price">
      $${(matchingProduct.priceCents / 100).toFixed(2)}
     </div>
     <div class="product-quantity">
       <span>
         Quantity: <span class="quantity-label itemQuantity" data-product-id ="${
           matchingProduct.id
         }" >${item.quantity}</span>
       </span>
       <span class="update-quantity-link link-primary" data-product-id="${
         matchingProduct.id
       }">
         Update
       </span>
       <input type="number" class="enter-quantity quantity${
         matchingProduct.id
       }" tabindex="0" data-product-id="${matchingProduct.id}">
       <span class="save-quantity link-primary" data-product-id="${
         matchingProduct.id
       }" >
         save
       </span>
       <span class="delete-quantity-link js-delete link-primary" data-product-id="${
         matchingProduct.id
       }">
         Delete
       </span>
     </div>
   </div>

   <div class="delivery-options">
     <div class="delivery-options-title">
       Choose a delivery option:
     </div>
     <div class="delivery-option">
       <input type="radio" checked
         class="delivery-option-input"
         name="delivery-option-${matchingProduct.id}">
       <div>
         <div class="delivery-option-date">
           Tuesday, June 21
         </div>
         <div class="delivery-option-price">
           FREE Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio"
         class="delivery-option-input"
         name="delivery-option-${matchingProduct.id}">
       <div>
         <div class="delivery-option-date">
           Wednesday, June 15
         </div>
         <div class="delivery-option-price">
           $4.99 - Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio"
         class="delivery-option-input"
         name="delivery-option-${matchingProduct.id}">
       <div>
         <div class="delivery-option-date">
           Monday, June 13
         </div>
         <div class="delivery-option-price">
           $9.99 - Shipping
         </div>
       </div>
     </div>
   </div>
 </div>
</div>`;
});

document.querySelector(".js-checkout-cart").innerHTML = cartHTML;

document.querySelectorAll(".js-delete").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeItem(productId);
    const productToremove = document.querySelector(`.js-remove-${productId}`);
    productToremove.remove();
    updateQuantity();
  });
});

document.querySelectorAll(".update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    let Item = document.querySelector(`.js-remove-${productId}`);
    Item.classList.add("is-editing-quantity");
    console.log(Item);
  });
});

document.querySelectorAll(".save-quantity").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    let Item = document.querySelector(`.js-remove-${productId}`);
    Item.classList.remove("is-editing-quantity");
    cartQuantity(productId);
  });
});
document.querySelectorAll(".enter-quantity").forEach((element) => {
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const productId = element.dataset.productId;
      let Item = document.querySelector(`.js-remove-${productId}`);
      Item.classList.remove("is-editing-quantity");
      cartQuantity(productId);
    }
  });
});
