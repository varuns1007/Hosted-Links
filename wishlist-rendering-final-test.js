// const serverUrl = "https://wishlist-backend.superassistant.io";
const serverUrl = "http://localhost:8080";
//inject icon js in head
function initCss() {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  );
  document.head.appendChild(link);
}
initCss();



var wish_list = [];
var variant_id;
var product_db = [];
var variant_data = "";
var cart_items = [];

//UniqueCode Generator
//     function generateRandomId(length) {
//       var result = [];
//       var characters =
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//       var charactersLength = characters.length;
//       for (var i = 0; i < length; i++) {
//         result.push(
//           characters.charAt(Math.floor(Math.random() * charactersLength))
//         );
//       }
//       return result.join("");
// }
    
//find appropriate image related to particular variant id
function findImage(imageId, imageArray) {
  let imageUrl = "";
  if (imageId === null) {
    imageUrl = imageArray[0].src;
  } else {
    let imageIndex = imageArray.findIndex(function (img, index) {
      if (img.id == imageId) return true;
    });

    // console.log(imageIndex);

    if (imageIndex !== -1) {
      imageUrl = imageArray[imageIndex].src;
    } else {
      imageUrl = imageArray[0].src;
    }
  }

  return imageUrl;
}

startWishlist();

function Customer_data_call(data) {
  // console.log("🚀 ~ file: wishlist-rendering.js ~ line 24 ~ Inside Customer_data_call ~ Customer_data_call")
  if (window.meta.page.customerId) {
    // console.log(window.meta.page.customerId);
    const customer_id = window.meta.page.customerId;
    const shop_name = window.location.hostname;

    fetch(
      `https://${shop_name}/admin/api/2021-04/customers/${customer_id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    ).then((res) => {
      res.json().then((Customer_data) => {
        // console.log(Customer_data.customer);
        if (window.localStorage.getItem("wish_list_email_id") === "Anonymous") {
          let old_customer_id = window.localStorage.getItem( //Only when we are updating customer, we send old id inorder to look for it in db n update
            "wish_list_customer_id"
          );
          getCustomer_wishlist(
            data,
            Customer_data,
            old_customer_id,
            true,
            customer_id
          );
        } else {
          getCustomer_wishlist(
            data,
            Customer_data,
            customer_id,
            false,
            customer_id,
          );
          
        }
        window.localStorage.setItem(
          "wish_list_email_id",
          Customer_data.customer.email
        );
        window.localStorage.setItem("wish_list_customer_id", customer_id);
      });
    });
  } else {
    console.log("customer not loggedIn");

    //setting a Anonymous email id to the localstorage
    if (
      !window.localStorage.getItem("wish_list_email_id") &&
      !window.localStorage.getItem("wish_list_customer_id")
    ) {
      let email_id = `Anonymous`;
      let customerId = Math.floor(new Date().getTime() / 1000);
      window.localStorage.setItem("wish_list_email_id", email_id);
      window.localStorage.setItem("wish_list_customer_id", customerId);
      //Creating not logged in customer in db  
      let testData = {
        customer: {
          first_name: "Anonymous",
          last_name: " ",
          email: email_id,
          phone: "123456789",
        },
      };
      getCustomer_wishlist(data, testData, customerId, false, customerId);
      // fetch(
      //     `${serverUrl}/list_db/${window.location.hostname}/${customerId}`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         accept: "application/json",
      //       },
      //       body: JSON.stringify({
      //         first_name:"Anonymous",
      //         last_name:" ",
      //         email:email_id,
      //         phone:"123456789",
      //       }),
      //     }
      //   );
    } else {
      let email_id = window.localStorage.getItem("wish_list_email_id");
      let customerId = window.localStorage.getItem("wish_list_customer_id");
      let testData = {
        customer: {
          first_name: "Anonymous",
          last_name: " ",
          email: email_id,
          phone: "123456789",
        },
      };
      getCustomer_wishlist(data, testData, customerId, false, customerId);
    }

    

    // if (
    //   window.localStorage.getItem("wish_list") &&
    //   window.localStorage.getItem("product_db")
    // ) {
    //   wish_list = JSON.parse(window.localStorage.getItem("wish_list"));
    //   product_db = JSON.parse(window.localStorage.getItem("product_db"));
    //   console.log("got list");
    //   renderItems(data);

    //   if (window.meta && window.meta.page.pageType === "collection") {
    //     renderHeartCatalog(data);
    //   }
    //   if (window.meta && window.meta.product) {
    //     renderButton(data);
    //     document.getElementsByTagName("select")[0].onchange = function () {
    //       renderButton(data);
    //       getProduct();
    //     };
    //   }
    // } else {
    //   window.localStorage.setItem("wish_list", JSON.stringify(wish_list));
    //   window.localStorage.setItem("product_db", JSON.stringify(product_db));
    //   console.log("didn't got list");
    //   renderItems(data);

    //   if (window.meta && window.meta.page.pageType === "collection") {
    //     renderHeartCatalog(data);
    //   }
    //   if (window.meta && window.meta.product) {
    //     renderButton(data);
    //     document.getElementsByTagName("select")[0].onchange = function () {
    //       renderButton(data);
    //       getProduct();
    //     };
    //   }
    // }
  }
  // console.log(wish_list);
  // console.log(product_db);
}

function getCustomer_wishlist(data, Customer_data, customer_id, isUpdate,new_customer_id) {
  let bodyObj = Customer_data.customer;
  bodyObj.isUpdate = isUpdate;
  bodyObj.new_customer_id = new_customer_id;
  bodyObj.product_ids = JSON.parse(window.localStorage.getItem("wish_list"));
  bodyObj.product_data = JSON.parse(window.localStorage.getItem("product_db"));

  console.log(JSON.parse(window.localStorage.getItem("wish_list")));
  console.log(JSON.parse(window.localStorage.getItem("product_db")));


  fetch(`${serverUrl}/list_db/${window.location.hostname}/${customer_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(bodyObj),
  }).then((res) => {
    res.json().then((Customer_wishlist) => {
      if (
        Customer_wishlist.product_ids.length > 0 &&
        Customer_wishlist.product_data.length > 0
      ) {
        wish_list = Customer_wishlist.product_ids;
        product_db = Customer_wishlist.product_data;
        //! Existing Issue: when customer adds a item in logged in mode and then logs out, that product isnt added to local wishlist
        //saving the items added to db as new local wishlist
        window.localStorage.setItem("wish_list", JSON.stringify(wish_list));
        window.localStorage.setItem("product_db", JSON.stringify(product_db));
      } else {
        console.log("customer is new or have empty list");
        if (
          window.localStorage.getItem("wish_list") &&
          window.localStorage.getItem("product_db")
        ) {
          wish_list = JSON.parse(window.localStorage.getItem("wish_list"));
          product_db = JSON.parse(window.localStorage.getItem("product_db"));
          console.log("got list");
          fetch(
            `${serverUrl}/list_db/${window.location.hostname}/${customer_id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify({
                product_ids: wish_list,
                product_data: product_db,
              }),
            }
          ).then((res) => {
            res.json().then((Customer_data) => {
              // console.log(Customer_data);
            });
          });
        }
      }
      // console.log(Customer_wishlist);
      // console.log(wish_list);
      // console.log(product_db);
      renderItems(data);

      if (window.location.pathname === "/") { //condition to check whether we are on homepage, some themes render products on this page too, hence we do our best
        renderHeartCatalog(data);
      }
        if (window.meta && window.meta.page.pageType === "collection") {
          renderHeartCatalog(data);
        }
      if (window.meta && window.meta.product) {
        renderButton(data);
        renderHeartCatalog(data);
        // console.log(
        //   "🚀 ~ file: wishlist-rendering.js ~ line 148 ~ res.json ~ renderHeartCatalog"
        // );
        // document.getElementsByTagName("select")[0].onchange = function () {
        //   renderButton(data);

        //   getProduct();
        // };
        document.querySelectorAll('select').forEach(each => {
          each.addEventListener('input', () => {
            renderButton(data);

              getProduct();
          })
        })
      }
    });
  });
}

function renderHeartCatalog(data) { //collection page heart icon rendering
  var products_catalog = document.querySelectorAll(
    "button.button_wish_catalog"
  );
  for (var i = 0; i < products_catalog.length; i++) {
    var inlist_index = wish_list.indexOf(
      products_catalog[i].getAttribute("id")
    );
    if (inlist_index > -1) {
      if (data.CataIconType == "10") {
        products_catalog[
          i
        ].innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>`;
        products_catalog[i].style.color = `${data.CataIconColor}`;
      }
      if (data.CataIconType == "11") {
        products_catalog[
          i
        ].innerHTML = `<i class="fa fa-star" aria-hidden="true"></i>`;
        products_catalog[i].style.color = `${data.CataIconColor}`;
      }
      if (data.CataIconType == "12") {
        products_catalog[
          i
        ].innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`;
        products_catalog[i].style.color = `${data.CataIconColor}`;
      }
      if (data.CataIconType == "13") {
        products_catalog[
          i
        ].innerHTML = `<i class="fa fa-bookmark" aria-hidden="true"></i>`;
        products_catalog[i].style.color = `${data.CataIconColor}`;
      }
    } else {
      if (data.CataIconType == "10") {
        products_catalog[
          i
        ].innerHTML = `<i class="fa fa-heart-o" aria-hidden="true"></i>`;
        products_catalog[i].style.color = `${data.CataIconColor}`;
      }
      if (data.CataIconType == "11") {
        products_catalog[
          i
        ].innerHTML = `<i class="fa fa-star-o" aria-hidden="true"></i>`;
        products_catalog[i].style.color = `${data.CataIconColor}`;
      }
      if (data.CataIconType == "12") {
        products_catalog[
          i
        ].innerHTML = `<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>`;
        products_catalog[i].style.color = `${data.CataIconColor}`;
      }
      if (data.CataIconType == "13") {
        products_catalog[
          i
        ].innerHTML = `<i class="fa fa-bookmark-o" aria-hidden="true"></i>`;
        products_catalog[i].style.color = `${data.CataIconColor}`;
      }
    }
    products_catalog[i].addEventListener("click", function () {
      //   console.clear();
      inlist_index = wish_list.indexOf(this.getAttribute("id"));
      //   console.log("You clicked:", this.getAttribute('id') + " " + this.getAttribute('data-product-name') + " " + this.getAttribute('data-variant-name'));
      variant_id = this.getAttribute("id");
      variant_data =
        this.getAttribute("data-product-name") +
        " - " +
        this.getAttribute("data-variant-name");
      if (inlist_index == -1) {
        add_variant();
        if (data.CataIconType == "10") {
          this.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>`;
          this.style.color = `${data.CataIconColor}`;
        }
        if (data.CataIconType == "11") {
          this.innerHTML = `<i class="fa fa-star" aria-hidden="true"></i>`;
          this.style.color = `${data.CataIconColor}`;
        }
        if (data.CataIconType == "12") {
          this.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`;
          this.style.color = `${data.CataIconColor}`;
        }
        if (data.CataIconType == "13") {
          this.innerHTML = `<i class="fa fa-bookmark" aria-hidden="true"></i>`;
          this.style.color = `${data.CataIconColor}`;
        }
      } else {
        delete_variant();
        if (data.CataIconType == "10") {
          this.innerHTML = `<i class="fa fa-heart-o" aria-hidden="true"></i>`;
          this.style.color = `${data.CataIconColor}`;
        }
        if (data.CataIconType == "11") {
          this.innerHTML = `<i class="fa fa-star-o" aria-hidden="true"></i>`;
          this.style.color = `${data.CataIconColor}`;
        }
        if (data.CataIconType == "12") {
          this.innerHTML = `<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>`;
          this.style.color = `${data.CataIconColor}`;
        }
        if (data.CataIconType == "13") {
          this.innerHTML = `<i class="fa fa-bookmark-o" aria-hidden="true"></i>`;
          this.style.color = `${data.CataIconColor}`;
        }
      }
    });
  }
}
//get product with variant id on click of heart button
function getProduct() {
  setTimeout(() => {
    var urlParams = new URLSearchParams(window.location.search);
    var myParam = urlParams.get("variant");
    console.log(myParam);
    if (myParam) {
      variant_id = myParam;
    } else {
      variant_id = window.meta.product.variants[0].id.toString();
    }
    // console.log(variant_id + " got");
    var i;
    var array = window.meta.product.variants;
    for (i = 0; i < array.length; i++) {
      if (array[i].id == variant_id) {
        variant_data = array[i].name;
        break;
      }
    }
  },500)
  
}

function startWishlist() {
  //fetch shop owner design settings
  console.log("in start");
  // console.log("🚀 ~ file: wishlist-rendering.js ~ line 286 ~ startWishlist ~ window.location.hostname", window.location.hostname)
  // console.log("🚀 ~ file: wishlist-rendering.js ~ line 285 ~ startWishlist ~ serverUrl", serverUrl)
  // console.log(`🚀 ~ file: wishlist-rendering.js ~ line 284 ~ startWishlist ~ ${serverUrl}/db/save/${window.location.hostname}`)
  fetch(`${serverUrl}/db/save/${window.location.hostname}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
    .then(function (response) {
      // The API call was successful!
      response.json().then(function (data) {
      // console.log("🚀 ~ file: wishlist-rendering.js ~ line 292 ~ data", data)
        
        // This is the JSON from our response
        if (data.Active) {
          // console.log(
          //   "🚀 ~ file: wishlist-rendering.js ~ line 296 ~ data.Active",
          //   data.Active
          // );
          //wishlist button
          let wishlistButton = document.createElement("div");
          wishlistButton.innerHTML = `<div id="heart_btn" style="position: fixed;right: 2em;bottom: 2em;border: 3px solid grey;
    border-radius: 100%;
    padding: 0.8em;">
</div>`;
          document.body.appendChild(wishlistButton);

          Customer_data_call(data);
          render_heart(data);
          // if (window.meta && window.meta.product){
          //     renderButton(data);
          //     document.getElementsByTagName('select')[0].onchange = function() {
          //         renderButton(data);
          //         getProduct();
          //     }
          // }
        }
      });
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
}
  // console.log("🚀 ~ file: wishlist-rendering.js ~ line 318 ~ startWishlist ~ window.location.hostname", window.location.hostname)
  // console.log("🚀 ~ file: wishlist-rendering.js ~ line 318 ~ startWishlist ~ window.location.hostname", window.location.hostname)
  // console.log("🚀 ~ file: wishlist-rendering.js ~ line 318 ~ startWishlist ~ window.location.hostname", window.location.hostname)

function render_heart(data) {
  // console.log("🚀 ~ file: wishlist-rendering.js ~ line 317 ~ Inside render_heart ~ render_heart")
  const wishlistUI = `<style>
    body {font-family: Arial, Helvetica, sans-serif;}
    
    /* The Modal (background) */
    .modal_wishlist {
      display: none; 
      position: fixed; 
      z-index: 99; 
      left: 0;
      top: 0;
      padding-top: 10em;
      width: 100%; 
      height: 100%; 
      overflow: auto; 
      background-color: rgb(0,0,0); 
      background-color: rgba(0,0,0,0.4); 
    }
    
    /* Modal Content */
    .modal-content {
      position: relative;
      background-color: #fefefe;
      border-radius: 10px;
      margin: auto;
      padding: 0;
      border: 1px solid #888;
      width: 80%;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
      -webkit-animation-name: animatetop;
      -webkit-animation-duration: 0.4s;
      animation-name: animatetop;
      animation-duration: 0.4s
    }
    
    /* Add Animation */
    @-webkit-keyframes animatetop {
      from {top:-300px; opacity:0} 
      to {top:0; opacity:1}
    }
    
    @keyframes animatetop {
      from {top:-300px; opacity:0}
      to {top:0; opacity:1}
    }
    
    /* The Close Button */
    .superAssistant-Wishlist-Close {
      /* color: white; */
      float: right;
      font-size: 28px;
      font-weight: bold;
      /* padding-block: 0.6em; */
    }
    
    .superAssistant-Wishlist-Close:hover,
    .superAssistant-Wishlist-Close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
    
    .modal-header {
      padding: 1em;
      /* background-color:  ${data.CartColor}; */
      border-top-right-radius: 9px;
    border-top-left-radius: 9px;
    }
    
    .modal-body {padding: 2px 16px; height: 88.6%;min-height: 20vh;}

    .product_card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    margin: 1em;
    width: 150px;
    position:relative
    
    }
    
    .product_card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
    }
    
    .prod_img {
        border-radius: 5px 5px 0 0;
        width:100%;
        height:150px;
    }
    
    .card_container {
        padding-inline: 0.4em;
    }
    .addtocart_btn:hover{
        cursor: pointer;
    }
    
    .addtocart_btn {
        background-color: ${data.CartColor};
        color: white;
        width: 100%;
        padding: 5px;
        font-size: 16px;
        text-align: center;
        border-radius: 0px 0px 5px 5px;
    }
    .outofstock_btn {
        background-color: #565350;
        color: white;
        width: 100%;
        padding: 5px;
        font-size: 16px;
        text-align: center;
        border-radius: 0px 0px 5px 5px;
    }
    .button_wishlistUI { 
        background-color: transparent; 
        border: none; 
        position: absolute; 
        margin-top: 3px;
        font-size: 16px;
        z-index:999
    }
    .button_wishlistUI:hover{
        cursor: pointer;
    }

    .modal-menu{
        float: right;
    	padding: 8px;
    	margin-right: 15px;
    }

    .SuperAssistant-ribbon {
  position: absolute;
  right: -5px; top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px; height: 75px;
  text-align: right;
}
.SuperAssistant-ribbon span {
  font-size: 10px;
  font-weight: bold;
  color: #FFF;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #79A70A;
  background: linear-gradient(#161CC9 0%, #0C35A7 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px; right: -21px;
}
.SuperAssistant-ribbon span::before {
  content: "";
  position: absolute; left: 0px; top: 100%;
  z-index: -1;
  border-left: 3px solid #0C35A7;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #0C35A7;
}
.SuperAssistant-ribbon span::after {
  content: "";
  position: absolute; right: 0px; top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #0C35A7;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #0C35A7;
}
    

    </style>
    
    
    <!-- The Modal -->
    <div id="myModal" class="modal_wishlist">
    
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="superAssistant-Wishlist-Close">&times;</span>
          <h2 style="/*color: white; */text-align:center">WISHLIST</h2>
        </div>
        <div class="modal-body">
            <div style="display: flex; flex-wrap: wrap; " id="wishlist_grid">
            </div>
            <div id='emptyMessage' style=" margin: auto; text-align: center; padding: 10vh 0; ">No products were added to the wishlist. <br/> Continue Shopping !!</div>
        </div>
      </div>
    
    </div>`;

  const heart_button = `<style>
    .heart_wish {
    background-color: transparent;
    border: none;
    text-align: center;
    font-size: 1.5em;
    color: ${data.CataIconColor};
    }
    </style>
    <button id='myBtn' class='heart_wish'><i class='fa fa-heart fa-2x' aria-hidden='true'></i></button>`;

  const star_button = `<style>
    .heart_wish {
    background-color: transparent;
    border: none;
    text-align: center;
    font-size: 1.5em;
    color: ${data.CataIconColor};
    }
    </style>
    <button id='myBtn' class='heart_wish'><i class="fa fa-star fa-2x" aria-hidden="true"></i></button>`;

  const thumbsup_button = `<style>
    .heart_wish {
    background-color: transparent;
    border: none;
    text-align: center;
    font-size: 1.5em;
    color: ${data.CataIconColor};
    }
    </style>
    <button id='myBtn' class='heart_wish'><i class="fa fa-thumbs-up fa-2x" aria-hidden="true"></i></button>`;

  const bookmark_button = `<style>
    .heart_wish {
    background-color: transparent;
    border: none;
    text-align: center;
    font-size: 1.5em;
    color: ${data.CataIconColor};
    }
    </style>
    <button id='myBtn' class='heart_wish'><i class="fa fa-bookmark fa-2x" aria-hidden="true"></i></button>`;

  if (data.CataIconType == "10") {
    document.querySelector("#heart_btn").innerHTML = heart_button;
  }
  if (data.CataIconType == "11") {
    document.querySelector("#heart_btn").innerHTML = star_button;
  }
  if (data.CataIconType == "12") {
    document.querySelector("#heart_btn").innerHTML = thumbsup_button;
  }
  if (data.CataIconType == "13") {
    document.querySelector("#heart_btn").innerHTML = bookmark_button;
  }

  document.querySelector("head").insertAdjacentHTML("afterend", wishlistUI);

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("superAssistant-Wishlist-Close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  if (document.getElementById("wishlist_grid").innerHTML == "") {
    document.getElementById("emptyMessage").style.display = "block";
    return;
  } else {
    document.getElementById("emptyMessage").style.display = "none";
    return;
  }
}

function renderItems(data) {
  const shop_name = window.location.hostname;

  for (var i = 0; i < wish_list.length; i++) {
    var variantid = wish_list[i];
    // console.log("variantid-top", variantid);
    fetch(`https://${shop_name}/admin/api/2021-04/variants/${variantid}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }).then((res) => {
      // console.log("variantid-middle", variantid);
      res.json().then((variantData) => {
        // console.log(variantData.variant);
        
        const productid = variantData.variant.product_id;
        const variantTitle = variantData.variant.title;
        let variantPrice = `<span style='color:${data.CartColor};font-weight: 600;'>${variantData.variant.price}</span>`;
        const inventory_quantity = variantData.variant.inventory_quantity;
        fetch(
          `https://${shop_name}/admin/api/2021-04/products/${productid}.json`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        )
          .then((res) => {
            res.json().then((productData) => {
              // console.log("variantid-bottom", variantid);
              // console.log("variantid", variantData.variant.id);
              variantid = variantData.variant.id;
              // console.log(variantData.variant);
              // console.log(productData.product);

              //for showing sale
              let saleDiv = "";
              if (variantData.variant.compare_at_price !== null) {
                saleDiv = `<div class="SuperAssistant-ribbon"><span>Sale</span></div>`;
                  // '<div style="position: absolute;right:0.5em;top: 0.5em;background-color:#007bff;color: white;padding: 0.5em;border-radius: 20px;letter-spacing: 1px;"><p style="margin:0">Sale</p></div>';
                variantPrice = `<del style="color: grey; font-weight: 600">
    ${variantData.variant.compare_at_price} </del>
  <ins style="text-decoration: none; color:${data.CartColor} ; font-weight: 600">
    ${variantData.variant.price}
  </ins>`;
              }

              const productTitle = productData.product.title;
              const productImg = findImage(
                variantData.variant.image_id,
                productData.product.images
              );
              const productHandle = productData.product.handle;
              const productUrl = `https://${shop_name}/products/${productHandle}`;
              if (data.CataIconType == "10")
                var remove_wishlist = `<i class="fa fa-heart" aria-hidden="true"></i>`;
              if (data.CataIconType == "11")
                var remove_wishlist = `<i class="fa fa-star" aria-hidden="true"></i>`;
              if (data.CataIconType == "12")
                var remove_wishlist = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`;
              if (data.CataIconType == "13")
                var remove_wishlist = `<i class="fa fa-bookmark" aria-hidden="true"></i>`;
              const productCard = `<div class="product_card" id="${productTitle} - ${variantTitle}">
                                                <button id="${variantid}" style="color:${data.CataIconColor}" data-item="${productTitle} - ${variantTitle}" class="button_wishlistUI">
                                                    ${remove_wishlist}
                                                </button>
                                                ${saleDiv}
                                                <a href="${productUrl}" style="text-decoration: none; color:black;">
                                                    <img src="${productImg}" class="prod_img" alt="${productTitle}">
                                                    <div class="card_container">
                                                        <div style="display: flow-root;">
                                                            <h6 style="display: flex;
                                                            flex-direction: row;
                                                            height: 3vh;
                                                            overflow: hidden;"><b>${productTitle}</b></h6> 
                                                            <p>${variantTitle}</p> 
                                                        </div>
                                                        <p>Price:(${Shopify.currency.active})<br>${variantPrice}</p> 
                                                    </div>
                                                </a>
                                                <div id="${variantid}" data-item="${productTitle} - ${variantTitle}" class="addtocart_btn">
                                                    ${data.CartLabelBefore}
                                                </div>
                                            </div>`;
              const CartItemCard = `<div class="product_card" id="${productTitle} - ${variantTitle}">
                                                <button id="${variantid}" style="color:${data.CataIconColor}" data-item="${productTitle} - ${variantTitle}" class="button_wishlistUI">
                                                    ${remove_wishlist}
                                                </button>
                                                <a href="${productUrl}" style="text-decoration: none; color:black;">
                                                    <img src="${productImg}" class="prod_img" alt="${productTitle}">
                                                    <div class="card_container">
                                                        <div style="display: flow-root;">
                                                            <h6 style="display: flex;
                                                            flex-direction: row;
                                                            height: 3vh;
                                                            overflow: hidden;"><b>${productTitle}</b></h6> 
                                                            <p>${variantTitle}</p> 
                                                        </div>
                                                        <p>Price: ${variantPrice}</p> 
                                                    </div>
                                                </a>
                                                <div id="${variantid}" data-item="${productTitle} - ${variantTitle}" class="addtocart_btn">
                                                    ${data.CartLabelAfter}
                                                </div>
                                            </div>`;
              const OutofStockCard = `<div class="product_card" id="${productTitle} - ${variantTitle}">
                                                <button id="${variantid}" style="color:${data.CataIconColor}" data-item="${productTitle} - ${variantTitle}" class="button_wishlistUI">
                                                    ${remove_wishlist}
                                                </button>
                                                <a href="${productUrl}" style="text-decoration: none; color:black;">
                                                    <img src="${productImg}" class="prod_img" alt="${productTitle}">
                                                    <div class="card_container">
                                                        <div style="display: flow-root;">
                                                            <h6 style="display: flex;
                                                            flex-direction: row;
                                                            height: 3vh;
                                                            overflow: hidden;"><b>${productTitle}</b></h6> 
                                                            <p>${variantTitle}</p> 
                                                        </div>
                                                        <p>Price: ${variantPrice}</p> 
                                                    </div>
                                                </a>
                                                <div id="${variantid}" data-item="${productTitle} - ${variantTitle}" class="outofstock_btn">
                                                    OUT OF STOCK
                                                </div>
                                            </div>`;
              if (inventory_quantity > 0) {
                document.getElementById("wishlist_grid").innerHTML +=
                  productCard;
              } else
                document.getElementById("wishlist_grid").innerHTML +=
                  OutofStockCard;
              // console.log("added" + i);
              buttonMethods(data);
            });
          })
          .then(() => {});
      });
    });
  }
  
}

fetch(`https://${window.location.hostname}/cart.js`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
}).then((res) => {
    res.json().then((cartData) => {
      // console.log(cartData);
    for (var i = 0; i < cartData.items.length; i++) {
      cart_items.push(cartData.items[i].variant_id.toString());
    }
        
    // console.log(cart_items);
  });
});

function buttonMethods(data) {
  var remove_btn = document.querySelectorAll("button.button_wishlistUI");
  for (var i = 0; i < remove_btn.length; i++) {
    remove_btn[i].addEventListener("click", function () {
      console.clear();
      // console.log("You clicked remove:", this.getAttribute("id"));
      variant_id = this.getAttribute("id");
      variant_data = this.getAttribute("data-item");
      document.getElementById(`${variant_data}`).remove();
      if (document.getElementById("wishlist_grid").innerHTML == "") {
        document.getElementById("emptyMessage").style.display = "block";
      } else {
        document.getElementById("emptyMessage").style.display = "none";
      }
      delete_variant();
    });
  }
  var cart_btn = document.querySelectorAll("div.addtocart_btn");
  for (var i = 0; i < cart_btn.length; i++) {
    cart_btn[i].addEventListener("click", function () {
      console.clear();
      // console.log("You clicked add to cart:", this.getAttribute("data-item"));
      addtocart(this.getAttribute("id"));
      this.innerHTML = data.CartLabelAfter;
    });
  }

  cartCheck(data);
}

function cartCheck(data) {
  var cart_btn = document.querySelectorAll("div.addtocart_btn");
  for (var i = 0; i < cart_btn.length; i++) {
    var incart = cart_items.indexOf(cart_btn[i].getAttribute("id"));
    if (incart > -1) {
      cart_btn[i].innerHTML = data.CartLabelAfter;
      // console.log(cart_items.indexOf(cart_btn[i].getAttribute("id")));
      console.log("already present in cart " + cart_btn[i].getAttribute("id"));
    } else {
      cart_btn[i].innerHTML = data.CartLabelBefore;
      // console.log("not here");
    }
  }
}

function addtocart(id) {
  const shop_name = window.location.hostname;
  const ID = parseInt(id);
  let formData = {
    items: [
      {
        id: ID,
        quantity: 1,
      },
    ],
  };

  fetch(`https://${shop_name}/cart/add.js`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      // console.log("added" + response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function renderButton(data) {
  setTimeout(() => {
    var urlParams = new URLSearchParams(window.location.search);
    var myParam = urlParams.get("variant");
    console.log(
      "🚀 ~ file: wishlist-rendering.js ~ line 914 ~ renderButton ~ myParam",
      myParam
    );
    if (myParam) {
      variant_id = myParam;
    } else {
      variant_id = window.meta.product.variants[0].id.toString();
    }
    // console.log(variant_id);

    // console.log(wish_list);

    if (wish_list.indexOf(variant_id) >= 0) var in_list = true;
    else var in_list = false;
    // console.log(wish_list.indexOf(variant_id));
    // console.log(in_list);

    var Value = data.ButtonType;

    if (!in_list) {
      var color_Btn = data.ColorBeforeButton;
      var label_Btn = data.LabelBeforeButton;
      if (data.IconType == "6")
        var icon_Btn = `<i class="fa fa-heart-o" aria-hidden="true"></i>`;
      if (data.IconType == "7")
        var icon_Btn = `<i class="fa fa-star-o" aria-hidden="true"></i>`;
      if (data.IconType == "8")
        var icon_Btn = `<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>`;
      if (data.IconType == "9")
        var icon_Btn = `<i class="fa fa-bookmark-o" aria-hidden="true"></i>`;
    } else {
      var color_Btn = data.ColorAfterButton;
      var label_Btn = data.LabelAfterButton;
      if (data.IconType == "6")
        var icon_Btn = `<i class="fa fa-heart" aria-hidden="true"></i>`;
      if (data.IconType == "7")
        var icon_Btn = `<i class="fa fa-star" aria-hidden="true"></i>`;
      if (data.IconType == "8")
        var icon_Btn = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`;
      if (data.IconType == "9")
        var icon_Btn = `<i class="fa fa-bookmark" aria-hidden="true"></i>`;
    }

    const wish_button_1 = `<style>
    .button_wish_1 {
    background-color: ${color_Btn};
    border: none;
    color: white;
    padding: 7px 14px;
    width: 100%;
    text-align: center;
    display: inline-block;
    }
    </style>
    <button  id='wish_btn' class="button_wish_1">${label_Btn}</button>`;

    const wish_button_2 = `<style>
    .button_wish_2 {
    background-color: ${color_Btn};
    border: none;
    color: white;
    padding: 7px 14px;
    width: 100%;
    text-align: center;
    display: inline-block;
    }
    </style>
    <button  id="wish_btn" class="button_wish_2">${icon_Btn}      ${label_Btn}</button>`;

    const wish_button_3 = `<style>
    .button_wish_3 {
    background-color: transparent;
    border: none;
    color: ${color_Btn};
    padding: 7px 14px;
    width: 100%;
    text-align: center;
    display: inline-block;
    }
    </style>
    <button  id="wish_btn" class="button_wish_3">${label_Btn}</button>`;

    const wish_button_4 = `<style>
    .button_wish_4 {
    background-color: transparent;
    border: none;
    color: ${color_Btn};
    padding: 7px 14px;
    width: 100%;
    text-align: center;
    display: inline-block;
    }
    </style>
    <button  id="wish_btn" class="button_wish_4">${icon_Btn}      ${label_Btn}</button>`;

    const wish_button_5 = `<style>
    .button_wish_5 {
    background-color: transparent;
    border: none;
    color: ${color_Btn};
    padding: 7px 14px;
    width: 100%;
    text-align: center;
    display: inline-block;
    font-size: 24px;
    }
    </style>
    <button  id="wish_btn" class="button_wish_5">${icon_Btn}</button>`;

    initWishlist(
      Value,
      wish_button_1,
      wish_button_2,
      wish_button_3,
      wish_button_4,
      wish_button_5,
      in_list,
      data,
      color_Btn,
      label_Btn
    );
  },500)

  
}

function initWishlist(
  Value,
  wish_button_1,
  wish_button_2,
  wish_button_3,
  wish_button_4,
  wish_button_5,
  in_list,
  data,
  color_Btn,
  label_Btn
) {
  if (Value == "1")
    document.querySelector("#wish_btn_product").innerHTML = wish_button_1;

  if (Value == "2")
    document.querySelector("#wish_btn_product").innerHTML = wish_button_2;

  if (Value == "3")
    document.querySelector("#wish_btn_product").innerHTML = wish_button_3;

  if (Value == "4")
    document.querySelector("#wish_btn_product").innerHTML = wish_button_4;

  if (Value == "5")
    document.querySelector("#wish_btn_product").innerHTML = wish_button_5;

  document.getElementById("wish_btn").addEventListener("click", (event) => {
    if (!in_list) {
      add_variant();
      in_list = !in_list;
      changeButton(data, in_list);
    } else {
      delete_variant();
      in_list = !in_list;
      changeButton(data, in_list);
    }
  });
  // document
  //   .getElementById("ProductSelect-product-template")
  //   .addEventListener("change", (event) => {
  //     var urlParams = new URLSearchParams(window.location.search);
  //     var myParam = urlParams.get("variant");
  //     if (myParam) {
  //       variant_id = myParam;
  //     } else {
  //       variant_id = window.meta.product.variants[0].id.toString();
  //     }
  //     // console.log(variant_id + "  On Prodct Page" + " in form change");

  //     if (wish_list.indexOf(variant_id)) var in_list = true;
  //     else var in_list = false;

  //     changeButton(data, in_list);
  //   });
}

function add_variant() {
  wish_list.push(variant_id);
  product_db.push(variant_data);
  // console.log(wish_list);
  // console.log(product_db);
  if (!window.meta.page.customerId) {
    window.localStorage.setItem("wish_list", JSON.stringify(wish_list));
    window.localStorage.setItem("product_db", JSON.stringify(product_db));
    fetch(
      `${serverUrl}/list_db/${
        window.location.hostname
      }/${window.localStorage.getItem(
        "wish_list_customer_id"
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          product_ids: wish_list,
          product_data: product_db,
        }),
      }
    ).then((res) => {
      res.json().then((Customer_data) => {
        // console.log(Customer_data);
      });
    });

  } else {
    fetch(
      `${serverUrl}/list_db/${window.location.hostname}/${window.meta.page.customerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          product_ids: wish_list,
          product_data: product_db,
        }),
      }
    ).then((res) => {
      res.json().then((Customer_data) => {
        // console.log(Customer_data);
      });
    });
  }
}

function delete_variant() {
  wish_list.splice(wish_list.indexOf(variant_id), 1);
  product_db.splice(product_db.indexOf(variant_data), 1);
  // console.log(wish_list);
  // console.log(product_db);
  if (!window.meta.page.customerId) {
    window.localStorage.setItem("wish_list", JSON.stringify(wish_list));
    window.localStorage.setItem("product_db", JSON.stringify(product_db));
    fetch(
      `${serverUrl}/list_db/${
        window.location.hostname
      }/${window.localStorage.getItem("wish_list_customer_id")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          product_ids: wish_list,
          product_data: product_db,
        }),
      }
    ).then((res) => {
      res.json().then((Customer_data) => {
        // console.log(Customer_data);
      });
    });
  } else {
    window.localStorage.setItem("wish_list", JSON.stringify(wish_list));
    window.localStorage.setItem("product_db", JSON.stringify(product_db));
    fetch(
      `${serverUrl}/list_db/${window.location.hostname}/${window.meta.page.customerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          product_ids: wish_list,
          product_data: product_db,
        }),
      }
    ).then((res) => {
      res.json().then((Customer_data) => {
        // console.log(Customer_data);
      });
    });
  }
}

function changeButton(data, in_list) {
  // console.log(in_list);
  var btn = document.getElementById("wish_btn");
  if (in_list) {
    if (data.ButtonType == "1") {
      btn.style.backgroundColor = `${data.ColorAfterButton}`;
      btn.innerHTML = `${data.LabelAfterButton}`;
    }
    if (data.ButtonType == "2") {
      btn.style.backgroundColor = `${data.ColorAfterButton}`;
      if (data.IconType == "6")
        btn.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
      if (data.IconType == "7")
        btn.innerHTML = `<i class="fa fa-star" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
      if (data.IconType == "8")
        btn.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
      if (data.IconType == "9")
        btn.innerHTML = `<i class="fa fa-bookmark" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
    }
    if (data.ButtonType == "3") {
      btn.style.color = `${data.ColorAfterButton}`;
      btn.innerHTML = `${data.LabelAfterButton}`;
    }
    if (data.ButtonType == "4") {
      btn.style.color = `${data.ColorAfterButton}`;
      if (data.IconType == "6")
        btn.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
      if (data.IconType == "7")
        btn.innerHTML = `<i class="fa fa-star" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
      if (data.IconType == "8")
        btn.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
      if (data.IconType == "9")
        btn.innerHTML = `<i class="fa fa-bookmark" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
    }
    if (data.ButtonType == "5") {
      btn.style.color = `${data.ColorAfterButton}`;
      if (data.IconType == "6")
        btn.innerHTML = `<i class="fa fa-heart" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
      if (data.IconType == "7")
        btn.innerHTML = `<i class="fa fa-star" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
      if (data.IconType == "8")
        btn.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
      if (data.IconType == "9")
        btn.innerHTML = `<i class="fa fa-bookmark" aria-hidden="true"></i>     ${data.LabelAfterButton}`;
    }
  } else {
    if (data.ButtonType == "1") {
      btn.style.backgroundColor = `${data.ColorBeforeButton}`;
      btn.innerHTML = `${data.LabelBeforeButton}`;
    }
    if (data.ButtonType == "2") {
      btn.style.backgroundColor = `${data.ColorBeforeButton}`;
      if (data.IconType == "6")
        btn.innerHTML = `<i class="fa fa-heart-o" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
      if (data.IconType == "7")
        btn.innerHTML = `<i class="fa fa-star-o" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
      if (data.IconType == "8")
        btn.innerHTML = `<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
      if (data.IconType == "9")
        btn.innerHTML = `<i class="fa fa-bookmark-o" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
    }
    if (data.ButtonType == "3") {
      btn.style.color = `${data.ColorBeforeButton}`;
      btn.innerHTML = `${data.LabelBeforeButton}`;
    }
    if (data.ButtonType == "4") {
      btn.style.color = `${data.ColorBeforeButton}`;
      if (data.IconType == "6")
        btn.innerHTML = `<i class="fa fa-heart-o" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
      if (data.IconType == "7")
        btn.innerHTML = `<i class="fa fa-star-o" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
      if (data.IconType == "8")
        btn.innerHTML = `<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
      if (data.IconType == "9")
        btn.innerHTML = `<i class="fa fa-bookmark-o" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
    }
    if (data.ButtonType == "5") {
      btn.style.color = `${data.ColorBeforeButton}`;
      if (data.IconType == "6")
        btn.innerHTML = `<i class="fa fa-heart-o" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
      if (data.IconType == "7")
        btn.innerHTML = `<i class="fa fa-star-o" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
      if (data.IconType == "8")
        btn.innerHTML = `<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
      if (data.IconType == "9")
        btn.innerHTML = `<i class="fa fa-bookmark-o" aria-hidden="true"></i>     ${data.LabelBeforeButton}`;
    }
  }
  // console.log("btn changed");
}
