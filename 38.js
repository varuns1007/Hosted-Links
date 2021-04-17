let discounts = [];
let shopDomain = Shopify.shop.split(".")[0];
const hostedUrl = "https://88dbf9b6eb22.ngrok.io";

function start() {
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

  let axiosTag = document.createElement("script");
  axiosTag.src = "https://unpkg.com/axios/dist/axios.min.js";
  document.querySelector("body").appendChild(axiosTag);

  let currentPage = window.location.href.split("/");
  console.log(currentPage);

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
        // discountRendering();
        checkOut();
      }
    }
  }

  // subtotalSelector();
  // totalSelector();
  // individualPriceSelector();
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
      let className = [];
      let attributes = [];
      console.log(node.attributes);
      if (node.attributes.length > 0) {
        for (let j = 0; j < node.attributes.length; j++) {
          if (node.attributes[j].name === "class") {
            className = node.attributes[j].value.split(" ");
          } else {
            attributes.push(node.attributes[j].name);
          }
        }
      }
      // console.log(data);
      // console.log(obj);
      axios
        .post(`${hostedUrl}/widgetSave`, {
          className: className,
          tagName: node.tagName.toLowerCase(),
          location: positionData,
          shopDomain: shopDomain,
          attributes: attributes,
        })
        .then((result) => {
          console.log(result);
          // window.location = "http://localhost:3000/settings";
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

    // fetch(`${hostedUrl}/userData`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: shopDomain,
    //   }), // body data type must match "Content-Type" header
    // })
    //   .then((response) => response.json())
    //   .then((user) => {
    //     console.log(user.data[0].discount);
    //     discounts.push(user.data[0].discount);
    //   });
    // console.log(discounts);
    // let Discounts = [
    //   {
    //     _id: "60796cccba0b1d32d8101d47",
    //     id: 0.7252650572965804,

    //     title: "Hoodie Sale",
    //     priceRule: [
    //       {
    //         discount: 30,
    //         quantity: 2,
    //         discountType: "INR",
    //         tagName: "HOODIESALE30OFF",
    //       },
    //       {
    //         discount: 50,
    //         quantity: 3,
    //         discountType: "INR",
    //         tagName: "HOODIESALE50OFF",
    //       },
    //     ],
    //     buyXgetY: [],
    //     targetSelection: "entitled",
    //     productIds: [39484974792875],
    //     enable: true,
    //   },
    // ];

    // console.log(discounts);

    function findPriceRule(quantity, productId) {
      let applicableDiscount = "0";
      discounts.forEach((discount) => {
        if (discount.productIds.indexOf(productId) !== -1) {
          // console.log(discount);
          for (let i = 0; i < discount.priceRule.length; i++) {
            if (discount.priceRule[i].quantity === quantity) {
              // console.log(discount.PriceRules[i]);
              applicableDiscount = discount.priceRule[i].discount;
            }
          }
        }
      });
      return applicableDiscount;
    }

    console.log(findPriceRule(2, 39484974792875));

    console.log(findPriceRule(2, 39484974792875));

    var subTotal_Location = document.querySelector(".cart-subtotal__price");
    const config = { attributes: true, childList: true, subtree: true };

    console.log("reached");
    //Listening to post req changes

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

      // Later, you can stop observing
      observer.disconnect();

      //subtotal

      let subTotal = 0;
      let discountTotal = 0;
      products.forEach((each) => {
        let productTotal =
          parseInt(each.originalProductQuantity) * parseInt(each.price);
        subTotal += productTotal;
        let discount = findPriceRule(
          parseInt(each.originalProductQuantity),
          parseInt(each.productId)
        );
        // console.log(discount);
        if (discount !== "0") {
          discountTotal += discount;
        }
      });
      console.log(subTotal, discountTotal);
      let discountedSubtotal = subTotal - discountTotal;
      console.log(discountedSubtotal);

      if (discountedSubtotal !== subTotal) {
        subTotal_Location.innerHTML = `<del>Rs. ${String(
          subTotal
        )}</del> <ins style="text-decoration:none">Rs. ${String(
          String(discountedSubtotal)
        )}.00</ins>`;
      } else {
        subTotal_Location.innerHTML = `<ins style="text-decoration:none">Rs. ${String(
          String(subTotal)
        )}.00</ins>`;
      }

      //

      function inputEvent(e) {
        var Id = e.target.id.split("_");
        let changedProductId = Id[Id.length - 1].split(":")[0];
        for (let i = 0; i < products.length; i++) {
          if (products[i].productId === changedProductId) {
            products[i].originalProductQuantity = e.target.value;
          }
        }
        console.log(products);
        // let subTotal = 0;
        // let discountTotal = 0;
        // products.forEach((each) => {
        //   let productTotal =
        //     parseInt(each.originalProductQuantity) * parseInt(each.price);
        //   subTotal += productTotal;
        //   let discount = findPriceRule(
        //     parseInt(each.originalProductQuantity),
        //     parseInt(each.productId)
        //   );
        //   // console.log(discount);
        //   if (discount !== "0") {
        //     discountTotal += discount;
        //   }
        // });
        // console.log(subTotal, discountTotal);
        // let discountedSubtotal = subTotal - discountTotal;
        // console.log(discountedSubtotal);

        // if (discountedSubtotal !== subTotal) {
        //   subTotal_Location.innerHTML = `<del>Rs. ${String(
        //     subTotal
        //   )}</del> <ins style="text-decoration:none">Rs. ${String(
        //     String(discountedSubtotal)
        //   )}.00</ins>`;
        // } else {
        //   subTotal_Location.innerHTML = `<ins style="text-decoration:none">Rs. ${String(
        //     String(subTotal)
        //   )}.00</ins>`;
        // }

        // Start observing the target node for configured mutations
        observer.observe(subTotal_Location, config);
      }

      inputArray.forEach((each) => {
        each.addEventListener("input", inputEvent);
      });
      console.log("event listeners set");
    }

    setEventListeners("span");
    

    fetch(`${hostedUrl}/api/test`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);
        if (data.success) {
          console.log("running");
          checkoutButton[0].onclick = (e) => {
            console.log(products);
            e.preventDefault();
            axios
              .post(`${hostedUrl}/custom-checkout`, {
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
          // console.log(event.target);
          let className = [];
          let attributes = [];
          console.log(event.target.attributes);
          if (event.target.attributes.length > 0) {
            for (let j = 0; j < event.target.attributes.length; j++) {
              if (event.target.attributes[j].name === "class") {
                className = event.target.attributes[j].value.split(" ");
                for (let i = 0; i < className.length; i++) {
                  if (className[i] === "clicked") {
                    className.splice(i);
                  }
                }
              } else {
                attributes.push(event.target.attributes[j].name);
              }
            }
          }
          console.log(className, attributes);
          axios
            .post(`${hostedUrl}/subtotalSave`, {
              className: className,
              tagName: event.target.tagName.toLowerCase(),
              shopName: shopDomain,
              attributes: attributes,
            })
            .then((result) => {
              console.log(result);

              // window.location = "http://localhost:3000/settings";
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
          let className = [];
          let attributes = [];
          console.log(event.target.attributes);
          if (event.target.attributes.length > 0) {
            for (let j = 0; j < event.target.attributes.length; j++) {
              if (event.target.attributes[j].name === "class") {
                className = event.target.attributes[j].value.split(" ");
                for (let i = 0; i < className.length; i++) {
                  if (className[i] === "clicked") {
                    className.splice(i);
                  }
                }
              } else {
                attributes.push(event.target.attributes[j].name);
              }
            }
          }
          console.log(className, attributes);

          axios
            .post(`${hostedUrl}/totalSave`, {
              className: className,
              tagName: event.target.tagName.toLowerCase(),
              shopName: shopDomain,
              attributes: attributes,
            })
            .then((result) => {
              console.log(result);

              // window.location = "http://localhost:3000/settings";
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
          let className = [];
          let attributes = [];
          console.log(event.target.attributes);
          if (event.target.attributes.length > 0) {
            for (let j = 0; j < event.target.attributes.length; j++) {
              if (event.target.attributes[j].name === "class") {
                className = event.target.attributes[j].value.split(" ");
                for (let i = 0; i < className.length; i++) {
                  if (className[i] === "clicked") {
                    className.splice(i);
                  }
                }
              } else {
                attributes.push(event.target.attributes[j].name);
              }
            }
          }
          axios
            .post(`${hostedUrl}/individualSave`, {
              className: className,
              tagName: event.target.tagName.toLowerCase(),
              shopName: shopDomain,
              attributes: attributes,
            })
            .then((result) => {
              console.log(result);

              // window.location = "http://localhost:3000/settings";
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
          `${data.data[0].widgetLocation.div.tagName}.${data.data[0].widgetLocation.div.className[0]}`
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
}

async function init() {
  try {
    let temp = await fetch(`${hostedUrl}/userData`, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: shopDomain,
      }), // body data type must match "Content-Type" header
    });
    temp = await temp.json();
    // console.log(temp.data[0].discount);
    discounts = temp.data[0].discount;
    start();
  } catch (error) {
    console.log(error);
    console.log("app not working");
  }
}

init();
// start();
