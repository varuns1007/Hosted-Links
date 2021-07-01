//last updated: 30-06-21 12:00pm
let superAssistantUser2 = [];
let superAssistantUser2_cartData = [];
let superAssistantUser2_shopDomain = Shopify.shop.split(".")[0];
// let superAssistantUser2_shopDomain = "testing-store-custom";
let superAssistantUser2_shopifyThemeId = Shopify.theme.theme_store_id;
let superAssistantUser2_shopifyCurrency = Shopify.currency.active;
let popUpLogoUrl =
  "https://sacdnfiles.s3.ap-south-1.amazonaws.com/assets/sa_black_logo.svg";
// let shopDomain = "super-assistant-demo2";
// let hostedUrl = "https://app1.superassistant.io"; //backend url
// let frontendUrl = "https://app.superassistant.io"; //frontend url
let superAssistantUser2_frontendUrl = "https://discounts.superassistant.io"; //frontend url
// let superAssistantUser2_hostedUrl =
  // "https://upsell-discounts-backend.superassistant.io";
let superAssistantUser2_hostedUrl = "https://f1f117f7dcce.ngrok.io";
let customCheckoutUrl = superAssistantUser2_hostedUrl + "/api/comparison";

function findImage(imageId, imageArray) {
  let imageUrl = "";
  if (imageId === null) {
    imageUrl = imageArray[0].src;
  } else {
    let imageIndex = imageArray.findIndex(function (img, index) {
      if (img.id == imageId) return true;
    });

    console.log(imageIndex);

    if (imageIndex !== -1) {
      imageUrl = imageArray[imageIndex].src;
    } else {
      imageUrl = imageArray[0].src;
    }
  }

  return imageUrl;
}

//start
function startUpSell() {
  function initCssUpSell() {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute(
      "href",
      "https://cdn.jsdelivr.net/gh/varuns1007/Hosted-Links/upSell-testing-3.css"
    );
    document.head.appendChild(link);
  }
  initCssUpSell();

  let axiosTag_UpSell = document.createElement("script");
  axiosTag_UpSell.src = "https://unpkg.com/axios/dist/axios.min.js";
  document.querySelector("body").appendChild(axiosTag_UpSell);

  let jqueryTag_UpSell = document.createElement("script");
  jqueryTag_UpSell.src = "https://code.jquery.com/jquery-3.4.0.js";
  document.querySelector("body").appendChild(jqueryTag_UpSell);

  //sentry error handling
  let sentryTag = document.createElement("script");
  sentryTag.src = "https://browser.sentry-cdn.com/6.7.2/bundle.tracing.min.js";
  sentryTag.integrity =
    "sha384-wOrLFfswE3wmvwEzqgo2kc7ksrFcx4ephHugBnWW3jY8ktO8xSi5Lny58pZSpovY";
  sentryTag.crossorigin = "anonymous";

  document.querySelector("body").appendChild(sentryTag);

  try {
    Sentry.init({
    dsn: "https://7bcc435e0498442e827f030fb64d53c7@o609888.ingest.sentry.io/5829956",
    // this assumes your build process sets "npm_package_version" in the env
    release: "upsell-crosssell-js",
    integrations: [new Sentry.Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
  } catch (error) {
    console.log("Sentry error",error);
  }

  // let jqueryTag = document.createElement("script");
  // jqueryTag.src =
  //     "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js";
  // document.querySelector("body").appendChild(axiosTag);
  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  const at_thank_you_page = () => {
    if (Shopify.checkout) {
      if (Shopify.checkout.created_at) {
        return true;
      }
    }
    return false;
  };

  //   let a = {};
  //   console.log(isEmpty(a));

  let currentPage_UpSell = window.location.href.split("/");
  console.log(currentPage_UpSell);

  // let productName = meta.product.variants[0].name
  //   .toLowerCase()
  //   .split(" ")
  //   .join("-");
  console.log(at_thank_you_page());
  if (at_thank_you_page()) {
    console.log("thankyou page");
    thankyouPagePopUp();
  } else {
    for (let i = 0; i < currentPage_UpSell.length; i++) {
      if (currentPage_UpSell[i] === "products") {
        console.log("productPage");
        productPagePopUp();
      } else if (currentPage_UpSell[i] === "cart") {
        console.log("cartPage");
        cartPagePopUp();
      }
    }
  }

  // testing
  // productPagePopUp();
  // cartPagePopUp();
  // thankyouPagePopUp();

  async function productPagePopUp() {
    // await fetch("/cart.js")
    //   .then((response) => response.json())
    //   .then((data) => {
    // let originalCart = data;
    // let superAssistantUser2_shopifyCurrency = Shopify.currency.active;
    // let superAssistantUser2_shopDomain = Shopify.shop.split(".")[0];
    // let jqueryTag = document.createElement("script");
    // jqueryTag.src = "https://code.jquery.com/jquery-3.4.0.js";
    // document.querySelector("body").appendChild(jqueryTag);

    //user
    console.log(superAssistantUser2);
    let modalStyle = superAssistantUser2.discountStyle[0];

    //css
    console.log(superAssistantUser2);

    //temp cart
    var old_Cart = [];

    //function to change oldcart variable value to just before item is added one
    function changeNewOldCart(newArr) {
      old_Cart = newArr;
    }

    //UniqueCode Generator
    // function generateDiscountCode(length) {
    //   var result = [];
    //   var characters =
    //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //   var charactersLength = characters.length;
    //   for (var i = 0; i < length; i++) {
    //     result.push(
    //       characters.charAt(Math.floor(Math.random() * charactersLength))
    //     );
    //   }
    //   return (
    //     `${superAssistantUser2_shopDomain.toUpperCase()}-` + result.join("")
    //   );
    // }

    // console.log(generateDiscountCode(6));

    // let discountCode = generateDiscountCode(6);

    function startTimer(duration, display) {
      var timer = duration,
        minutes,
        seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          timer = 0;
          // document.querySelector(".couponDisplay").style.display = "none";
        }
      }, 1000);
    }

    // dynamicModalUpdate(obj);

    // console.log(temp);

    let popUpMask = document.createElement("div");
    popUpMask.role = "dialog";
    popUpMask.className = "mask";

    let modalBody = document.createElement("div");
    modalBody.className = "modal";
    modalBody.role = "alert";
    modalBody.id = "superAssistantModal";
    modalBody.style.background = modalStyle.backGroundColor;
    modalBody.style.borderRadius = "10px";
    // modalBody.innerHTML = temp;

    let modalClose = document.createElement("button");
    modalClose.className = "close";
    modalClose.role = "button";
    modalClose.innerText = "X";

    let sliderDiv = document.createElement("div");
    sliderDiv.className = "sliderBox";

    let prevButton = document.createElement("a");
    prevButton.className = "prev";
    prevButton.innerHTML = "&#10094;";
    // prevButton.onclick = plusSlides(-1);

    let nextButton = document.createElement("a");
    nextButton.className = "next";
    nextButton.innerHTML = "&#10095;";
    // nextButton.onclick = plusSlides(1);

    sliderDiv.appendChild(prevButton);
    sliderDiv.appendChild(nextButton);

    modalBody.appendChild(modalClose);
    modalBody.appendChild(sliderDiv);

    //couponDisplayDiv
    // let couponDisplayDiv = document.createElement("div");
    // couponDisplayDiv.className = "couponDisplay";
    // couponDisplayDiv.classList.add("fade");

    // couponDisplayDiv.style.position = "fixed";
    // couponDisplayDiv.style.zIndex = "99999999999";

    // let div1 = document.createElement("div");
    // div1.style.display = "flex";
    // div1.style.gap = "1em";

    // let discountCodeP = document.createElement("p");
    // discountCodeP.className = "couponText";
    // discountCodeP.innerHTML =
    //   'Discount Code : <span id="discountCodeP" class="couponSpan"></span>';

    // let discountTimeP = document.createElement("p");
    // discountTimeP.className = "couponText";
    // discountTimeP.innerHTML =
    //   'Remaining Time: <span id="countdownTimerFooter" class="couponTime">05:00</span>';

    // div1.appendChild(discountCodeP);
    // div1.appendChild(discountTimeP);

    // let div2 = document.createElement("div");
    // let couponText = document.createElement("p");
    // couponText.className = "couponText";
    // couponText.innerText =
    //   "This is your discount code. Kindly click on checkout to add the following discount to your order!";

    // div2.appendChild(couponText);

    // couponDisplayDiv.appendChild(div1);
    // couponDisplayDiv.appendChild(div2);

    document.querySelector("body").appendChild(popUpMask);
    document.querySelector("body").appendChild(modalBody);
    // document.querySelector("body").appendChild(couponDisplayDiv);

    let modal = `
          <button class="close" role="button">X</button>
      <div style="padding: 1em; text-align: center">
        <p style="font-size: 0.8em">
          discountPercentage
        </p>
        <h4
          style="
            font-weight: 600;
            font-size: 1.4em;
            background: #2d2d2d;
            padding: 0.5em;
            color: white;
            margin:0;
          "
        >
          Hurry! Offer will expire in <span id="countdownTimer">offerTime</span>
        </h4>
        <div style="height: 25em; overflow-y: scroll">
          <h4 style="font-weight: 600; font-size: 1.2em; padding: 0.5em;margin:0;">
            productName
          </h4>
          discountedPrice
          totalDiscount
          <img
            style="width: 10em; border-radius: 5px"
            src=productImage
            alt=""
          />
          <div style="display: flex; justify-content: center">
            optionsList
          <div style="padding-top: 1em">
            <label for="quantity">Quantity:</label>
            <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
              <input
                type="number"
                style="
                  padding: 0.5em;
                  border: 1px solid #cdd0d2;
                  border-radius: 4px;
                  width: 15em;
                  text-align: center;
                "
                value="1"
                name="quantity"
                id="quantity"
              />
            </div>
          </div>
          <div style="padding-top: 1em; color: grey">
            
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            padding-top: 1em;
          "
        >
          <button
            style="
              padding: 1em 5em;
              font-weight: 600;
              font-size: 1em;
              color: white;
              background: #18a95e;
              cursor: pointer;
              border: 1px solid #cdd0d2;
            "
          >
            Grab this Deal
          </button>
          <a
            href="https://www.google.com/"
            style="color: #18a95e; font-weight: 600"
          >
            Skip and Continue to Checkout
          </a>
        </div>
        <div style="display: flex; justify-content: center; padding-top: 1em">
          <img
            src="https://cdn.shopify.com/assets/images/logos/shopify-bag.png"
            alt=""
            style="width: 2em"
          />
          <p style="font-size: 0.9em">Powered By SuperAssistant</p>
        </div>
      </div>
          </div>
      </div> 
      `;

    let Obj = {
      discountPercentage: "Deal unlocked! Get this product for 20% off",
      offerTime: "5:00",
      productName: "Test 1",
      currency: superAssistantUser2_shopifyCurrency,
      originalPrice: "10.00",
      discountedPrice: "7.5",
      totalDiscount: "2.5",
      productImage: "https://pbs.twimg.com/media/EdPratRVcAAo6Pr.jpg",
    };

    let temp = "";

    function dynamicModalUpdate(obj) {
      modalBody.innerHTML = modal.replace(
        /discountPercentage|offerTime|productName|discountedPrice|totalDiscount|productImage|optionsList/gi,
        function (matched) {
          return obj[matched];
        }
      );
    }

    async function openUpSellChild(index, path, variantId, quantity) {
      console.log(offers[index]);
      await fetch("/cart/add.js", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              quantity: quantity,
              id: variantId,
            },
          ],
        }), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          let offer = offers[index];
          let currentOffer = "";
          if (path === "A-A") {
            currentOffer =
              offer.downsellCondition.offerAccepted.offerAccepted_child;
          } else if (path === "D-A") {
            currentOffer =
              offer.downsellCondition.offerDeclined.offerAccepted_child;
          }

          if (currentOffer.isExists && !currentOffer.skip_offer) {
            let discount,
              productName,
              originalPrice,
              discountedPrice,
              totalDiscount;
            offeredProductIds.push(currentOffer.selectedProduct.id);
            productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
            originalPrice = currentOffer.selectedProduct.variants[0].price;

            let variantId2 = currentOffer.selectedProduct.variants[0].id;

            if (currentOffer.discount.type === "Discount") {
              if (currentOffer.discount.discountType === "INR") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
                  );
                }
                console.log(topMessage.join(" "));
                // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(currentOffer.discount.discountValue)
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

                let availableDiscount = currentOffer.discount.discountValue;

                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              } else if (currentOffer.discount.discountType === "%") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
                  );
                }
                console.log(topMessage.join(" "));
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(
                      (currentOffer.discount.discountValue / 100) *
                        parseFloat(originalPrice)
                    )
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

                let availableDiscount = String(
                  parseFloat(
                    (currentOffer.discount.discountValue / 100) *
                      parseFloat(originalPrice)
                  ).toFixed(2)
                );

                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              }
            } else {
              discount = "Deal unlocked! You might need this too! ";
              discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
              totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
            }

            //free shipping
            let freeShipping = "";
            if (currentOffer.include_free_shipping) {
              freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
            }

            //options will be used to next update, now only one variant is shown
            // let modalOptionsList = [];
            // currentOffer.selectedProduct.options.forEach((each) => {
            //   modalOptionsList.push(createSelector(each));
            // });
            // console.log(modalOptionsList);

            let imageUrl = findImage(
              currentOffer.selectedProduct.variants[0].image_id,
              currentOffer.selectedProduct.images
            );

            console.log(imageUrl);

            let obj = {
              // INDEX: index,
              discountPercentage: discount,
              // offerTime: "5:00",
              productName: productName,
              // currency: superAssistantUser2_shopifyCurrency,
              // originalPrice: "10.00",
              freeShipping: freeShipping,
              // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
              optionsList: " ",
              discountedPrice: discountedPrice,
              totalDiscount: totalDiscount,
              productImage: imageUrl,
            };
            let upSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="upSell2Modal"
>
  <button id="upSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSellChild1_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild1_button"
        class="upSellChild2Close"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild1_button"
        class="upSellChild2Close"
      >
         ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em;color:${modalStyle.textColor}"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor}">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
            upSellModalData = upSellModalData.replace(
              /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,
              function (matched) {
                return obj[matched];
              }
            );
            let upSell2Modal = document.createElement("div");
            upSell2Modal.id = "upSell2Modal";
            upSell2Modal.className = "modal";
            upSell2Modal.style.visibility = "visible";
            upSell2Modal.style.opacity = "1";
            // upSell2Modal.style.border = "3px solid grey";
            upSell2Modal.style.height = "40em";
            upSell2Modal.style.top = "19%";
            upSell2Modal.style.borderRadius = "11px";
            upSell2Modal.innerHTML = upSellModalData;
            document.querySelector("body").appendChild(upSell2Modal);
            document
              .querySelector("#upSellModal2Close")
              .addEventListener(
                "click",
                () => (upSell2Modal.style.display = "none")
              );

            //if clicks on accepted

            document
              .querySelector("#upSellChild1_button")
              .addEventListener("click", async () => {
                let quantity2 = parseFloat(
                  document.querySelector("#upSellChild1_quantity").value
                );
                await fetch("/cart/add.js", {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    items: [
                      {
                        quantity: quantity2,
                        id: variantId2,
                      },
                    ],
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then(async (data) => {
                    await fetch("/cart.js")
                      .then((response) => response.json())
                      .then(async (data) => {
                        let obj = {
                          username: superAssistantUser2_shopDomain,
                          funnel: funnel,
                          newCart: data,
                          oldCart: old_Cart,
                        };
                        console.log(obj);
                        console.log(data);
                        await fetch(customCheckoutUrl, {
                          method: "POST",
                          // mode: "no-cors",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            username: superAssistantUser2_shopDomain,
                            funnel: funnel,
                            newCart: data,
                            oldCart: old_Cart,
                          }), // body data type must match "Content-Type" header
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            console.log(data);
                            window.location = data.url;
                          })
                          .catch((err) => console.log(err));
                      });
                  });
              });

            //if clicks on declined
            document
              .querySelector("#downSellChild1_button")
              .addEventListener("click", async () => {
                await fetch("/cart.js")
                  .then((response) => response.json())
                  .then(async (data) => {
                    let obj = {
                      username: superAssistantUser2_shopDomain,
                      funnel: funnel,
                      newCart: data,
                      oldCart: old_Cart,
                    };
                    console.log(obj);
                    await fetch(customCheckoutUrl, {
                      method: "POST",
                      // mode: "no-cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: superAssistantUser2_shopDomain,
                        funnel: funnel,
                        newCart: data,
                        oldCart: old_Cart,
                      }), // body data type must match "Content-Type" header
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.location = data.url;
                      });
                  });
              });

            let closeButtons = document.querySelectorAll(".upSellChild2Close");

            closeButtons.forEach((each) => {
              each.addEventListener("click", () => {
                upSell2Modal.style.display = "none";
              });
            });
            document.addEventListener("keyup", (e) => {
              if (e.keyCode == 27) {
                upSell2Modal.style.display = "none";
              }
            });
          } else if (!currentOffer.isExists) {
            await fetch("/cart.js")
              .then((response) => response.json())
              .then(async (data) => {
                console.log(data);
                let obj = {
                  username: superAssistantUser2_shopDomain,
                  funnel: funnel,
                  newCart: data,
                  oldCart: old_Cart,
                };
                console.log(obj);
                await fetch(customCheckoutUrl, {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: superAssistantUser2_shopDomain,
                    funnel: funnel,
                    newCart: data,
                    oldCart: old_Cart,
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    window.location = data.url;
                  });
              });
          }
        });
    }

    async function openDownSellChild(index, path) {
      console.log(offers[index]);
      let offer = offers[index];
      let currentOffer = "";
      if (path === "A-D") {
        currentOffer =
          offer.downsellCondition.offerAccepted.offerDeclined_child;
      } else if (path === "D-D") {
        currentOffer =
          offer.downsellCondition.offerDeclined.offerDeclined_child;
      }
      // offer.downsellCondition.offerDeclined.downsellCondition.offerDeclined;
      if (currentOffer.isExists && !currentOffer.skip_offer) {
        let discount,
          productName,
          originalPrice,
          discountedPrice,
          totalDiscount;
        offeredProductIds.push(currentOffer.selectedProduct.id);
        productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
        originalPrice = currentOffer.selectedProduct.variants[0].price;

        let variantId2 = currentOffer.selectedProduct.variants[0].id;

        if (currentOffer.discount.type === "Discount") {
          if (currentOffer.discount.discountType === "INR") {
            let topMessage = modalStyle.topMessage.split(" ");
            let topMessageIndex = topMessage.indexOf("{{discount}}");
            if (topMessageIndex !== -1) {
              topMessage.splice(
                topMessageIndex,
                1,
                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
              );
            }
            console.log(topMessage.join(" "));
            // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
            discount = topMessage.join(" ");

            let discountPrice = String(
              parseFloat(originalPrice) -
                parseFloat(currentOffer.discount.discountValue)
            );
            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

            let availableDiscount = currentOffer.discount.discountValue;

            totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
          } else if (currentOffer.discount.discountType === "%") {
            let topMessage = modalStyle.topMessage.split(" ");
            let topMessageIndex = topMessage.indexOf("{{discount}}");
            if (topMessageIndex !== -1) {
              topMessage.splice(
                topMessageIndex,
                1,
                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
              );
            }
            console.log(topMessage.join(" "));
            discount = topMessage.join(" ");

            let discountPrice = String(
              parseFloat(originalPrice) -
                parseFloat(
                  (currentOffer.discount.discountValue / 100) *
                    parseFloat(originalPrice)
                )
            );
            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

            let availableDiscount = String(
              parseFloat(
                (currentOffer.discount.discountValue / 100) *
                  parseFloat(originalPrice)
              ).toFixed(2)
            );

            totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
          }
        } else {
          discount = "Deal unlocked! You might need this too! ";
          discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
          totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
        }

        //free shipping
        let freeShipping = "";
        if (currentOffer.include_free_shipping) {
          freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
        }

        //options will be used to next update, now only one variant is shown
        // let modalOptionsList = [];
        // currentOffer.selectedProduct.options.forEach((each) => {
        //   modalOptionsList.push(createSelector(each));
        // });
        // console.log(modalOptionsList);

        let imageUrl = findImage(
          currentOffer.selectedProduct.variants[0].image_id,
          currentOffer.selectedProduct.images
        );

        console.log(imageUrl);

        let obj = {
          // INDEX: index,
          discountPercentage: discount,
          // offerTime: "5:00",
          productName: productName,
          // currency: superAssistantUser2_shopifyCurrency,
          // originalPrice: "10.00",
          freeShipping: freeShipping,
          // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
          optionsList: " ",
          discountedPrice: discountedPrice,
          totalDiscount: totalDiscount,
          productImage: imageUrl,
        };
        let downSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="downSell2Modal"
>
  <button id="downSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSellChild2_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild2_button"
        class="downSellChild2Close"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild2_button"
        class="downSellChild2Close"
      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em;color:${modalStyle.textColor}"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor}">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
        downSellModalData = downSellModalData.replace(
          /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,
          function (matched) {
            return obj[matched];
          }
        );
        let downSell2Modal = document.createElement("div");
        downSell2Modal.id = "downSell2Modal";
        downSell2Modal.className = "modal";
        downSell2Modal.style.visibility = "visible";
        downSell2Modal.style.opacity = "1";
        // downSell2Modal.style.border = "3px solid grey";
        downSell2Modal.style.height = "40em";
        downSell2Modal.style.top = "19%";
        downSell2Modal.style.borderRadius = "11px";
        downSell2Modal.innerHTML = downSellModalData;
        document.querySelector("body").appendChild(downSell2Modal);
        document
          .querySelector("#downSellModal2Close")
          .addEventListener(
            "click",
            () => (downSell2Modal.style.display = "none")
          );

        //if accept

        document
          .querySelector("#upSellChild2_button")
          .addEventListener("click", async () => {
            let quantity2 = parseFloat(
              document.querySelector("#upSellChild2_quantity").value
            );
            await fetch("/cart/add.js", {
              method: "POST",
              // mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: [
                  {
                    quantity: quantity2,
                    id: variantId2,
                  },
                ],
              }), // body data type must match "Content-Type" header
            })
              .then((response) => response.json())
              .then(async (data) => {
                await fetch("/cart.js")
                  .then((response) => response.json())
                  .then(async (data) => {
                    let obj = {
                      username: superAssistantUser2_shopDomain,
                      funnel: funnel,
                      newCart: data,
                      oldCart: old_Cart,
                    };
                    console.log(obj);
                    console.log(data);
                    await fetch(customCheckoutUrl, {
                      method: "POST",
                      // mode: "no-cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: superAssistantUser2_shopDomain,
                        funnel: funnel,
                        newCart: data,
                        oldCart: old_Cart,
                      }), // body data type must match "Content-Type" header
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.location = data.url;
                      });
                  });
              });
          });

        //if declined
        document
          .querySelector("#downSellChild2_button")
          .addEventListener("click", async () => {
            await fetch("/cart.js")
              .then((response) => response.json())
              .then(async (data) => {
                console.log(
                  data,
                  funnel,
                  superAssistantUser2_shopDomain,
                  old_Cart
                );
                await fetch(customCheckoutUrl, {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: superAssistantUser2_shopDomain,
                    funnel: funnel,
                    newCart: data,
                    oldCart: old_Cart,
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    window.location = data.url;
                  });
              });
          });

        let closeButtons = document.querySelectorAll(".downSellChild2Close");

        closeButtons.forEach((each) => {
          each.addEventListener("click", () => {
            downSell2Modal.style.display = "none";
          });
        });
        document.addEventListener("keyup", (e) => {
          if (e.keyCode == 27) {
            downSell2Modal.style.display = "none";
          }
        });
      } else if (!currentOffer.isExists) {
        await fetch("/cart.js")
          .then((response) => response.json())
          .then(async (data) => {
            console.log(data);
            let obj = {
              username: superAssistantUser2_shopDomain,
              funnel: funnel,
              newCart: data,
              oldCart: old_Cart,
            };
            console.log(obj);
            await fetch(customCheckoutUrl, {
              method: "POST",
              // mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: superAssistantUser2_shopDomain,
                funnel: funnel,
                newCart: data,
                oldCart: old_Cart,
              }), // body data type must match "Content-Type" header
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                window.location = data.url;
              });
          });
      }
    }

    async function openUpSellParent(index, variantId, quantity) {
      console.log(offers[index]);
      $(".mask").removeClass("active");
      console.log(quantity);

      await fetch("/cart/add.js", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              quantity: quantity,
              id: variantId,
            },
          ],
        }), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          //close parent modal
          // document.querySelector("#discountCodeP").innerText = discountCode;
          // console.log(document.querySelector("#discountCodeP"));
          // document.querySelector(".couponDisplay").style.display = "flex";

          let offer = offers[index];
          let currentOffer = offer.downsellCondition.offerAccepted;
          if (
            offer.downsellCondition.offerAccepted.isExists &&
            !offer.downsellCondition.offerAccepted.skip_offer
          ) {
            let discount,
              productName,
              originalPrice,
              discountedPrice,
              totalDiscount;
            offeredProductIds.push(currentOffer.selectedProduct.id);
            productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
            originalPrice = currentOffer.selectedProduct.variants[0].price;
            let variantId = currentOffer.selectedProduct.variants[0].id;

            if (currentOffer.discount.type === "Discount") {
              if (currentOffer.discount.discountType === "INR") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
                  );
                }
                console.log(topMessage.join(" "));
                // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(currentOffer.discount.discountValue)
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

                let availableDiscount = currentOffer.discount.discountValue;

                totalDiscount = `<p style="font-size: 0.9em">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              } else if (currentOffer.discount.discountType === "%") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
                  );
                }
                console.log(topMessage.join(" "));
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(
                      (currentOffer.discount.discountValue / 100) *
                        parseFloat(originalPrice)
                    )
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

                let availableDiscount = String(
                  parseFloat(
                    (currentOffer.discount.discountValue / 100) *
                      parseFloat(originalPrice)
                  ).toFixed(2)
                );

                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              }
            } else {
              discount = "Deal unlocked! You might need this too! ";
              discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
              totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
            }

            //free shipping
            let freeShipping = "";
            if (currentOffer.include_free_shipping) {
              freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
            }

            //options will be used to next update, now only one variant is shown
            // let modalOptionsList = [];
            // currentOffer.selectedProduct.options.forEach((each) => {
            //   modalOptionsList.push(createSelector(each));
            // });
            // console.log(modalOptionsList);

            let imageUrl = findImage(
              currentOffer.selectedProduct.variants[0].image_id,
              currentOffer.selectedProduct.images
            );

            console.log(imageUrl);

            let obj = {
              variantId: variantId,
              INDEX: index,
              discountPercentage: discount,
              // offerTime: "5:00",
              productName: productName,
              // currency: superAssistantUser2_shopifyCurrency,
              // originalPrice: "10.00",
              freeShipping: freeShipping,
              // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
              optionsList: " ",
              discountedPrice: discountedPrice,
              totalDiscount: totalDiscount,
              productImage: imageUrl,
            };
            let upSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="upSellModal"
>
  <button id="upSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSell_child_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;  justify-content: center;">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openUpSellChild_button"
        class="upSellChildClose"
        onclick="openUpSellChild(INDEX,'A-A',variantId)"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild_button"
        class="upSellChildClose"
        onclick="openDownSellChild(INDEX,'A-D')"
      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em;color:${modalStyle.textColor}"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor}">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
            upSellModalData = upSellModalData.replace(
              /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX/gi,
              function (matched) {
                return obj[matched];
              }
            );
            let upSellModal = document.createElement("div");
            upSellModal.id = "upSellModal";
            upSellModal.className = "modal";
            upSellModal.style.visibility = "visible";
            upSellModal.style.opacity = "1";
            // upSellModal.style.border = "3px solid grey";
            upSellModal.style.height = "39em";
            upSellModal.style.top = "19%";
            upSellModal.style.borderRadius = "11px";
            upSellModal.innerHTML = upSellModalData;
            document.querySelector("body").appendChild(upSellModal);
            document
              .querySelector("#upSellModalClose")
              .addEventListener(
                "click",
                () => (upSellModal.style.display = "none")
              );
            let closeButtons = document.querySelectorAll(".upSellChildClose");

            closeButtons.forEach((each) => {
              each.addEventListener(
                "click",
                () => (upSellModal.style.display = "none")
              );
            });

            //link these to child upSell/downSell conditions

            document.querySelector("#openUpSellChild_button").onclick = () => {
              let quantity = parseFloat(
                document.querySelector("#upSell_child_quantity").value
              );
              openUpSellChild(obj.INDEX, "A-A", obj.variantId, quantity);
            };

            document.querySelector("#openDownSellChild_button").onclick =
              () => {
                openDownSellChild(obj.INDEX, "A-D");
              };

            document.addEventListener("keyup", (e) => {
              if (e.keyCode == 27) {
                upSellModal.style.display = "none";
              }
            });
          } else if (!offer.downsellCondition.offerAccepted.isExists) {
            await fetch("/cart.js")
              .then((response) => response.json())
              .then(async (data) => {
                console.log(data);
                let obj = {
                  username: superAssistantUser2_shopDomain,
                  funnel: funnel,
                  newCart: data,
                  oldCart: old_Cart,
                };
                console.log(obj);
                await fetch(customCheckoutUrl, {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: superAssistantUser2_shopDomain,
                    funnel: funnel,
                    newCart: data,
                    oldCart: old_Cart,
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    window.location = data.url;
                  });
              });
          }
        });
    }
    async function openDownSellParent(index) {
      console.log(offers[index]);

      //close parent modal
      $(".mask").removeClass("active");
      // document.querySelector("#discountCodeP").innerText = discountCode;
      // console.log(document.querySelector("#discountCodeP"));
      // document.querySelector(".couponDisplay").style.display = "flex";

      let offer = offers[index];
      let currentOffer = offer.downsellCondition.offerDeclined;
      if (
        offer.downsellCondition.offerDeclined.isExists &&
        !offer.downsellCondition.offerDeclined.skip_offer
      ) {
        let discount,
          productName,
          originalPrice,
          discountedPrice,
          totalDiscount;
        offeredProductIds.push(currentOffer.selectedProduct.id);
        productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
        originalPrice = currentOffer.selectedProduct.variants[0].price;

        let variantId = currentOffer.selectedProduct.variants[0].id;

        if (currentOffer.discount.type === "Discount") {
          if (currentOffer.discount.discountType === "INR") {
            let topMessage = modalStyle.topMessage.split(" ");
            let topMessageIndex = topMessage.indexOf("{{discount}}");
            if (topMessageIndex !== -1) {
              topMessage.splice(
                topMessageIndex,
                1,
                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
              );
            }
            console.log(topMessage.join(" "));
            // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
            discount = topMessage.join(" ");

            let discountPrice = String(
              parseFloat(originalPrice) -
                parseFloat(currentOffer.discount.discountValue)
            );
            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

            let availableDiscount = currentOffer.discount.discountValue;

            // totalDiscount = `<p style="font-size: 0.9em">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
            totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
          } else if (currentOffer.discount.discountType === "%") {
            let topMessage = modalStyle.topMessage.split(" ");
            let topMessageIndex = topMessage.indexOf("{{discount}}");
            if (topMessageIndex !== -1) {
              topMessage.splice(
                topMessageIndex,
                1,
                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
              );
            }
            console.log(topMessage.join(" "));
            discount = topMessage.join(" ");

            let discountPrice = String(
              parseFloat(originalPrice) -
                parseFloat(
                  (currentOffer.discount.discountValue / 100) *
                    parseFloat(originalPrice)
                )
            );
            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

            let availableDiscount = String(
              parseFloat(
                (currentOffer.discount.discountValue / 100) *
                  parseFloat(originalPrice)
              ).toFixed(2)
            );

            totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
          }
        } else {
          discount = "Deal unlocked! You might need this too! ";
          discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
          totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
        }

        //free shipping
        let freeShipping = "";
        if (currentOffer.include_free_shipping) {
          freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
        }

        //options will be used to next update, now only one variant is shown
        // let modalOptionsList = [];
        // currentOffer.selectedProduct.options.forEach((each) => {
        //   modalOptionsList.push(createSelector(each));
        // });
        // console.log(modalOptionsList);

        let imageUrl = findImage(
          currentOffer.selectedProduct.variants[0].image_id,
          currentOffer.selectedProduct.images
        );

        console.log(imageUrl);

        let obj = {
          variantId: variantId,
          INDEX: index,
          discountPercentage: discount,
          // offerTime: "5:00",
          productName: productName,
          // currency: superAssistantUser2_shopifyCurrency,
          // originalPrice: "10.00",
          freeShipping: freeShipping,
          // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
          optionsList: " ",
          discountedPrice: discountedPrice,
          totalDiscount: totalDiscount,
          productImage: imageUrl,
        };
        let downSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="downSellModal"
>
  <button id="downSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSell_child_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;  justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
          
        "
        id="openUpSellChild2_button"
        class="downSellChildClose"
        onclick="openUpSellChild(INDEX,'D-A',variantId)"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild2_button"
        class="downSellChildClose"
        onclick="openDownSellChild(INDEX,'D-D')"

      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em;color:${modalStyle.textColor}"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
        downSellModalData = downSellModalData.replace(
          /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,
          function (matched) {
            return obj[matched];
          }
        );
        let downSellModal = document.createElement("div");
        downSellModal.id = "downSellModal";
        downSellModal.className = "modal";
        downSellModal.style.visibility = "visible";
        downSellModal.style.opacity = "1";
        // downSellModal.style.border = "3px solid grey";
        downSellModal.style.height = "39em";
        downSellModal.style.top = "19%";
        downSellModal.style.borderRadius = "11px";
        downSellModal.innerHTML = downSellModalData;
        document.querySelector("body").appendChild(downSellModal);
        document
          .querySelector("#downSellModalClose")
          .addEventListener(
            "click",
            () => (downSellModal.style.display = "none")
          );

        let closeButtons = document.querySelectorAll(".downSellChildClose");

        closeButtons.forEach((each) => {
          each.addEventListener(
            "click",
            () => (downSellModal.style.display = "none")
          );
        });

        //link these to child upSell/downSell conditions

        document.querySelector("#openUpSellChild2_button").onclick = () => {
          let quantity = parseFloat(
            document.querySelector("#upSell_child_quantity").value
          );
          openUpSellChild(obj.INDEX, "D-A", obj.variantId, quantity);
        };

        document.querySelector("#openDownSellChild2_button").onclick = () => {
          openDownSellChild(obj.INDEX, "D-D");
        };

        document.addEventListener("keyup", (e) => {
          if (e.keyCode == 27) {
            downSellModal.style.display = "none";
          }
        });
      } else if (!offer.downsellCondition.offerDeclined.isExists) {
        await fetch("/cart.js")
          .then((response) => response.json())
          .then(async (data) => {
            console.log(data, funnel, superAssistantUser2_shopDomain, old_Cart);
            await fetch(customCheckoutUrl, {
              method: "POST",
              // mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: superAssistantUser2_shopDomain,
                funnel: funnel,
                newCart: data,
                oldCart: old_Cart,
              }), // body data type must match "Content-Type" header
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                window.location = data.url;
              });
          });
      }
    }

    function createSlide(obj, type) {
      let slideData = `
  <div style="padding: 1em; text-align: center" background:${modalStyle.backGroundColor}>
        <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
          discountPercentage
        </p>
        <h4
          style="
            font-weight: 600;
            font-size: ${modalStyle.PricetextSize}px;
            background:${modalStyle.PricebackGroundColor};
            padding: 0.5em;
            color: ${modalStyle.PricetextColor};
            margin:0;
          "
        >
          Hurry! Offer will expire in <span id="countdownTimer" class="countdownTimer">offerTime</span>
        </h4>
        <div>
          <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em;margin:0;">
            productName
          </h4>
          discountedPrice
          freeShipping
          totalDiscount
          <img
            style="width: 11em; border-radius:5px;height:10em"
            src=productImage
            alt=""
          />
          <div style="display: flex; justify-content: center">
            optionsList
          <div style="padding-top: 1em">
            <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
            <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
              <input
                type="number"
                style="
                  padding: 0.5em;
                  border: 1px solid #cdd0d2;
                  border-radius: 4px;
                  width: 15em;
                  text-align: center;
                "
                value="1"
                name="quantity"
                id="upSell_parent_quantity-INDEX"
              />
            </div>
          </div>
          <div style="padding-top: 1em; color: grey">
          </div>
        </div>
        <div
          style="
            display: flex;
             flex-direction: column;
             
            justify-content: center;
          "
        >
          <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${modalStyle.buttonTextSize}px;
                  color: ${modalStyle.buttonTextColor};
                  background: ${modalStyle.buttonbackGroundColor};
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openUpSellParent_Button-INDEX"
              >
                ${modalStyle.buttonText}
              </button>
              <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${modalStyle.checkoutTextSize};
                  color:${modalStyle.checkoutTextColor};
                  background:${modalStyle.checkoutbackGroundColor} ; 
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openDownSellParent_Button-INDEX"
              >
                ${modalStyle.checkoutText}
              </button>
        </div>
        <div style="display: flex; justify-content: center;align-items: center; padding-top: 1em">
          <img
            src=${popUpLogoUrl}
            alt=""
            style="width: 1.5em;height: 1.5em;color:${modalStyle.textColor}"
          />
          <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
        </div>
      </div>
          </div>
      </div>
  `;
      slideData = slideData.replace(
        /discountPercentage|offerTime|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,
        function (matched) {
          return obj[matched];
        }
      );
      console.log(slideData);
      let slide = document.createElement("div");
      slide.className = "slide fade";
      slide.innerHTML = slideData;
      sliderDiv.appendChild(slide);

      if (type === "manual") {
        document.querySelector(
          `#openUpSellParent_Button-${obj.INDEX}`
        ).onclick = () => {
          let quantity = parseFloat(
            document.querySelector(`#upSell_parent_quantity-${obj.INDEX}`).value
          );
          openUpSellParent(obj.INDEX, obj.variantId, quantity);
        };
        document.querySelector(
          `#openDownSellParent_Button-${obj.INDEX}`
        ).onclick = () => {
          openDownSellParent(obj.INDEX);
        };
      } else if (type === "autopilot") {
        document.querySelector(
          `#openUpSellParent_Button-${obj.INDEX}`
        ).onclick = async () => {
          $(".mask").removeClass("active");
          let quantity = parseFloat(
            document.querySelector(`#upSell_parent_quantity-${obj.INDEX}`).value
          );
          await fetch("/cart/add.js", {
            method: "POST",
            // mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [
                {
                  quantity: quantity,
                  id: obj.variantId,
                },
              ],
            }), // body data type must match "Content-Type" header
          })
            .then((response) => response.json())
            .then(async (data) => {
              console.log(data);
              await fetch("/cart.js")
                .then((response) => response.json())
                .then(async (data) => {
                  console.log(data);
                  console.log(old_Cart, "old cart");
                  await fetch(customCheckoutUrl, {
                    method: "POST",
                    // mode: "no-cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username: superAssistantUser2_shopDomain,
                      funnel: funnel,
                      newCart: data,
                      oldCart: old_Cart,
                    }), // body data type must match "Content-Type" header
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      window.location = data.url;
                    });
                });
            });
        };
        document.querySelector(
          `#openDownSellParent_Button-${obj.INDEX}`
        ).onclick = () => {
          //do nothing
          $(".mask").removeClass("active");
        };
      }
    }

    //check if already discount code is present
    // function getCookie(cName) {
    //   const name = cName + "=";
    //   const cDecoded = decodeURIComponent(document.cookie); //to be careful
    //   const cArr = cDecoded.split("; ");
    //   let res = "";
    //   cArr.forEach((val) => {
    //     if (val.indexOf(name) === 0) res = val.substring(name.length);
    //   });
    //   return res;
    // }

    // let cookie = getCookie("discount_code");
    // console.log(cookie);
    // console.log(cookie.includes(superAssistantUser2_shopDomain.toUpperCase()));
    // if (cookie.includes(superAssistantUser2_shopDomain.toUpperCase())) {
    //   document.querySelector("#discountCodeP").innerText = cookie;
    //   console.log(document.querySelector("#discountCodeP"));
    //   // $('.')
    //   document.querySelector(".couponDisplay").style.display = "flex";
    // }

    //upsellParent
    // let upsellParent_popUpMask = document.createElement("div");
    // upsellParent_popUpMask.role = "dialog";
    // upsellParent_popUpMask.className = "mask";

    // let upsellParent_modalBody = document.createElement("div");
    // upsellParent_modalBody.className = "modal";
    // upsellParent_modalBody.role = "alert";
    // upsellParent_modalBody.id = "superAssistantModal";
    //Downsell Parent

    // document.querySelector("#superAssistantModal").insertAdjacentHTML(
    //   "afterbegin",
    //   `

    // `
    // );

    let Page_funnels = [];
    let offers = [];
    let selectedProducts = [];
    let excludedVariantIds = [];
    let currentProductId = meta.product.id;
    let currentVariantIds = [];
    meta.product.variants.forEach((each) => {
      currentVariantIds.push(each.id);
    });

    console.log(currentVariantIds);

    superAssistantUser2.funnels.forEach((funnel) => {
      if (funnel.placement === "product-page") {
        if (funnel.enable && !funnel.isDeleted) Page_funnels.push(funnel);
      }
    });

    console.log(Page_funnels);
    //sorting according to priority
    Page_funnels = Page_funnels.sort((a, b) => {
      return (
        a.funnelRules.add_priority.priority -
        b.funnelRules.add_priority.priority
      );
    });
    console.log(Page_funnels);

    // if (Page_funnels[0].trigger.selectedOption === "all") {
    //   Page_funnels[i].offers.forEach((each) => {
    //     offers.push(each);
    //   });
    // } else {

    // }
    // for (let i = 0; i < Page_funnels.length; i++) {
    //   Page_funnels[i].trigger.selectedProducts.forEach((each) => {
    //     selectedProducts.push(each);
    //   });
    // }
    // console.log(selectedProducts);
    let funnel = null;

    for (let i = 0; i < Page_funnels.length; i++) {
      if (Page_funnels[i].trigger.selectedOption === "all") {
        funnel = Page_funnels[i];
        Page_funnels[i].offers.forEach((each) => {
          offers.push(each);
          selectedProducts.push("all");
          // return;
          // Page_funnels[i].trigger.selectedProducts.forEach((each) => {
          //   selectedProducts.push(each);
          // });
        });
        break;
      } else if (
        Page_funnels[i].trigger.selectedOption === "specific-product" ||
        Page_funnels[i].trigger.selectedOption === "specific-collection"
      ) {
        let tempArr = [];
        // let excludedTemp = [];
        Page_funnels[i].trigger.selectedProducts.forEach((each) => {
          tempArr.push(each.id);
        });
        console.log(tempArr);

        // console.log(excludedTemp);

        // function getCommonItems(array1, array2) {
        //   var common = []; // Initialize array to contain common items

        //   for (var i = 0; i < array1.length; i++) {
        //     for (var j = 0; j < array2.length; j++) {
        //       if (array1[i] == array2[j]) {
        //         // If item is present in both arrays
        //         common.push(array1[i]); // Push to common array
        //       }
        //     }
        //   }

        //   return common; // Return the common items
        // }

        // let common = getCommonItems(excludedTemp,);

        if (tempArr.indexOf(currentProductId) !== -1) {
          funnel = Page_funnels[i];

          Page_funnels[i].offers.forEach((each) => {
            offers.push(each);
            selectedProducts = tempArr;
            Page_funnels[i].trigger.excludedVariantIds.forEach((each) => {
              excludedVariantIds.push(each);
            });
            // return;
          });
          break;
        }
      }
    }
    // console.log(currentProductId);
    // console.log(excludedVariantIds);
    // console.log(selectedProducts.indexOf(currentProductId) !== -1);
    console.log(offers);
    console.log(funnel);

    function createOption(value) {
      let p = `<option value=${value}>${value}</option>`;
      return p;
    }

    function createSelector(selector) {
      let optionsList = [];
      selector.values.forEach((each) => {
        optionsList.push(createOption(each));
      });
      let result = `
      <div>
              <label for="size" style="text-align: left;font-size:${
                modalStyle.textSize
              }px;
    color:${modalStyle.textColor};
    font-family:${modalStyle.textFamily};"> ${selector.name}: </label>
              <select
                style="
                  padding: 0.5em;
                  display: block;
                  border: 1px solid #cdd0d2;
                  border-radius: 4px;
                  width: 8em;
                "
                name="color"
                id="color"
              >
                ${optionsList.join(" ")}
              </select>
            </div>
          </div>
      `;
      return result;
    }

    // console.log(super);
    let offeredProductIds = [];
    if (funnel !== null) {
      console.log("creating slides process started");
      if (funnel.offerType === "addManually") {
        console.log("manual");
        for (let i = 0; i < offers.length; i++) {
          let discount,
            productName,
            originalPrice,
            discountedPrice,
            totalDiscount;
          let variantId = offers[i].selectedProduct.variants[0].id;
          offeredProductIds.push(offers[i].selectedProduct.id);
          productName = `${offers[i].selectedProduct.title}-${offers[i].selectedProduct.variants[0].title}`;
          originalPrice = offers[i].selectedProduct.variants[0].price;

          if (offers[i].discount.type === "Discount") {
            if (offers[i].discount.discountType === "INR") {
              console.log(modalStyle.topMessage);
              let topMessage = modalStyle.topMessage.split(" ");
              let topMessageIndex = topMessage.indexOf("{{discount}}");
              if (topMessageIndex !== -1) {
                topMessage.splice(
                  topMessageIndex,
                  1,
                  `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}</span>`
                );
              }
              console.log(topMessage.join(" "));
              // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
              discount = topMessage.join(" ");

              let discountPrice = String(
                parseFloat(originalPrice) -
                  parseFloat(offers[i].discount.discountValue)
              );
              discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

              let availableDiscount = offers[i].discount.discountValue;

              // totalDiscount = `<p style="font-size: 0.9em">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
            } else if (offers[i].discount.discountType === "%") {
              let topMessage = modalStyle.topMessage.split(" ");
              let topMessageIndex = topMessage.indexOf("{{discount}}");
              if (topMessageIndex !== -1) {
                topMessage.splice(
                  topMessageIndex,
                  1,
                  `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${offers[i].discount.discountValue}% </span>`
                );
              }
              console.log(topMessage.join(" "));
              discount = topMessage.join(" ");
              // discount = `Deal unlocked! Get this product for ${offers[i].discount.discountValue}%  off`;

              let discountPrice = String(
                parseFloat(originalPrice) -
                  parseFloat(
                    (offers[i].discount.discountValue / 100) *
                      parseFloat(originalPrice)
                  )
              );
              discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

              let availableDiscount = String(
                parseFloat(
                  (offers[i].discount.discountValue / 100) *
                    parseFloat(originalPrice)
                ).toFixed(2)
              );

              totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
            }
          } else {
            discount = "Deal unlocked! You might need this too! ";
            discountedPrice = `
            <ins style="text-decoration: none;  color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
            totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
          }

          //free shipping
          let freeShipping = "";
          if (offers[i].include_free_shipping) {
            freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
          }

          //options will be used to next update, now only one variant is shown
          // let modalOptionsList = [];
          // offers[i].selectedProduct.options.forEach((each) => {
          //   modalOptionsList.push(createSelector(each));
          // });
          // console.log(modalOptionsList);

          let imageUrl = findImage(
            offers[i].selectedProduct.variants[0].image_id,
            offers[i].selectedProduct.images
          );

          console.log(imageUrl);

          let obj = {
            variantId: variantId,
            INDEX: i,
            discountPercentage: discount,
            offerTime: "5:00",
            productName: productName,
            // currency: superAssistantUser2_shopifyCurrency,
            // originalPrice: "10.00",
            freeShipping: freeShipping,
            // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
            optionsList: " ",
            discountedPrice: discountedPrice,
            totalDiscount: totalDiscount,
            productImage: imageUrl,
          };

          // dynamicModalUpdate(obj);
          createSlide(obj, "manual");

          // console.log(modalBody.innerHTML);
        }
      } else if (funnel.offerType === "autoPilot") {
        console.log(currentProductId);
        console.log("autoPilot");
        if (funnel.autoPiltoType === "shopifyRecommendation") {
          async function getRecommendedProducts() {
            let fetchUrl = `/recommendations/products.json?product_id=${currentProductId}&limit=3`;
            if (funnel.offers[0].limit_no_of_products.isSelected) {
              fetchUrl = `/recommendations/products.json?product_id=${currentProductId}&limit=${funnel.offers[0].limit_no_of_products.limit}`;
            }
            await fetch(fetchUrl)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                let recommendedProductsList = data.products;
                for (let i = 0; i < recommendedProductsList.length; i++) {
                  if (recommendedProductsList[i].available) {
                    offeredProductIds.push(recommendedProductsList[i].id);
                    let discount,
                      productName,
                      originalPrice,
                      discountedPrice,
                      totalDiscount;

                    let variantId = recommendedProductsList[i].variants[0].id;

                    productName = `${recommendedProductsList[i].title}-${recommendedProductsList[i].variants[0].title}`;
                    originalPrice =
                      recommendedProductsList[i].variants[0].price / 100;

                    if (offers[0].discount.type === "Discount") {
                      if (offers[0].discount.discountType === "INR") {
                        let topMessage = modalStyle.topMessage.split(" ");
                        let topMessageIndex =
                          topMessage.indexOf("{{discount}}");
                        if (topMessageIndex !== -1) {
                          topMessage.splice(
                            topMessageIndex,
                            1,
                            `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}</span>`
                          );
                        }
                        console.log(topMessage.join(" "));
                        // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                        discount = topMessage.join(" ");
                        // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}  off`;

                        let discountPrice = String(
                          parseFloat(originalPrice) -
                            parseFloat(offers[0].discount.discountValue)
                        );
                        discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                        let availableDiscount =
                          offers[0].discount.discountValue;

                        totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                      } else if (offers[0].discount.discountType === "%") {
                        // discount = `Deal unlocked! Get this product for ${offers[0].discount.discountValue}%  off`;
                        let topMessage = modalStyle.topMessage.split(" ");
                        let topMessageIndex =
                          topMessage.indexOf("{{discount}}");
                        if (topMessageIndex !== -1) {
                          topMessage.splice(
                            topMessageIndex,
                            1,
                            `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${offers[0].discount.discountValue}% </span>`
                          );
                        }
                        console.log(topMessage.join(" "));
                        discount = topMessage.join(" ");
                        let discountPrice = String(
                          parseFloat(originalPrice) -
                            parseFloat(
                              (offers[0].discount.discountValue / 100) *
                                parseFloat(originalPrice)
                            )
                        );
                        discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                        let availableDiscount = String(
                          parseFloat(
                            (offers[0].discount.discountValue / 100) *
                              parseFloat(originalPrice)
                          ).toFixed(2)
                        );

                        totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                      }
                    } else {
                      discount = "Deal unlocked! You might need this too! ";
                      discountedPrice = `
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${originalPrice}
              </ins>`;
                      totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
                    }

                    //free shipping
                    let freeShipping = "";
                    if (offers[0].include_free_shipping) {
                      freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
                    }

                    //options will be used to next update, now only one variant is shown
                    // let modalOptionsList = [];
                    // recommendedProductsList[i].options.forEach((each) => {
                    //   modalOptionsList.push(createSelector(each));
                    // });
                    // console.log(modalOptionsList);

                    // let imageUrl = findImage(
                    //   currentOffer.selectedProduct.variants[0].image_id,
                    //   currentOffer.selectedProduct.images
                    // );

                    // console.log(imageUrl);

                    let imageUrl = "";
                    if (
                      recommendedProductsList[i].variants[0].featured_image ===
                      null
                    ) {
                      imageUrl = `https://${recommendedProductsList[
                        i
                      ].featured_image.slice(2)}`;
                    } else {
                      imageUrl =
                        recommendedProductsList[i].variants[0].featured_image
                          .src;
                    }

                    let obj = {
                      variantId: variantId,
                      INDEX: i,
                      discountPercentage: discount,
                      offerTime: "5:00",
                      productName: productName,
                      // currency: superAssistantUser2_shopifyCurrency,
                      // originalPrice: "10.00",
                      freeShipping: freeShipping,
                      // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
                      optionsList: " ",
                      discountedPrice: discountedPrice,
                      totalDiscount: totalDiscount,
                      productImage: imageUrl,
                      // productImage:
                      //   "https://" +
                      //   recommendedProductsList[i].featured_image.slice(2),
                    };

                    // dynamicModalUpdate(obj);
                    createSlide(obj, "autopilot");
                    console.log("2");

                    // console.log(modalBody.innerHTML);
                  }
                }
              });
          }

          getRecommendedProducts();
        } else if (funnel.autoPiltoType === "sameProductForLess") {
          let recommendedProductsList = [meta.product];
          for (let i = 0; i < recommendedProductsList.length; i++) {
            if (true) {
              // (recommendedProductsList[i].available) since we dont have availability in meta.product obj
              offeredProductIds.push(recommendedProductsList[i].id);
              let discount,
                productName,
                originalPrice,
                discountedPrice,
                totalDiscount;

              let variantId = recommendedProductsList[i].variants[0].id;

              productName = `${recommendedProductsList[i].variants[0].name}`;
              originalPrice =
                recommendedProductsList[i].variants[0].price / 100;

              if (offers[0].discount.type === "Discount") {
                if (offers[0].discount.discountType === "INR") {
                  let topMessage = modalStyle.topMessage.split(" ");
                  let topMessageIndex = topMessage.indexOf("{{discount}}");
                  if (topMessageIndex !== -1) {
                    topMessage.splice(
                      topMessageIndex,
                      1,
                      `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}</span>`
                    );
                  }
                  console.log(topMessage.join(" "));
                  // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                  discount = topMessage.join(" ");
                  // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}  off`;

                  let discountPrice = String(
                    parseFloat(originalPrice) -
                      parseFloat(offers[0].discount.discountValue)
                  );
                  discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                  let availableDiscount = offers[0].discount.discountValue;

                  totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                } else if (offers[0].discount.discountType === "%") {
                  // discount = `Deal unlocked! Get this product for ${offers[0].discount.discountValue}%  off`;
                  let topMessage = modalStyle.topMessage.split(" ");
                  let topMessageIndex = topMessage.indexOf("{{discount}}");
                  if (topMessageIndex !== -1) {
                    topMessage.splice(
                      topMessageIndex,
                      1,
                      `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${offers[0].discount.discountValue}% </span>`
                    );
                  }
                  console.log(topMessage.join(" "));
                  discount = topMessage.join(" ");
                  let discountPrice = String(
                    parseFloat(originalPrice) -
                      parseFloat(
                        (offers[0].discount.discountValue / 100) *
                          parseFloat(originalPrice)
                      )
                  );
                  discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                  let availableDiscount = String(
                    parseFloat(
                      (offers[0].discount.discountValue / 100) *
                        parseFloat(originalPrice)
                    ).toFixed(2)
                  );

                  totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                }
              } else {
                discount = "Deal unlocked! You might need this too! ";
                discountedPrice = `
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${originalPrice}
              </ins>`;
                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
              }

              //free shipping
              let freeShipping = "";
              if (offers[0].include_free_shipping) {
                freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
              }

              //options will be used to next update, now only one variant is shown
              // let modalOptionsList = [];
              // recommendedProductsList[i].options.forEach((each) => {
              //   modalOptionsList.push(createSelector(each));
              // });
              // console.log(modalOptionsList);

              // let imageUrl = findImage(
              //   currentOffer.selectedProduct.variants[0].image_id,
              //   currentOffer.selectedProduct.images
              // );

              // console.log(imageUrl);

              // let imageUrl = "";
              // if (
              //   recommendedProductsList[i].variants[0].featured_image ===
              //   null
              // ) {
              //   imageUrl = `https://${recommendedProductsList[
              //     i
              //   ].featured_image.slice(2)}`;
              // } else {
              //   imageUrl =
              //     recommendedProductsList[i].variants[0].featured_image.src;
              // }
              let imageUrl =
                "https://cdn.jsdelivr.net/gh/varuns1007/Hosted-Links/sale.jpg";

              let obj = {
                variantId: variantId,
                INDEX: i,
                discountPercentage: discount,
                offerTime: "5:00",
                productName: productName,
                // currency: superAssistantUser2_shopifyCurrency,
                // originalPrice: "10.00",
                freeShipping: freeShipping,
                // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
                optionsList: " ",
                discountedPrice: discountedPrice,
                totalDiscount: totalDiscount,
                productImage: imageUrl,
                // productImage:
                //   "https://" +
                //   recommendedProductsList[i].featured_image.slice(2),
              };

              // dynamicModalUpdate(obj);
              createSlide(obj, "autopilot");
              console.log("2");

              // console.log(modalBody.innerHTML);
            }
          }
        }
      }
    }

    console.log(offeredProductIds);
    console.log(offers.length != 0);
    if (offers.length != 0) {
      let addToCart_button = document.querySelector(
        'form[action^="/cart"] [type="submit"]'
      );
      // console.log(addToCart_button);
      addToCart_button.classList.add("show");

      addToCart_button.addEventListener("click", async (e) => {
        //send request to backend to create a discount code with this name
        // let temp = await fetch(`${hostedUrl}/api/userData`, {
        //   method: "POST",
        //   // mode: "no-cors",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     discountCode: discountCode,
        //     customer:"",
        //   }), // body data type must match "Content-Type" header
        // });
        // temp = await temp.json();
        // console.log(temp.data[0]);
        //load popup
        // e.preventDefault();

        await fetch("/cart.js")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            let oldCart = data;
            setTimeout(async () => {
              await fetch("/cart.js")
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  changeNewOldCart(data);
                  let newCart = data.items;
                  // if newCart.length > oldCart.length then product added and
                  // check variant id from excluded variant ids list
                  let newCartVariants = [];
                  newCart.forEach((each) => {
                    newCartVariants.push(each.variant_id);
                  });
                  // console.log(newCartVariants);
                  // console.log(excludedVariantIds);
                  let common = newCartVariants.filter((x) =>
                    excludedVariantIds.includes(x)
                  );
                  console.log(newCartVariants);
                  console.log(excludedVariantIds);
                  console.log(common.length === 0);
                  console.log(common);
                  // function getCookie(cName) {
                  //   const name = cName + "=";
                  //   const cDecoded = decodeURIComponent(document.cookie); //to be careful
                  //   const cArr = cDecoded.split("; ");
                  //   let res = "";
                  //   cArr.forEach((val) => {
                  //     if (val.indexOf(name) === 0)
                  //       res = val.substring(name.length);
                  //   });
                  //   return res;
                  // }

                  // let cookie = getCookie("discount_code");
                  // console.log(cookie);
                  // console.log(
                  //   cookie.includes(
                  //     superAssistantUser2_shopDomain.toUpperCase()
                  //   )
                  // );
                  if (
                    common.length === 0
                    // !cookie.includes(
                    //   superAssistantUser2_shopDomain.toUpperCase()
                    // )
                  ) {
                    let cart = data;
                    //Funnel Rules
                    let startDate = null,
                      endDate = null,
                      minCartValue = null,
                      maxCartValue = null;

                    //Start Date End Date
                    let date_constraint = true;
                    if (funnel.funnelRules.set_start_date.isSelected) {
                      startDate = funnel.funnelRules.set_start_date.startDate;
                    }
                    if (funnel.funnelRules.set_end_date.isSelected) {
                      endDate = funnel.funnelRules.set_end_date.endDate;
                    }
                    if (endDate !== null && startDate !== null) {
                      function dateCheck(from, to, check) {
                        var fDate, lDate, cDate;
                        fDate = Date.parse(from);
                        lDate = Date.parse(to);
                        cDate = Date.parse(check);

                        if (cDate <= lDate && cDate >= fDate) {
                          return true;
                        }
                        return false;
                      }
                      const changeFormat = (date) => {
                        let orderDate = new Date(date);

                        let dates = orderDate.getDate();
                        let month = orderDate.getMonth() + 1;
                        let year = orderDate.getFullYear() - 2000;
                        if (dates < 10) {
                          dates = "0" + dates;
                        }
                        if (month < 10) {
                          month = "0" + month;
                        }

                        return `${month}/${dates}/${year}`;
                      };
                      let from = changeFormat(startDate);
                      let to = changeFormat(endDate);
                      let today = changeFormat(new Date());
                      date_constraint = dateCheck(from, to, today);
                    } else if (startDate !== null) {
                      let firstDate = new Date(startDate);
                      let today = new Date();
                      console.log(startDate);
                      var dateInPast = function (firstDate, secondDate) {
                        if (
                          firstDate.setHours(0, 0, 0, 0) <=
                          secondDate.setHours(0, 0, 0, 0)
                        ) {
                          return true;
                        }

                        return false;
                      };
                      date_constraint = dateInPast(firstDate, today);
                    }

                    //show_Only_for_Specific_CartValue
                    let cartValue_constraint = true;
                    console.log(
                      funnel.funnelRules.show_Only_for_Specific_CartValue
                        .isSelected
                    );
                    if (
                      funnel.funnelRules.show_Only_for_Specific_CartValue
                        .isSelected
                    ) {
                      minCartValue =
                        funnel.funnelRules.show_Only_for_Specific_CartValue
                          .minCartValue;
                      maxCartValue =
                        funnel.funnelRules.show_Only_for_Specific_CartValue
                          .maxCartValue;
                      cartValue_constraint =
                        minCartValue <= oldCart.total_price / 100 &&
                        oldCart.total_price / 100 < maxCartValue;

                      console.log(
                        minCartValue,
                        maxCartValue,
                        cartValue_constraint
                      );
                    }

                    //skip if already present
                    let not_skip_constraint = true;
                    console.log(offeredProductIds);
                    console.log(
                      funnel.funnelRules.skip_If_already_present_In_cart
                    );
                    if (funnel.funnelRules.skip_If_already_present_In_cart) {
                      for (let i = 0; i < offeredProductIds.length; i++) {
                        let offeredProductId = offeredProductIds[i];
                        console.log(offeredProductId);

                        for (let j = 0; j < cart.items.length; j++) {
                          if (cart.items[j].product_id === offeredProductId) {
                            console.log("already present in cart");
                            not_skip_constraint = false;
                            break;
                          }
                        }
                      }
                    }

                    //specific countries
                    let specificCountry_constraint = true;
                    let currentCountry = Shopify.country;
                    if (funnel.funnelRules.specific_countries.isSelected) {
                      let selectedCountries_arr =
                        funnel.funnelRules.specific_countries.selectedCountries;
                      specificCountry_constraint =
                        selectedCountries_arr.includes(currentCountry);
                    }

                    //once per user(getting previously stored value)
                    let not_oncePerBuyer_constraint = true;
                    if (funnel.funnelRules.once_per_buyer) {
                      let storedValue = localStorage.getItem("oncePerBuyer");
                      if (storedValue === null) {
                        not_oncePerBuyer_constraint = true;
                      } else {
                        not_oncePerBuyer_constraint = false;
                        localStorage.removeItem("oncePerBuyer");
                      }
                    }

                    // let temp = await fetch(`${hostedUrl}/api/userData`, {
                    //   method: "POST",
                    //   // mode: "no-cors",
                    //   headers: {
                    //     "Content-Type": "application/json",
                    //   },
                    //   body: JSON.stringify({
                    //     discountCode: discountCode,
                    //     shopDomain: superAssistantUser2_shopDomain,
                    //     funnelId: funnelId,
                    //   }), // body data type must match "Content-Type" header
                    // });
                    // temp = await temp.json();
                    console.log(
                      date_constraint,
                      cartValue_constraint,
                      not_skip_constraint,
                      specificCountry_constraint,
                      not_oncePerBuyer_constraint
                    );
                    console.log(
                      date_constraint &&
                        cartValue_constraint &&
                        not_skip_constraint &&
                        specificCountry_constraint &&
                        not_oncePerBuyer_constraint
                    );
                    if (
                      date_constraint &&
                      cartValue_constraint &&
                      not_skip_constraint &&
                      specificCountry_constraint &&
                      not_oncePerBuyer_constraint
                    ) {
                      $(".mask").addClass("active");
                      var fiveMinutes = 60 * 5,
                        // display = document.querySelector("#countdownTimer");
                        // let couponDiscountDiv = document.querySelector(
                        //   "#countdownTimerFooter"
                        // );
                        // startTimer(fiveMinutes, display);
                        display = document.querySelectorAll(".countdownTimer");

                      display.forEach((timer) => {
                        startTimer(fiveMinutes, timer);
                      });
                      async function addViews() {
                        let addViews = await fetch(
                          `${superAssistantUser2_hostedUrl}/api/viewIncrement/addViews`,
                          {
                            method: "POST",
                            // mode: "no-cors",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              funnelId: funnel._id,
                            }), // body data type must match "Content-Type" header
                          }
                        );
                        addViews = await addViews.json();
                        console.log(addViews);
                      }

                      addViews();
                      // startTimer(fiveMinutes, couponDiscountDiv);
                      // let now = new Date();
                      // let fiveMinutesLater = new Date(
                      //   now.getTime() + 5 * 60000
                      // );
                      // console.log(fiveMinutesLater.toUTCString());
                      // document.cookie = `discount_code=${discountCode};expires=${fiveMinutesLater.toUTCString()};path=/`;
                    }

                    //Once per buyer(setting value)
                    if (funnel.funnelRules.once_per_buyer) {
                      localStorage.setItem("oncePerBuyer", true);
                    }
                  }
                });
            }, 1000);
          });

        // setTimeout(function () {
        //   console.log("clicked");

        //   $(".mask").addClass("active");
        //   var fiveMinutes = 60 * 5,
        //     display = document.querySelector("#countdownTimer");
        //   startTimer(fiveMinutes, display);
        // }, 1000);
      });

      // Function for close the Modal

      function closeModal() {
        $(".mask").removeClass("active");
      }

      // Call the closeModal function on the clicks/keyboard

      // $(".close, .mask").on("click", function () {
      //   closeModal();
      //   document.querySelector("#discountCodeP").innerText = discountCode;
      //   console.log(document.querySelector("#discountCodeP"));
      //   document.querySelector(".couponDisplay").style.display = "flex";
      // });

      // $(document).keyup(function (e) {
      //   if (e.keyCode == 27) {
      //     closeModal();
      //     document.querySelector("#discountCodeP").innerText = discountCode;
      //     console.log(document.querySelector("#discountCodeP"));
      //     document.querySelector(".couponDisplay").style.display = "flex";
      //   }
      // });
      let divs = document.querySelectorAll(".close,.mask");
      divs.forEach((ele) => {
        ele.onclick = () => {
          closeModal();
          // document.querySelector("#discountCodeP").innerText = discountCode;
          // console.log(document.querySelector("#discountCodeP"));
          // document.querySelector(".couponDisplay").style.display = "flex";
        };
      });

      document.addEventListener("keyup", (e) => {
        if (e.keyCode == 27) {
          closeModal();
          // document.querySelector("#discountCodeP").innerText = discountCode;
          // console.log(document.querySelector("#discountCodeP"));
          // document.querySelector(".couponDisplay").style.display = "flex";
        }
      });

      setTimeout(() => {
        //slider
        var slideIndex = 1;
        showSlides(slideIndex);

        // Next/previous controls
        function plusSlides(n) {
          showSlides((slideIndex += n));
          console.log("here", n);
        }

        // Thumbnail image controls
        function currentSlide(n) {
          showSlides((slideIndex = n));
          console.log("here", n);
        }

        function showSlides(n) {
          console.log("top");
          var i;
          var slides = document.getElementsByClassName("slide");
          // var dots = document.getElementsByClassName("dot");
          if (n > slides.length) {
            slideIndex = 1;
          }
          if (n < 1) {
            slideIndex = slides.length;
          }
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }
          // for (i = 0; i < dots.length; i++) {
          //     dots[i].className = dots[i].className.replace(" active", "");
          // }
          slides[slideIndex - 1].style.display = "block";
          // dots[slideIndex-1].className += " active";
          console.log("bottom");
        }

        document.querySelector(".prev").addEventListener("click", () => {
          plusSlides(-1);
        });
        document.querySelector(".next").addEventListener("click", () => {
          plusSlides(1);
        });
      }, 2000);

      // addToCart_button.id = "one";
    }
    // });
  }
  async function cartPagePopUp() {
    await fetch("/cart.js")
      .then((response) => response.json())
      .then((data) => {
        // let superAssistantUser2_shopifyCurrency = Shopify.currency.active;
        // let superAssistantUser2_shopDomain = Shopify.shop.split(".")[0];

        let oldCart = data;

        //user
        console.log(superAssistantUser2);
        let modalStyle = superAssistantUser2.discountStyle[0];

        //css

        //UniqueCode Generator
        function generateDiscountCode(length) {
          var result = [];
          var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result.push(
              characters.charAt(Math.floor(Math.random() * charactersLength))
            );
          }
          return (
            `${superAssistantUser2_shopDomain.toUpperCase()}-` + result.join("")
          );
        }

        console.log(generateDiscountCode(6));

        let discountCode = generateDiscountCode(6);

        //   let popUpMask = document.createElement('div');
        //   popUpMask.role = "dialog";
        //   popUpMask.className = "mask";

        //   let modalBody = document.createElement('div');
        //   modalBody.className = "modal";
        //   modalBody.role = "alert";

        //   let closeButton = document.createElement("button");
        //   closeButton.className = "close";
        // closeButton.role = "button";

        // let mainModalBody = document.createElement("div");
        // mainModalBody.style.padding = "1em";
        // mainModalBody.style.padding = "1em";

        //   let saleText = document.createElement("p");
        //   saleText.innerText = "Deal unlocked! Get this product for 20% off";

        //   let productName = document.createElement("h2");
        //   productName.innerText = "Hoodie";

        // console.log(meta.product);
        // await fetch("/cart.js")
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //     let oldCart = data;
        //   });

        function startTimer(duration, display) {
          var timer = duration,
            minutes,
            seconds;
          setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
              timer = 0;
              // document.querySelector(".couponDisplay").style.display = "none";
              // $(".couponDisplay").toggle('slow');
            }
          }, 1000);
        }

        // dynamicModalUpdate(obj);

        // console.log(temp);

        let popUpMask = document.createElement("div");
        popUpMask.role = "dialog";
        popUpMask.className = "mask";

        let modalBody = document.createElement("div");
        modalBody.className = "modal";
        modalBody.role = "alert";
        modalBody.id = "superAssistantModal";
        modalBody.style.background = modalStyle.backGroundColor;
        modalBody.style.borderRadius = "10px";
        // modalBody.innerHTML = temp;

        let modalClose = document.createElement("button");
        modalClose.className = "close";
        modalClose.role = "button";
        modalClose.innerText = "X";

        let sliderDiv = document.createElement("div");
        sliderDiv.className = "sliderBox";

        let prevButton = document.createElement("a");
        prevButton.className = "prev";
        prevButton.innerHTML = "&#10094;";
        // prevButton.onclick = plusSlides(-1);

        let nextButton = document.createElement("a");
        nextButton.className = "next";
        nextButton.innerHTML = "&#10095;";
        // nextButton.onclick = plusSlides(1);

        sliderDiv.appendChild(prevButton);
        sliderDiv.appendChild(nextButton);

        modalBody.appendChild(modalClose);
        modalBody.appendChild(sliderDiv);

        //couponDisplayDiv
        // let couponDisplayDiv = document.createElement("div");
        // couponDisplayDiv.className = "couponDisplay";
        // couponDisplayDiv.classList.add("fade");
        // couponDisplayDiv.style.position = "fixed";
        // couponDisplayDiv.style.zIndex = "99999999999";

        // let div1 = document.createElement("div");
        // div1.style.display = "flex";
        // div1.style.gap = "1em";

        // let discountCodeP = document.createElement("p");
        // discountCodeP.className = "couponText";
        // discountCodeP.innerHTML =
        //   'Discount Code : <span id="discountCodeP" class="couponSpan"></span>';

        // let discountTimeP = document.createElement("p");
        // discountTimeP.className = "couponText";
        // discountTimeP.innerHTML =
        //   'Remaining Time: <span id="countdownTimerFooter" class="couponTime">05:00</span>';

        // div1.appendChild(discountCodeP);
        // div1.appendChild(discountTimeP);

        // let div2 = document.createElement("div");
        // let couponText = document.createElement("p");
        // couponText.className = "couponText";
        // couponText.innerText =
        //   "This is your discount code. Kindly click on checkout to add the following discount to your order!";

        // div2.appendChild(couponText);

        // couponDisplayDiv.appendChild(div1);
        // couponDisplayDiv.appendChild(div2);

        document.querySelector("body").appendChild(popUpMask);
        document.querySelector("body").appendChild(modalBody);
        // document.querySelector("body").appendChild(couponDisplayDiv);

        let modal = `
          <button class="close" role="button">X</button>
      <div style="padding: 1em; text-align: center">
        <p style="font-size: 0.8em">
          discountPercentage
        </p>
        <h4
          style="
            font-weight: 600;
            font-size: 1.4em;
            background: #2d2d2d;
            padding: 0.5em;
            color: white;
            margin:0;
          "
        >
          Hurry! Offer will expire in <span id="countdownTimer">offerTime</span>
        </h4>
        <div style="height: 25em; overflow-y: scroll">
          <h4 style="font-weight: 600; font-size: 1.2em; padding: 0.5em;margin:0;">
            productName
          </h4>
          discountedPrice
          totalDiscount
          <img
            style="width: 10em; border-radius: 5px"
            src=productImage
            alt=""
          />
          <div style="display: flex; justify-content: center">
            optionsList
          <div style="padding-top: 1em">
            <label for="quantity">Quantity:</label>
            <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
              <input
                type="number"
                style="
                  padding: 0.5em;
                  border: 1px solid #cdd0d2;
                  border-radius: 4px;
                  width: 15em;
                  text-align: center;
                "
                value="1"
                name="quantity"
                id="quantity"
              />
            </div>
          </div>
          <div style="padding-top: 1em; color: grey">
            
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            padding-top: 1em;
             
          "
        >
          <button
            style="
              padding: 1em 5em;
              font-weight: 600;
              font-size: 1em;
              color: white;
              background: #18a95e;
              cursor: pointer;
              border: 1px solid #cdd0d2;
            "
          >
            Grab this Deal
          </button>
          <a
            href="https://www.google.com/"
            style="color: #18a95e; font-weight: 600"
          >
            Skip and Continue to Checkout
          </a>
        </div>
        <div style="display: flex; justify-content: center; padding-top: 1em">
          <img
            src="https://cdn.shopify.com/assets/images/logos/shopify-bag.png"
            alt=""
            style="width: 2em"
          />
          <p style="font-size: 0.9em">Powered By SuperAssistant</p>
        </div>
      </div>
          </div>
      </div> 
      `;

        let Obj = {
          discountPercentage: "Deal unlocked! Get this product for 20% off",
          offerTime: "5:00",
          productName: "Test 1",
          currency: superAssistantUser2_shopifyCurrency,
          originalPrice: "10.00",
          discountedPrice: "7.5",
          totalDiscount: "2.5",
          productImage: "https://pbs.twimg.com/media/EdPratRVcAAo6Pr.jpg",
        };

        let temp = "";

        function dynamicModalUpdate(obj) {
          modalBody.innerHTML = modal.replace(
            /discountPercentage|offerTime|productName|discountedPrice|totalDiscount|productImage|optionsList/gi,
            function (matched) {
              return obj[matched];
            }
          );
        }

        async function openUpSellChild(index, path, variantId, quantity) {
          console.log(offers[index]);
          await fetch("/cart/add.js", {
            method: "POST",
            // mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [
                {
                  quantity: quantity,
                  id: variantId,
                },
              ],
            }), // body data type must match "Content-Type" header
          })
            .then((response) => response.json())
            .then(async (data) => {
              console.log(data);
              let offer = offers[index];
              let currentOffer = "";
              if (path === "A-A") {
                currentOffer =
                  offer.downsellCondition.offerAccepted.offerAccepted_child;
              } else if (path === "D-A") {
                currentOffer =
                  offer.downsellCondition.offerDeclined.offerAccepted_child;
              }

              if (currentOffer.isExists && !currentOffer.skip_offer) {
                let discount,
                  productName,
                  originalPrice,
                  discountedPrice,
                  totalDiscount;
                offeredProductIds.push(currentOffer.selectedProduct.id);
                productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
                originalPrice = currentOffer.selectedProduct.variants[0].price;

                let variantId2 = currentOffer.selectedProduct.variants[0].id;

                if (currentOffer.discount.type === "Discount") {
                  if (currentOffer.discount.discountType === "INR") {
                    let topMessage = modalStyle.topMessage.split(" ");
                    let topMessageIndex = topMessage.indexOf("{{discount}}");
                    if (topMessageIndex !== -1) {
                      topMessage.splice(
                        topMessageIndex,
                        1,
                        `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
                      );
                    }
                    console.log(topMessage.join(" "));
                    // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                    discount = topMessage.join(" ");

                    let discountPrice = String(
                      parseFloat(originalPrice) -
                        parseFloat(currentOffer.discount.discountValue)
                    );
                    discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

                    let availableDiscount = currentOffer.discount.discountValue;

                    totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                  } else if (currentOffer.discount.discountType === "%") {
                    let topMessage = modalStyle.topMessage.split(" ");
                    let topMessageIndex = topMessage.indexOf("{{discount}}");
                    if (topMessageIndex !== -1) {
                      topMessage.splice(
                        topMessageIndex,
                        1,
                        `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
                      );
                    }
                    console.log(topMessage.join(" "));
                    discount = topMessage.join(" ");

                    let discountPrice = String(
                      parseFloat(originalPrice) -
                        parseFloat(
                          (currentOffer.discount.discountValue / 100) *
                            parseFloat(originalPrice)
                        )
                    );
                    discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

                    let availableDiscount = String(
                      parseFloat(
                        (currentOffer.discount.discountValue / 100) *
                          parseFloat(originalPrice)
                      ).toFixed(2)
                    );

                    totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                  }
                } else {
                  discount = "Deal unlocked! You might need this too! ";
                  discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
                  totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
                }

                //free shipping
                let freeShipping = "";
                if (currentOffer.include_free_shipping) {
                  freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
                }

                //options will be used to next update, now only one variant is shown
                // let modalOptionsList = [];
                // currentOffer.selectedProduct.options.forEach((each) => {
                //   modalOptionsList.push(createSelector(each));
                // });
                // console.log(modalOptionsList);

                let imageUrl = findImage(
                  currentOffer.selectedProduct.variants[0].image_id,
                  currentOffer.selectedProduct.images
                );

                console.log(imageUrl);

                let obj = {
                  // INDEX: index,
                  discountPercentage: discount,
                  // offerTime: "5:00",
                  productName: productName,
                  // currency: superAssistantUser2_shopifyCurrency,
                  // originalPrice: "10.00",
                  freeShipping: freeShipping,
                  // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
                  optionsList: " ",
                  discountedPrice: discountedPrice,
                  totalDiscount: totalDiscount,
                  productImage: imageUrl,
                };
                let upSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="upSell2Modal"
>
  <button id="upSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSellChild1_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;  justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild1_button"
        class="upSellChild2Close"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild1_button"
        class="upSellChild2Close"
      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
                upSellModalData = upSellModalData.replace(
                  /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,
                  function (matched) {
                    return obj[matched];
                  }
                );
                let upSell2Modal = document.createElement("div");
                upSell2Modal.id = "upSell2Modal";
                upSell2Modal.className = "modal";
                upSell2Modal.style.visibility = "visible";
                upSell2Modal.style.opacity = "1";
                // upSell2Modal.style.border = "3px solid grey";
                upSell2Modal.style.height = "40em";
                upSell2Modal.style.top = "19%";
                upSell2Modal.style.borderRadius = "11px";
                upSell2Modal.innerHTML = upSellModalData;
                document.querySelector("body").appendChild(upSell2Modal);
                document
                  .querySelector("#upSellModal2Close")
                  .addEventListener(
                    "click",
                    () => (upSell2Modal.style.display = "none")
                  );

                //if clicks on accepted

                document
                  .querySelector("#upSellChild1_button")
                  .addEventListener("click", async () => {
                    let quantity2 = parseFloat(
                      document.querySelector("#upSellChild1_quantity").value
                    );
                    await fetch("/cart/add.js", {
                      method: "POST",
                      // mode: "no-cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        items: [
                          {
                            quantity: quantity2,
                            id: variantId2,
                          },
                        ],
                      }), // body data type must match "Content-Type" header
                    })
                      .then((response) => response.json())
                      .then(async (data) => {
                        await fetch("/cart.js")
                          .then((response) => response.json())
                          .then(async (data) => {
                            let obj = {
                              username: superAssistantUser2_shopDomain,
                              funnel: funnel,
                              newCart: data,
                              oldCart: oldCart,
                            };
                            console.log(obj);
                            console.log(data);
                            await fetch(customCheckoutUrl, {
                              method: "POST",
                              // mode: "no-cors",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                username: superAssistantUser2_shopDomain,
                                funnel: funnel,
                                newCart: data,
                                oldCart: oldCart,
                              }), // body data type must match "Content-Type" header
                            })
                              .then((response) => response.json())
                              .then((data) => {
                                console.log(data);
                                window.location = data.url;
                              });
                          });
                      });
                  });

                //if clicks on declined
                document
                  .querySelector("#downSellChild1_button")
                  .addEventListener("click", async () => {
                    await fetch("/cart.js")
                      .then((response) => response.json())
                      .then(async (data) => {
                        let obj = {
                          username: superAssistantUser2_shopDomain,
                          funnel: funnel,
                          newCart: data,
                          oldCart: oldCart,
                        };
                        console.log(obj);
                        await fetch(customCheckoutUrl, {
                          method: "POST",
                          // mode: "no-cors",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            username: superAssistantUser2_shopDomain,
                            funnel: funnel,
                            newCart: data,
                            oldCart: oldCart,
                          }), // body data type must match "Content-Type" header
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            console.log(data);
                            window.location = data.url;
                          });
                      });
                  });

                let closeButtons =
                  document.querySelectorAll(".upSellChild2Close");

                closeButtons.forEach((each) => {
                  each.addEventListener("click", () => {
                    upSell2Modal.style.display = "none";
                  });
                });
                document.addEventListener("keyup", (e) => {
                  if (e.keyCode == 27) {
                    upSell2Modal.style.display = "none";
                  }
                });
              } else if (!currentOffer.isExists) {
                await fetch("/cart.js")
                  .then((response) => response.json())
                  .then(async (data) => {
                    console.log(data);
                    let obj = {
                      username: superAssistantUser2_shopDomain,
                      funnel: funnel,
                      cartData: data,
                    };
                    console.log(obj);
                    await fetch(customCheckoutUrl, {
                      method: "POST",
                      // mode: "no-cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: superAssistantUser2_shopDomain,
                        funnel: funnel,
                        newCart: data,
                        oldCart: oldCart,
                      }), // body data type must match "Content-Type" header
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.location = data.url;
                      });
                  });
              }
            });
        }

        async function openDownSellChild(index, path) {
          console.log(offers[index]);
          let offer = offers[index];
          let currentOffer = "";
          if (path === "A-D") {
            currentOffer =
              offer.downsellCondition.offerAccepted.offerDeclined_child;
          } else if (path === "D-D") {
            currentOffer =
              offer.downsellCondition.offerDeclined.offerDeclined_child;
          }
          // offer.downsellCondition.offerDeclined.downsellCondition.offerDeclined;
          if (currentOffer.isExists && !currentOffer.skip_offer) {
            let discount,
              productName,
              originalPrice,
              discountedPrice,
              totalDiscount;
            offeredProductIds.push(currentOffer.selectedProduct.id);
            productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
            originalPrice = currentOffer.selectedProduct.variants[0].price;

            let variantId2 = currentOffer.selectedProduct.variants[0].id;

            if (currentOffer.discount.type === "Discount") {
              if (currentOffer.discount.discountType === "INR") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
                  );
                }
                console.log(topMessage.join(" "));
                // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(currentOffer.discount.discountValue)
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

                let availableDiscount = currentOffer.discount.discountValue;

                totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              } else if (currentOffer.discount.discountType === "%") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
                  );
                }
                console.log(topMessage.join(" "));
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(
                      (currentOffer.discount.discountValue / 100) *
                        parseFloat(originalPrice)
                    )
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

                let availableDiscount = String(
                  parseFloat(
                    (currentOffer.discount.discountValue / 100) *
                      parseFloat(originalPrice)
                  ).toFixed(2)
                );

                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              }
            } else {
              discount = "Deal unlocked! You might need this too! ";
              discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
              totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
            }

            //free shipping
            let freeShipping = "";
            if (currentOffer.include_free_shipping) {
              freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
            }

            //options
            // let modalOptionsList = [];
            // currentOffer.selectedProduct.options.forEach((each) => {
            //   modalOptionsList.push(createSelector(each));
            // });
            // console.log(modalOptionsList);

            let imageUrl = findImage(
              currentOffer.selectedProduct.variants[0].image_id,
              currentOffer.selectedProduct.images
            );

            console.log(imageUrl);

            let obj = {
              // INDEX: index,
              discountPercentage: discount,
              // offerTime: "5:00",
              productName: productName,
              // currency: superAssistantUser2_shopifyCurrency,
              // originalPrice: "10.00",
              freeShipping: freeShipping,
              // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
              optionsList: " ",
              discountedPrice: discountedPrice,
              totalDiscount: totalDiscount,
              productImage: imageUrl,
            };
            let downSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="downSell2Modal"
>
  <button id="downSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div >
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSellChild2_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex;  flex-direction: column;  justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild2_button"
        class="downSellChild2Close"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild2_button"
        class="downSellChild2Close"
      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
            downSellModalData = downSellModalData.replace(
              /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,
              function (matched) {
                return obj[matched];
              }
            );
            let downSell2Modal = document.createElement("div");
            downSell2Modal.id = "downSell2Modal";
            downSell2Modal.className = "modal";
            downSell2Modal.style.visibility = "visible";
            downSell2Modal.style.opacity = "1";
            // downSell2Modal.style.border = "3px solid grey";
            downSell2Modal.style.height = "40em";
            downSell2Modal.style.top = "19%";
            downSell2Modal.style.borderRadius = "11px";
            downSell2Modal.innerHTML = downSellModalData;
            document.querySelector("body").appendChild(downSell2Modal);
            document
              .querySelector("#downSellModal2Close")
              .addEventListener(
                "click",
                () => (downSell2Modal.style.display = "none")
              );

            //if accept

            document
              .querySelector("#upSellChild2_button")
              .addEventListener("click", async () => {
                let quantity2 = parseFloat(
                  document.querySelector("#upSellChild2_quantity").value
                );
                await fetch("/cart/add.js", {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    items: [
                      {
                        quantity: quantity2,
                        id: variantId2,
                      },
                    ],
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then(async (data) => {
                    await fetch("/cart.js")
                      .then((response) => response.json())
                      .then(async (data) => {
                        let obj = {
                          username: superAssistantUser2_shopDomain,
                          funnel: funnel,
                          newCart: data,
                          oldCart: oldCart,
                        };
                        console.log(obj);
                        console.log(data);
                        await fetch(customCheckoutUrl, {
                          method: "POST",
                          // mode: "no-cors",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            username: superAssistantUser2_shopDomain,
                            funnel: funnel,
                            newCart: data,
                            oldCart: oldCart,
                          }), // body data type must match "Content-Type" header
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            console.log(data);
                            window.location = data.url;
                          });
                      });
                  });
              });

            //if declined
            document
              .querySelector("#downSellChild2_button")
              .addEventListener("click", async () => {
                await fetch("/cart.js")
                  .then((response) => response.json())
                  .then(async (data) => {
                    console.log(data, funnel, superAssistantUser2_shopDomain);
                    await fetch(customCheckoutUrl, {
                      method: "POST",
                      // mode: "no-cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: superAssistantUser2_shopDomain,
                        funnel: funnel,
                        newCart: data,
                        oldCart: oldCart,
                      }), // body data type must match "Content-Type" header
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.location = data.url;
                      });
                  });
              });

            let closeButtons = document.querySelectorAll(
              ".downSellChild2Close"
            );

            closeButtons.forEach((each) => {
              each.addEventListener("click", () => {
                downSell2Modal.style.display = "none";
              });
            });
            document.addEventListener("keyup", (e) => {
              if (e.keyCode == 27) {
                downSell2Modal.style.display = "none";
              }
            });
          } else if (!currentOffer.isExists) {
            await fetch("/cart.js")
              .then((response) => response.json())
              .then(async (data) => {
                console.log(data);
                await fetch(customCheckoutUrl, {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: superAssistantUser2_shopDomain,
                    funnel: funnel,
                    newCart: data,
                    oldCart: oldCart,
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    window.location = data.url;
                  });
              });
          }
        }

        async function openUpSellParent(index, variantId, quantity) {
          console.log(offers[index]);
          $(".mask").removeClass("active");
          console.log(variantId, index);

          await fetch("/cart/add.js", {
            method: "POST",
            // mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [
                {
                  quantity: quantity,
                  id: variantId,
                },
              ],
            }), // body data type must match "Content-Type" header
          })
            .then((response) => response.json())
            .then(async (data) => {
              console.log(data);
              //close parent modal
              // document.querySelector("#discountCodeP").innerText = discountCode;
              // console.log(document.querySelector("#discountCodeP"));
              // document.querySelector(".couponDisplay").style.display = "flex";

              let offer = offers[index];
              let currentOffer = offer.downsellCondition.offerAccepted;
              if (
                offer.downsellCondition.offerAccepted.isExists &&
                !offer.downsellCondition.offerAccepted.skip_offer
              ) {
                let discount,
                  productName,
                  originalPrice,
                  discountedPrice,
                  totalDiscount;
                offeredProductIds.push(currentOffer.selectedProduct.id);
                productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
                originalPrice = currentOffer.selectedProduct.variants[0].price;
                let variantId = currentOffer.selectedProduct.variants[0].id;

                if (currentOffer.discount.type === "Discount") {
                  if (currentOffer.discount.discountType === "INR") {
                    let topMessage = modalStyle.topMessage.split(" ");
                    let topMessageIndex = topMessage.indexOf("{{discount}}");
                    if (topMessageIndex !== -1) {
                      topMessage.splice(
                        topMessageIndex,
                        1,
                        `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
                      );
                    }
                    console.log(topMessage.join(" "));
                    // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                    discount = topMessage.join(" ");

                    let discountPrice = String(
                      parseFloat(originalPrice) -
                        parseFloat(currentOffer.discount.discountValue)
                    );
                    discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

                    let availableDiscount = currentOffer.discount.discountValue;

                    totalDiscount = `<p style="font-size: 0.9em">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                  } else if (currentOffer.discount.discountType === "%") {
                    let topMessage = modalStyle.topMessage.split(" ");
                    let topMessageIndex = topMessage.indexOf("{{discount}}");
                    if (topMessageIndex !== -1) {
                      topMessage.splice(
                        topMessageIndex,
                        1,
                        `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
                      );
                    }
                    console.log(topMessage.join(" "));
                    discount = topMessage.join(" ");

                    let discountPrice = String(
                      parseFloat(originalPrice) -
                        parseFloat(
                          (currentOffer.discount.discountValue / 100) *
                            parseFloat(originalPrice)
                        )
                    );
                    discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

                    let availableDiscount = String(
                      parseFloat(
                        (currentOffer.discount.discountValue / 100) *
                          parseFloat(originalPrice)
                      ).toFixed(2)
                    );

                    totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                  }
                } else {
                  discount = "Deal unlocked! You might need this too! ";
                  discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
                  totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
                }

                //free shipping
                let freeShipping = "";
                if (currentOffer.include_free_shipping) {
                  freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
                }

                //options
                // let modalOptionsList = [];
                // currentOffer.selectedProduct.options.forEach((each) => {
                //   modalOptionsList.push(createSelector(each));
                // });
                // console.log(modalOptionsList);

                let imageUrl = findImage(
                  currentOffer.selectedProduct.variants[0].image_id,
                  currentOffer.selectedProduct.images
                );

                console.log(imageUrl);

                let obj = {
                  variantId: variantId,
                  INDEX: index,
                  discountPercentage: discount,
                  // offerTime: "5:00",
                  productName: productName,
                  // currency: superAssistantUser2_shopifyCurrency,
                  // originalPrice: "10.00",
                  freeShipping: freeShipping,
                  // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
                  optionsList: " ",
                  discountedPrice: discountedPrice,
                  totalDiscount: totalDiscount,
                  productImage: imageUrl,
                };
                let upSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="upSellModal"
>
  <button id="upSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div >
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSell_child_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;  justify-content: center;">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openUpSellChild_button"
        class="upSellChildClose"
        onclick="openUpSellChild(INDEX,'A-A',variantId)"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild_button"
        class="upSellChildClose"
        onclick="openDownSellChild(INDEX,'A-D')"
      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
                upSellModalData = upSellModalData.replace(
                  /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX/gi,
                  function (matched) {
                    return obj[matched];
                  }
                );
                let upSellModal = document.createElement("div");
                upSellModal.id = "upSellModal";
                upSellModal.className = "modal";
                upSellModal.style.visibility = "visible";
                upSellModal.style.opacity = "1";
                // upSellModal.style.border = "3px solid grey";
                upSellModal.style.height = "39em";
                upSellModal.style.top = "19%";
                upSellModal.style.borderRadius = "11px";
                upSellModal.innerHTML = upSellModalData;
                document.querySelector("body").appendChild(upSellModal);
                document
                  .querySelector("#upSellModalClose")
                  .addEventListener(
                    "click",
                    () => (upSellModal.style.display = "none")
                  );
                let closeButtons =
                  document.querySelectorAll(".upSellChildClose");

                closeButtons.forEach((each) => {
                  each.addEventListener(
                    "click",
                    () => (upSellModal.style.display = "none")
                  );
                });

                //link these to child upSell/downSell conditions

                document.querySelector("#openUpSellChild_button").onclick =
                  () => {
                    let quantity = parseFloat(
                      document.querySelector("#upSell_child_quantity").value
                    );
                    openUpSellChild(obj.INDEX, "A-A", obj.variantId, quantity);
                  };

                document.querySelector("#openDownSellChild_button").onclick =
                  () => {
                    openDownSellChild(obj.INDEX, "A-D");
                  };

                document.addEventListener("keyup", (e) => {
                  if (e.keyCode == 27) {
                    upSellModal.style.display = "none";
                  }
                });
              } else if (!offer.downsellCondition.offerAccepted.isExists) {
                await fetch("/cart.js")
                  .then((response) => response.json())
                  .then(async (data) => {
                    console.log(data);
                    let obj = {
                      username: superAssistantUser2_shopDomain,
                      funnel: funnel,
                      newCart: data,
                      oldCart: oldCart,
                    };

                    console.log(obj);
                    await fetch(customCheckoutUrl, {
                      method: "POST",
                      // mode: "no-cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: superAssistantUser2_shopDomain,
                        funnel: funnel,
                        newCart: data,
                        oldCart: oldCart,
                      }), // body data type must match "Content-Type" header
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.location = data.url;
                      });
                  });
              }
            });
        }
        async function openDownSellParent(index) {
          console.log(offers[index]);

          //close parent modal
          $(".mask").removeClass("active");
          // document.querySelector("#discountCodeP").innerText = discountCode;
          // console.log(document.querySelector("#discountCodeP"));
          // document.querySelector(".couponDisplay").style.display = "flex";

          let offer = offers[index];
          let currentOffer = offer.downsellCondition.offerDeclined;
          if (
            offer.downsellCondition.offerDeclined.isExists &&
            !offer.downsellCondition.offerDeclined.skip_offer
          ) {
            let discount,
              productName,
              originalPrice,
              discountedPrice,
              totalDiscount;
            offeredProductIds.push(currentOffer.selectedProduct.id);
            productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
            originalPrice = currentOffer.selectedProduct.variants[0].price;

            let variantId = currentOffer.selectedProduct.variants[0].id;

            if (currentOffer.discount.type === "Discount") {
              if (currentOffer.discount.discountType === "INR") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
                  );
                }
                console.log(topMessage.join(" "));
                // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(currentOffer.discount.discountValue)
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

                let availableDiscount = currentOffer.discount.discountValue;

                // totalDiscount = `<p style="font-size: 0.9em">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              } else if (currentOffer.discount.discountType === "%") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
                  );
                }
                console.log(topMessage.join(" "));
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(
                      (currentOffer.discount.discountValue / 100) *
                        parseFloat(originalPrice)
                    )
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

                let availableDiscount = String(
                  parseFloat(
                    (currentOffer.discount.discountValue / 100) *
                      parseFloat(originalPrice)
                  ).toFixed(2)
                );

                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              }
            } else {
              discount = "Deal unlocked! You might need this too! ";
              discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
              totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
            }

            //free shipping
            let freeShipping = "";
            if (currentOffer.include_free_shipping) {
              freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
            }

            //options will be used to next update, now only one variant is shown
            // let modalOptionsList = [];
            // currentOffer.selectedProduct.options.forEach((each) => {
            //   modalOptionsList.push(createSelector(each));
            // });
            // console.log(modalOptionsList);

            let imageUrl = findImage(
              currentOffer.selectedProduct.variants[0].image_id,
              currentOffer.selectedProduct.images
            );

            console.log(imageUrl);

            let obj = {
              variantId: variantId,
              INDEX: index,
              discountPercentage: discount,
              // offerTime: "5:00",
              productName: productName,
              // currency: superAssistantUser2_shopifyCurrency,
              // originalPrice: "10.00",
              freeShipping: freeShipping,
              // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
              optionsList: " ",
              discountedPrice: discountedPrice,
              totalDiscount: totalDiscount,
              productImage: imageUrl,
            };
            let downSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="downSellModal"
>
  <button id="downSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div >
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSell_child_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;  justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
          
        "
        id="openUpSellChild2_button"
        class="downSellChildClose"
        onclick="openUpSellChild(INDEX,'D-A',variantId)"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild2_button"
        class="downSellChildClose"
        onclick="openDownSellChild(INDEX,'D-D')"

      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
            downSellModalData = downSellModalData.replace(
              /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,
              function (matched) {
                return obj[matched];
              }
            );
            let downSellModal = document.createElement("div");
            downSellModal.id = "downSellModal";
            downSellModal.className = "modal";
            downSellModal.style.visibility = "visible";
            downSellModal.style.opacity = "1";
            // downSellModal.style.border = "3px solid grey";
            downSellModal.style.height = "39em";
            downSellModal.style.top = "19%";
            downSellModal.style.borderRadius = "11px";
            downSellModal.innerHTML = downSellModalData;
            document.querySelector("body").appendChild(downSellModal);
            document
              .querySelector("#downSellModalClose")
              .addEventListener(
                "click",
                () => (downSellModal.style.display = "none")
              );

            let closeButtons = document.querySelectorAll(".downSellChildClose");

            closeButtons.forEach((each) => {
              each.addEventListener(
                "click",
                () => (downSellModal.style.display = "none")
              );
            });

            //link these to child upSell/downSell conditions

            document.querySelector("#openUpSellChild2_button").onclick = () => {
              let quantity = parseFloat(
                document.querySelector("#upSell_child_quantity").value
              );
              openUpSellChild(obj.INDEX, "D-A", obj.variantId, quantity);
            };

            document.querySelector("#openDownSellChild2_button").onclick =
              () => {
                openDownSellChild(obj.INDEX, "D-D");
              };

            document.addEventListener("keyup", (e) => {
              if (e.keyCode == 27) {
                downSellModal.style.display = "none";
              }
            });
          } else if (!offer.downsellCondition.offerDeclined.isExists) {
            await fetch("/cart.js")
              .then((response) => response.json())
              .then(async (data) => {
                let obj = {
                  username: superAssistantUser2_shopDomain,
                  funnel: funnel,
                  newCart: data,
                  oldCart: oldCart,
                };
                console.log(obj);
                await fetch(customCheckoutUrl, {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: superAssistantUser2_shopDomain,
                    funnel: funnel,
                    newCart: data,
                    oldCart: oldCart,
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    window.location = data.url;
                  });
              });
          }
        }

        function createSlide(obj, type) {
          let slideData = `
  <div style="padding: 1em; text-align: center" background:${modalStyle.backGroundColor}>
        <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
          discountPercentage
        </p>
        <h4
          style="
            font-weight: 600;
            font-size: ${modalStyle.PricetextSize}px;
            background:${modalStyle.PricebackGroundColor};
            padding: 0.5em;
            color: ${modalStyle.PricetextColor};
            margin:0;
          "
        >
          Hurry! Offer will expire in <span id="countdownTimer" class="countdownTimer">offerTime</span>
        </h4>
        <div >
          <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em;margin:0;">
            productName
          </h4>
          discountedPrice
          freeShipping
          totalDiscount
          <img
            style="width: 11em; border-radius:5px;height:10em"
            src=productImage
            alt=""
          />
          <div style="display: flex; justify-content: center">
            optionsList
          <div style="padding-top: 1em">
            <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
            <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
              <input
                type="number"
                style="
                  padding: 0.5em;
                  border: 1px solid #cdd0d2;
                  border-radius: 4px;
                  width: 15em;
                  text-align: center;
                "
                value="1"
                name="quantity"
                id="upSell_parent_quantity-INDEX"
              />
            </div>
          </div>
          <div style="padding-top: 1em; color: grey">
          </div>
        </div>
        <div
          style="
            display: flex;
             flex-direction: column;
             
            justify-content: center;
          "
        >
          <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${modalStyle.buttonTextSize}px;
                  color: ${modalStyle.buttonTextColor};
                  background: ${modalStyle.buttonbackGroundColor};
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openUpSellParent_Button-INDEX"
              >
                ${modalStyle.buttonText}
              </button>
              <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${modalStyle.checkoutTextSize};
                  color:${modalStyle.checkoutTextColor};
                  background:${modalStyle.checkoutbackGroundColor} ; 
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openDownSellParent_Button-INDEX"
                
              >
                ${modalStyle.checkoutText}
              </button>
        </div>
        <div style="display: flex; justify-content: center;align-items: center; padding-top: 1em">
          <img
            src=${popUpLogoUrl}
            alt=""
            style="width: 1.5em;height: 1.5em;"
          />
          <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
        </div>
      </div>
          </div>
      </div>
  `;
          slideData = slideData.replace(
            /discountPercentage|offerTime|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,
            function (matched) {
              return obj[matched];
            }
          );
          console.log(slideData);
          let slide = document.createElement("div");
          slide.className = "slide fade";
          slide.innerHTML = slideData;
          sliderDiv.appendChild(slide);

          if (type === "manual") {
            document.querySelector(
              `#openUpSellParent_Button-${obj.INDEX}`
            ).onclick = () => {
              let quantity = parseFloat(
                document.querySelector(`#upSell_parent_quantity-${obj.INDEX}`)
                  .value
              );
              openUpSellParent(obj.INDEX, obj.variantId, quantity);
            };
            document.querySelector(
              `#openDownSellParent_Button-${obj.INDEX}`
            ).onclick = () => {
              openDownSellParent(obj.INDEX);
            };
          } else if (type === "autopilot") {
            document.querySelector(
              `#openUpSellParent_Button-${obj.INDEX}`
            ).onclick = async () => {
              $(".mask").removeClass("active");
              let quantity = parseFloat(
                document.querySelector(`#upSell_parent_quantity-${obj.INDEX}`)
                  .value
              );
              await fetch("/cart/add.js", {
                method: "POST",
                // mode: "no-cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  items: [
                    {
                      quantity: quantity,
                      id: obj.variantId,
                    },
                  ],
                }), // body data type must match "Content-Type" header
              })
                .then((response) => response.json())
                .then(async (data) => {
                  console.log(data);
                  await fetch("/cart.js")
                    .then((response) => response.json())
                    .then(async (data) => {
                      console.log(data);
                      await fetch(customCheckoutUrl, {
                        method: "POST",
                        // mode: "no-cors",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          username: superAssistantUser2_shopDomain,
                          funnel: funnel,
                          newCart: data,
                          oldCart: [],
                        }), // body data type must match "Content-Type" header
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          console.log(data);
                          window.location = data.url;
                        });
                    });
                });
            };
            document.querySelector(
              `#openDownSellParent_Button-${obj.INDEX}`
            ).onclick = () => {
              //do nothing
              $(".mask").removeClass("active");
            };
          }
        }

        //check if already discount code is present
        // function getCookie(cName) {
        //   const name = cName + "=";
        //   const cDecoded = decodeURIComponent(document.cookie); //to be careful
        //   const cArr = cDecoded.split("; ");
        //   let res = "";
        //   cArr.forEach((val) => {
        //     if (val.indexOf(name) === 0) res = val.substring(name.length);
        //   });
        //   return res;
        // }

        // let cookie = getCookie("discount_code");
        // console.log(cookie);
        // console.log(
        //   cookie.includes(superAssistantUser2_shopDomain.toUpperCase())
        // );
        // if (cookie.includes(superAssistantUser2_shopDomain.toUpperCase())) {
        //   document.querySelector("#discountCodeP").innerText = cookie;
        //   console.log(document.querySelector("#discountCodeP"));
        //   // $('.')
        //   document.querySelector(".couponDisplay").style.display = "flex";
        // }

        //upsellParent
        // let upsellParent_popUpMask = document.createElement("div");
        // upsellParent_popUpMask.role = "dialog";
        // upsellParent_popUpMask.className = "mask";

        // let upsellParent_modalBody = document.createElement("div");
        // upsellParent_modalBody.className = "modal";
        // upsellParent_modalBody.role = "alert";
        // upsellParent_modalBody.id = "superAssistantModal";
        //Downsell Parent

        // document.querySelector("#superAssistantModal").insertAdjacentHTML(
        //   "afterbegin",
        //   `

        // `
        // );

        let Page_funnels = [];
        let offers = [];
        let selectedProducts = [];
        let excludedVariantIds = [];
        let currentVariantIds = [];
        console.log(oldCart);
        let currentCartProductIds = [];
        oldCart.items.forEach((item) => {
          currentCartProductIds.push(item.product_id);
          currentVariantIds.push(item.id);
        });

        // let currentProductId = meta.product.id;

        // meta.product.variants.forEach((each) => {
        //   currentVariantIds.push(each.id);
        // });

        console.log(currentVariantIds);
        console.log(currentCartProductIds);

        superAssistantUser2.funnels.forEach((funnel) => {
          if (funnel.placement === "cart-page") {
            if (funnel.enable && !funnel.isDeleted) Page_funnels.push(funnel);
          }
        });

        console.log();
        //sorting according to priority
        console.log(Page_funnels);
        Page_funnels = Page_funnels.sort((a, b) => {
          return (
            a.funnelRules.add_priority.priority -
            b.funnelRules.add_priority.priority
          );
        });
        console.log(Page_funnels);

        // if (Page_funnels[0].trigger.selectedOption === "all") {
        //   Page_funnels[i].offers.forEach((each) => {
        //     offers.push(each);
        //   });
        // } else {

        // }
        // for (let i = 0; i < Page_funnels.length; i++) {
        //   Page_funnels[i].trigger.selectedProducts.forEach((each) => {
        //     selectedProducts.push(each);
        //   });
        // }
        // console.log(selectedProducts);
        let funnel = null;

        for (let i = 0; i < Page_funnels.length; i++) {
          if (Page_funnels[i].trigger.selectedOption === "all") {
            funnel = Page_funnels[i];
            Page_funnels[i].offers.forEach((each) => {
              offers.push(each);
              selectedProducts.push("all");

              // Page_funnels[i].trigger.selectedProducts.forEach((each) => {
              //   selectedProducts.push(each);
              // });
            });
            break;
          } else if (
            Page_funnels[i].trigger.selectedOption === "specific-product" ||
            Page_funnels[i].trigger.selectedOption === "specific-collection"
          ) {
            let tempArr = [];
            // let excludedTemp = [];
            Page_funnels[i].trigger.selectedProducts.forEach((each) => {
              tempArr.push(each.id);
            });
            console.log(tempArr);

            // console.log(excludedTemp);

            // function getCommonItems(array1, array2) {
            //   var common = []; // Initialize array to contain common items

            //   for (var i = 0; i < array1.length; i++) {
            //     for (var j = 0; j < array2.length; j++) {
            //       if (array1[i] == array2[j]) {
            //         // If item is present in both arrays
            //         common.push(array1[i]); // Push to common array
            //       }
            //     }
            //   }

            //   return common; // Return the common items
            // }

            // let common = getCommonItems(excludedTemp,);
            console.log(currentCartProductIds);
            let common = tempArr.filter((x) =>
              currentCartProductIds.includes(x)
            );
            console.log(common);
            console.log(common.length === 0);

            if (common.length !== 0) {
              funnel = Page_funnels[i];

              Page_funnels[i].offers.forEach((each) => {
                offers.push(each);
                selectedProducts = tempArr;
                Page_funnels[i].trigger.excludedVariantIds.forEach((each) => {
                  excludedVariantIds.push(each);
                });
              });
              break;
            }
          }
        }
        // console.log(currentProductId);
        // console.log(excludedVariantIds);
        // console.log(selectedProducts.indexOf(currentProductId) !== -1);
        console.log(offers);
        console.log(funnel);

        function createOption(value) {
          let p = `<option value=${value}>${value}</option>`;
          return p;
        }

        function createSelector(selector) {
          let optionsList = [];
          selector.values.forEach((each) => {
            optionsList.push(createOption(each));
          });
          let result = `
      <div>
              <label for="size" style="text-align: left;font-size:${
                modalStyle.textSize
              }px;
    color:${modalStyle.textColor};
    font-family:${modalStyle.textFamily};"> ${selector.name}: </label>
              <select
                style="
                  padding: 0.5em;
                  display: block;
                  border: 1px solid #cdd0d2;
                  border-radius: 4px;
                  width: 8em;
                "
                name="color"
                id="color"
              >
                ${optionsList.join(" ")}
              </select>
            </div>
          </div>
      `;
          return result;
        }

        // console.log(super);
        let offeredProductIds = [];
        if (funnel !== null) {
          if (funnel.offerType === "addManually") {
            for (let i = 0; i < offers.length; i++) {
              let discount,
                productName,
                originalPrice,
                discountedPrice,
                totalDiscount;
              let variantId = offers[i].selectedProduct.variants[0].id;
              offeredProductIds.push(offers[i].selectedProduct.id);
              productName = `${offers[i].selectedProduct.title}-${offers[i].selectedProduct.variants[0].title}`;
              originalPrice = offers[i].selectedProduct.variants[0].price;

              if (offers[i].discount.type === "Discount") {
                if (offers[i].discount.discountType === "INR") {
                  console.log(modalStyle.topMessage);
                  let topMessage = modalStyle.topMessage.split(" ");
                  let topMessageIndex = topMessage.indexOf("{{discount}}");
                  if (topMessageIndex !== -1) {
                    topMessage.splice(
                      topMessageIndex,
                      1,
                      `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}</span>`
                    );
                  }
                  console.log(topMessage.join(" "));
                  // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                  discount = topMessage.join(" ");

                  let discountPrice = String(
                    parseFloat(originalPrice) -
                      parseFloat(offers[i].discount.discountValue)
                  );
                  discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

                  let availableDiscount = offers[i].discount.discountValue;

                  // totalDiscount = `<p style="font-size: 0.9em">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                  totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                } else if (offers[i].discount.discountType === "%") {
                  let topMessage = modalStyle.topMessage.split(" ");
                  let topMessageIndex = topMessage.indexOf("{{discount}}");
                  if (topMessageIndex !== -1) {
                    topMessage.splice(
                      topMessageIndex,
                      1,
                      `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${offers[i].discount.discountValue}% </span>`
                    );
                  }
                  console.log(topMessage.join(" "));
                  discount = topMessage.join(" ");
                  // discount = `Deal unlocked! Get this product for ${offers[i].discount.discountValue}%  off`;

                  let discountPrice = String(
                    parseFloat(originalPrice) -
                      parseFloat(
                        (offers[i].discount.discountValue / 100) *
                          parseFloat(originalPrice)
                      )
                  );
                  discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

                  let availableDiscount = String(
                    parseFloat(
                      (offers[i].discount.discountValue / 100) *
                        parseFloat(originalPrice)
                    ).toFixed(2)
                  );

                  totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                }
              } else {
                discount = "Deal unlocked! You might need this too! ";
                discountedPrice = `
            <ins style="text-decoration: none;  color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
              }

              //free shipping
              let freeShipping = "";
              if (offers[i].include_free_shipping) {
                freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
              }

              //options will be used to next update, now only one variant is shown
              // let modalOptionsList = [];
              // offers[i].selectedProduct.options.forEach((each) => {
              //   modalOptionsList.push(createSelector(each));
              // });
              // console.log(modalOptionsList);

              let imageUrl = findImage(
                offers[i].selectedProduct.variants[0].image_id,
                offers[i].selectedProduct.images
              );

              console.log(imageUrl);

              let obj = {
                variantId: variantId,
                INDEX: i,
                discountPercentage: discount,
                offerTime: "5:00",
                productName: productName,
                // currency: superAssistantUser2_shopifyCurrency,
                // originalPrice: "10.00",
                freeShipping: freeShipping,
                // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
                optionsList: " ",
                discountedPrice: discountedPrice,
                totalDiscount: totalDiscount,
                productImage: imageUrl,
              };

              // dynamicModalUpdate(obj);
              createSlide(obj, "manual");

              // console.log(modalBody.innerHTML);
            }
          } else if (funnel.offerType === "autoPilot") {
            let currentProductId = currentCartProductIds[0];
            console.log(currentProductId);
            if (funnel.autoPiltoType === "shopifyRecommendation") {
              async function getRecommendedProducts() {
                let fetchUrl = `/recommendations/products.json?product_id=${currentProductId}&limit=3`;
                if (funnel.offers[0].limit_no_of_products.isSelected) {
                  fetchUrl = `/recommendations/products.json?product_id=${currentProductId}&limit=${funnel.offers[0].limit_no_of_products.limit}`;
                }
                await fetch(fetchUrl)
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    let recommendedProductsList = data.products;
                    for (let i = 0; i < recommendedProductsList.length; i++) {
                      if (recommendedProductsList[i].available) {
                        offeredProductIds.push(recommendedProductsList[i].id);
                        let discount,
                          productName,
                          originalPrice,
                          discountedPrice,
                          totalDiscount;

                        let variantId =
                          recommendedProductsList[i].variants[0].id;

                        productName = `${recommendedProductsList[i].title}-${recommendedProductsList[i].variants[0].title}`;
                        originalPrice =
                          recommendedProductsList[i].variants[0].price / 100;

                        if (offers[0].discount.type === "Discount") {
                          if (offers[0].discount.discountType === "INR") {
                            let topMessage = modalStyle.topMessage.split(" ");
                            let topMessageIndex =
                              topMessage.indexOf("{{discount}}");
                            if (topMessageIndex !== -1) {
                              topMessage.splice(
                                topMessageIndex,
                                1,
                                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}</span>`
                              );
                            }
                            console.log(topMessage.join(" "));
                            // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                            discount = topMessage.join(" ");
                            // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}  off`;

                            let discountPrice = String(
                              parseFloat(originalPrice) -
                                parseFloat(offers[0].discount.discountValue)
                            );
                            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                            let availableDiscount =
                              offers[0].discount.discountValue;

                            totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                          } else if (offers[0].discount.discountType === "%") {
                            // discount = `Deal unlocked! Get this product for ${offers[0].discount.discountValue}%  off`;
                            let topMessage = modalStyle.topMessage.split(" ");
                            let topMessageIndex =
                              topMessage.indexOf("{{discount}}");
                            if (topMessageIndex !== -1) {
                              topMessage.splice(
                                topMessageIndex,
                                1,
                                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${offers[0].discount.discountValue}% </span>`
                              );
                            }
                            console.log(topMessage.join(" "));
                            discount = topMessage.join(" ");
                            let discountPrice = String(
                              parseFloat(originalPrice) -
                                parseFloat(
                                  (offers[0].discount.discountValue / 100) *
                                    parseFloat(originalPrice)
                                )
                            );
                            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                            let availableDiscount = String(
                              parseFloat(
                                (offers[0].discount.discountValue / 100) *
                                  parseFloat(originalPrice)
                              ).toFixed(2)
                            );

                            totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                          }
                        } else {
                          discount = "Deal unlocked! You might need this too! ";
                          discountedPrice = `
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${originalPrice}
              </ins>`;
                          totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
                        }

                        //free shipping
                        let freeShipping = "";
                        if (offers[0].include_free_shipping) {
                          freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
                        }

                        //options will be used to next update, now only one variant is shown
                        // let modalOptionsList = [];
                        // recommendedProductsList[i].options.forEach((each) => {
                        //   modalOptionsList.push(createSelector(each));
                        // });
                        // console.log(modalOptionsList);

                        let imageUrl = "";
                        if (
                          recommendedProductsList[i].variants[0]
                            .featured_image === null
                        ) {
                          imageUrl = `https://${recommendedProductsList[
                            i
                          ].featured_image.slice(2)}`;
                        } else {
                          imageUrl =
                            recommendedProductsList[i].variants[0]
                              .featured_image.src;
                        }

                        let obj = {
                          variantId: variantId,
                          INDEX: i,
                          discountPercentage: discount,
                          offerTime: "5:00",
                          productName: productName,
                          // currency: superAssistantUser2_shopifyCurrency,
                          // originalPrice: "10.00",
                          freeShipping: freeShipping,
                          // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
                          optionsList: " ",
                          discountedPrice: discountedPrice,
                          totalDiscount: totalDiscount,
                          productImage: imageUrl,
                        };

                        // dynamicModalUpdate(obj);
                        createSlide(obj, "autopilot");

                        // console.log(modalBody.innerHTML);
                      }
                    }
                  });
              }
              getRecommendedProducts();
            } else if (funnel.autoPiltoType === "sameProductForLess") {
              let recommendedProductsList = oldCart.items; //cart items
              for (let i = 0; i < recommendedProductsList.length; i++) {
                if (true) {
                  // (recommendedProductsList[i].available) since we dont have available in cart items too
                  offeredProductIds.push(recommendedProductsList[i].id);
                  let discount,
                    productName,
                    originalPrice,
                    discountedPrice,
                    totalDiscount;

                  let variantId = recommendedProductsList[i].variant_id;

                  productName = `${recommendedProductsList[i].title}`;
                  originalPrice = recommendedProductsList[i].price / 100;

                  if (offers[0].discount.type === "Discount") {
                    if (offers[0].discount.discountType === "INR") {
                      let topMessage = modalStyle.topMessage.split(" ");
                      let topMessageIndex = topMessage.indexOf("{{discount}}");
                      if (topMessageIndex !== -1) {
                        topMessage.splice(
                          topMessageIndex,
                          1,
                          `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}</span>`
                        );
                      }
                      console.log(topMessage.join(" "));
                      // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                      discount = topMessage.join(" ");
                      // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}  off`;

                      let discountPrice = String(
                        parseFloat(originalPrice) -
                          parseFloat(offers[0].discount.discountValue)
                      );
                      discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                      let availableDiscount = offers[0].discount.discountValue;

                      totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                    } else if (offers[0].discount.discountType === "%") {
                      // discount = `Deal unlocked! Get this product for ${offers[0].discount.discountValue}%  off`;
                      let topMessage = modalStyle.topMessage.split(" ");
                      let topMessageIndex = topMessage.indexOf("{{discount}}");
                      if (topMessageIndex !== -1) {
                        topMessage.splice(
                          topMessageIndex,
                          1,
                          `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${offers[0].discount.discountValue}% </span>`
                        );
                      }
                      console.log(topMessage.join(" "));
                      discount = topMessage.join(" ");
                      let discountPrice = String(
                        parseFloat(originalPrice) -
                          parseFloat(
                            (offers[0].discount.discountValue / 100) *
                              parseFloat(originalPrice)
                          )
                      );
                      discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                      let availableDiscount = String(
                        parseFloat(
                          (offers[0].discount.discountValue / 100) *
                            parseFloat(originalPrice)
                        ).toFixed(2)
                      );

                      totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                    }
                  } else {
                    discount = "Deal unlocked! You might need this too! ";
                    discountedPrice = `
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${originalPrice}
              </ins>`;
                    totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
                  }

                  //free shipping
                  let freeShipping = "";
                  if (offers[0].include_free_shipping) {
                    freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
                  }

                  //options will be used to next update, now only one variant is shown
                  // let modalOptionsList = [];
                  // recommendedProductsList[i].options.forEach((each) => {
                  //   modalOptionsList.push(createSelector(each));
                  // });
                  // console.log(modalOptionsList);

                  // let imageUrl = findImage(
                  //   currentOffer.selectedProduct.variants[0].image_id,
                  //   currentOffer.selectedProduct.images
                  // );

                  // console.log(imageUrl);

                  // let imageUrl = "";
                  // if (
                  //   recommendedProductsList[i].variants[0].featured_image ===
                  //   null
                  // ) {
                  //   imageUrl = `https://${recommendedProductsList[
                  //     i
                  //   ].featured_image.slice(2)}`;
                  // } else {
                  //   imageUrl =
                  //     recommendedProductsList[i].variants[0].featured_image.src;
                  // }
                  let imageUrl = recommendedProductsList[i].image;

                  let obj = {
                    variantId: variantId,
                    INDEX: i,
                    discountPercentage: discount,
                    offerTime: "5:00",
                    productName: productName,
                    // currency: superAssistantUser2_shopifyCurrency,
                    // originalPrice: "10.00",
                    freeShipping: freeShipping,
                    // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
                    optionsList: " ",
                    discountedPrice: discountedPrice,
                    totalDiscount: totalDiscount,
                    productImage: imageUrl,
                    // productImage:
                    //   "https://" +
                    //   recommendedProductsList[i].featured_image.slice(2),
                  };

                  // dynamicModalUpdate(obj);
                  createSlide(obj, "autopilot");
                  console.log("2");

                  // console.log(modalBody.innerHTML);
                }
              }
            }
          }
        }
        console.log(offeredProductIds);

        console.log(offers);
        if (offers.length != 0) {
          //   let addToCart_button = document.querySelector(
          //     'form[action^="/cart"] [type="submit"]'
          //   );
          // console.log(addToCart_button);
          //   addToCart_button.classList.add("show");

          //   window.addEventListener("load", async (e) => {
          //send request to backend to create a discount code with this name
          // let temp = await fetch(`${hostedUrl}/api/userData`, {
          //   method: "POST",
          //   // mode: "no-cors",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     discountCode: discountCode,
          //     customer:"",
          //   }), // body data type must match "Content-Type" header
          // });
          // temp = await temp.json();
          // console.log(temp.data[0]);
          //load popup
          // e.preventDefault();

          // await fetch("/cart.js")
          //   .then((response) => response.json())
          //   .then((data) => {
          //     console.log(data);

          // let oldCart = data;
          setTimeout(async () => {
            await fetch("/cart.js")
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                let newCart = data.items;
                // if newCart.length > oldCart.length then product added and
                // check variant id from excluded variant ids list
                let newCartVariants = [];
                newCart.forEach((each) => {
                  newCartVariants.push(each.variant_id);
                });
                // console.log(newCartVariants);
                // console.log(excludedVariantIds);
                let common = newCartVariants.filter((x) =>
                  excludedVariantIds.includes(x)
                );
                console.log(newCartVariants);
                console.log(excludedVariantIds);
                console.log(common.length === 0);
                console.log(common);
                // function getCookie(cName) {
                //   const name = cName + "=";
                //   const cDecoded = decodeURIComponent(document.cookie); //to be careful
                //   const cArr = cDecoded.split("; ");
                //   let res = "";
                //   cArr.forEach((val) => {
                //     if (val.indexOf(name) === 0)
                //       res = val.substring(name.length);
                //   });
                //   return res;
                // }

                // let cookie = getCookie("discount_code");
                // console.log(cookie);
                // console.log(
                //   cookie.includes(superAssistantUser2_shopDomain.toUpperCase())
                // );
                if (
                  common.length === 0
                  // !cookie.includes(superAssistantUser2_shopDomain.toUpperCase())
                ) {
                  let cart = data;
                  //Funnel Rules
                  let startDate = null,
                    endDate = null,
                    minCartValue = null,
                    maxCartValue = null;

                  //Start Date End Date
                  let date_constraint = true;
                  if (funnel.funnelRules.set_start_date.isSelected) {
                    startDate = funnel.funnelRules.set_start_date.startDate;
                  }
                  if (funnel.funnelRules.set_end_date.isSelected) {
                    endDate = funnel.funnelRules.set_end_date.endDate;
                  }
                  if (endDate !== null && startDate !== null) {
                    function dateCheck(from, to, check) {
                      var fDate, lDate, cDate;
                      fDate = Date.parse(from);
                      lDate = Date.parse(to);
                      cDate = Date.parse(check);

                      if (cDate <= lDate && cDate >= fDate) {
                        return true;
                      }
                      return false;
                    }
                    const changeFormat = (date) => {
                      let orderDate = new Date(date);

                      let dates = orderDate.getDate();
                      let month = orderDate.getMonth() + 1;
                      let year = orderDate.getFullYear() - 2000;
                      if (dates < 10) {
                        dates = "0" + dates;
                      }
                      if (month < 10) {
                        month = "0" + month;
                      }

                      return `${month}/${dates}/${year}`;
                    };
                    let from = changeFormat(startDate);
                    let to = changeFormat(endDate);
                    let today = changeFormat(new Date());
                    date_constraint = dateCheck(from, to, today);
                  } else if (startDate !== null) {
                    let firstDate = new Date(startDate);
                    let today = new Date();
                    console.log(startDate);
                    var dateInPast = function (firstDate, secondDate) {
                      if (
                        firstDate.setHours(0, 0, 0, 0) <=
                        secondDate.setHours(0, 0, 0, 0)
                      ) {
                        return true;
                      }

                      return false;
                    };
                    date_constraint = dateInPast(firstDate, today);
                  }

                  //show_Only_for_Specific_CartValue
                  let cartValue_constraint = true;
                  console.log(
                    funnel.funnelRules.show_Only_for_Specific_CartValue
                      .isSelected
                  );
                  if (
                    funnel.funnelRules.show_Only_for_Specific_CartValue
                      .isSelected
                  ) {
                    minCartValue =
                      funnel.funnelRules.show_Only_for_Specific_CartValue
                        .minCartValue;
                    maxCartValue =
                      funnel.funnelRules.show_Only_for_Specific_CartValue
                        .maxCartValue;
                    cartValue_constraint =
                      minCartValue <= oldCart.total_price / 100 &&
                      oldCart.total_price / 100 < maxCartValue;

                    console.log(
                      minCartValue,
                      maxCartValue,
                      cartValue_constraint
                    );
                  }

                  //skip if already present
                  let not_skip_constraint = true;
                  console.log(offeredProductIds);
                  console.log(
                    funnel.funnelRules.skip_If_already_present_In_cart
                  );
                  if (funnel.funnelRules.skip_If_already_present_In_cart) {
                    for (let i = 0; i < offeredProductIds.length; i++) {
                      let offeredProductId = offeredProductIds[i];
                      console.log(offeredProductId);

                      for (let j = 0; j < cart.items.length; j++) {
                        if (cart.items[j].product_id === offeredProductId) {
                          console.log("already present in cart");
                          not_skip_constraint = false;
                          break;
                        }
                      }
                    }
                  }

                  //specific countries
                  let specificCountry_constraint = true;
                  let currentCountry = Shopify.country;
                  if (funnel.funnelRules.specific_countries.isSelected) {
                    let selectedCountries_arr =
                      funnel.funnelRules.specific_countries.selectedCountries;
                    specificCountry_constraint =
                      selectedCountries_arr.includes(currentCountry);
                  }

                  //once per user(getting previously stored value)
                  let not_oncePerBuyer_constraint = true;
                  if (funnel.funnelRules.once_per_buyer) {
                    let storedValue = localStorage.getItem("oncePerBuyer");
                    if (storedValue === null) {
                      not_oncePerBuyer_constraint = true;
                    } else {
                      not_oncePerBuyer_constraint = false;
                      localStorage.removeItem("oncePerBuyer");
                    }
                  }

                  // let temp = await fetch(`${hostedUrl}/api/userData`, {
                  //   method: "POST",
                  //   // mode: "no-cors",
                  //   headers: {
                  //     "Content-Type": "application/json",
                  //   },
                  //   body: JSON.stringify({
                  //     discountCode: discountCode,
                  //     shopDomain: superAssistantUser2_shopDomain,
                  //     funnelId: funnelId,
                  //   }), // body data type must match "Content-Type" header
                  // });
                  // temp = await temp.json();
                  console.log(
                    date_constraint,
                    cartValue_constraint,
                    not_skip_constraint,
                    specificCountry_constraint,
                    not_oncePerBuyer_constraint
                  );
                  console.log(
                    date_constraint &&
                      cartValue_constraint &&
                      not_skip_constraint &&
                      specificCountry_constraint &&
                      not_oncePerBuyer_constraint
                  );
                  if (
                    date_constraint &&
                    cartValue_constraint &&
                    not_skip_constraint &&
                    specificCountry_constraint &&
                    not_oncePerBuyer_constraint
                  ) {
                    $(".mask").addClass("active");
                    var fiveMinutes = 60 * 5,
                      // display = document.querySelector("#countdownTimer");
                      display = document.querySelectorAll(".countdownTimer");

                    display.forEach((timer) => {
                      startTimer(fiveMinutes, timer);
                    });
                    // let couponDiscountDiv = document.querySelector(
                    //   "#countdownTimerFooter"
                    // );
                    // startTimer(fiveMinutes, display);
                    async function addViews() {
                      let addViews = await fetch(
                        `${superAssistantUser2_hostedUrl}/api/viewIncrement/addViews`,
                        {
                          method: "POST",
                          // mode: "no-cors",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            funnelId: funnel._id,
                          }), // body data type must match "Content-Type" header
                        }
                      );
                      addViews = await addViews.json();
                      console.log(addViews);
                    }

                    addViews();
                    // startTimer(fiveMinutes, couponDiscountDiv);
                    // let now = new Date();
                    // let fiveMinutesLater = new Date(now.getTime() + 5 * 60000);
                    // console.log(fiveMinutesLater.toUTCString());
                    // document.cookie = `discount_code=${discountCode};expires=${fiveMinutesLater.toUTCString()};path=/`;
                  }

                  //Once per buyer(setting value)
                  if (funnel.funnelRules.once_per_buyer) {
                    localStorage.setItem("oncePerBuyer", true);
                  }
                }
              });
          }, 2000);
          //   });

          // setTimeout(function () {
          //   console.log("clicked");

          //   $(".mask").addClass("active");
          //   var fiveMinutes = 60 * 5,
          //     display = document.querySelector("#countdownTimer");
          //   startTimer(fiveMinutes, display);
          // }, 1000);
          //   });

          // Function for close the Modal

          function closeModal() {
            $(".mask").removeClass("active");
          }

          // Call the closeModal function on the clicks/keyboard

          // $(".close, .mask").on("click", function () {
          //   closeModal();
          //   document.querySelector("#discountCodeP").innerText = discountCode;
          //   console.log(document.querySelector("#discountCodeP"));
          //   document.querySelector(".couponDisplay").style.display = "flex";
          // });
          let divs = document.querySelectorAll(".close,.mask");
          divs.forEach((ele) => {
            ele.onclick = () => {
              closeModal();
              // document.querySelector("#discountCodeP").innerText = discountCode;
              // console.log(document.querySelector("#discountCodeP"));
              // document.querySelector(".couponDisplay").style.display = "flex";
            };
          });

          document.addEventListener("keyup", (e) => {
            if (e.keyCode == 27) {
              closeModal();
              // document.querySelector("#discountCodeP").innerText = discountCode;
              // console.log(document.querySelector("#discountCodeP"));
              // document.querySelector(".couponDisplay").style.display = "flex";
            }
          });

          // $(document).keyup(function (e) {
          //   if (e.keyCode == 27) {
          //     closeModal();
          //     document.querySelector("#discountCodeP").innerText = discountCode;
          //     console.log(document.querySelector("#discountCodeP"));
          //     document.querySelector(".couponDisplay").style.display = "flex";
          //   }
          // });

          setTimeout(() => {
            //slider
            var slideIndex = 1;
            showSlides(slideIndex);

            // Next/previous controls
            function plusSlides(n) {
              showSlides((slideIndex += n));
              console.log("here", n);
            }

            // Thumbnail image controls
            function currentSlide(n) {
              showSlides((slideIndex = n));
              console.log("here", n);
            }

            function showSlides(n) {
              console.log("top");
              var i;
              var slides = document.getElementsByClassName("slide");
              // var dots = document.getElementsByClassName("dot");
              if (n > slides.length) {
                slideIndex = 1;
              }
              if (n < 1) {
                slideIndex = slides.length;
              }
              for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
              }
              // for (i = 0; i < dots.length; i++) {
              //     dots[i].className = dots[i].className.replace(" active", "");
              // }
              slides[slideIndex - 1].style.display = "block";
              // dots[slideIndex-1].className += " active";
              console.log("bottom");
            }

            document.querySelector(".prev").addEventListener("click", () => {
              plusSlides(-1);
            });
            document.querySelector(".next").addEventListener("click", () => {
              plusSlides(1);
            });
          }, 3000);

          // addToCart_button.id = "one";
        }
      });
  }
  function thankyouPagePopUp() {
    // let superAssistantUser2_shopifyCurrency = Shopify.currency.active;
    // let superAssistantUser2_shopDomain = Shopify.shop.split(".")[0];

    let oldCart = Shopify.checkout;

    //user
    console.log(superAssistantUser2);
    let modalStyle = superAssistantUser2.discountStyle[0];

    //css

    //UniqueCode Generator
    function generateDiscountCode(length) {
      var result = [];
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return (
        `${superAssistantUser2_shopDomain.toUpperCase()}-` + result.join("")
      );
    }

    console.log(generateDiscountCode(6));

    let discountCode = generateDiscountCode(6);

    //   let popUpMask = document.createElement('div');
    //   popUpMask.role = "dialog";
    //   popUpMask.className = "mask";

    //   let modalBody = document.createElement('div');
    //   modalBody.className = "modal";
    //   modalBody.role = "alert";

    //   let closeButton = document.createElement("button");
    //   closeButton.className = "close";
    // closeButton.role = "button";

    // let mainModalBody = document.createElement("div");
    // mainModalBody.style.padding = "1em";
    // mainModalBody.style.padding = "1em";

    //   let saleText = document.createElement("p");
    //   saleText.innerText = "Deal unlocked! Get this product for 20% off";

    //   let productName = document.createElement("h2");
    //   productName.innerText = "Hoodie";

    // console.log(meta.product);
    // await fetch("/cart.js")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     let oldCart = data;
    //   });

    function startTimer(duration, display) {
      var timer = duration,
        minutes,
        seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          timer = 0;
          // document.querySelector(".couponDisplay").style.display = "none";
          // $(".couponDisplay").toggle('slow');
        }
      }, 1000);
    }

    // dynamicModalUpdate(obj);

    // console.log(temp);

    let popUpMask = document.createElement("div");
    popUpMask.role = "dialog";
    popUpMask.className = "mask";

    let modalBody = document.createElement("div");
    modalBody.className = "modal";
    modalBody.role = "alert";
    modalBody.id = "superAssistantModal";
    modalBody.style.borderRadius = "10px";
    modalBody.style.background = modalStyle.backGroundColor;
    modalBody.style.height = "37em";
    // modalBody.innerHTML = temp;

    let modalClose = document.createElement("button");
    modalClose.className = "close";
    modalClose.role = "button";
    modalClose.innerText = "X";

    let sliderDiv = document.createElement("div");
    sliderDiv.className = "sliderBox";

    let prevButton = document.createElement("a");
    prevButton.className = "prev";
    prevButton.innerHTML = "&#10094;";
    // prevButton.onclick = plusSlides(-1);

    let nextButton = document.createElement("a");
    nextButton.className = "next";
    nextButton.innerHTML = "&#10095;";
    // nextButton.onclick = plusSlides(1);

    sliderDiv.appendChild(prevButton);
    sliderDiv.appendChild(nextButton);

    modalBody.appendChild(modalClose);
    modalBody.appendChild(sliderDiv);

    //couponDisplayDiv
    // let couponDisplayDiv = document.createElement("div");
    // couponDisplayDiv.className = "couponDisplay";
    // couponDisplayDiv.classList.add("fade");
    // couponDisplayDiv.style.position = "fixed";
    // couponDisplayDiv.style.zIndex = "99999999999";

    // let div1 = document.createElement("div");
    // div1.style.display = "flex";
    // div1.style.gap = "1em";

    // let discountCodeP = document.createElement("p");
    // discountCodeP.className = "couponText";
    // discountCodeP.innerHTML =
    //   'Discount Code : <span id="discountCodeP" class="couponSpan"></span>';

    // let discountTimeP = document.createElement("p");
    // discountTimeP.className = "couponText";
    // discountTimeP.innerHTML =
    //   'Remaining Time: <span id="countdownTimerFooter" class="couponTime">05:00</span>';

    // div1.appendChild(discountCodeP);
    // div1.appendChild(discountTimeP);

    // let div2 = document.createElement("div");
    // let couponText = document.createElement("p");
    // couponText.className = "couponText";
    // couponText.innerText =
    //   "This is your discount code. Kindly click on checkout to add the following discount to your order!";

    // div2.appendChild(couponText);

    // couponDisplayDiv.appendChild(div1);
    // couponDisplayDiv.appendChild(div2);

    document.querySelector("body").appendChild(popUpMask);
    document.querySelector("body").appendChild(modalBody);
    // document.querySelector("body").appendChild(couponDisplayDiv);

    let modal = `
          <button class="close" role="button">X</button>
      <div style="padding: 1em; text-align: center">
        <p style="font-size: 0.8em">
          discountPercentage
        </p>
        <h4
          style="
            font-weight: 600;
            font-size: 1.4em;
            background: #2d2d2d;
            padding: 0.5em;
            color: white;
            margin:0;
          "
        >
          Hurry! Offer will expire in <span id="countdownTimer">offerTime</span>
        </h4>
        <div style="height: 25em; overflow-y: scroll">
          <h4 style="font-weight: 600; font-size: 1.2em; padding: 0.5em;margin:0;">
            productName
          </h4>
          discountedPrice
          totalDiscount
          <img
            style="width: 10em; border-radius: 5px"
            src=productImage
            alt=""
          />
          <div style="display: flex; justify-content: center">
            optionsList
          <div style="padding-top: 1em">
            <label for="quantity">Quantity:</label>
            <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
              <input
                type="number"
                style="
                  padding: 0.5em;
                  border: 1px solid #cdd0d2;
                  border-radius: 4px;
                  width: 15em;
                  text-align: center;
                "
                value="1"
                name="quantity"
                id="quantity"
              />
            </div>
          </div>
          <div style="padding-top: 1em; color: grey">
            
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            padding-top: 1em;
             
          "
        >
          <button
            style="
              padding: 1em 5em;
              font-weight: 600;
              font-size: 1em;
              color: white;
              background: #18a95e;
              cursor: pointer;
              border: 1px solid #cdd0d2;
            "
          >
            Grab this Deal
          </button>
          <a
            href="https://www.google.com/"
            style="color: #18a95e; font-weight: 600"
          >
            Skip and Continue to Checkout
          </a>
        </div>
        <div style="display: flex; justify-content: center; padding-top: 1em">
          <img
            src="https://cdn.shopify.com/assets/images/logos/shopify-bag.png"
            alt=""
            style="width: 2em"
          />
          <p style="font-size: 0.9em">Powered By SuperAssistant</p>
        </div>
      </div>
          </div>
      </div> 
      `;

    let Obj = {
      discountPercentage: "Deal unlocked! Get this product for 20% off",
      offerTime: "5:00",
      productName: "Test 1",
      currency: superAssistantUser2_shopifyCurrency,
      originalPrice: "10.00",
      discountedPrice: "7.5",
      totalDiscount: "2.5",
      productImage: "https://pbs.twimg.com/media/EdPratRVcAAo6Pr.jpg",
    };

    let temp = "";

    function dynamicModalUpdate(obj) {
      modalBody.innerHTML = modal.replace(
        /discountPercentage|offerTime|productName|discountedPrice|totalDiscount|productImage|optionsList/gi,
        function (matched) {
          return obj[matched];
        }
      );
    }

    async function openUpSellChild(index, path, variantId, quantity) {
      console.log(offers[index]);
      await fetch("/cart/add.js", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              quantity: quantity,
              id: variantId,
            },
          ],
        }), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          let offer = offers[index];
          let currentOffer = "";
          if (path === "A-A") {
            currentOffer =
              offer.downsellCondition.offerAccepted.offerAccepted_child;
          } else if (path === "D-A") {
            currentOffer =
              offer.downsellCondition.offerDeclined.offerAccepted_child;
          }

          if (currentOffer.isExists && !currentOffer.skip_offer) {
            let discount,
              productName,
              originalPrice,
              discountedPrice,
              totalDiscount;
            offeredProductIds.push(currentOffer.selectedProduct.id);
            productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
            originalPrice = currentOffer.selectedProduct.variants[0].price;

            let variantId2 = currentOffer.selectedProduct.variants[0].id;

            if (currentOffer.discount.type === "Discount") {
              if (currentOffer.discount.discountType === "INR") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
                  );
                }
                console.log(topMessage.join(" "));
                // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(currentOffer.discount.discountValue)
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

                let availableDiscount = currentOffer.discount.discountValue;

                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              } else if (currentOffer.discount.discountType === "%") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
                  );
                }
                console.log(topMessage.join(" "));
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(
                      (currentOffer.discount.discountValue / 100) *
                        parseFloat(originalPrice)
                    )
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

                let availableDiscount = String(
                  parseFloat(
                    (currentOffer.discount.discountValue / 100) *
                      parseFloat(originalPrice)
                  ).toFixed(2)
                );

                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              }
            } else {
              discount = "Deal unlocked! You might need this too! ";
              discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
              totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
            }

            //free shipping
            let freeShipping = "";
            if (currentOffer.include_free_shipping) {
              freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
            }

            //options will be used to next update, now only one variant is shown
            // let modalOptionsList = [];
            // currentOffer.selectedProduct.options.forEach((each) => {
            //   modalOptionsList.push(createSelector(each));
            // });
            // console.log(modalOptionsList);

            let imageUrl = findImage(
              currentOffer.selectedProduct.variants[0].image_id,
              currentOffer.selectedProduct.images
            );

            console.log(imageUrl);

            let obj = {
              // INDEX: index,
              discountPercentage: discount,
              // offerTime: "5:00",
              productName: productName,
              // currency: superAssistantUser2_shopifyCurrency,
              // originalPrice: "10.00",
              freeShipping: freeShipping,
              // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
              optionsList: " ",
              discountedPrice: discountedPrice,
              totalDiscount: totalDiscount,
              productImage: imageUrl,
            };
            let upSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="upSell2Modal"
>
  <button id="upSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSellChild1_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;  justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild1_button"
        class="upSellChild2Close"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild1_button"
        class="upSellChild2Close"
      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
            upSellModalData = upSellModalData.replace(
              /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,
              function (matched) {
                return obj[matched];
              }
            );
            let upSell2Modal = document.createElement("div");
            upSell2Modal.id = "upSell2Modal";
            upSell2Modal.className = "modal";
            upSell2Modal.style.visibility = "visible";
            upSell2Modal.style.opacity = "1";
            // upSell2Modal.style.border = "3px solid grey";
            upSell2Modal.style.height = "40em";
            upSell2Modal.style.top = "19%";
            upSell2Modal.style.borderRadius = "11px";
            upSell2Modal.innerHTML = upSellModalData;
            document.querySelector("body").appendChild(upSell2Modal);
            document
              .querySelector("#upSellModal2Close")
              .addEventListener(
                "click",
                () => (upSell2Modal.style.display = "none")
              );

            //if clicks on accepted

            document
              .querySelector("#upSellChild1_button")
              .addEventListener("click", async () => {
                let quantity2 = parseFloat(
                  document.querySelector("#upSellChild1_quantity").value
                );
                await fetch("/cart/add.js", {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    items: [
                      {
                        quantity: quantity2,
                        id: variantId2,
                      },
                    ],
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then(async (data) => {
                    await fetch("/cart.js")
                      .then((response) => response.json())
                      .then(async (data) => {
                        let obj = {
                          username: superAssistantUser2_shopDomain,
                          funnel: funnel,
                          newCart: data,
                          oldCart: [],
                        };
                        console.log(obj);
                        console.log(data);
                        await fetch(customCheckoutUrl, {
                          method: "POST",
                          // mode: "no-cors",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            username: superAssistantUser2_shopDomain,
                            funnel: funnel,
                            newCart: data,
                            oldCart: [],
                          }), // body data type must match "Content-Type" header
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            console.log(data);
                            window.location = data.url;
                          });
                      });
                  });
              });

            //if clicks on declined
            document
              .querySelector("#downSellChild1_button")
              .addEventListener("click", async () => {
                await fetch("/cart.js")
                  .then((response) => response.json())
                  .then(async (data) => {
                    let obj = {
                      username: superAssistantUser2_shopDomain,
                      funnel: funnel,
                      newCart: data,
                      oldCart: [],
                    };
                    console.log(obj);
                    await fetch(customCheckoutUrl, {
                      method: "POST",
                      // mode: "no-cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: superAssistantUser2_shopDomain,
                        funnel: funnel,
                        newCart: data,
                        oldCart: [],
                      }), // body data type must match "Content-Type" header
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.location = data.url;
                      });
                  });
              });

            let closeButtons = document.querySelectorAll(".upSellChild2Close");

            closeButtons.forEach((each) => {
              each.addEventListener("click", () => {
                upSell2Modal.style.display = "none";
              });
            });
            document.addEventListener("keyup", (e) => {
              if (e.keyCode == 27) {
                upSell2Modal.style.display = "none";
              }
            });
          } else if (!currentOffer.isExists) {
            await fetch("/cart.js")
              .then((response) => response.json())
              .then(async (data) => {
                console.log(data);
                let obj = {
                  username: superAssistantUser2_shopDomain,
                  funnel: funnel,
                  newCart: data,
                  oldCart: [],
                };
                console.log(obj);
                await fetch(customCheckoutUrl, {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: superAssistantUser2_shopDomain,
                    funnel: funnel,
                    newCart: data,
                    oldCart: [],
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    window.location = data.url;
                  });
              });
          }
        });
    }

    async function openDownSellChild(index, path) {
      console.log(offers[index]);
      let offer = offers[index];
      let currentOffer = "";
      if (path === "A-D") {
        currentOffer =
          offer.downsellCondition.offerAccepted.offerDeclined_child;
      } else if (path === "D-D") {
        currentOffer =
          offer.downsellCondition.offerDeclined.offerDeclined_child;
      }
      // offer.downsellCondition.offerDeclined.downsellCondition.offerDeclined;
      if (currentOffer.isExists && !currentOffer.skip_offer) {
        let discount,
          productName,
          originalPrice,
          discountedPrice,
          totalDiscount;
        offeredProductIds.push(currentOffer.selectedProduct.id);
        productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
        originalPrice = currentOffer.selectedProduct.variants[0].price;

        let variantId2 = currentOffer.selectedProduct.variants[0].id;

        if (currentOffer.discount.type === "Discount") {
          if (currentOffer.discount.discountType === "INR") {
            let topMessage = modalStyle.topMessage.split(" ");
            let topMessageIndex = topMessage.indexOf("{{discount}}");
            if (topMessageIndex !== -1) {
              topMessage.splice(
                topMessageIndex,
                1,
                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
              );
            }
            console.log(topMessage.join(" "));
            // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
            discount = topMessage.join(" ");

            let discountPrice = String(
              parseFloat(originalPrice) -
                parseFloat(currentOffer.discount.discountValue)
            );
            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

            let availableDiscount = currentOffer.discount.discountValue;

            totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
          } else if (currentOffer.discount.discountType === "%") {
            let topMessage = modalStyle.topMessage.split(" ");
            let topMessageIndex = topMessage.indexOf("{{discount}}");
            if (topMessageIndex !== -1) {
              topMessage.splice(
                topMessageIndex,
                1,
                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
              );
            }
            console.log(topMessage.join(" "));
            discount = topMessage.join(" ");

            let discountPrice = String(
              parseFloat(originalPrice) -
                parseFloat(
                  (currentOffer.discount.discountValue / 100) *
                    parseFloat(originalPrice)
                )
            );
            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

            let availableDiscount = String(
              parseFloat(
                (currentOffer.discount.discountValue / 100) *
                  parseFloat(originalPrice)
              ).toFixed(2)
            );

            totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
          }
        } else {
          discount = "Deal unlocked! You might need this too! ";
          discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
          totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
        }

        //free shipping
        let freeShipping = "";
        if (currentOffer.include_free_shipping) {
          freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
        }

        //options will be used to next update, now only one variant is shown
        // let modalOptionsList = [];
        // currentOffer.selectedProduct.options.forEach((each) => {
        //   modalOptionsList.push(createSelector(each));
        // });
        // console.log(modalOptionsList);

        let imageUrl = findImage(
          currentOffer.selectedProduct.variants[0].image_id,
          currentOffer.selectedProduct.images
        );

        console.log(imageUrl);

        let obj = {
          // INDEX: index,
          discountPercentage: discount,
          // offerTime: "5:00",
          productName: productName,
          // currency: superAssistantUser2_shopifyCurrency,
          // originalPrice: "10.00",
          freeShipping: freeShipping,
          // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
          optionsList: " ",
          discountedPrice: discountedPrice,
          totalDiscount: totalDiscount,
          productImage: imageUrl,
        };
        let downSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="downSell2Modal"
>
  <button id="downSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSellChild2_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 0.5em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;  justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild2_button"
        class="downSellChild2Close"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild2_button"
        class="downSellChild2Close"
      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
        downSellModalData = downSellModalData.replace(
          /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,
          function (matched) {
            return obj[matched];
          }
        );
        let downSell2Modal = document.createElement("div");
        downSell2Modal.id = "downSell2Modal";
        downSell2Modal.className = "modal";
        downSell2Modal.style.visibility = "visible";
        downSell2Modal.style.opacity = "1";
        // downSell2Modal.style.border = "3px solid grey";
        downSell2Modal.style.height = "40em";
        downSell2Modal.style.borderRadius = "11px";
        downSell2Modal.innerHTML = downSellModalData;
        document.querySelector("body").appendChild(downSell2Modal);
        document
          .querySelector("#downSellModal2Close")
          .addEventListener(
            "click",
            () => (downSell2Modal.style.display = "none")
          );

        //if accept

        document
          .querySelector("#upSellChild2_button")
          .addEventListener("click", async () => {
            let quantity2 = parseFloat(
              document.querySelector("#upSellChild2_quantity").value
            );
            await fetch("/cart/add.js", {
              method: "POST",
              // mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: [
                  {
                    quantity: quantity2,
                    id: variantId2,
                  },
                ],
              }), // body data type must match "Content-Type" header
            })
              .then((response) => response.json())
              .then(async (data) => {
                await fetch("/cart.js")
                  .then((response) => response.json())
                  .then(async (data) => {
                    let obj = {
                      username: superAssistantUser2_shopDomain,
                      funnel: funnel,
                      newCart: data,
                      oldCart: [],
                    };
                    console.log(obj);
                    console.log(data);
                    await fetch(customCheckoutUrl, {
                      method: "POST",
                      // mode: "no-cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: superAssistantUser2_shopDomain,
                        funnel: funnel,
                        newCart: data,
                        oldCart: [],
                      }), // body data type must match "Content-Type" header
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        window.location = data.url;
                      });
                  });
              });
          });

        //if declined
        document
          .querySelector("#downSellChild2_button")
          .addEventListener("click", async () => {
            await fetch("/cart.js")
              .then((response) => response.json())
              .then(async (data) => {
                console.log(data, funnel, superAssistantUser2_shopDomain);
                await fetch(customCheckoutUrl, {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: superAssistantUser2_shopDomain,
                    funnel: funnel,
                    newCart: data,
                    oldCart: [],
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    window.location = data.url;
                  });
              });
          });

        let closeButtons = document.querySelectorAll(".downSellChild2Close");

        closeButtons.forEach((each) => {
          each.addEventListener("click", () => {
            downSell2Modal.style.display = "none";
          });
        });
        document.addEventListener("keyup", (e) => {
          if (e.keyCode == 27) {
            downSell2Modal.style.display = "none";
          }
        });
      } else if (!currentOffer.isExists) {
        await fetch("/cart.js")
          .then((response) => response.json())
          .then(async (data) => {
            console.log(data);
            await fetch(customCheckoutUrl, {
              method: "POST",
              // mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: superAssistantUser2_shopDomain,
                funnel: funnel,
                newCart: data,
                oldCart: [],
              }), // body data type must match "Content-Type" header
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                window.location = data.url;
              });
          });
      }
    }

    async function openUpSellParent(index, variantId, quantity) {
      console.log(offers[index]);
      $(".mask").removeClass("active");
      console.log(quantity);

      await fetch("/cart/add.js", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              quantity: quantity,
              id: variantId,
            },
          ],
        }), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          //close parent modal
          // document.querySelector("#discountCodeP").innerText = discountCode;
          // console.log(document.querySelector("#discountCodeP"));
          // document.querySelector(".couponDisplay").style.display = "flex";

          let offer = offers[index];
          let currentOffer = offer.downsellCondition.offerAccepted;
          if (
            offer.downsellCondition.offerAccepted.isExists &&
            !offer.downsellCondition.offerAccepted.skip_offer
          ) {
            let discount,
              productName,
              originalPrice,
              discountedPrice,
              totalDiscount;
            offeredProductIds.push(currentOffer.selectedProduct.id);
            productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
            originalPrice = currentOffer.selectedProduct.variants[0].price;
            let variantId = currentOffer.selectedProduct.variants[0].id;

            if (currentOffer.discount.type === "Discount") {
              if (currentOffer.discount.discountType === "INR") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
                  );
                }
                console.log(topMessage.join(" "));
                // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(currentOffer.discount.discountValue)
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

                let availableDiscount = currentOffer.discount.discountValue;

                totalDiscount = `<p style="font-size: 0.9em">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              } else if (currentOffer.discount.discountType === "%") {
                let topMessage = modalStyle.topMessage.split(" ");
                let topMessageIndex = topMessage.indexOf("{{discount}}");
                if (topMessageIndex !== -1) {
                  topMessage.splice(
                    topMessageIndex,
                    1,
                    `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
                  );
                }
                console.log(topMessage.join(" "));
                discount = topMessage.join(" ");

                let discountPrice = String(
                  parseFloat(originalPrice) -
                    parseFloat(
                      (currentOffer.discount.discountValue / 100) *
                        parseFloat(originalPrice)
                    )
                );
                discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

                let availableDiscount = String(
                  parseFloat(
                    (currentOffer.discount.discountValue / 100) *
                      parseFloat(originalPrice)
                  ).toFixed(2)
                );

                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              }
            } else {
              discount = "Deal unlocked! You might need this too! ";
              discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
              totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
            }

            //free shipping
            let freeShipping = "";
            if (currentOffer.include_free_shipping) {
              freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
            }

            //options will be used to next update, now only one variant is shown
            // let modalOptionsList = [];
            // currentOffer.selectedProduct.options.forEach((each) => {
            //   modalOptionsList.push(createSelector(each));
            // });
            // console.log(modalOptionsList);

            let imageUrl = findImage(
              currentOffer.selectedProduct.variants[0].image_id,
              currentOffer.selectedProduct.images
            );

            console.log(imageUrl);

            let obj = {
              variantId: variantId,
              INDEX: index,
              discountPercentage: discount,
              // offerTime: "5:00",
              productName: productName,
              // currency: superAssistantUser2_shopifyCurrency,
              // originalPrice: "10.00",
              freeShipping: freeShipping,
              // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
              optionsList: " ",
              discountedPrice: discountedPrice,
              totalDiscount: totalDiscount,
              productImage: imageUrl,
            };
            let upSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="upSellModal"
>
  <button id="upSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! Offer will expire in <span id="countdownTimer">offerTime</span>
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSell_child_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;  justify-content: center;">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openUpSellChild_button"
        class="upSellChildClose"
        onclick="openUpSellChild(INDEX,'A-A',variantId)"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild_button"
        class="upSellChildClose"
        onclick="openDownSellChild(INDEX,'A-D')"
      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
            upSellModalData = upSellModalData.replace(
              /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX/gi,
              function (matched) {
                return obj[matched];
              }
            );
            let upSellModal = document.createElement("div");
            upSellModal.id = "upSellModal";
            upSellModal.className = "modal";
            upSellModal.style.visibility = "visible";
            upSellModal.style.opacity = "1";
            // upSellModal.style.border = "3px solid grey";
            upSellModal.style.height = "39em";
            upSellModal.style.top = "19%";
            upSellModal.style.borderRadius = "11px";
            upSellModal.innerHTML = upSellModalData;
            document.querySelector("body").appendChild(upSellModal);
            document
              .querySelector("#upSellModalClose")
              .addEventListener(
                "click",
                () => (upSellModal.style.display = "none")
              );
            let closeButtons = document.querySelectorAll(".upSellChildClose");

            closeButtons.forEach((each) => {
              each.addEventListener(
                "click",
                () => (upSellModal.style.display = "none")
              );
            });

            //link these to child upSell/downSell conditions

            document.querySelector("#openUpSellChild_button").onclick = () => {
              let quantity = parseFloat(
                document.querySelector("#upSell_child_quantity").value
              );
              openUpSellChild(obj.INDEX, "A-A", obj.variantId, quantity);
            };

            document.querySelector("#openDownSellChild_button").onclick =
              () => {
                openDownSellChild(obj.INDEX, "A-D");
              };

            document.addEventListener("keyup", (e) => {
              if (e.keyCode == 27) {
                upSellModal.style.display = "none";
              }
            });
          } else if (!offer.downsellCondition.offerAccepted.isExists) {
            await fetch("/cart.js")
              .then((response) => response.json())
              .then(async (data) => {
                console.log(data);
                await fetch(customCheckoutUrl, {
                  method: "POST",
                  // mode: "no-cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: superAssistantUser2_shopDomain,
                    funnel: funnel,
                    newCart: data,
                    oldCart: [],
                  }), // body data type must match "Content-Type" header
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    window.location = data.url;
                  });
              });
          }
        });
    }
    async function openDownSellParent(index) {
      console.log(offers[index]);

      //close parent modal
      $(".mask").removeClass("active");
      // document.querySelector("#discountCodeP").innerText = discountCode;
      // console.log(document.querySelector("#discountCodeP"));
      // document.querySelector(".couponDisplay").style.display = "flex";

      let offer = offers[index];
      let currentOffer = offer.downsellCondition.offerDeclined;
      if (
        offer.downsellCondition.offerDeclined.isExists &&
        !offer.downsellCondition.offerDeclined.skip_offer
      ) {
        let discount,
          productName,
          originalPrice,
          discountedPrice,
          totalDiscount;
        offeredProductIds.push(currentOffer.selectedProduct.id);
        productName = `${currentOffer.selectedProduct.title}-${currentOffer.selectedProduct.variants[0].title}`;
        originalPrice = currentOffer.selectedProduct.variants[0].price;

        let variantId = currentOffer.selectedProduct.variants[0].id;

        if (currentOffer.discount.type === "Discount") {
          if (currentOffer.discount.discountType === "INR") {
            let topMessage = modalStyle.topMessage.split(" ");
            let topMessageIndex = topMessage.indexOf("{{discount}}");
            if (topMessageIndex !== -1) {
              topMessage.splice(
                topMessageIndex,
                1,
                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${currentOffer.discount.discountValue}</span>`
              );
            }
            console.log(topMessage.join(" "));
            // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
            discount = topMessage.join(" ");

            let discountPrice = String(
              parseFloat(originalPrice) -
                parseFloat(currentOffer.discount.discountValue)
            );
            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

            let availableDiscount = currentOffer.discount.discountValue;

            // totalDiscount = `<p style="font-size: 0.9em">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
            totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
          } else if (currentOffer.discount.discountType === "%") {
            let topMessage = modalStyle.topMessage.split(" ");
            let topMessageIndex = topMessage.indexOf("{{discount}}");
            if (topMessageIndex !== -1) {
              topMessage.splice(
                topMessageIndex,
                1,
                `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${currentOffer.discount.discountValue}% </span>`
              );
            }
            console.log(topMessage.join(" "));
            discount = topMessage.join(" ");

            let discountPrice = String(
              parseFloat(originalPrice) -
                parseFloat(
                  (currentOffer.discount.discountValue / 100) *
                    parseFloat(originalPrice)
                )
            );
            discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

            let availableDiscount = String(
              parseFloat(
                (currentOffer.discount.discountValue / 100) *
                  parseFloat(originalPrice)
              ).toFixed(2)
            );

            totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
          }
        } else {
          discount = "Deal unlocked! You might need this too! ";
          discountedPrice = `
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
          totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
        }

        //free shipping
        let freeShipping = "";
        if (currentOffer.include_free_shipping) {
          freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
        }

        //options will be used to next update, now only one variant is shown
        // let modalOptionsList = [];
        // currentOffer.selectedProduct.options.forEach((each) => {
        //   modalOptionsList.push(createSelector(each));
        // });
        // console.log(modalOptionsList);

        let imageUrl = findImage(
          currentOffer.selectedProduct.variants[0].image_id,
          currentOffer.selectedProduct.images
        );

        console.log(imageUrl);

        let obj = {
          variantId: variantId,
          INDEX: index,
          discountPercentage: discount,
          // offerTime: "5:00",
          productName: productName,
          // currency: superAssistantUser2_shopifyCurrency,
          // originalPrice: "10.00",
          freeShipping: freeShipping,
          // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
          optionsList: " ",
          discountedPrice: discountedPrice,
          totalDiscount: totalDiscount,
          productImage: imageUrl,
        };
        let downSellModalData = `
      <div
  style="background-color:${modalStyle.backGroundColor}"
  id="downSellModal"
>
  <button id="downSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${modalStyle.PricetextSize}px;
        background:${modalStyle.PricebackGroundColor};
        padding: 0.5em;
        color: ${modalStyle.PricetextColor};
        margin: 0;
      "
    >
      Hurry! Offer will expire in <span id="countdownTimer">offerTime</span>
    </h4>
    <div >
      <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em; margin: 0">
        productName
      </h4>
      discountedPrice
      freeShipping
      totalDiscount
      <img
        style="width: 11em; border-radius:5px;height:10em"
        src=productImage
        alt=""
      />
      <div style="display: flex; justify-content: center">
        optionsList

      <div style="padding-top: 1em">
        <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
        <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
          <input
            type="number"
            style="
              padding: 0.5em;
              border: 1px solid #cdd0d2;
              border-radius: 4px;
              width: 15em;
              text-align: center;
            "
            value="1"
            name="quantity"
            id="upSell_child_quantity"
          />
        </div>
      </div>
      <div style="padding-top: 1em; color: grey">
      </div>
    </div>
    <div style="display: flex; flex-direction: column;  justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.buttonTextSize}px;
          color: ${modalStyle.buttonTextColor};
          background: ${modalStyle.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
          
        "
        id="openUpSellChild2_button"
        class="downSellChildClose"
        onclick="openUpSellChild(INDEX,'D-A',variantId)"
      >
        ${modalStyle.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${modalStyle.checkoutTextSize};
          color:${modalStyle.checkoutTextColor};
          background:${modalStyle.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild2_button"
        class="downSellChildClose"
        onclick="openDownSellChild(INDEX,'D-D')"

      >
        ${modalStyle.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;
        downSellModalData = downSellModalData.replace(
          /discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,
          function (matched) {
            return obj[matched];
          }
        );
        let downSellModal = document.createElement("div");
        downSellModal.id = "downSellModal";
        downSellModal.className = "modal";
        downSellModal.style.visibility = "visible";
        downSellModal.style.opacity = "1";
        // downSellModal.style.border = "3px solid grey";
        downSellModal.style.height = "39em";
        downSellModal.style.top = "19%";
        downSellModal.style.borderRadius = "11px";
        downSellModal.innerHTML = downSellModalData;
        document.querySelector("body").appendChild(downSellModal);
        document
          .querySelector("#downSellModalClose")
          .addEventListener(
            "click",
            () => (downSellModal.style.display = "none")
          );

        let closeButtons = document.querySelectorAll(".downSellChildClose");

        closeButtons.forEach((each) => {
          each.addEventListener(
            "click",
            () => (downSellModal.style.display = "none")
          );
        });

        //link these to child upSell/downSell conditions

        document.querySelector("#openUpSellChild2_button").onclick = () => {
          let quantity = parseFloat(
            document.querySelector("#upSell_child_quantity").value
          );
          openUpSellChild(obj.INDEX, "D-A", obj.variantId, quantity);
        };

        document.querySelector("#openDownSellChild2_button").onclick = () => {
          openDownSellChild(obj.INDEX, "D-D");
        };

        document.addEventListener("keyup", (e) => {
          if (e.keyCode == 27) {
            downSellModal.style.display = "none";
          }
        });
      } else if (!offer.downsellCondition.offerDeclined.isExists) {
        await fetch("/cart.js")
          .then((response) => response.json())
          .then(async (data) => {
            console.log(data, funnel, superAssistantUser2_shopDomain);
            await fetch(customCheckoutUrl, {
              method: "POST",
              // mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: superAssistantUser2_shopDomain,
                funnel: funnel,
                newCart: data,
                oldCart: [],
              }), // body data type must match "Content-Type" header
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                window.location = data.url;
              });
          });
      }
    }

    function createSlide(obj, type) {
      let slideData = `
  <div style="padding: 1em; text-align: center" background:${modalStyle.backGroundColor}>
        <p style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};background:${modalStyle.topMessagebackGroundColor} ">
          discountPercentage
        </p>
        <h4
          style="
            font-weight: 600;
            font-size: ${modalStyle.PricetextSize}px;
            background:${modalStyle.PricebackGroundColor};
            padding: 0.5em;
            color: ${modalStyle.PricetextColor};
            margin:0;
          "
        >
          Hurry! Offer will expire in <span id="countdownTimer" class="countdownTimer">offerTime</span>
        </h4>
        <div >
          <h4 style="font-weight: 600;font-family:${modalStyle.productNameFamily};color:${modalStyle.productNameColor}; font-size: ${modalStyle.productNameSize}px; padding: 0.5em;margin:0;">
            productName
          </h4>
          discountedPrice
          freeShipping
          totalDiscount
          <img
            style="width: 11em; border-radius:5px;height:10em"
            src=productImage
            alt=""
          />
          <div style="display: flex; justify-content: center">
            optionsList
          <div style="padding-top: 1em">
            <label for="quantity" style="font-size:${modalStyle.textSize}px;color:${modalStyle.textColor};font-family:${modalStyle.textFamily};">Quantity:</label>
            <div style="display: flex; justify-content: center;margin-bottom: 1em" class="number">
              <input
                type="number"
                style="
                  padding: 0.5em;
                  border: 1px solid #cdd0d2;
                  border-radius: 4px;
                  width: 15em;
                  text-align: center;
                "
                value="1"
                name="quantity"
                id="upSell_parent_quantity-INDEX"
              />
            </div>
          </div>
          <div style="padding-top: 1em; color: grey">
          </div>
        </div>
        <div
          style="
            display: flex;
             flex-direction: column;
             
            justify-content: center;
          "
        >
          <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${modalStyle.buttonTextSize}px;
                  color: ${modalStyle.buttonTextColor};
                  background: ${modalStyle.buttonbackGroundColor};
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openUpSellParent_Button-INDEX"
              >
                ${modalStyle.buttonText}
              </button>
              <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${modalStyle.checkoutTextSize};
                  color:${modalStyle.checkoutTextColor};
                  background:${modalStyle.checkoutbackGroundColor} ; 
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openDownSellParent_Button-INDEX"
              >
                ${modalStyle.checkoutText}
              </button>
        </div>
        <div style="display: flex; justify-content: center;align-items: center; padding-top: 1em">
          <img
            src=${popUpLogoUrl}
            alt=""
            style="width: 1.5em;height: 1.5em;color:${modalStyle.textColor}"
          />
          <p style="font-size: 0.9em;color:${modalStyle.textColor};">Powered By SuperAssistant</p>
        </div>
      </div>
          </div>
      </div>
  `;
      slideData = slideData.replace(
        /discountPercentage|offerTime|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,
        function (matched) {
          return obj[matched];
        }
      );
      console.log(slideData);
      let slide = document.createElement("div");
      slide.className = "slide fade";
      slide.innerHTML = slideData;
      sliderDiv.appendChild(slide);

      if (type === "manual") {
        document.querySelector(
          `#openUpSellParent_Button-${obj.INDEX}`
        ).onclick = () => {
          let quantity = parseFloat(
            document.querySelector(`#upSell_parent_quantity-${obj.INDEX}`).value
          );
          openUpSellParent(obj.INDEX, obj.variantId, quantity);
        };
        document.querySelector(
          `#openDownSellParent_Button-${obj.INDEX}`
        ).onclick = () => {
          openDownSellParent(obj.INDEX);
        };
      } else if (type === "autopilot") {
        document.querySelector(
          `#openUpSellParent_Button-${obj.INDEX}`
        ).onclick = async () => {
          $(".mask").removeClass("active");
          let quantity = parseFloat(
            document.querySelector(`#upSell_parent_quantity-${obj.INDEX}`).value
          );
          await fetch("/cart/add.js", {
            method: "POST",
            // mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [
                {
                  quantity: quantity,
                  id: obj.variantId,
                },
              ],
            }), // body data type must match "Content-Type" header
          })
            .then((response) => response.json())
            .then(async (data) => {
              console.log(data);
              await fetch("/cart.js")
                .then((response) => response.json())
                .then(async (data) => {
                  console.log(data);
                  await fetch(customCheckoutUrl, {
                    method: "POST",
                    // mode: "no-cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username: superAssistantUser2_shopDomain,
                      funnel: funnel,
                      newCart: data,
                      oldCart: [],
                    }), // body data type must match "Content-Type" header
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      window.location = data.url;
                    });
                });
            });
        };
        document.querySelector(
          `#openDownSellParent_Button-${obj.INDEX}`
        ).onclick = () => {
          //do nothing
          $(".mask").removeClass("active");
        };
      }
    }

    //check if already discount code is present
    // function getCookie(cName) {
    //   const name = cName + "=";
    //   const cDecoded = decodeURIComponent(document.cookie); //to be careful
    //   const cArr = cDecoded.split("; ");
    //   let res = "";
    //   cArr.forEach((val) => {
    //     if (val.indexOf(name) === 0) res = val.substring(name.length);
    //   });
    //   return res;
    // }

    // let cookie = getCookie("discount_code");
    // console.log(cookie);
    // console.log(cookie.includes(superAssistantUser2_shopDomain.toUpperCase()));
    // if (cookie.includes(superAssistantUser2_shopDomain.toUpperCase())) {
    //   document.querySelector("#discountCodeP").innerText = cookie;
    //   console.log(document.querySelector("#discountCodeP"));
    //   // $('.')
    //   document.querySelector(".couponDisplay").style.display = "flex";
    // }

    //upsellParent
    // let upsellParent_popUpMask = document.createElement("div");
    // upsellParent_popUpMask.role = "dialog";
    // upsellParent_popUpMask.className = "mask";

    // let upsellParent_modalBody = document.createElement("div");
    // upsellParent_modalBody.className = "modal";
    // upsellParent_modalBody.role = "alert";
    // upsellParent_modalBody.id = "superAssistantModal";
    //Downsell Parent

    // document.querySelector("#superAssistantModal").insertAdjacentHTML(
    //   "afterbegin",
    //   `

    // `
    // );

    let Page_funnels = [];
    let offers = [];
    let selectedProducts = [];
    let excludedVariantIds = [];
    let currentVariantIds = [];
    console.log(oldCart);
    let currentCartProductIds = [];
    oldCart.line_items.forEach((item) => {
      currentCartProductIds.push(item.product_id);
      currentVariantIds.push(item.variant_id);
    });

    // let currentProductId = meta.product.id;

    // meta.product.variants.forEach((each) => {
    //   currentVariantIds.push(each.id);
    // });

    console.log(currentVariantIds);
    console.log(currentCartProductIds);

    superAssistantUser2.funnels.forEach((funnel) => {
      if (funnel.placement === "thankyou-page") {
        if (funnel.enable && !funnel.isDeleted) Page_funnels.push(funnel);
      }
    });

    console.log();
    //sorting according to priority
    console.log(Page_funnels);
    Page_funnels = Page_funnels.sort((a, b) => {
      return (
        a.funnelRules.add_priority.priority -
        b.funnelRules.add_priority.priority
      );
    });
    console.log(Page_funnels);

    // if (Page_funnels[0].trigger.selectedOption === "all") {
    //   Page_funnels[i].offers.forEach((each) => {
    //     offers.push(each);
    //   });
    // } else {

    // }
    // for (let i = 0; i < Page_funnels.length; i++) {
    //   Page_funnels[i].trigger.selectedProducts.forEach((each) => {
    //     selectedProducts.push(each);
    //   });
    // }
    // console.log(selectedProducts);
    let funnel = null;

    for (let i = 0; i < Page_funnels.length; i++) {
      if (Page_funnels[i].trigger.selectedOption === "all") {
        funnel = Page_funnels[i];
        Page_funnels[i].offers.forEach((each) => {
          offers.push(each);
          selectedProducts.push("all");

          // Page_funnels[i].trigger.selectedProducts.forEach((each) => {
          //   selectedProducts.push(each);
          // });
        });
        break;
      } else if (
        Page_funnels[i].trigger.selectedOption === "specific-product" ||
        Page_funnels[i].trigger.selectedOption === "specific-collection"
      ) {
        let tempArr = [];
        // let excludedTemp = [];
        Page_funnels[i].trigger.selectedProducts.forEach((each) => {
          tempArr.push(each.id);
        });
        console.log(tempArr);

        // console.log(excludedTemp);

        // function getCommonItems(array1, array2) {
        //   var common = []; // Initialize array to contain common items

        //   for (var i = 0; i < array1.length; i++) {
        //     for (var j = 0; j < array2.length; j++) {
        //       if (array1[i] == array2[j]) {
        //         // If item is present in both arrays
        //         common.push(array1[i]); // Push to common array
        //       }
        //     }
        //   }

        //   return common; // Return the common items
        // }

        // let common = getCommonItems(excludedTemp,);
        console.log(currentCartProductIds);
        let common = tempArr.filter((x) => currentCartProductIds.includes(x));
        console.log(common);
        console.log(common.length === 0);

        if (common.length !== 0) {
          funnel = Page_funnels[i];

          Page_funnels[i].offers.forEach((each) => {
            offers.push(each);
            selectedProducts = tempArr;
            Page_funnels[i].trigger.excludedVariantIds.forEach((each) => {
              excludedVariantIds.push(each);
            });
          });
          break;
        }
      }
    }
    // console.log(currentProductId);
    // console.log(excludedVariantIds);
    // console.log(selectedProducts.indexOf(currentProductId) !== -1);
    console.log(offers);
    console.log(funnel);

    function createOption(value) {
      let p = `<option value=${value}>${value}</option>`;
      return p;
    }

    function createSelector(selector) {
      let optionsList = [];
      selector.values.forEach((each) => {
        optionsList.push(createOption(each));
      });
      let result = `
      <div>
              <label for="size" style="text-align: left;font-size:${
                modalStyle.textSize
              }px;
    color:${modalStyle.textColor};
    font-family:${modalStyle.textFamily};"> ${selector.name}: </label>
              <select
                style="
                  padding: 0.5em;
                  display: block;
                  border: 1px solid #cdd0d2;
                  border-radius: 4px;
                  width: 8em;
                "
                name="color"
                id="color"
              >
                ${optionsList.join(" ")}
              </select>
            </div>
          </div>
      `;
      return result;
    }

    // console.log(super);
    let offeredProductIds = [];
    if (funnel !== null) {
      if (funnel.offerType === "addManually") {
        for (let i = 0; i < offers.length; i++) {
          let discount,
            productName,
            originalPrice,
            discountedPrice,
            totalDiscount;
          let variantId = offers[i].selectedProduct.variants[0].id;
          offeredProductIds.push(offers[i].selectedProduct.id);
          productName = `${offers[i].selectedProduct.title}-${offers[i].selectedProduct.variants[0].title}`;
          originalPrice = offers[i].selectedProduct.variants[0].price;

          if (offers[i].discount.type === "Discount") {
            if (offers[i].discount.discountType === "INR") {
              console.log(modalStyle.topMessage);
              let topMessage = modalStyle.topMessage.split(" ");
              let topMessageIndex = topMessage.indexOf("{{discount}}");
              if (topMessageIndex !== -1) {
                topMessage.splice(
                  topMessageIndex,
                  1,
                  `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}</span>`
                );
              }
              console.log(topMessage.join(" "));
              // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
              discount = topMessage.join(" ");

              let discountPrice = String(
                parseFloat(originalPrice) -
                  parseFloat(offers[i].discount.discountValue)
              );
              discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
                    <ins style="text-decoration: none; color:${modalStyle.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${discountPrice}
                    </ins>`;

              let availableDiscount = offers[i].discount.discountValue;

              // totalDiscount = `<p style="font-size: 0.9em">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
              totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
            } else if (offers[i].discount.discountType === "%") {
              let topMessage = modalStyle.topMessage.split(" ");
              let topMessageIndex = topMessage.indexOf("{{discount}}");
              if (topMessageIndex !== -1) {
                topMessage.splice(
                  topMessageIndex,
                  1,
                  `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${offers[i].discount.discountValue}% </span>`
                );
              }
              console.log(topMessage.join(" "));
              discount = topMessage.join(" ");
              // discount = `Deal unlocked! Get this product for ${offers[i].discount.discountValue}%  off`;

              let discountPrice = String(
                parseFloat(originalPrice) -
                  parseFloat(
                    (offers[i].discount.discountValue / 100) *
                      parseFloat(originalPrice)
                  )
              );
              discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
            <ins style="text-decoration: none; color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${discountPrice}
            </ins>`;

              let availableDiscount = String(
                parseFloat(
                  (offers[i].discount.discountValue / 100) *
                    parseFloat(originalPrice)
                ).toFixed(2)
              );

              totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">${modalStyle.discountMessage} ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
            }
          } else {
            discount = "Deal unlocked! You might need this too! ";
            discountedPrice = `
            <ins style="text-decoration: none;  color:${modalStyle.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${originalPrice}
            </ins>`;
            totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
          }

          //free shipping
          let freeShipping = "";
          if (offers[i].include_free_shipping) {
            freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
          }

          //options will be used to next update, now only one variant is shown
          // let modalOptionsList = [];
          // offers[i].selectedProduct.options.forEach((each) => {
          //   modalOptionsList.push(createSelector(each));
          // });
          // console.log(modalOptionsList);

          let imageUrl = findImage(
            offers[i].selectedProduct.variants[0].image_id,
            offers[i].selectedProduct.images
          );

          console.log(imageUrl);

          let obj = {
            variantId: variantId,
            INDEX: i,
            discountPercentage: discount,
            offerTime: "5:00",
            productName: productName,
            // currency: superAssistantUser2_shopifyCurrency,
            // originalPrice: "10.00",
            freeShipping: freeShipping,
            // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
            optionsList: " ",
            discountedPrice: discountedPrice,
            totalDiscount: totalDiscount,
            productImage: imageUrl,
          };

          // dynamicModalUpdate(obj);
          createSlide(obj, "manual");

          // console.log(modalBody.innerHTML);
        }
      } else if (funnel.offerType === "autoPilot") {
        let currentProductId = currentCartProductIds[0];
        console.log(currentProductId);
        if (funnel.autoPiltoType === "shopifyRecommendation") {
          async function getRecommendedProducts() {
            let fetchUrl = `/recommendations/products.json?product_id=${currentProductId}&limit=3`;
            if (funnel.offers[0].limit_no_of_products.isSelected) {
              fetchUrl = `/recommendations/products.json?product_id=${currentProductId}&limit=${funnel.offers[0].limit_no_of_products.limit}`;
            }
            await fetch(fetchUrl)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                let recommendedProductsList = data.products;
                for (let i = 0; i < recommendedProductsList.length; i++) {
                  if (recommendedProductsList[i].available) {
                    offeredProductIds.push(recommendedProductsList[i].id);
                    let discount,
                      productName,
                      originalPrice,
                      discountedPrice,
                      totalDiscount;

                    let variantId = recommendedProductsList[i].variants[0].id;

                    productName = `${recommendedProductsList[i].title}-${recommendedProductsList[i].variants[0].title}`;
                    originalPrice =
                      recommendedProductsList[i].variants[0].price / 100;

                    if (offers[0].discount.type === "Discount") {
                      if (offers[0].discount.discountType === "INR") {
                        let topMessage = modalStyle.topMessage.split(" ");
                        let topMessageIndex =
                          topMessage.indexOf("{{discount}}");
                        if (topMessageIndex !== -1) {
                          topMessage.splice(
                            topMessageIndex,
                            1,
                            `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}</span>`
                          );
                        }
                        console.log(topMessage.join(" "));
                        // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                        discount = topMessage.join(" ");
                        // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}  off`;

                        let discountPrice = String(
                          parseFloat(originalPrice) -
                            parseFloat(offers[0].discount.discountValue)
                        );
                        discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                        let availableDiscount =
                          offers[0].discount.discountValue;

                        totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                      } else if (offers[0].discount.discountType === "%") {
                        // discount = `Deal unlocked! Get this product for ${offers[0].discount.discountValue}%  off`;
                        let topMessage = modalStyle.topMessage.split(" ");
                        let topMessageIndex =
                          topMessage.indexOf("{{discount}}");
                        if (topMessageIndex !== -1) {
                          topMessage.splice(
                            topMessageIndex,
                            1,
                            `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${offers[0].discount.discountValue}% </span>`
                          );
                        }
                        console.log(topMessage.join(" "));
                        discount = topMessage.join(" ");
                        let discountPrice = String(
                          parseFloat(originalPrice) -
                            parseFloat(
                              (offers[0].discount.discountValue / 100) *
                                parseFloat(originalPrice)
                            )
                        );
                        discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                        let availableDiscount = String(
                          parseFloat(
                            (offers[0].discount.discountValue / 100) *
                              parseFloat(originalPrice)
                          ).toFixed(2)
                        );

                        totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                      }
                    } else {
                      discount = "Deal unlocked! You might need this too! ";
                      discountedPrice = `
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${originalPrice}
              </ins>`;
                      totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
                    }

                    //free shipping
                    let freeShipping = "";
                    if (offers[0].include_free_shipping) {
                      freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
                    }

                    //options
                    // let modalOptionsList = [];
                    // recommendedProductsList[i].options.forEach((each) => {
                    //   modalOptionsList.push(createSelector(each));
                    // });
                    // console.log(modalOptionsList);

                    let imageUrl = "";
                    if (
                      recommendedProductsList[i].variants[0].featured_image ===
                      null
                    ) {
                      imageUrl = `https://${recommendedProductsList[
                        i
                      ].featured_image.slice(2)}`;
                    } else {
                      imageUrl =
                        recommendedProductsList[i].variants[0].featured_image
                          .src;
                    }

                    let obj = {
                      variantId: variantId,
                      INDEX: i,
                      discountPercentage: discount,
                      offerTime: "5:00",
                      productName: productName,
                      // currency: superAssistantUser2_shopifyCurrency,
                      // originalPrice: "10.00",
                      freeShipping: freeShipping,
                      // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
                      optionsList: " ",
                      discountedPrice: discountedPrice,
                      totalDiscount: totalDiscount,
                      productImage: imageUrl,
                    };

                    // dynamicModalUpdate(obj);
                    createSlide(obj, "autopilot");

                    // console.log(modalBody.innerHTML);
                  }
                }
              });
          }
          getRecommendedProducts();
        } else if (funnel.autoPiltoType === "sameProductForLess") {
          console.log("sameProductForLess");
          let recommendedProductsList = Shopify.checkout.line_items; //thankyou page items
          for (let i = 0; i < recommendedProductsList.length; i++) {
            if (true) {
              // (recommendedProductsList[i].available) since we dont know the availability of a product in thanku page
              offeredProductIds.push(recommendedProductsList[i].id);
              let discount,
                productName,
                originalPrice,
                discountedPrice,
                totalDiscount;

              let variantId = recommendedProductsList[i].variant_id;

              productName = `${recommendedProductsList[i].title}-${recommendedProductsList[i].variant_title}`;
              originalPrice = recommendedProductsList[i].price;

              if (offers[0].discount.type === "Discount") {
                if (offers[0].discount.discountType === "INR") {
                  let topMessage = modalStyle.topMessage.split(" ");
                  let topMessageIndex = topMessage.indexOf("{{discount}}");
                  if (topMessageIndex !== -1) {
                    topMessage.splice(
                      topMessageIndex,
                      1,
                      `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}</span>`
                    );
                  }
                  console.log(topMessage.join(" "));
                  // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[i].discount.discountValue}  off`;
                  discount = topMessage.join(" ");
                  // discount = `Deal unlocked! Get this product for ${superAssistantUser2_shopifyCurrency} ${offers[0].discount.discountValue}  off`;

                  let discountPrice = String(
                    parseFloat(originalPrice) -
                      parseFloat(offers[0].discount.discountValue)
                  );
                  discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                  let availableDiscount = offers[0].discount.discountValue;

                  totalDiscount = `<p style="font-size: ${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                } else if (offers[0].discount.discountType === "%") {
                  // discount = `Deal unlocked! Get this product for ${offers[0].discount.discountValue}%  off`;
                  let topMessage = modalStyle.topMessage.split(" ");
                  let topMessageIndex = topMessage.indexOf("{{discount}}");
                  if (topMessageIndex !== -1) {
                    topMessage.splice(
                      topMessageIndex,
                      1,
                      `<span style="font-size:${modalStyle.PricetextSize};background:${modalStyle.PricebackGroundColor};color:${modalStyle.PricetextColor}">${offers[0].discount.discountValue}% </span>`
                    );
                  }
                  console.log(topMessage.join(" "));
                  discount = topMessage.join(" ");
                  let discountPrice = String(
                    parseFloat(originalPrice) -
                      parseFloat(
                        (offers[0].discount.discountValue / 100) *
                          parseFloat(originalPrice)
                      )
                  );
                  discountedPrice = `<del style="color: ${modalStyle.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${originalPrice} </del>
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${discountPrice}
              </ins>`;

                  let availableDiscount = String(
                    parseFloat(
                      (offers[0].discount.discountValue / 100) *
                        parseFloat(originalPrice)
                    ).toFixed(2)
                  );

                  totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${availableDiscount}!</p>`;
                }
              } else {
                discount = "Deal unlocked! You might need this too! ";
                discountedPrice = `
              <ins style="text-decoration: none; color: ${modalStyle.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${originalPrice}
              </ins>`;
                totalDiscount = `<p style="font-size:${modalStyle.discounttextSize}px;font-family:${modalStyle.discounttextFamily};color:${modalStyle.discounttextColor}">Quickly grab this amazing deal!</p>`;
              }

              //free shipping
              let freeShipping = "";
              if (offers[0].include_free_shipping) {
                freeShipping = `<span
                style="
                  display: block;
                  color: brown;
                  border: 1px solid;
                  border-radius: 8px;
                  width: fit-content;
                  padding: 0.5em;
                  margin: 0.2em auto;
                  font-size: smaller;
                "
                >Free shipping included</span>`;
              }

              //options will be used to next update, now only one variant is shown
              // let modalOptionsList = [];
              // recommendedProductsList[i].options.forEach((each) => {
              //   modalOptionsList.push(createSelector(each));
              // });
              // console.log(modalOptionsList);

              // let imageUrl = findImage(
              //   currentOffer.selectedProduct.variants[0].image_id,
              //   currentOffer.selectedProduct.images
              // );

              // console.log(imageUrl);

              // let imageUrl = "";
              // if (
              //   recommendedProductsList[i].variants[0].featured_image ===
              //   null
              // ) {
              //   imageUrl = `https://${recommendedProductsList[
              //     i
              //   ].featured_image.slice(2)}`;
              // } else {
              //   imageUrl =
              //     recommendedProductsList[i].variants[0].featured_image.src;
              // }
              let imageUrl = recommendedProductsList[i].image_url;

              let obj = {
                variantId: variantId,
                INDEX: i,
                discountPercentage: discount,
                offerTime: "5:00",
                productName: productName,
                // currency: superAssistantUser2_shopifyCurrency,
                // originalPrice: "10.00",
                freeShipping: freeShipping,
                // optionsList: modalOptionsList.join(" "), will be used to next update, now only one variant is shown
                optionsList: " ",
                discountedPrice: discountedPrice,
                totalDiscount: totalDiscount,
                productImage: imageUrl,
                // productImage:
                //   "https://" +
                //   recommendedProductsList[i].featured_image.slice(2),
              };

              // dynamicModalUpdate(obj);
              createSlide(obj, "autopilot");

              // console.log(modalBody.innerHTML);
            }
          }
        }
      }
    }
    console.log(offeredProductIds);

    console.log(offers);
    if (offers.length != 0) {
      //   let addToCart_button = document.querySelector(
      //     'form[action^="/cart"] [type="submit"]'
      //   );
      // console.log(addToCart_button);
      //   addToCart_button.classList.add("show");

      //   window.addEventListener("load", async (e) => {
      //send request to backend to create a discount code with this name
      // let temp = await fetch(`${hostedUrl}/api/userData`, {
      //   method: "POST",
      //   // mode: "no-cors",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     discountCode: discountCode,
      //     customer:"",
      //   }), // body data type must match "Content-Type" header
      // });
      // temp = await temp.json();
      // console.log(temp.data[0]);
      //load popup
      // e.preventDefault();

      // await fetch("/cart.js")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log(data);

      // let oldCart = data;
      setTimeout(async () => {
        await fetch("/cart.js")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            let newCart = oldCart.line_items;
            // if newCart.length > oldCart.length then product added and
            // check variant id from excluded variant ids list
            let newCartVariants = [];
            newCart.forEach((each) => {
              newCartVariants.push(each.variant_id);
            });
            // console.log(newCartVariants);
            // console.log(excludedVariantIds);
            let common = newCartVariants.filter((x) =>
              excludedVariantIds.includes(x)
            );
            console.log(newCartVariants);
            console.log(excludedVariantIds);
            console.log(common.length === 0);
            console.log(common);
            // function getCookie(cName) {
            //   const name = cName + "=";
            //   const cDecoded = decodeURIComponent(document.cookie); //to be careful
            //   const cArr = cDecoded.split("; ");
            //   let res = "";
            //   cArr.forEach((val) => {
            //     if (val.indexOf(name) === 0) res = val.substring(name.length);
            //   });
            //   return res;
            // }

            // let cookie = getCookie("discount_code");
            // console.log(cookie);
            // console.log(
            //   cookie.includes(superAssistantUser2_shopDomain.toUpperCase())
            // );
            if (
              common.length === 0
              // !cookie.includes(superAssistantUser2_shopDomain.toUpperCase())
            ) {
              let cart = oldCart;
              //Funnel Rules
              let startDate = null,
                endDate = null,
                minCartValue = null,
                maxCartValue = null;

              //Start Date End Date
              let date_constraint = true;
              if (funnel.funnelRules.set_start_date.isSelected) {
                startDate = funnel.funnelRules.set_start_date.startDate;
              }
              if (funnel.funnelRules.set_end_date.isSelected) {
                endDate = funnel.funnelRules.set_end_date.endDate;
              }
              if (endDate !== null && startDate !== null) {
                function dateCheck(from, to, check) {
                  var fDate, lDate, cDate;
                  fDate = Date.parse(from);
                  lDate = Date.parse(to);
                  cDate = Date.parse(check);

                  if (cDate <= lDate && cDate >= fDate) {
                    return true;
                  }
                  return false;
                }
                const changeFormat = (date) => {
                  let orderDate = new Date(date);

                  let dates = orderDate.getDate();
                  let month = orderDate.getMonth() + 1;
                  let year = orderDate.getFullYear() - 2000;
                  if (dates < 10) {
                    dates = "0" + dates;
                  }
                  if (month < 10) {
                    month = "0" + month;
                  }

                  return `${month}/${dates}/${year}`;
                };
                let from = changeFormat(startDate);
                let to = changeFormat(endDate);
                let today = changeFormat(new Date());
                date_constraint = dateCheck(from, to, today);
              } else if (startDate !== null) {
                let firstDate = new Date(startDate);
                let today = new Date();
                console.log(startDate);
                var dateInPast = function (firstDate, secondDate) {
                  if (
                    firstDate.setHours(0, 0, 0, 0) <=
                    secondDate.setHours(0, 0, 0, 0)
                  ) {
                    return true;
                  }

                  return false;
                };
                date_constraint = dateInPast(firstDate, today);
              }

              //show_Only_for_Specific_CartValue
              let cartValue_constraint = true;
              console.log(
                funnel.funnelRules.show_Only_for_Specific_CartValue.isSelected
              );
              if (
                funnel.funnelRules.show_Only_for_Specific_CartValue.isSelected
              ) {
                minCartValue =
                  funnel.funnelRules.show_Only_for_Specific_CartValue
                    .minCartValue;
                maxCartValue =
                  funnel.funnelRules.show_Only_for_Specific_CartValue
                    .maxCartValue;
                cartValue_constraint =
                  minCartValue <= oldCart.total_price / 100 &&
                  oldCart.total_price / 100 < maxCartValue;

                console.log(minCartValue, maxCartValue, cartValue_constraint);
              }

              //skip if already present
              let not_skip_constraint = true;
              console.log(offeredProductIds);
              console.log(funnel.funnelRules.skip_If_already_present_In_cart);
              if (funnel.funnelRules.skip_If_already_present_In_cart) {
                for (let i = 0; i < offeredProductIds.length; i++) {
                  let offeredProductId = offeredProductIds[i];
                  console.log(offeredProductId);

                  for (let j = 0; j < cart.line_items.length; j++) {
                    if (cart.line_items[j].product_id === offeredProductId) {
                      console.log("already present in cart");
                      not_skip_constraint = false;
                      break;
                    }
                  }
                }
              }

              //specific countries
              let specificCountry_constraint = true;
              let currentCountry = Shopify.country;
              if (funnel.funnelRules.specific_countries.isSelected) {
                let selectedCountries_arr =
                  funnel.funnelRules.specific_countries.selectedCountries;
                specificCountry_constraint =
                  selectedCountries_arr.includes(currentCountry);
              }

              //once per user(getting previously stored value)
              let not_oncePerBuyer_constraint = true;
              if (funnel.funnelRules.once_per_buyer) {
                let storedValue = localStorage.getItem("oncePerBuyer");
                if (storedValue === null) {
                  console.log("notstored");
                  not_oncePerBuyer_constraint = true;
                } else {
                  console.log("stored");
                  not_oncePerBuyer_constraint = false;
                  localStorage.removeItem("oncePerBuyer");
                }
              }

              // let temp = await fetch(`${hostedUrl}/api/userData`, {
              //   method: "POST",
              //   // mode: "no-cors",
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              //   body: JSON.stringify({
              //     discountCode: discountCode,
              //     shopDomain: superAssistantUser2_shopDomain,
              //     funnelId: funnelId,
              //   }), // body data type must match "Content-Type" header
              // });
              // temp = await temp.json();
              console.log(
                date_constraint,
                cartValue_constraint,
                not_skip_constraint,
                specificCountry_constraint,
                not_oncePerBuyer_constraint
              );
              console.log(
                date_constraint &&
                  cartValue_constraint &&
                  not_skip_constraint &&
                  specificCountry_constraint &&
                  not_oncePerBuyer_constraint
              );
              if (
                date_constraint &&
                cartValue_constraint &&
                not_skip_constraint &&
                specificCountry_constraint &&
                not_oncePerBuyer_constraint
              ) {
                $(".mask").addClass("active");

                var fiveMinutes = 60 * 5,
                  // display = document.querySelector("#countdownTimer");
                  // let couponDiscountDiv = document.querySelector(
                  //   "#countdownTimerFooter"
                  // );
                  // startTimer(fiveMinutes, display);
                  display = document.querySelectorAll(".countdownTimer");

                display.forEach((timer) => {
                  startTimer(fiveMinutes, timer);
                });
                async function addViews() {
                  let addViews = await fetch(
                    `${superAssistantUser2_hostedUrl}/api/viewIncrement/addViews`,
                    {
                      method: "POST",
                      // mode: "no-cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        funnelId: funnel._id,
                      }), // body data type must match "Content-Type" header
                    }
                  );
                  addViews = await addViews.json();
                  console.log(addViews);
                }

                addViews();

                // startTimer(fiveMinutes, couponDiscountDiv);
                // let now = new Date();
                // let fiveMinutesLater = new Date(now.getTime() + 5 * 60000);
                // console.log(fiveMinutesLater.toUTCString());
                // document.cookie = `discount_code=${discountCode};expires=${fiveMinutesLater.toUTCString()};path=/`;
              }

              //Once per buyer(setting value)
              if (funnel.funnelRules.once_per_buyer) {
                localStorage.setItem("oncePerBuyer", true);
              }
            }
          });
      }, 1000);
      //   });

      // setTimeout(function () {
      //   console.log("clicked");

      //   $(".mask").addClass("active");
      //   var fiveMinutes = 60 * 5,
      //     display = document.querySelector("#countdownTimer");
      //   startTimer(fiveMinutes, display);
      // }, 1000);
      //   });

      // Function for close the Modal

      function closeModal() {
        $(".mask").removeClass("active");
      }

      // Call the closeModal function on the clicks/keyboard

      let divs = document.querySelectorAll(".close,.mask");
      divs.forEach((ele) => {
        ele.onclick = () => {
          closeModal();
          // document.querySelector("#discountCodeP").innerText = discountCode;
          // console.log(document.querySelector("#discountCodeP"));
          // document.querySelector(".couponDisplay").style.display = "flex";
        };
      });
      //   $(".close, .mask").on("click", function () {
      //     closeModal();
      //     document.querySelector("#discountCodeP").innerText = discountCode;
      //     console.log(document.querySelector("#discountCodeP"));
      //     document.querySelector(".couponDisplay").style.display = "flex";
      //   });

      document.addEventListener("keyup", (e) => {
        if (e.keyCode == 27) {
          closeModal();
          // document.querySelector("#discountCodeP").innerText = discountCode;
          // console.log(document.querySelector("#discountCodeP"));
          // document.querySelector(".couponDisplay").style.display = "flex";
        }
      });

      //   $(document).keyup(function (e) {
      //     if (e.keyCode == 27) {
      //       closeModal();
      //       document.querySelector("#discountCodeP").innerText = discountCode;
      //       console.log(document.querySelector("#discountCodeP"));
      //       document.querySelector(".couponDisplay").style.display = "flex";
      //     }
      //   });

      setTimeout(() => {
        //slider
        var slideIndex = 1;
        showSlides(slideIndex);

        // Next/previous controls
        function plusSlides(n) {
          showSlides((slideIndex += n));
          console.log("here", n);
        }

        // Thumbnail image controls
        function currentSlide(n) {
          showSlides((slideIndex = n));
          console.log("here", n);
        }

        function showSlides(n) {
          console.log("top");
          var i;
          var slides = document.getElementsByClassName("slide");
          // var dots = document.getElementsByClassName("dot");
          if (n > slides.length) {
            slideIndex = 1;
          }
          if (n < 1) {
            slideIndex = slides.length;
          }
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }
          // for (i = 0; i < dots.length; i++) {
          //     dots[i].className = dots[i].className.replace(" active", "");
          // }
          slides[slideIndex - 1].style.display = "block";
          // dots[slideIndex-1].className += " active";
          console.log("bottom");
        }

        document.querySelector(".prev").addEventListener("click", () => {
          plusSlides(-1);
        });
        document.querySelector(".next").addEventListener("click", () => {
          plusSlides(1);
        });
      }, 2000);

      // addToCart_button.id = "one";
    }
    //   });
  }
}

//auth

async function initUpSell() {
  try {
    // let temp = await fetch(
    //   `${superAssistantUser2_hostedUrl}/api/analytics/userData?shop=${superAssistantUser2_shopDomain}`
    //   //   {
    //   //     method: "POST",
    //   //     // mode: "no-cors",
    //   //     headers: {
    //   //       "Content-Type": "application/json",
    //   //     },
    //   //     body: JSON.stringify({
    //   //       username: superAssistantUser2_shopDomain,
    //   //     }), // body data type must match "Content-Type" header
    //   //   }
    // );
    let temp = await fetch(`${superAssistantUser2_hostedUrl}/api/user`, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: superAssistantUser2_shopDomain,
      }), // body data type must match "Content-Type" header
    });
    temp = await temp.json();
    console.log(temp);
    console.log(temp.shop);
    superAssistantUser2 = temp.shop;
    console.log(superAssistantUser2.Upsellenable);
    if (superAssistantUser2.Upsellenable) {
      const styles = [
        "color: white",
        "background:#45b3e0",
        "font-weight:600",
        "padding:0.3em",
      ].join(";");

      const message = " ðŸŽ‰UpSell Discounts by Super Assistant: ready";

      // 3. Using the styles and message variable
      console.log("%c%s", styles, message);

      // let cart = await fetch(
      //   "https://super-assistant-demo2.myshopify.com/cart/cart.js"
      // );
      // cart = await cart.json();
      // console.log(cart);
      startUpSell();
    } else {
      const styles = [
        "color: white",
        "background:#45b3e0",
        "font-weight:600",
        "padding:0.3em",
      ].join(";");

      const message = " ðŸŽ‰UpSell Discounts by Super Assistant: disabled";

      // 3. Using the styles and message variable
      console.log("%c%s", styles, message);
    }
  } catch (error) {
    console.log(error);
    console.log("super upsell not working");
  }
}

initUpSell();
