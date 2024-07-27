export let cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 0,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 0,
  },
];

let storage = 0;
document.addEventListener("DOMContentLoaded", () => {
  // Ensure the element exists before trying to set its content
  const cartQuantityElement = document.querySelector(".items-quantity");
  if (cartQuantityElement) {
    const storageItems = JSON.parse(localStorage.getItem("cartQuantity"));
    if (storageItems) {
      storage = storageItems; // Direct assignment instead of adding
    }
    cartQuantityElement.textContent = storage;
  } else {
    console.error("Element with class 'items-quantity' not found.");
  }
});
export function addItem(ID) {
  let select;
  let totalQuantity = storage;
  let NewValue = document.querySelector(`.js-quantity-${ID}`);
  select = JSON.parse(NewValue.value, 10);

  let matching;
  cart.forEach((item) => {
    if (item.id === ID) {
      matching = item;
    }
  });
  if (matching) {
    matching.quantity += select;
  }
  // else, add new item to cart array with quantity 1
  else {
    cart.push({
      id: ID,
      quantity: select,
    });
  }
  updateQuantity(totalQuantity);
  console.log(cart);
}
function updateQuantity(totalQuantity) {
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  document.querySelector(".items-quantity").textContent = totalQuantity;
  localStorage.setItem("cartQuantity", JSON.stringify(totalQuantity));
  console.log(totalQuantity);
}
export function removeItem(productId) {
  let newCart = [];
  cart.forEach((item) => {
    if (item.id !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
}
