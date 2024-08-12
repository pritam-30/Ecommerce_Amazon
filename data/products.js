import { updateDeliveryOptions } from "./cart.js";
import { formatCurrency } from "./money.js";

class Products {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords.map((keyword) =>
      keyword.toLowerCase()
    );
  }
  getPrice() {
    return formatCurrency(this.priceCents);
  }
  getRatingStars() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  extraInfo() {
    return "";
  }
}
class addNew extends Products {
  sizeChartLink;
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }
  extraInfo() {
    return ` <a href="${this.sizeChartLink}" target="_blank">Size chart</a>`;
  }
}
class appliance extends Products {
  instructionsLink;
  warrantyLink;
  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }
  extraInfo() {
    return `<a href="${this.instructionsLink}" target="_blank">Instructions</a> 
            <a href="${this.warrantyLink}" target="_blank">Warranty</a>`;
  }
}

export let products = [];

export function loadProductsFetch() {
  const Promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      return response.json();
    })
    .then((productDATA) => {
      products = productDATA.map((productDetails) => {
        if (productDetails.type === "clothing") {
          return new addNew(productDetails);
        }
        if (productDetails.type === "appliances") {
          return new appliance(productDetails);
        }
        return new Products(productDetails);
      });
      console.log("products");
    });
  return Promise;
}

export function loadProducts(fn) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new addNew(productDetails);
      }
      if (productDetails.type === "appliances") {
        return new appliance(productDetails);
      }
      return new Products(productDetails);
    });
    console.log("products");
    fn();
  });
  xhr.addEventListener("error", () => {
    console.log("error");
  });
  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}
