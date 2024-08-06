function Cart(StorageKey) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      let storedCart = localStorage.getItem(StorageKey);
      let parsedCart;

      try {
        parsedCart = JSON.parse(storedCart);
      } catch (e) {
        parsedCart = null;
      }
      // ! This is the cart where we are putting our item into from the localStorage.
      // ! And if we get null then we have the if condition to check for that.
      this.cartItems = parsedCart;
      if (!this.cartItems) {
        this.cartItems = [
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
    },
    saveCart() {
      localStorage.setItem(StorageKey, JSON.stringify(this.cartItems));
    },
    addItem(ID) {
      let select;
      let NewValue = document.querySelector(`.js-quantity-${ID}`);
      select = parseInt(NewValue.value, 10);

      let matching;
      this.cartItems.forEach((item) => {
        if (item.id === ID) {
          matching = item;
        }
      });
      if (matching) {
        matching.quantity += select;
      }
      // else, add new item to cart array with quantity 1
      else {
        this.cartItems.push({
          id: ID,
          quantity: select,
          deliveryID: "1",
        });
      }
      this.updateQuantity();
      this.saveCart();
    },
    updateQuantity() {
      let totalQuantity = 0;
      this.cartItems.forEach((item) => {
        totalQuantity += item.quantity;
      });

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
    },
    removeItem(productId) {
      const newCart = [];
      this.cartItems.forEach((item) => {
        if (item.id !== productId) {
          newCart.push(item);
        }
      });
      this.cartItems = newCart;
      this.saveCart();
    },
    cartQuantity(productId) {
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
        this.cartItems.forEach((item) => {
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

      this.updateQuantity();
      this.saveCart();
    },
    updateDeliveryOptions(productId, deliveryId) {
      let matchingProduct;
      this.cartItems.forEach((item) => {
        if (item.id === productId) {
          matchingProduct = item;
        }
      });
      matchingProduct.deliveryID = deliveryId;
      this.saveCart();
    },
  };
  return cart;
}
const load = Cart("cart - oop");
const aLoad = Cart("cart - business");

load.loadFromStorage();
aLoad.loadFromStorage();
console.log(load);
console.log(aLoad);
