window.onload = () => {
  // console.log("heyy");
  for (let i = 0; i < products.length; i++) {
      let result = findPriceRule(
        products[i].originalProductQuantity,
        products[i].productId
      );
      console.log(result);
      let originalPrice = products[i].price;
    let discountedPrice = Math.round(
      (parseInt(originalPrice) * parseInt(products[i].originalProductQuantity) -
        parseInt(result)) /
        parseInt(products[i].originalProductQuantity)
    );
   //Price Div
      if (discountedPrice === parseInt(originalPrice)) {
        products[i].priceDiv.insertAdjacentHTML(
          "afterend",
          `<p>${originalPrice}</p>`
        );
      } else {
        products[i].priceDiv.insertAdjacentHTML(
          "afterend",
          `<p>${discountedPrice}</p>`
        );
    }
    //Total Price
    let originalTotalPrice = products[i].totalPrice;
        let discountedTotalPrice =
          parseInt(originalPrice) *
            parseInt(products[i].originalProductQuantity) -
        parseInt(result);
    console.log(discountedTotalPrice);
    if (discountedTotalPrice === parseInt(originalTotalPrice)) {
      products[
        i
      ].totalPriceDiv.innerHTML = `<ins style="text-decoration:none">Rs. ${String(
        discountedTotalPrice
      )}.00</ins>`;
    } else {
      products[
        i
      ].totalPriceDiv.innerHTML = `<del>Rs. ${originalTotalPrice}</del> <ins style="text-decoration:none">Rs. ${String(
        discountedTotalPrice
      )}.00</ins>`;
    }
    
      // products[i].priceDiv;
  }
  let discount = 0;
  changedQuantity = [];
  for (let i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
    var id = arr[i].id.split("_");
    let productId = id[id.length - 1].split(":")[0];
      changedQuantity.push({
        value: arr[i].value,
        productId: productId,
        individualPrice: products[i].price,
      });
  }
  // console.log(changedQuantity);
  var finalSubTotal = 0;
  changedQuantity.forEach((product) => {
    //   console.log(product);
    let result = findPriceRule(product.value, product.productId);
    //   console.log(result);
    discount += parseInt(result);
    finalSubTotal +=
      parseInt(product.individualPrice) * parseInt(product.value);
  });
  // console.log(discount);
  // console.log(finalSubTotal);

  var finalPrice = finalSubTotal - discount;
  console.log(finalPrice);
  if (finalPrice === finalSubTotal) {
    subTotal_Location.innerHTML = `<ins style="text-decoration:none">Rs. ${String(
      finalPrice
    )}</ins>`;
  } else {
    subTotal_Location.innerHTML = `<del>Rs. ${finalSubTotal}</del> <ins style="text-decoration:none">Rs. ${String(
      finalPrice
    )}</ins>`;
  }
};

let Discounts = [
  {
    TierName: "Diwali",
    PriceRules: [
      {
        Quantity: "3",
        ApplicableDiscount: "20",
        DiscountType: "INR",
      },
      {
        Quantity: "4",
        ApplicableDiscount: "40",
        DiscountType: "INR",
      },
    ],
    ProductIds: ["39484974792875", "39462533071019", "39462528254123"],
  },
  {
    TierName: "SummerSale",
    PriceRules: [
      {
        Quantity: "5",
        ApplicableDiscount: "60",
        DiscountType: "INR",
      },
      {
        Quantity: "6",
        ApplicableDiscount: "80",
        DiscountType: "INR",
      },
    ],
    ProductIds: ["39484974792875"],
  },
  {
    TierName: "WinterSale",
    PriceRules: [
      {
        Quantity: "7",
        ApplicableDiscount: "90",
        DiscountType: "INR",
      },
    ],
    ProductIds: ["39462528254123"],
  },
  {
    TierName: "WinterSale",
    PriceRules: [
      {
        Quantity: "3",
        ApplicableDiscount: "50",
        DiscountType: "INR",
      },
    ],
    ProductIds: ["39484974792875"],
  },
];

var subTotal_Location = document.querySelector(".cart-subtotal__price");
var subTotal_Value = subTotal_Location.innerHTML;
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



// checkoutButton[0].type = 'button';

checkoutButton[0].onclick = (e) => {
  e.preventDefault();
  console.log("clicked");
};

console.log(checkoutButton);
// console.log(inputArray);

inputArray.forEach((each) => {
  each.addEventListener("input", inputEvent);
});

let changedQuantity = [];

function inputEvent(e) {
  // console.log(e);
  var Id = e.target.id.split("_");
  let changedProductId = Id[Id.length - 1].split(":")[0];
  for (let i = 0; i < products.length; i++) {
    if (products[i].productId === changedProductId) {
      let result = findPriceRule(e.target.value, changedProductId);
      console.log(result);
      let originalPrice = products[i].price;
      let discountedPrice = Math.round(
        (parseInt(originalPrice) *
          parseInt(products[i].originalProductQuantity) -
          parseInt(result)) /
          parseInt(products[i].originalProductQuantity)
      );
      if (discountedPrice === parseInt(originalPrice)) {
        products[
          i
        ].priceDiv.innerHTML = `<ins style="text-decoration:none">Rs. ${String(
          discountedPrice
        )}.00</ins>`;
      } else {
        products[
          i
        ].priceDiv.innerHTML = `<del>Rs. ${originalPrice}</del> <ins style="text-decoration:none">Rs. ${String(
          discountedPrice
        )}.00</ins>`;
      }
      //Total Price
      // let originalTotalPrice = products[i].totalPrice;
      let undiscountedTotal =
        parseInt(originalPrice) * parseInt(e.target.value);
      let discountedTotalPrice =
        parseInt(originalPrice) *
          parseInt(e.target.value) -
        parseInt(result);
      console.log(discountedTotalPrice);
      if (discountedTotalPrice === undiscountedTotal) {
        products[
          i
        ].totalPriceDiv.innerHTML = `<ins style="text-decoration:none">Rs. ${String(
          undiscountedTotal
        )}.00</ins>`;
      } else {
        products[
          i
        ].totalPriceDiv.innerHTML = `<del>Rs. ${String(undiscountedTotal)}</del> <ins style="text-decoration:none">Rs. ${String(
          discountedTotalPrice
        )}.00</ins>`;
      }

      // products[i].priceDiv;
    }
  }

  // console.log(changedProductId);
  let discount = 0;
  changedQuantity = [];
  for (let i = 0; i < arr.length; i++) {
    // console.log(arr[i]);
    var id = arr[i].id.split("_");
    let productId = id[id.length - 1].split(":")[0];
    if (productId === changedProductId) {
      changedQuantity.push({
        value: e.target.value,
        productId: changedProductId,
        individualPrice: products[i].price,
      });
    } else {
      changedQuantity.push({
        value: arr[i].value,
        productId: productId,
        individualPrice: products[i].price,
      });
    }
  }
  // console.log(changedQuantity);
  var finalSubTotal = 0;
  changedQuantity.forEach((product) => {
    //   console.log(product);
    let result = findPriceRule(product.value, product.productId);
    //   console.log(result);

    discount += parseInt(result);
    finalSubTotal +=
      parseInt(product.individualPrice) * parseInt(product.value);

  });
  // console.log(discount);
  // console.log(finalSubTotal);

  var finalPrice = finalSubTotal - discount;
  // console.log(finalPrice);
  if (finalPrice === finalSubTotal) {
    subTotal_Location.innerHTML = `<ins style="text-decoration:none">Rs. ${String(
      finalPrice
    )}.00</ins>`;
  } else {
    subTotal_Location.innerHTML = `<del>Rs. ${finalSubTotal}.00</del> <ins style="text-decoration:none">Rs. ${String(
      finalPrice
    )}.00</ins>`;
  }
  
  // if (discountedTotalPrice === parseInt(originalTotalPrice)) {
  //   products[
  //     i
  //   ].totalPriceDiv.innerHTML = `<ins style="text-decoration:none">Rs. ${String(
  //     discountedTotalPrice
  //   )}.00</ins>`;
  // } else {
  //   products[
  //     i
  //   ].totalPriceDiv.innerHTML = `<del>Rs. ${originalTotalPrice}</del> <ins style="text-decoration:none">Rs. ${String(
  //     discountedTotalPrice
  //   )}.00</ins>`;
  // }
}

function findPriceRule(quantity, productId) {
  let applicableDiscount = "0";
  Discounts.forEach((discount) => {
    if (discount.ProductIds.indexOf(productId) !== -1) {
      // console.log(discount);
      for (let i = 0; i < discount.PriceRules.length; i++) {
        if (discount.PriceRules[i].Quantity === quantity) {
          // console.log(discount.PriceRules[i]);
          applicableDiscount = discount.PriceRules[i].ApplicableDiscount;
        }
      }
    }
  });
  return applicableDiscount;
}

let arr = Array.prototype.slice.call(inputArray, 0);
for (let i = -1; i < arr.length - 1; i++) {
  arr.splice(i + 1, 1);
}

let products = [];
for (let i = 0; i < arr.length; i++) {
  var id = arr[i].id.split("_");
  let productId = id[id.length - 1].split(":")[0];
  let obj = {
    productId: productId,
    originalProductQuantity: arr[i].value,
    price: products_Individual_Price_Array[i].innerText.split(" ")[1],
    priceDiv: products_Individual_Price_Array[i],
    totalPrice: products_Individual_TotalPrice_Array[i].innerText.split(" ")[1],
    totalPriceDiv: products_Individual_TotalPrice_Array[i],
    inputDiv: arr[i],
  };
  products.push(obj);
}

console.log(products);

console.log(findPriceRule("4", "39462528254123"));
