// const { default: axios } = require("axios");

// alert('heyy')
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

const hostedUrl = "https://1e64540ab9a8.ngrok.io";

let axiosTag = document.createElement("script");
axiosTag.src = "https://unpkg.com/axios/dist/axios.min.js";
document.querySelector("body").appendChild(axiosTag);

let currentPage = window.location.href.split("/");
console.log(currentPage);
let shopDomain = Shopify.shop.split(".")[0];
// let productName = meta.product.variants[0].name
//   .toLowerCase()
//   .split(" ")
//   .join("-");

for (let i = 0; i < currentPage.length; i++) {
  if (currentPage[i] === "products") {
    let productsPage = currentPage.join("/").split("?");
    if (productsPage[productsPage.length - 1] === `widgetSelector`) {
      console.log("selectWidgetLocation");
      selectWidgetLocation();
    } else {
      console.log("renderWidget");
      renderWidget();
    }
  } else if (
    currentPage[i] === "cart" ||
    currentPage[i] === "cart?subtotalSelector" ||
    currentPage[i] === "cart?totalSelector" ||
    currentPage[i] === "cart?individualPriceSelector"
  ) {
    let cartPage = currentPage.join("/").split("?");
    if (cartPage[cartPage.length - 1] === `subtotalSelector`) {
      console.log("subtotalSelector");

      subtotalSelector();
    } else if (cartPage[cartPage.length - 1] === `totalSelector`) {
      console.log("totalSelector");
      totalSelector();
    } else if (cartPage[cartPage.length - 1] === `individualPriceSelector`) {
      console.log("individualPriceSelector");

      individualPriceSelector();
    } else {
      console.log("checkOut");
      discountRendering();
      checkOut();
    }
  }
}

// selectWidgetLocation();
// renderWidget();
// checkOut();
// discountRendering();

function selectWidgetLocation() {
  // let result = decodeURI("%5Bobject%20HTMLDivElement%5D");
  // console.log(result);

  alert("Press shift and then select the div by clicking");
  let positionData;
  let parentDiv;
  function position(pos, node) {
    positionData = pos;
    // console.log(positionData);
    console.log(node);
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
    console.log(node.classList[0]);
    console.log(node.tagName.toLowerCase());

    // console.log(data);
    // console.log(obj);
    axios
      .post(`${hostedUrl}/widgetSave`, {
        className: node.classList[0],
        tagName: node.tagName.toLowerCase(),
        location: positionData,
        shopDomain: shopDomain,
      })
      .then((result) => {
        console.log(result);
        window.location = "http://localhost:3000/settings";
      })
      .catch((err) => console.log(err));
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
        event.target.classList.add("clicked");
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
  var checkoutButton,
    inputArray,
    products_Individual_Price_Array,
    products_Individual_TotalPrice_Array,
    product_Title_array,
    product_images;

  let products = [];

  function setEventListeners(totalPriceTag) {
    products = [];
    checkoutButton = document.querySelectorAll(
      'form[action^="/cart"] [type="submit"]'
    );

    inputArray = document.querySelectorAll(
      'form[action^="/cart"] [type="number"]'
    );

    products_Individual_Price_Array = document.querySelectorAll(
      "dd[data-cart-item-regular-price]"
    );

    products_Individual_TotalPrice_Array = document.querySelectorAll(
      `${totalPriceTag}[data-cart-item-regular-price]`
    );

    // console.log(String(checkoutButton));

    product_Title_array = document.querySelectorAll(
      'form[action^="/cart"] a[data-cart-item-title]'
    );

    product_images = document.querySelectorAll(
      'form[action^="/cart"] img[data-cart-item-image]'
    );

    //Product Listing
    let arr = Array.prototype.slice.call(inputArray, 0);
    for (let i = -1; i < arr.length - 1; i++) {
      arr.splice(i + 1, 1);
    }

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
        totalPrice: products_Individual_TotalPrice_Array[i].innerText.split(
          " "
        )[1],
        totalPriceDiv: products_Individual_TotalPrice_Array[i],
        inputDiv: arr[i],
      };
      products.push(obj);
    }

    function inputEvent(e) {
      var Id = e.target.id.split("_");
      let changedProductId = Id[Id.length - 1].split(":")[0];
      for (let i = 0; i < products.length; i++) {
        if (products[i].productId === changedProductId) {
          products[i].originalProductQuantity = e.target.value;
        }
      }
      console.log(products);
    }

    inputArray.forEach((each) => {
      each.addEventListener("input", inputEvent);
    });
    console.log('event listeners set');
  }

  setEventListeners("span");
  console.log("reached");
  //Listening to post req changes

  var subTotal_Location = document.querySelector(".cart-subtotal__price");
  const config = { attributes: true, childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    // setTimeout(() => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
          setEventListeners("dd");
        } else if (mutation.type === "attributes") {
          console.log(
            "The " + mutation.attributeName + " attribute was modified."
          );
          setEventListeners("dd");
        }
      }
    // }, 200);
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(subTotal_Location, config);

  fetch(`${hostedUrl}/api/test`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.success);
      if (data.success) {
        console.log("running");
        checkoutButton[0].onclick = (e) => {
          console.log(products);
          e.preventDefault();
          // axios
          //   .post(`${hostedUrl}/custom-checkout`, {
          //     // or 'PUT'
          //     products,
          //     shopDomain,
          //   })
          //   .then((response) => {
          //     console.log("Success:", response);
          //     window.location = response.data.url;
          //   })
          //   .catch((error) => {
          //     console.error("Error:", error);
          //   });
          // console.log("clicked");
        };
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function subtotalSelector() {
  alert("Press shift and then select the div by clicking");

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
        event.target.classList.add("clicked");
        let className;
        if (event.target.classList[0] === "clicked") {
          className = "";
        } else {
          className = event.target.classList[0];
        }
        axios
          .post(`${hostedUrl}/subtotalSave`, {
            className: className,
            tagName: event.target.tagName.toLowerCase(),
            shopName: shopDomain,
          })
          .then((result) => {
            console.log(result);

            window.location = "http://localhost:3000/settings";
          })
          .catch((err) => console.log(err));

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
  alert("Press shift and then select the div by clicking");

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
        event.target.classList.add("clicked");
        let className;
        if (event.target.classList[0] === "clicked") {
          className = "";
        } else {
          className = event.target.classList[0];
        }
        axios
          .post(`${hostedUrl}/totalSave`, {
            className: className,
            tagName: event.target.tagName.toLowerCase(),
            shopName: shopDomain,
          })
          .then((result) => {
            console.log(result);

            window.location = "http://localhost:3000/settings";
          })
          .catch((err) => console.log(err));

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
  alert("Press shift and then select the div by clicking");

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
        event.target.classList.add("clicked");
        let className;
        if (event.target.classList[0] === "clicked") {
          className = "";
        } else {
          className = event.target.classList[0];
        }
        axios
          .post(`${hostedUrl}/individualSave`, {
            className: className,
            tagName: event.target.tagName.toLowerCase(),
            shopName: shopDomain,
          })
          .then((result) => {
            console.log(result);

            window.location = "http://localhost:3000/settings";
          })
          .catch((err) => console.log(err));

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

function renderWidget() {
  fetch(`${hostedUrl}/userData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: shopDomain,
    }), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let node = document.querySelector(
        `${data.data[0].widgetLocation.div.tagName}.${data.data[0].widgetLocation.div.className}`
      );
      console.log(node);
      if (data.data[0].widgetLocation.location === "Below") {
        node.insertAdjacentHTML(
          "afterend",
          `<div
                    style="
                      border: 2px solid #707e8c;
                      width: fit-content;
                      background-color: #f1f2f2;
                      margin-top: 1em;
                      margin: 1em 0;
                    "
                  >
                    <div
                      style="
                        padding: 1em 1em;
                        text-align: left;
                        border-bottom: 1px solid #707e8c;
                      "
                    >
                      <p style="font-weight: "700"">Special: </p>
                    </div>
                    <div style=" padding: 1em 1em; text-align:center">
                      <p style="font-weight:700">
                        Buy 3 for X (Z% off! )
                      </p>
                      <p style="font-weight:700">
                        Buy 5 for X (Z% off! )
                      </p>
                      <p style="font-weight:700">
                        Buy 7 for X (Z% off! )
                      </p>
                    </div>
                  </div>`
        );
      } else if (data.data[0].widgetLocation.location === "Above") {
        node.insertAdjacentHTML(
          "beforebegin",
          `<div
                    style="
                      border: 2px solid #707e8c;
                      width: fit-content;
                      background-color: #f1f2f2;
                      margin-top: 1em;
                      margin: 1em 0;
                    "
                  >
                    <div
                      style="
                        padding: 1em 1em;
                        text-align: left;
                        border-bottom: 1px solid #707e8c;
                      "
                    >
                      <p style="font-weight: "700"">Special: </p>
                    </div>
                    <div style=" padding: 1em 1em; text-align:center">
                      <p style="font-weight:700">
                        Buy 3 for X (Z% off! )
                      </p>
                      <p style="font-weight:700">
                        Buy 5 for X (Z% off! )
                      </p>
                      <p style="font-weight:700">
                        Buy 7 for X (Z% off! )
                      </p>
                    </div>
                  </div>`
        );
      }
    })
    .catch((err) => console.log(err));
}

function discountRendering() {}
