export let cart;
loadFromStorage();
// FIXME: Checking for null and errors in JSON.prase.
export function loadFromStorage() {
  let storedCart = localStorage.getItem("cart");
  let parsedCart;

  try {
    parsedCart = JSON.parse(storedCart);
  } catch (e) {
    parsedCart = null;
  }
  // ! This is the cart where we are putting our item into from the localStorage.
  // ! And if we get null then we have the if condition to check for that.
  cart = parsedCart;
  if (!cart) {
    cart = [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryID: "1",
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        deliveryID: "2",
      },
    ];
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addItem(ID) {
  let select;
  let NewValue = document.querySelector(`.js-quantity-${ID}`);
  select = parseInt(NewValue.value, 10);

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
      deliveryID: "1",
    });
  }
  updateQuantity();
  saveCart();
}

// TODO: On Reload the Function will be called.
document.addEventListener("DOMContentLoaded", () => {
  const Quantity = localStorage.getItem("quantity");
  let saveQuantity;
  // FIXME:  Checking for null and errors in JSON.prase.
  try {
    saveQuantity = JSON.parse(Quantity);
  } catch (e) {
    saveQuantity = null;
  }
  if (!saveQuantity) {
    // TODO: Check if `.items-quantity` element exists before setting its `textContent`.
    let itemsQuantityElement = document.querySelector(".items-quantity");
    if (itemsQuantityElement) {
      itemsQuantityElement.textContent = saveQuantity;
    }
  }
  // ! update the quantity on every reload.
  updateQuantity();
});

export function updateQuantity() {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  //Storage = totalQuantity;
  // TODO: Check if `.items-quantity` element exists before setting its `textContent`.
  let itemsQuantityElement = document.querySelector(".items-quantity");
  if (itemsQuantityElement) {
    itemsQuantityElement.textContent = totalQuantity;
  }
  // TODO: Check if `.updateQuantity` element exists before setting its `textContent`.
  let itemsQuantity = document.querySelector(".updateQuantity");
  if (itemsQuantity) {
    itemsQuantity.textContent = `${totalQuantity} items`;
  }

  // ! Saving the quantity to localStorage.
  localStorage.setItem("quantity", JSON.stringify(totalQuantity));
  console.log(totalQuantity);
}

export function removeItem(productId) {
  const newCart = [];
  cart.forEach((item) => {
    if (item.id !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveCart();
}

export function cartQuantity(productId) {
  //TODO: get the quantity entered in the input field.
  let inputQuantity = document.querySelector(`.quantity${productId}`).value;
  //TODO: Check if the quantity entered is a number. If not, set it to 0.
  if (inputQuantity) {
    inputQuantity = parseInt(inputQuantity, 10);
  } else {
    inputQuantity = 0;
  }
  //TODO: Check if the quantity entered is a positive number and less than 1000.
  if (inputQuantity > 0 && inputQuantity < 1000) {
    cart.forEach((item) => {
      if (item.id === productId) {
        item.quantity = inputQuantity;
      }
    });
    //TODO: Get the element with class name '.itemQuantity' in a variable.
    //TODO: Run the FOREACH loop to Iterate over each element.
    //TODO: Check if the elementID is equal to the productID.
    //TODO: If its equal make the element.textcontent equal to the InputQuantity.
    let eleMent = document
      .querySelectorAll(".itemQuantity")
      .forEach((element) => {
        if (element.dataset.productId === productId) {
          element.textContent = inputQuantity;
        }
      });
  }
  //TODO: else show an alert message,
  else {
    alert("Please enter a valid quantity between 1 and 999");
  }

  updateQuantity();
  saveCart();
}
//TODO: Update the cart
export function updateDeliveryOptions(productId, deliveryId) {
  let matchingProduct;
  cart.forEach((item) => {
    if (item.id === productId) {
      matchingProduct = item;
    }
  });
  matchingProduct.deliveryID = deliveryId;
  saveCart();
}
