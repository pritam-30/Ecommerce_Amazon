import { renderCheckout } from "./orderSummary.js";
import "./cart.js";
import { loadProductsFetch } from "./products.js";
/**
 * A Promise-based function that loads products and resolves when done.
 *
 * @param {Function} callback-A callback function to be executed after products are loaded.
 * @returns {Promise} A Promise that resolves when products are loaded.
 *
 * @example
 */
//TODO: Using Promise here for clear code and easily-readable.
//TODO: Promise.all is used to run multiple given Promises
//TODO: But the Promise.all below has only one Promise given inside it.
// ! Resolve is used to go to the next time after loading the first given item.

Promise.all([loadProductsFetch()]).then(() => {
  renderCheckout();
});
