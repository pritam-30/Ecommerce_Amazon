export const cart = [];

let storage = 0;
document.addEventListener('DOMContentLoaded', () => {
  storage += JSON.parse(localStorage.getItem('cartQuantity'));
  document.querySelector('.cart-quantity').textContent = storage;
});
export function addItem(ID) {
  let select = storage;
  let totalQuantity = storage ; 
  let NewValue = document.querySelector(`.js-quantity-${ID}`);
  select = JSON.parse(NewValue.value);

  let matching;
  cart.forEach((item) => {
    if (item.id === ID) {
      matching = item;
    }});
    if (matching) {
      matching.quantity += select;
    }
    // else, add new item to cart array with quantity 1
    else { 
    cart.push({
      id: ID,
      quantity: select
   })
   }; 
  updateQuantity(totalQuantity);
  console.log(cart);
};
function updateQuantity (totalQuantity) {
  cart.forEach((item) => {
   totalQuantity += item.quantity;
   document.querySelector('.cart-quantity').textContent = totalQuantity;
   localStorage.setItem('cartQuantity', JSON.stringify(totalQuantity));
 });
 console.log(totalQuantity);
}