const product = [{
  image : `images/products/athletic-cotton-socks-6-pairs.jpg`,
  name : " Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating : {
    stars : `images/ratings/rating-45.png`,
    reviews : 87
  },
  product_price : 1090
},
{
  image : `images/products/intermediate-composite-basketball.jpg`,
  name : "Intermediate Size Basketball",
  rating : {
    stars : `images/ratings/rating-40.png`,
    reviews : 127
  },
  product_price :  2095
},
{
  image : `images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg`,
  name : " Adults Plain Cotton T-Shirt - 2 Pack",
  rating : {
    stars : `images/ratings/rating-45.png`,
    reviews : 56
  },
  product_price :  799
}];

// Generate HTML for products
let html = "";
product.forEach((product) => {
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
              src="${product.rating.stars}">
            <div class="product-rating-count link-primary">
              ${product.rating.reviews}
            </div>
          </div>

          <div class="product-price">
            $${(product.product_price / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`;
});
document.querySelector('.products-grid').innerHTML = html;