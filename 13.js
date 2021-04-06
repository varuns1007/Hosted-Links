// const { default: axios } = require("axios");

// alert('heyy')
var products_Individual_Price_Array = document.querySelectorAll(
  "dd[data-cart-item-regular-price]"
);
var products_Individual_TotalPrice_Array = document.querySelectorAll(
  "span[data-cart-item-regular-price]"
);

var inputArray = document.querySelectorAll(
  'form[action^="/cart"] [type="number"]'
);

var checkoutButton = document.querySelectorAll(
  'form[action^="/cart"] [type="submit"]'
);

// console.log(String(checkoutButton));

var product_Title_array = document.querySelectorAll(
  'form[action^="/cart"] a[data-cart-item-title]'
);

var product_images = document.querySelectorAll(
  'form[action^="/cart"] img[data-cart-item-image]'
);

let axiosTag = document.createElement("script");
axiosTag.src = "https://unpkg.com/axios/dist/axios.min.js";
document.querySelector("body").appendChild(axiosTag);

let utf8Tag = document.createElement("script");
utf8Tag.src = "https://cdnjs.cloudflare.com/ajax/libs/utf8/3.0.0/utf8.min.js";
document.querySelector("body").appendChild(utf8Tag);

let currentPage = window.location.href.split("/");
console.log(currentPage);
let shopDomain = Shopify.shop.split(".")[0];
// let productName = meta.product.variants[0].name
//   .toLowerCase()
//   .split(" ")
//   .join("-");

for (let i = 0; i < currentPage.length; i++){
  if (currentPage[i] === 'products') {
    let productsPage = currentPage.join("/").split("?");
    if (
      productsPage[productsPage.length - 1] ===
      `widgetSelector`
    ) {
      console.log("entered if");
      selectWidgetLocation()
    }
  } else if (currentPage[i] === 'cart') {
    let cartPage = currentPage.join("/").split("?");
    if (
      cartPage[cartPage.length - 1] ===
      `subtotalSelector`
    ) {
      console.log("subtotalSelector");

      subtotalSelector();
    } else if (
      cartPage[cartPage.length - 1] ===
      `totalSelector`
    ) {
      console.log("totalSelector");
      totalSelector();
    } else if (
      cartPage[cartPage.length - 1] ===
      `individualPriceSelector`
    ) {
      console.log("individualPriceSelector");

      individualPriceSelector();
    } else {
      console.log("checkOut");

      checkOut();
    }
  }
}

// selectWidgetLocation();

function selectWidgetLocation() {
  // let result = decodeURI("%5Bobject%20HTMLDivElement%5D");
  // console.log(result);
  function initCss() {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute(
      "href",
      "https://cdn.jsdelivr.net/gh/varuns1007/Hosted-Links/individualProduct.css"
    );
    document.head.appendChild(link);
  }
  initCss();
  // alert("Press shift and then select the div by clicking");
  let positionData;
  let parentDiv;
  function position(pos, node) {
    positionData = pos;
    // console.log(positionData);
    // console.log(node);
    node.classList.remove("clicked");
    if (positionData === "Above") {
      node.insertAdjacentHTML(
        "beforebegin",
        '<div style="display:block;border: 1px solid grey;padding: 1em;background-color: #dff0d8;width: fit-content;"><p>Widget will be displayed here</p></div>'
      );
    } else if (positionData === "Below") {
      node.insertAdjacentHTML(
        "afterend",
        '<div style="display:block;border: 1px solid grey;margin:0.5em 0;padding: 1em;background-color: #dff0d8;width: fit-content;"><p>Widget will be displayed here</p></div>'
      );
    }
    document.querySelector("#ulList").style.display = "none";
    axios
      .post("http://localhost:5000/widgetSave", {
        div: encodeURI(node),
        location: positionData,
        shopName: shopDomain,
      })
      .then((result) => {
        window.location = "http://localhost:3000/settings";
      })
      .catch((err) => console.log(err.data));
  }
  var clicked = false;

  function updateShift(event) {
    if (event.shiftKey && !clicked) {
      document.body.classList.add("shift-pressed");
    } else {
      document.body.classList.remove("shift-pressed");
    }
  }
  function shiftClick(event) {
    if (event.shiftKey) {
      /* console.log("hi") */

      if (window.confirm("Confirm Selection")) {
        clicked = true;
        event.target.setAttribute("class", "clicked");
        parentDiv = event.target;

        event.target.insertAdjacentHTML(
          "afterend",
          //
          '<div class="positionPopup" id="ulList"><ul><li id="Above"><a href="#">Above Element</a> </li><li id="Below"><a href="#">Below Element</a> </li></ul></div>'
        );
        document
          .querySelector("#Above")
          .addEventListener("click", () => position("Above", parentDiv));
        document
          .querySelector("#Below")
          .addEventListener("click", () => position("Below", parentDiv));

        document.body.className = "";
      } else {
        clicked = false;
      }
    }
  }
  var button = document.querySelector("button");
  button.addEventListener("mousemove", updateShift);
  window.addEventListener("keydown", updateShift);
  window.addEventListener("keyup", updateShift);
  window.addEventListener("click", shiftClick);
}

function checkOut() {
  var checkoutButton = document.querySelectorAll(
    'form[action^="/cart"] [type="submit"]'
  );

  checkoutButton[0].onclick = (e) => {
    e.preventDefault();
    axios
      .post("https://07472247e7bb.ngrok.io/custom-checkout", {
        // or 'PUT'
        products,
        shopDomain,
      })
      .then((response) => {
        console.log("Success:", response);
        window.location = response.data.url;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("clicked");
  };
}

function subtotalSelector() {
  var clicked = false;

  function updateShift(event) {
    if (event.shiftKey && !clicked) {
      document.body.classList.add("shift-pressed");
    } else {
      document.body.classList.remove("shift-pressed");
    }
  }
  function shiftClick(event) {
    if (event.shiftKey) {
      /* console.log("hi") */

      if (window.confirm("Confirm Selection")) {
        clicked = true;
        event.target.setAttribute("class", "clicked");

        axios
          .post("http://localhost:5000/subtotalSave", {
            div: encodeURI(event.target),
            shopName:shopDomain,
          })
          .then((result) => {
            window.location = "http://localhost:3000/settings";
          })
          .catch((err) => console.log(err.data));

        document.body.className = "";
      } else {
        clicked = false;
      }
    }
  }
  var button = document.querySelector("button");
  button.addEventListener("mousemove", updateShift);
  window.addEventListener("keydown", updateShift);
  window.addEventListener("keyup", updateShift);
  window.addEventListener("click", shiftClick);
}
function totalSelector() {
  var clicked = false;

  function updateShift(event) {
    if (event.shiftKey && !clicked) {
      document.body.classList.add("shift-pressed");
    } else {
      document.body.classList.remove("shift-pressed");
    }
  }
  function shiftClick(event) {
    if (event.shiftKey) {
      /* console.log("hi") */

      if (window.confirm("Confirm Selection")) {
        clicked = true;
        event.target.setAttribute("class", "clicked");

        axios
          .post("http://localhost:5000/totalSave", {
            div: encodeURI(event.target),
            shopName: shopDomain,
          })
          .then((result) => {
            window.location = "http://localhost:3000/settings";
          })
          .catch((err) => console.log(err.data));

        document.body.className = "";
      } else {
        clicked = false;
      }
    }
  }
  var button = document.querySelector("button");
  button.addEventListener("mousemove", updateShift);
  window.addEventListener("keydown", updateShift);
  window.addEventListener("keyup", updateShift);
  window.addEventListener("click", shiftClick);
}
function individualPriceSelector() {
  var clicked = false;

  function updateShift(event) {
    if (event.shiftKey && !clicked) {
      document.body.classList.add("shift-pressed");
    } else {
      document.body.classList.remove("shift-pressed");
    }
  }
  function shiftClick(event) {
    if (event.shiftKey) {
      /* console.log("hi") */

      if (window.confirm("Confirm Selection")) {
        clicked = true;
        event.target.setAttribute("class", "clicked");

        axios
          .post("http://localhost:5000/individualSave", {
            div: encodeURI(event.target),
            shopName: shopDomain,
          })
          .then((result) => {
            window.location = "http://localhost:3000/settings";
          })
          .catch((err) => console.log(err.data));

        document.body.className = "";
      } else {
        clicked = false;
      }
    }
  }
  var button = document.querySelector("button");
  button.addEventListener("mousemove", updateShift);
  window.addEventListener("keydown", updateShift);
  window.addEventListener("keyup", updateShift);
  window.addEventListener("click", shiftClick);
}

//Product Listing
let arr = Array.prototype.slice.call(inputArray, 0);
for (let i = -1; i < arr.length - 1; i++) {
  arr.splice(i + 1, 1);
}

let products = [];
for (let i = 0; i < arr.length; i++) {
  var id = arr[i].id.split("_");
  let productId = id[id.length - 1].split(":")[0];
  let obj = {
    productName: product_Title_array[i].innerText,
    productId: productId,
    productImage: product_images[i].src,
    originalProductQuantity: arr[i].value,
    price: products_Individual_Price_Array[i].innerText.split(" ")[1],
    priceDiv: products_Individual_Price_Array[i],
    totalPrice: products_Individual_TotalPrice_Array[i].innerText.split(" ")[1],
    totalPriceDiv: products_Individual_TotalPrice_Array[i],
    inputDiv: arr[i],
  };
  products.push(obj);
}