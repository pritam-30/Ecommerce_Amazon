import { renderCheckout } from "./orderSummary.js";
import "./cart.js";
import { loadProducts } from "./products.js";
loadProducts(renderCheckout);
