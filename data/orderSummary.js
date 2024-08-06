import {
  cart,
  removeItem,
  updateQuantity,
  cartQuantity,
  updateDeliveryOptions,
} from "./cart.js";
import { products } from "./products.js";
import { deliveryOptions } from "./deliveryOptions.js";
import { formatCurrency } from "./money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
let cartHTML = "";

export function renderCheckout() {
  cart.forEach((item) => {
    const productId = item.id;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    const deliveryID = item.deliveryID;
    let deliveryOption;
    deliveryOptions.forEach((element) => {
      if (element.id === deliveryID) {
        deliveryOption = element;
      }
    });
    const today = dayjs();
    const deliveryDate = today
      .add(deliveryOption.deliveryDate, "days")
      .format(`dddd, MMMM D`);

    cartHTML += ` <div class="cart-item-container js-remove-${
      matchingProduct.id
    }">
     <div class="delivery-date">
       Delivery date: ${deliveryDate}
     </div>
    
     <div class="cart-item-details-grid">
       <img class="product-image"
         src="${matchingProduct.image}">
    
       <div class="cart-item-details">
         <div class="product-name">
           ${matchingProduct.name}
         </div>
         <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
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
         ${deliveryOptionsHTML(matchingProduct, item)}
       </div>
     </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, item) {
    let html = ``;
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today
        .add(deliveryOption.deliveryDate, "days")
        .format(`dddd, MMMM D`);
      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)} - `;
      const isChecked = deliveryOption.id === item.deliveryID;
      html += `<div class="delivery-option js-delivery" data-product-id="${
        matchingProduct.id
      }" data-delivery-id=${deliveryOption.id}>
            <input type="radio" ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
               ${deliveryDate}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>`;
    });
    return html;
  }

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

  document.querySelectorAll(".js-delivery").forEach((item) => {
    item.addEventListener("click", () => {
      const { productId, deliveryId } = item.dataset;
      updateDeliveryOptions(productId, deliveryId);
      cartHTML = "";
      renderCheckout();
    });
  });
}
