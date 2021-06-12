let superAssistantUser2=[],superAssistantUser2_cartData=[],superAssistantUser2_shopDomain=Shopify.shop.split(".")[0],superAssistantUser2_shopifyThemeId=Shopify.theme.theme_store_id,superAssistantUser2_shopifyCurrency=Shopify.currency.active,popUpLogoUrl="https://sacdnfiles.s3.ap-south-1.amazonaws.com/assets/sa_black_logo.svg",superAssistantUser2_frontendUrl="https://discounts.superassistant.io",superAssistantUser2_hostedUrl="https://c209b1a74fa7.ngrok.io",customCheckoutUrl=superAssistantUser2_hostedUrl+"/api/comparison";function findImage(e,t){let o="";if(null===e)o=t[0].src;else{let i=t.findIndex(function(t){if(t.id==e)return!0});console.log(i),o=-1===i?t[0].src:t[i].src}return o}function start(){async function e(){function e(e){s=e}function t(e,t){var o=e,i,n;setInterval(function(){i=parseInt(o/60,10),n=parseInt(o%60,10),i=10>i?"0"+i:i,n=10>n?"0"+n:n,t.textContent=i+":"+n,0>--o&&(o=0)},1e3)}async function o(e,t,o,i){console.log(h[e]),await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:i,id:o}]})}).then(e=>e.json()).then(async o=>{console.log(o);let i=h[e],n="";if("A-A"===t?n=i.downsellCondition.offerAccepted.offerAccepted_child:"D-A"==t&&(n=i.downsellCondition.offerDeclined.offerAccepted_child),n.isExists&&!n.skip_offer){let e,t,o,i,d;b.push(n.selectedProduct.id),t=`${n.selectedProduct.title}-${n.selectedProduct.variants[0].title}`,o=n.selectedProduct.variants[0].price;let l=n.selectedProduct.variants[0].id;if("Discount"!==n.discount.type)e="Deal unlocked! You might need this too! ",i=`
            <ins style="text-decoration: none; color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${o}
            </ins>`,d=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===n.discount.discountType){let t=c.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${n.discount.discountValue}</span>`),console.log(t.join(" ")),e=t.join(" ");let s=parseFloat(o)-parseFloat(n.discount.discountValue)+"";i=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
                    <ins style="text-decoration: none; color:${c.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${s}
                    </ins>`;let r=n.discount.discountValue;d=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">${c.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}else if("%"===n.discount.discountType){let t=c.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${n.discount.discountValue}% </span>`),console.log(t.join(" ")),e=t.join(" ");let s=parseFloat(o)-parseFloat(n.discount.discountValue/100*parseFloat(o))+"";i=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
            <ins style="text-decoration: none; color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${s}
            </ins>`;let r=parseFloat(n.discount.discountValue/100*parseFloat(o))+"";d=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">${c.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}let r="";n.include_free_shipping&&(r=`<span
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
                >Free shipping included</span>`);let u=findImage(n.selectedProduct.variants[0].image_id,n.selectedProduct.images);console.log(u);let a={discountPercentage:e,productName:t,freeShipping:r,optionsList:" ",discountedPrice:i,totalDiscount:d,productImage:u},p=`
      <div
  style="background-color:${c.backGroundColor}"
  id="upSell2Modal"
>
  <button id="upSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};background:${c.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${c.PricetextSize}px;
        background:${c.PricebackGroundColor};
        padding: 0.5em;
        color: ${c.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${c.productNameFamily};color:${c.productNameColor}; font-size: ${c.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${c.buttonTextSize}px;
          color: ${c.buttonTextColor};
          background: ${c.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild1_button"
        class="upSellChild2Close"
      >
        ${c.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${c.checkoutTextSize};
          color:${c.checkoutTextColor};
          background:${c.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild1_button"
        class="upSellChild2Close"
      >
         ${c.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em;color:${c.textColor}"
      />
      <p style="font-size: 0.9em;color:${c.textColor}">Powered By SuperAssistant</p>
    </div>
  </div>


    `;p=p.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,function(e){return a[e]});let f=document.createElement("div");f.id="upSell2Modal",f.className="modal",f.style.visibility="visible",f.style.opacity="1",f.style.height="40em",f.style.top="19%",f.style.borderRadius="11px",f.innerHTML=p,document.querySelector("body").appendChild(f),document.querySelector("#upSellModal2Close").addEventListener("click",()=>f.style.display="none"),document.querySelector("#upSellChild1_button").addEventListener("click",async()=>{let e=parseFloat(document.querySelector("#upSellChild1_quantity").value);await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:e,id:l}]})}).then(e=>e.json()).then(async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s};console.log(t),console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url}).catch(e=>console.log(e))})})}),document.querySelector("#downSellChild1_button").addEventListener("click",async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})});let C=document.querySelectorAll(".upSellChild2Close");C.forEach(e=>{e.addEventListener("click",()=>{f.style.display="none"})}),document.addEventListener("keyup",t=>{27==t.keyCode&&(f.style.display="none")})}else n.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e);let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))})}async function i(e,t){console.log(h[e]);let o=h[e],i="";if("A-D"===t?i=o.downsellCondition.offerAccepted.offerDeclined_child:"D-D"==t&&(i=o.downsellCondition.offerDeclined.offerDeclined_child),i.isExists&&!i.skip_offer){let e,t,o,n,d;b.push(i.selectedProduct.id),t=`${i.selectedProduct.title}-${i.selectedProduct.variants[0].title}`,o=i.selectedProduct.variants[0].price;let l=i.selectedProduct.variants[0].id;if("Discount"!==i.discount.type)e="Deal unlocked! You might need this too! ",n=`
            <ins style="text-decoration: none; color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${o}
            </ins>`,d=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===i.discount.discountType){let t=c.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${i.discount.discountValue}</span>`),console.log(t.join(" ")),e=t.join(" ");let s=parseFloat(o)-parseFloat(i.discount.discountValue)+"";n=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
                    <ins style="text-decoration: none; color:${c.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${s}
                    </ins>`;let r=i.discount.discountValue;d=`<p style="font-size: ${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}else if("%"===i.discount.discountType){let t=c.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${i.discount.discountValue}% </span>`),console.log(t.join(" ")),e=t.join(" ");let s=parseFloat(o)-parseFloat(i.discount.discountValue/100*parseFloat(o))+"";n=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
            <ins style="text-decoration: none; color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${s}
            </ins>`;let r=parseFloat(i.discount.discountValue/100*parseFloat(o))+"";d=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">${c.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}let r="";i.include_free_shipping&&(r=`<span
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
                >Free shipping included</span>`);let u=findImage(i.selectedProduct.variants[0].image_id,i.selectedProduct.images);console.log(u);let a={discountPercentage:e,productName:t,freeShipping:r,optionsList:" ",discountedPrice:n,totalDiscount:d,productImage:u},p=`
      <div
  style="background-color:${c.backGroundColor}"
  id="downSell2Modal"
>
  <button id="downSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};background:${c.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${c.PricetextSize}px;
        background:${c.PricebackGroundColor};
        padding: 0.5em;
        color: ${c.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${c.productNameFamily};color:${c.productNameColor}; font-size: ${c.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${c.buttonTextSize}px;
          color: ${c.buttonTextColor};
          background: ${c.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild2_button"
        class="downSellChild2Close"
      >
        ${c.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${c.checkoutTextSize};
          color:${c.checkoutTextColor};
          background:${c.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild2_button"
        class="downSellChild2Close"
      >
        ${c.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em;color:${c.textColor}"
      />
      <p style="font-size: 0.9em;color:${c.textColor}">Powered By SuperAssistant</p>
    </div>
  </div>


    `;p=p.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,function(e){return a[e]});let f=document.createElement("div");f.id="downSell2Modal",f.className="modal",f.style.visibility="visible",f.style.opacity="1",f.style.height="40em",f.style.top="19%",f.style.borderRadius="11px",f.innerHTML=p,document.querySelector("body").appendChild(f),document.querySelector("#downSellModal2Close").addEventListener("click",()=>f.style.display="none"),document.querySelector("#upSellChild2_button").addEventListener("click",async()=>{let e=parseFloat(document.querySelector("#upSellChild2_quantity").value);await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:e,id:l}]})}).then(e=>e.json()).then(async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s};console.log(t),console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})})}),document.querySelector("#downSellChild2_button").addEventListener("click",async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e,k,superAssistantUser2_shopDomain,s),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})});let C=document.querySelectorAll(".downSellChild2Close");C.forEach(e=>{e.addEventListener("click",()=>{f.style.display="none"})}),document.addEventListener("keyup",t=>{27==t.keyCode&&(f.style.display="none")})}else i.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e);let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))}async function n(e,t,n){console.log(h[e]),$(".mask").removeClass("active"),console.log(n),await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:n,id:t}]})}).then(e=>e.json()).then(async t=>{console.log(t);let n=h[e],d=n.downsellCondition.offerAccepted;if(n.downsellCondition.offerAccepted.isExists&&!n.downsellCondition.offerAccepted.skip_offer){let t,n,l,s,r;b.push(d.selectedProduct.id),n=`${d.selectedProduct.title}-${d.selectedProduct.variants[0].title}`,l=d.selectedProduct.variants[0].price;let u=d.selectedProduct.variants[0].id;if("Discount"!==d.discount.type)t="Deal unlocked! You might need this too! ",s=`
            <ins style="text-decoration: none; color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${l}
            </ins>`,r=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===d.discount.discountType){let e=c.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${d.discount.discountValue}</span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(d.discount.discountValue)+"";s=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
                    <ins style="text-decoration: none; color:${c.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${i}
                    </ins>`;let n=d.discount.discountValue;r=`<p style="font-size: 0.9em">${c.discountMessage} ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}else if("%"===d.discount.discountType){let e=c.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${d.discount.discountValue}% </span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(d.discount.discountValue/100*parseFloat(l))+"";s=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
            <ins style="text-decoration: none; color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${i}
            </ins>`;let n=parseFloat(d.discount.discountValue/100*parseFloat(l))+"";r=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">${c.discountMessage} ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}let a="";d.include_free_shipping&&(a=`<span
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
                >Free shipping included</span>`);let p=findImage(d.selectedProduct.variants[0].image_id,d.selectedProduct.images);console.log(p);let f={variantId:u,INDEX:e,discountPercentage:t,productName:n,freeShipping:a,optionsList:" ",discountedPrice:s,totalDiscount:r,productImage:p},C=`
      <div
  style="background-color:${c.backGroundColor}"
  id="upSellModal"
>
  <button id="upSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};background:${c.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${c.PricetextSize}px;
        background:${c.PricebackGroundColor};
        padding: 0.5em;
        color: ${c.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${c.productNameFamily};color:${c.productNameColor}; font-size: ${c.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center;">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${c.buttonTextSize}px;
          color: ${c.buttonTextColor};
          background: ${c.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openUpSellChild_button"
        class="upSellChildClose"
        onclick="openUpSellChild(INDEX,'A-A',variantId)"
      >
        ${c.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${c.checkoutTextSize};
          color:${c.checkoutTextColor};
          background:${c.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild_button"
        class="upSellChildClose"
        onclick="openDownSellChild(INDEX,'A-D')"
      >
        ${c.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em;color:${c.textColor}"
      />
      <p style="font-size: 0.9em;color:${c.textColor}">Powered By SuperAssistant</p>
    </div>
  </div>


    `;C=C.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX/gi,function(e){return f[e]});let y=document.createElement("div");y.id="upSellModal",y.className="modal",y.style.visibility="visible",y.style.opacity="1",y.style.height="39em",y.style.top="19%",y.style.borderRadius="11px",y.innerHTML=C,document.querySelector("body").appendChild(y),document.querySelector("#upSellModalClose").addEventListener("click",()=>y.style.display="none");let h=document.querySelectorAll(".upSellChildClose");h.forEach(e=>{e.addEventListener("click",()=>y.style.display="none")}),document.querySelector("#openUpSellChild_button").onclick=()=>{let e=parseFloat(document.querySelector("#upSell_child_quantity").value);o(f.INDEX,"A-A",f.variantId,e)},document.querySelector("#openDownSellChild_button").onclick=()=>{i(f.INDEX,"A-D")},document.addEventListener("keyup",t=>{27==t.keyCode&&(y.style.display="none")})}else n.downsellCondition.offerAccepted.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e);let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))})}async function d(e){console.log(h[e]),$(".mask").removeClass("active");let t=h[e],n=t.downsellCondition.offerDeclined;if(t.downsellCondition.offerDeclined.isExists&&!t.downsellCondition.offerDeclined.skip_offer){let t,d,l,s,r;b.push(n.selectedProduct.id),d=`${n.selectedProduct.title}-${n.selectedProduct.variants[0].title}`,l=n.selectedProduct.variants[0].price;let u=n.selectedProduct.variants[0].id;if("Discount"!==n.discount.type)t="Deal unlocked! You might need this too! ",s=`
            <ins style="text-decoration: none; color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${l}
            </ins>`,r=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===n.discount.discountType){let e=c.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${n.discount.discountValue}</span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(n.discount.discountValue)+"";s=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
                    <ins style="text-decoration: none; color:${c.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${i}
                    </ins>`;let d=n.discount.discountValue;r=`<p style="font-size: ${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">${c.discountMessage} ${superAssistantUser2_shopifyCurrency} ${d}!</p>`}else if("%"===n.discount.discountType){let e=c.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${n.discount.discountValue}% </span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(n.discount.discountValue/100*parseFloat(l))+"";s=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
            <ins style="text-decoration: none; color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${i}
            </ins>`;let d=parseFloat(n.discount.discountValue/100*parseFloat(l))+"";r=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">${c.discountMessage} ${superAssistantUser2_shopifyCurrency} ${d}!</p>`}let a="";n.include_free_shipping&&(a=`<span
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
                >Free shipping included</span>`);let p=findImage(n.selectedProduct.variants[0].image_id,n.selectedProduct.images);console.log(p);let f={variantId:u,INDEX:e,discountPercentage:t,productName:d,freeShipping:a,optionsList:" ",discountedPrice:s,totalDiscount:r,productImage:p},C=`
      <div
  style="background-color:${c.backGroundColor}"
  id="downSellModal"
>
  <button id="downSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};background:${c.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${c.PricetextSize}px;
        background:${c.PricebackGroundColor};
        padding: 0.5em;
        color: ${c.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${c.productNameFamily};color:${c.productNameColor}; font-size: ${c.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${c.buttonTextSize}px;
          color: ${c.buttonTextColor};
          background: ${c.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
          
        "
        id="openUpSellChild2_button"
        class="downSellChildClose"
        onclick="openUpSellChild(INDEX,'D-A',variantId)"
      >
        ${c.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${c.checkoutTextSize};
          color:${c.checkoutTextColor};
          background:${c.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild2_button"
        class="downSellChildClose"
        onclick="openDownSellChild(INDEX,'D-D')"

      >
        ${c.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em;color:${c.textColor}"
      />
      <p style="font-size: 0.9em;color:${c.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;C=C.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,function(e){return f[e]});let y=document.createElement("div");y.id="downSellModal",y.className="modal",y.style.visibility="visible",y.style.opacity="1",y.style.height="39em",y.style.top="19%",y.style.borderRadius="11px",y.innerHTML=C,document.querySelector("body").appendChild(y),document.querySelector("#downSellModalClose").addEventListener("click",()=>y.style.display="none");let h=document.querySelectorAll(".downSellChildClose");h.forEach(e=>{e.addEventListener("click",()=>y.style.display="none")}),document.querySelector("#openUpSellChild2_button").onclick=()=>{let e=parseFloat(document.querySelector("#upSell_child_quantity").value);o(f.INDEX,"D-A",f.variantId,e)},document.querySelector("#openDownSellChild2_button").onclick=()=>{i(f.INDEX,"D-D")},document.addEventListener("keyup",t=>{27==t.keyCode&&(y.style.display="none")})}else t.downsellCondition.offerDeclined.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e,k,superAssistantUser2_shopDomain,s),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))}function l(e,t){let o=`
  <div style="padding: 1em; text-align: center" background:${c.backGroundColor}>
        <p style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};background:${c.topMessagebackGroundColor} ">
          discountPercentage
        </p>
        <h4
          style="
            font-weight: 600;
            font-size: ${c.PricetextSize}px;
            background:${c.PricebackGroundColor};
            padding: 0.5em;
            color: ${c.PricetextColor};
            margin:0;
          "
        >
          Hurry! Offer will expire in <span id="countdownTimer" class="countdownTimer">offerTime</span>
        </h4>
        <div>
          <h4 style="font-weight: 600;font-family:${c.productNameFamily};color:${c.productNameColor}; font-size: ${c.productNameSize}px; padding: 0.5em;margin:0;">
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
            <label for="quantity" style="font-size:${c.textSize}px;color:${c.textColor};font-family:${c.textFamily};">Quantity:</label>
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
            gap: 1em;
            justify-content: center;
          "
        >
          <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${c.buttonTextSize}px;
                  color: ${c.buttonTextColor};
                  background: ${c.buttonbackGroundColor};
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openUpSellParent_Button-INDEX"
              >
                ${c.buttonText}
              </button>
              <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${c.checkoutTextSize};
                  color:${c.checkoutTextColor};
                  background:${c.checkoutbackGroundColor} ; 
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openDownSellParent_Button-INDEX"
              >
                ${c.checkoutText}
              </button>
        </div>
        <div style="display: flex; justify-content: center;align-items: center; padding-top: 1em">
          <img
            src=${popUpLogoUrl}
            alt=""
            style="width: 1.5em;height: 1.5em;color:${c.textColor}"
          />
          <p style="font-size: 0.9em;color:${c.textColor};">Powered By SuperAssistant</p>
        </div>
      </div>
          </div>
      </div>
  `;o=o.replace(/discountPercentage|offerTime|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,function(t){return e[t]}),console.log(o);let i=document.createElement("div");i.className="slide fade",i.innerHTML=o,p.appendChild(i),"manual"===t?(document.querySelector(`#openUpSellParent_Button-${e.INDEX}`).onclick=()=>{let t=parseFloat(document.querySelector(`#upSell_parent_quantity-${e.INDEX}`).value);n(e.INDEX,e.variantId,t)},document.querySelector(`#openDownSellParent_Button-${e.INDEX}`).onclick=()=>{d(e.INDEX)}):"autopilot"==t&&(document.querySelector(`#openUpSellParent_Button-${e.INDEX}`).onclick=async()=>{$(".mask").removeClass("active");let t=parseFloat(document.querySelector(`#upSell_parent_quantity-${e.INDEX}`).value);await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:t,id:e.variantId}]})}).then(e=>e.json()).then(async e=>{console.log(e),await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e),console.log(s,"old cart"),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})})},document.querySelector(`#openDownSellParent_Button-${e.INDEX}`).onclick=()=>{$(".mask").removeClass("active")})}console.log(superAssistantUser2);let c=superAssistantUser2.discountStyle[0];console.log(superAssistantUser2);var s=[];let r=document.createElement("div");r.role="dialog",r.className="mask";let u=document.createElement("div");u.className="modal",u.role="alert",u.id="superAssistantModal",u.style.background=c.backGroundColor,u.style.borderRadius="10px";let a=document.createElement("button");a.className="close",a.role="button",a.innerText="X";let p=document.createElement("div");p.className="sliderBox";let f=document.createElement("a");f.className="prev",f.innerHTML="&#10094;";let C=document.createElement("a");C.className="next",C.innerHTML="&#10095;",p.appendChild(f),p.appendChild(C),u.appendChild(a),u.appendChild(p),document.querySelector("body").appendChild(r),document.querySelector("body").appendChild(u);let y=[],h=[],g=[],m=[],P=meta.product.id,S=[];meta.product.variants.forEach(e=>{S.push(e.id)}),console.log(S),superAssistantUser2.funnels.forEach(e=>{"product-page"===e.placement&&e.enable&&!e.isDeleted&&y.push(e)}),console.log(y),y=y.sort((e,t)=>e.funnelRules.add_priority.priority-t.funnelRules.add_priority.priority),console.log(y);let k=null;for(let e=0;e<y.length;e++)if("all"===y[e].trigger.selectedOption){k=y[e],y[e].offers.forEach(e=>{h.push(e),g.push("all")});break}else if("specific-product"===y[e].trigger.selectedOption||"specific-collection"===y[e].trigger.selectedOption){let t=[];if(y[e].trigger.selectedProducts.forEach(e=>{t.push(e.id)}),console.log(t),-1!==t.indexOf(P)){k=y[e],y[e].offers.forEach(o=>{h.push(o),g=t,y[e].trigger.excludedVariantIds.forEach(e=>{m.push(e)})});break}}console.log(h),console.log(k);let b=[];if(null!==k)if(console.log("creating slides process started"),"addManually"===k.offerType){console.log("manual");for(let e=0;e<h.length;e++){let t=h[e].selectedProduct.variants[0].id,o,i,n,d,s;if(b.push(h[e].selectedProduct.id),i=`${h[e].selectedProduct.title}-${h[e].selectedProduct.variants[0].title}`,n=h[e].selectedProduct.variants[0].price,"Discount"!==h[e].discount.type)o="Deal unlocked! You might need this too! ",d=`
            <ins style="text-decoration: none;  color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${n}
            </ins>`,s=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===h[e].discount.discountType){console.log(c.topMessage);let t=c.topMessage.split(" "),i=t.indexOf("{{discount}}");-1!==i&&t.splice(i,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${h[e].discount.discountValue}</span>`),console.log(t.join(" ")),o=t.join(" ");let l=parseFloat(n)-parseFloat(h[e].discount.discountValue)+"";d=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${n} </del>
                    <ins style="text-decoration: none; color:${c.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${l}
                    </ins>`;let r=h[e].discount.discountValue;s=`<p style="font-size: ${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">${c.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}else if("%"===h[e].discount.discountType){let t=c.topMessage.split(" "),i=t.indexOf("{{discount}}");-1!==i&&t.splice(i,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${h[e].discount.discountValue}% </span>`),console.log(t.join(" ")),o=t.join(" ");let l=parseFloat(n)-parseFloat(h[e].discount.discountValue/100*parseFloat(n))+"";d=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${n} </del>
            <ins style="text-decoration: none; color:${c.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${l}
            </ins>`;let r=parseFloat(h[e].discount.discountValue/100*parseFloat(n))+"";s=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">${c.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}let r="";h[e].include_free_shipping&&(r=`<span
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
                >Free shipping included</span>`);let u=findImage(h[e].selectedProduct.variants[0].image_id,h[e].selectedProduct.images);console.log(u);let a={variantId:t,INDEX:e,discountPercentage:o,offerTime:"5:00",productName:i,freeShipping:r,optionsList:" ",discountedPrice:d,totalDiscount:s,productImage:u};l(a,"manual")}}else if("autoPilot"===k.offerType)if(console.log(P),console.log("autoPilot"),"shopifyRecommendation"===k.autoPiltoType){async function e(){let e=`/recommendations/products.json?product_id=${P}&limit=3`;k.offers[0].limit_no_of_products.isSelected&&(e=`/recommendations/products.json?product_id=${P}&limit=${k.offers[0].limit_no_of_products.limit}`),await fetch(e).then(e=>e.json()).then(e=>{console.log(e);let t=e.products;for(let o=0;o<t.length;o++)if(t[o].available){b.push(t[o].id);let e=t[o].variants[0].id,i,n,d,s,r;if(n=`${t[o].title}-${t[o].variants[0].title}`,d=t[o].variants[0].price/100,"Discount"!==h[0].discount.type)i="Deal unlocked! You might need this too! ",s=`
              <ins style="text-decoration: none; color: ${c.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${d}
              </ins>`,r=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===h[0].discount.discountType){let e=c.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${h[0].discount.discountValue}</span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(h[0].discount.discountValue)+"";s=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${c.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=h[0].discount.discountValue;r=`<p style="font-size: ${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}else if("%"===h[0].discount.discountType){let e=c.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${h[0].discount.discountValue}% </span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(h[0].discount.discountValue/100*parseFloat(d))+"";s=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${c.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=parseFloat(h[0].discount.discountValue/100*parseFloat(d))+"";r=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}let u="";h[0].include_free_shipping&&(u=`<span
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
                >Free shipping included</span>`);let a="";a=null===t[o].variants[0].featured_image?`https://${t[o].featured_image.slice(2)}`:t[o].variants[0].featured_image.src;let p={variantId:e,INDEX:o,discountPercentage:i,offerTime:"5:00",productName:n,freeShipping:u,optionsList:" ",discountedPrice:s,totalDiscount:r,productImage:a};l(p,"autopilot"),console.log("2")}})}e()}else if("sameProductForLess"===k.autoPiltoType){let e=[meta.product];for(let t=0;t<e.length;t++){b.push(e[t].id);let o=e[t].variants[0].id,i,n,d,s,r;if(n=`${e[t].variants[0].name}`,d=e[t].variants[0].price/100,"Discount"!==h[0].discount.type)i="Deal unlocked! You might need this too! ",s=`
              <ins style="text-decoration: none; color: ${c.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${d}
              </ins>`,r=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===h[0].discount.discountType){let e=c.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${h[0].discount.discountValue}</span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(h[0].discount.discountValue)+"";s=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${c.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=h[0].discount.discountValue;r=`<p style="font-size: ${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}else if("%"===h[0].discount.discountType){let e=c.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${c.PricetextSize};background:${c.PricebackGroundColor};color:${c.PricetextColor}">${h[0].discount.discountValue}% </span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(h[0].discount.discountValue/100*parseFloat(d))+"";s=`<del style="color: ${c.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${c.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=parseFloat(h[0].discount.discountValue/100*parseFloat(d))+"";r=`<p style="font-size:${c.discounttextSize}px;font-family:${c.discounttextFamily};color:${c.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}let u="";h[0].include_free_shipping&&(u=`<span
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
                >Free shipping included</span>`);let a={variantId:o,INDEX:t,discountPercentage:i,offerTime:"5:00",productName:n,freeShipping:u,optionsList:" ",discountedPrice:s,totalDiscount:r,productImage:"https://cdn.jsdelivr.net/gh/varuns1007/Hosted-Links/sale.jpg"};l(a,"autopilot"),console.log("2")}}if(console.log(b),console.log(0!=h.length),0!=h.length){function o(){$(".mask").removeClass("active")}let i=document.querySelector("form[action^=\"/cart\"] [type=\"submit\"]");i.classList.add("show"),i.addEventListener("click",async()=>{await fetch("/cart.js").then(e=>e.json()).then(o=>{console.log(o);let i=o;setTimeout(async()=>{await fetch("/cart.js").then(e=>e.json()).then(o=>{console.log(o),e(o);let n=o.items,d=[];n.forEach(e=>{d.push(e.variant_id)});let l=d.filter(e=>m.includes(e));if(console.log(d),console.log(m),console.log(0===l.length),console.log(l),0===l.length){let e=o,n=null,d=null,l=null,r=null,u=!0;if(k.funnelRules.set_start_date.isSelected&&(n=k.funnelRules.set_start_date.startDate),k.funnelRules.set_end_date.isSelected&&(d=k.funnelRules.set_end_date.endDate),null!==d&&null!==n){const e=e=>{let t=new Date(e),o=t.getDate(),i=t.getMonth()+1,n=t.getFullYear()-2e3;return 10>o&&(o="0"+o),10>i&&(i="0"+i),`${i}/${o}/${n}`};let t=e(n),o=e(d),i=e(new Date);u=function(e,t,o){var i,n,d;return i=Date.parse(e),n=Date.parse(t),d=Date.parse(o),!!(d<=n&&d>=i)}(t,o,i)}else if(null!==n){let e=new Date(n),t=new Date;console.log(n);var c=function(e,t){return!!(e.setHours(0,0,0,0)<=t.setHours(0,0,0,0))};u=c(e,t)}let a=!0;console.log(k.funnelRules.show_Only_for_Specific_CartValue.isSelected),k.funnelRules.show_Only_for_Specific_CartValue.isSelected&&(l=k.funnelRules.show_Only_for_Specific_CartValue.minCartValue,r=k.funnelRules.show_Only_for_Specific_CartValue.maxCartValue,a=l<=i.total_price/100&&i.total_price/100<r,console.log(l,r,a));let p=!0;if(console.log(b),console.log(k.funnelRules.skip_If_already_present_In_cart),k.funnelRules.skip_If_already_present_In_cart)for(let t=0,o;t<b.length;t++){o=b[t],console.log(o);for(let t=0;t<e.items.length;t++)if(e.items[t].product_id===o){console.log("already present in cart"),p=!1;break}}let f=!0,C=Shopify.country;if(k.funnelRules.specific_countries.isSelected){let e=k.funnelRules.specific_countries.selectedCountries;f=e.includes(C)}let y=!0;if(k.funnelRules.once_per_buyer){let e=localStorage.getItem("oncePerBuyer");null===e?y=!0:(y=!1,localStorage.removeItem("oncePerBuyer"))}if(console.log(u,a,p,f,y),console.log(u&&a&&p&&f&&y),u&&a&&p&&f&&y){async function e(){let e=await fetch(`${superAssistantUser2_hostedUrl}/api/analytics/addViews`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({funnelId:k._id})});e=await e.json(),console.log(e)}$(".mask").addClass("active");var s=document.querySelectorAll(".countdownTimer");s.forEach(e=>{t(300,e)}),e()}k.funnelRules.once_per_buyer&&localStorage.setItem("oncePerBuyer",!0)}})},1e3)})});let n=document.querySelectorAll(".close,.mask");n.forEach(e=>{e.onclick=()=>{o()}}),document.addEventListener("keyup",t=>{27==t.keyCode&&o()}),setTimeout(()=>{function e(e){t(o+=e),console.log("here",e)}function t(e){console.log("top");var t=document.getElementsByClassName("slide"),n;for(e>t.length&&(o=1),1>e&&(o=t.length),n=0;n<t.length;n++)t[n].style.display="none";t[o-1].style.display="block",console.log("bottom")}var o=1;t(o),document.querySelector(".prev").addEventListener("click",()=>{e(-1)}),document.querySelector(".next").addEventListener("click",()=>{e(1)})},2e3)}}async function t(){await fetch("/cart.js").then(e=>e.json()).then(e=>{function t(e){for(var t=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=o.length,d=0;d<e;d++)t.push(o.charAt(Math.floor(Math.random()*n)));return`${superAssistantUser2_shopDomain.toUpperCase()}-`+t.join("")}function o(e,t){var o=e,i,n;setInterval(function(){i=parseInt(o/60,10),n=parseInt(o%60,10),i=10>i?"0"+i:i,n=10>n?"0"+n:n,t.textContent=i+":"+n,0>--o&&(o=0)},1e3)}async function i(e,t,o,i){console.log(x[e]),await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:i,id:o}]})}).then(e=>e.json()).then(async o=>{console.log(o);let i=x[e],n="";if("A-A"===t?n=i.downsellCondition.offerAccepted.offerAccepted_child:"D-A"==t&&(n=i.downsellCondition.offerDeclined.offerAccepted_child),n.isExists&&!n.skip_offer){let e,t,o,i,d;_.push(n.selectedProduct.id),t=`${n.selectedProduct.title}-${n.selectedProduct.variants[0].title}`,o=n.selectedProduct.variants[0].price;let l=n.selectedProduct.variants[0].id;if("Discount"!==n.discount.type)e="Deal unlocked! You might need this too! ",i=`
            <ins style="text-decoration: none; color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${o}
            </ins>`,d=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===n.discount.discountType){let t=r.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${n.discount.discountValue}</span>`),console.log(t.join(" ")),e=t.join(" ");let c=parseFloat(o)-parseFloat(n.discount.discountValue)+"";i=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
                    <ins style="text-decoration: none; color:${r.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${c}
                    </ins>`;let s=n.discount.discountValue;d=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">${r.discountMessage} ${superAssistantUser2_shopifyCurrency} ${s}!</p>`}else if("%"===n.discount.discountType){let t=r.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${n.discount.discountValue}% </span>`),console.log(t.join(" ")),e=t.join(" ");let c=parseFloat(o)-parseFloat(n.discount.discountValue/100*parseFloat(o))+"";i=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
            <ins style="text-decoration: none; color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${c}
            </ins>`;let s=parseFloat(n.discount.discountValue/100*parseFloat(o))+"";d=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">${r.discountMessage} ${superAssistantUser2_shopifyCurrency} ${s}!</p>`}let c="";n.include_free_shipping&&(c=`<span
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
                >Free shipping included</span>`);let u=findImage(n.selectedProduct.variants[0].image_id,n.selectedProduct.images);console.log(u);let a={discountPercentage:e,productName:t,freeShipping:c,optionsList:" ",discountedPrice:i,totalDiscount:d,productImage:u},p=`
      <div
  style="background-color:${r.backGroundColor}"
  id="upSell2Modal"
>
  <button id="upSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};background:${r.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${r.PricetextSize}px;
        background:${r.PricebackGroundColor};
        padding: 0.5em;
        color: ${r.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${r.productNameFamily};color:${r.productNameColor}; font-size: ${r.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${r.buttonTextSize}px;
          color: ${r.buttonTextColor};
          background: ${r.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild1_button"
        class="upSellChild2Close"
      >
        ${r.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${r.checkoutTextSize};
          color:${r.checkoutTextColor};
          background:${r.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild1_button"
        class="upSellChild2Close"
      >
        ${r.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${r.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;p=p.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,function(e){return a[e]});let f=document.createElement("div");f.id="upSell2Modal",f.className="modal",f.style.visibility="visible",f.style.opacity="1",f.style.height="40em",f.style.top="19%",f.style.borderRadius="11px",f.innerHTML=p,document.querySelector("body").appendChild(f),document.querySelector("#upSellModal2Close").addEventListener("click",()=>f.style.display="none"),document.querySelector("#upSellChild1_button").addEventListener("click",async()=>{let e=parseFloat(document.querySelector("#upSellChild1_quantity").value);await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:e,id:l}]})}).then(e=>e.json()).then(async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s};console.log(t),console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})})}),document.querySelector("#downSellChild1_button").addEventListener("click",async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})});let C=document.querySelectorAll(".upSellChild2Close");C.forEach(e=>{e.addEventListener("click",()=>{f.style.display="none"})}),document.addEventListener("keyup",t=>{27==t.keyCode&&(f.style.display="none")})}else n.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e);let t={username:superAssistantUser2_shopDomain,funnel:b,cartData:e};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))})}async function n(e,t){console.log(x[e]);let o=x[e],i="";if("A-D"===t?i=o.downsellCondition.offerAccepted.offerDeclined_child:"D-D"==t&&(i=o.downsellCondition.offerDeclined.offerDeclined_child),i.isExists&&!i.skip_offer){let e,t,o,n,d;_.push(i.selectedProduct.id),t=`${i.selectedProduct.title}-${i.selectedProduct.variants[0].title}`,o=i.selectedProduct.variants[0].price;let l=i.selectedProduct.variants[0].id;if("Discount"!==i.discount.type)e="Deal unlocked! You might need this too! ",n=`
            <ins style="text-decoration: none; color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${o}
            </ins>`,d=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===i.discount.discountType){let t=r.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${i.discount.discountValue}</span>`),console.log(t.join(" ")),e=t.join(" ");let c=parseFloat(o)-parseFloat(i.discount.discountValue)+"";n=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
                    <ins style="text-decoration: none; color:${r.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${c}
                    </ins>`;let s=i.discount.discountValue;d=`<p style="font-size: ${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${s}!</p>`}else if("%"===i.discount.discountType){let t=r.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${i.discount.discountValue}% </span>`),console.log(t.join(" ")),e=t.join(" ");let c=parseFloat(o)-parseFloat(i.discount.discountValue/100*parseFloat(o))+"";n=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
            <ins style="text-decoration: none; color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${c}
            </ins>`;let s=parseFloat(i.discount.discountValue/100*parseFloat(o))+"";d=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">${r.discountMessage} ${superAssistantUser2_shopifyCurrency} ${s}!</p>`}let c="";i.include_free_shipping&&(c=`<span
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
                >Free shipping included</span>`);let u=findImage(i.selectedProduct.variants[0].image_id,i.selectedProduct.images);console.log(u);let a={discountPercentage:e,productName:t,freeShipping:c,optionsList:" ",discountedPrice:n,totalDiscount:d,productImage:u},p=`
      <div
  style="background-color:${r.backGroundColor}"
  id="downSell2Modal"
>
  <button id="downSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};background:${r.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${r.PricetextSize}px;
        background:${r.PricebackGroundColor};
        padding: 0.5em;
        color: ${r.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div >
      <h4 style="font-weight: 600;font-family:${r.productNameFamily};color:${r.productNameColor}; font-size: ${r.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};">Quantity:</label>
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
    <div style="display: flex;  flex-direction: column; gap: 1em;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${r.buttonTextSize}px;
          color: ${r.buttonTextColor};
          background: ${r.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild2_button"
        class="downSellChild2Close"
      >
        ${r.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${r.checkoutTextSize};
          color:${r.checkoutTextColor};
          background:${r.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild2_button"
        class="downSellChild2Close"
      >
        ${r.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${r.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;p=p.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,function(e){return a[e]});let f=document.createElement("div");f.id="downSell2Modal",f.className="modal",f.style.visibility="visible",f.style.opacity="1",f.style.height="40em",f.style.top="19%",f.style.borderRadius="11px",f.innerHTML=p,document.querySelector("body").appendChild(f),document.querySelector("#downSellModal2Close").addEventListener("click",()=>f.style.display="none"),document.querySelector("#upSellChild2_button").addEventListener("click",async()=>{let e=parseFloat(document.querySelector("#upSellChild2_quantity").value);await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:e,id:l}]})}).then(e=>e.json()).then(async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s};console.log(t),console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})})}),document.querySelector("#downSellChild2_button").addEventListener("click",async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e,b,superAssistantUser2_shopDomain),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})});let C=document.querySelectorAll(".downSellChild2Close");C.forEach(e=>{e.addEventListener("click",()=>{f.style.display="none"})}),document.addEventListener("keyup",t=>{27==t.keyCode&&(f.style.display="none")})}else i.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))}async function d(e,t,o){console.log(x[e]),$(".mask").removeClass("active"),console.log(t,e),await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:o,id:t}]})}).then(e=>e.json()).then(async t=>{console.log(t);let o=x[e],d=o.downsellCondition.offerAccepted;if(o.downsellCondition.offerAccepted.isExists&&!o.downsellCondition.offerAccepted.skip_offer){let t,o,l,c,s;_.push(d.selectedProduct.id),o=`${d.selectedProduct.title}-${d.selectedProduct.variants[0].title}`,l=d.selectedProduct.variants[0].price;let u=d.selectedProduct.variants[0].id;if("Discount"!==d.discount.type)t="Deal unlocked! You might need this too! ",c=`
            <ins style="text-decoration: none; color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${l}
            </ins>`,s=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===d.discount.discountType){let e=r.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${d.discount.discountValue}</span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(d.discount.discountValue)+"";c=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
                    <ins style="text-decoration: none; color:${r.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${i}
                    </ins>`;let n=d.discount.discountValue;s=`<p style="font-size: 0.9em">${r.discountMessage} ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}else if("%"===d.discount.discountType){let e=r.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${d.discount.discountValue}% </span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(d.discount.discountValue/100*parseFloat(l))+"";c=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
            <ins style="text-decoration: none; color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${i}
            </ins>`;let n=parseFloat(d.discount.discountValue/100*parseFloat(l))+"";s=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">${r.discountMessage} ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}let a="";d.include_free_shipping&&(a=`<span
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
                >Free shipping included</span>`);let p=findImage(d.selectedProduct.variants[0].image_id,d.selectedProduct.images);console.log(p);let f={variantId:u,INDEX:e,discountPercentage:t,productName:o,freeShipping:a,optionsList:" ",discountedPrice:c,totalDiscount:s,productImage:p},C=`
      <div
  style="background-color:${r.backGroundColor}"
  id="upSellModal"
>
  <button id="upSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};background:${r.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${r.PricetextSize}px;
        background:${r.PricebackGroundColor};
        padding: 0.5em;
        color: ${r.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div >
      <h4 style="font-weight: 600;font-family:${r.productNameFamily};color:${r.productNameColor}; font-size: ${r.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center;">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${r.buttonTextSize}px;
          color: ${r.buttonTextColor};
          background: ${r.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openUpSellChild_button"
        class="upSellChildClose"
        onclick="openUpSellChild(INDEX,'A-A',variantId)"
      >
        ${r.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${r.checkoutTextSize};
          color:${r.checkoutTextColor};
          background:${r.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild_button"
        class="upSellChildClose"
        onclick="openDownSellChild(INDEX,'A-D')"
      >
        ${r.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${r.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;C=C.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX/gi,function(e){return f[e]});let y=document.createElement("div");y.id="upSellModal",y.className="modal",y.style.visibility="visible",y.style.opacity="1",y.style.height="39em",y.style.top="19%",y.style.borderRadius="11px",y.innerHTML=C,document.querySelector("body").appendChild(y),document.querySelector("#upSellModalClose").addEventListener("click",()=>y.style.display="none");let h=document.querySelectorAll(".upSellChildClose");h.forEach(e=>{e.addEventListener("click",()=>y.style.display="none")}),document.querySelector("#openUpSellChild_button").onclick=()=>{let e=parseFloat(document.querySelector("#upSell_child_quantity").value);i(f.INDEX,"A-A",f.variantId,e)},document.querySelector("#openDownSellChild_button").onclick=()=>{n(f.INDEX,"A-D")},document.addEventListener("keyup",t=>{27==t.keyCode&&(y.style.display="none")})}else o.downsellCondition.offerAccepted.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e);let t={username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))})}async function l(e){console.log(x[e]),$(".mask").removeClass("active");let t=x[e],o=t.downsellCondition.offerDeclined;if(t.downsellCondition.offerDeclined.isExists&&!t.downsellCondition.offerDeclined.skip_offer){let t,d,l,c,s;_.push(o.selectedProduct.id),d=`${o.selectedProduct.title}-${o.selectedProduct.variants[0].title}`,l=o.selectedProduct.variants[0].price;let u=o.selectedProduct.variants[0].id;if("Discount"!==o.discount.type)t="Deal unlocked! You might need this too! ",c=`
            <ins style="text-decoration: none; color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${l}
            </ins>`,s=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===o.discount.discountType){let e=r.topMessage.split(" "),i=e.indexOf("{{discount}}");-1!==i&&e.splice(i,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${o.discount.discountValue}</span>`),console.log(e.join(" ")),t=e.join(" ");let n=parseFloat(l)-parseFloat(o.discount.discountValue)+"";c=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
                    <ins style="text-decoration: none; color:${r.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${n}
                    </ins>`;let d=o.discount.discountValue;s=`<p style="font-size: ${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">${r.discountMessage} ${superAssistantUser2_shopifyCurrency} ${d}!</p>`}else if("%"===o.discount.discountType){let e=r.topMessage.split(" "),i=e.indexOf("{{discount}}");-1!==i&&e.splice(i,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${o.discount.discountValue}% </span>`),console.log(e.join(" ")),t=e.join(" ");let n=parseFloat(l)-parseFloat(o.discount.discountValue/100*parseFloat(l))+"";c=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
            <ins style="text-decoration: none; color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${n}
            </ins>`;let d=parseFloat(o.discount.discountValue/100*parseFloat(l))+"";s=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">${r.discountMessage} ${superAssistantUser2_shopifyCurrency} ${d}!</p>`}let a="";o.include_free_shipping&&(a=`<span
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
                >Free shipping included</span>`);let p=findImage(o.selectedProduct.variants[0].image_id,o.selectedProduct.images);console.log(p);let f={variantId:u,INDEX:e,discountPercentage:t,productName:d,freeShipping:a,optionsList:" ",discountedPrice:c,totalDiscount:s,productImage:p},C=`
      <div
  style="background-color:${r.backGroundColor}"
  id="downSellModal"
>
  <button id="downSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};background:${r.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${r.PricetextSize}px;
        background:${r.PricebackGroundColor};
        padding: 0.5em;
        color: ${r.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div >
      <h4 style="font-weight: 600;font-family:${r.productNameFamily};color:${r.productNameColor}; font-size: ${r.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${r.buttonTextSize}px;
          color: ${r.buttonTextColor};
          background: ${r.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
          
        "
        id="openUpSellChild2_button"
        class="downSellChildClose"
        onclick="openUpSellChild(INDEX,'D-A',variantId)"
      >
        ${r.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${r.checkoutTextSize};
          color:${r.checkoutTextColor};
          background:${r.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild2_button"
        class="downSellChildClose"
        onclick="openDownSellChild(INDEX,'D-D')"

      >
        ${r.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${r.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;C=C.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,function(e){return f[e]});let y=document.createElement("div");y.id="downSellModal",y.className="modal",y.style.visibility="visible",y.style.opacity="1",y.style.height="39em",y.style.top="19%",y.style.borderRadius="11px",y.innerHTML=C,document.querySelector("body").appendChild(y),document.querySelector("#downSellModalClose").addEventListener("click",()=>y.style.display="none");let h=document.querySelectorAll(".downSellChildClose");h.forEach(e=>{e.addEventListener("click",()=>y.style.display="none")}),document.querySelector("#openUpSellChild2_button").onclick=()=>{let e=parseFloat(document.querySelector("#upSell_child_quantity").value);i(f.INDEX,"D-A",f.variantId,e)},document.querySelector("#openDownSellChild2_button").onclick=()=>{n(f.INDEX,"D-D")},document.addEventListener("keyup",t=>{27==t.keyCode&&(y.style.display="none")})}else t.downsellCondition.offerDeclined.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:s})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))}function c(e,t){let o=`
  <div style="padding: 1em; text-align: center" background:${r.backGroundColor}>
        <p style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};background:${r.topMessagebackGroundColor} ">
          discountPercentage
        </p>
        <h4
          style="
            font-weight: 600;
            font-size: ${r.PricetextSize}px;
            background:${r.PricebackGroundColor};
            padding: 0.5em;
            color: ${r.PricetextColor};
            margin:0;
          "
        >
          Hurry! Offer will expire in <span id="countdownTimer" class="countdownTimer">offerTime</span>
        </h4>
        <div >
          <h4 style="font-weight: 600;font-family:${r.productNameFamily};color:${r.productNameColor}; font-size: ${r.productNameSize}px; padding: 0.5em;margin:0;">
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
            <label for="quantity" style="font-size:${r.textSize}px;color:${r.textColor};font-family:${r.textFamily};">Quantity:</label>
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
            gap: 1em;
            justify-content: center;
          "
        >
          <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${r.buttonTextSize}px;
                  color: ${r.buttonTextColor};
                  background: ${r.buttonbackGroundColor};
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openUpSellParent_Button-INDEX"
              >
                ${r.buttonText}
              </button>
              <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${r.checkoutTextSize};
                  color:${r.checkoutTextColor};
                  background:${r.checkoutbackGroundColor} ; 
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openDownSellParent_Button-INDEX"
                
              >
                ${r.checkoutText}
              </button>
        </div>
        <div style="display: flex; justify-content: center;align-items: center; padding-top: 1em">
          <img
            src=${popUpLogoUrl}
            alt=""
            style="width: 1.5em;height: 1.5em;"
          />
          <p style="font-size: 0.9em;color:${r.textColor};">Powered By SuperAssistant</p>
        </div>
      </div>
          </div>
      </div>
  `;o=o.replace(/discountPercentage|offerTime|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,function(t){return e[t]}),console.log(o);let i=document.createElement("div");i.className="slide fade",i.innerHTML=o,C.appendChild(i),"manual"===t?(document.querySelector(`#openUpSellParent_Button-${e.INDEX}`).onclick=()=>{let t=parseFloat(document.querySelector(`#upSell_parent_quantity-${e.INDEX}`).value);d(e.INDEX,e.variantId,t)},document.querySelector(`#openDownSellParent_Button-${e.INDEX}`).onclick=()=>{l(e.INDEX)}):"autopilot"==t&&(document.querySelector(`#openUpSellParent_Button-${e.INDEX}`).onclick=async()=>{$(".mask").removeClass("active");let t=parseFloat(document.querySelector(`#upSell_parent_quantity-${e.INDEX}`).value);await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:t,id:e.variantId}]})}).then(e=>e.json()).then(async e=>{console.log(e),await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:b,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})})},document.querySelector(`#openDownSellParent_Button-${e.INDEX}`).onclick=()=>{$(".mask").removeClass("active")})}let s=e;console.log(superAssistantUser2);let r=superAssistantUser2.discountStyle[0];console.log(t(6));let u=t(6),a=document.createElement("div");a.role="dialog",a.className="mask";let p=document.createElement("div");p.className="modal",p.role="alert",p.id="superAssistantModal",p.style.background=r.backGroundColor,p.style.borderRadius="10px";let f=document.createElement("button");f.className="close",f.role="button",f.innerText="X";let C=document.createElement("div");C.className="sliderBox";let y=document.createElement("a");y.className="prev",y.innerHTML="&#10094;";let h=document.createElement("a");h.className="next",h.innerHTML="&#10095;",C.appendChild(y),C.appendChild(h),p.appendChild(f),p.appendChild(C),document.querySelector("body").appendChild(a),document.querySelector("body").appendChild(p);let g=[],x=[],m=[],P=[],S=[];console.log(s);let k=[];s.items.forEach(e=>{k.push(e.product_id),S.push(e.id)}),console.log(S),console.log(k),superAssistantUser2.funnels.forEach(e=>{"cart-page"===e.placement&&e.enable&&!e.isDeleted&&g.push(e)}),console.log(),console.log(g),g=g.sort((e,t)=>e.funnelRules.add_priority.priority-t.funnelRules.add_priority.priority),console.log(g);let b=null;for(let t=0;t<g.length;t++)if("all"===g[t].trigger.selectedOption){b=g[t],g[t].offers.forEach(e=>{x.push(e),m.push("all")});break}else if("specific-product"===g[t].trigger.selectedOption||"specific-collection"===g[t].trigger.selectedOption){let e=[];g[t].trigger.selectedProducts.forEach(t=>{e.push(t.id)}),console.log(e),console.log(k);let o=e.filter(e=>k.includes(e));if(console.log(o),console.log(0===o.length),0!==o.length){b=g[t],g[t].offers.forEach(o=>{x.push(o),m=e,g[t].trigger.excludedVariantIds.forEach(e=>{P.push(e)})});break}}console.log(x),console.log(b);let _=[];if(null!==b)if("addManually"===b.offerType)for(let e=0;e<x.length;e++){let t=x[e].selectedProduct.variants[0].id,o,i,n,d,l;if(_.push(x[e].selectedProduct.id),i=`${x[e].selectedProduct.title}-${x[e].selectedProduct.variants[0].title}`,n=x[e].selectedProduct.variants[0].price,"Discount"!==x[e].discount.type)o="Deal unlocked! You might need this too! ",d=`
            <ins style="text-decoration: none;  color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${n}
            </ins>`,l=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===x[e].discount.discountType){console.log(r.topMessage);let t=r.topMessage.split(" "),i=t.indexOf("{{discount}}");-1!==i&&t.splice(i,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${x[e].discount.discountValue}</span>`),console.log(t.join(" ")),o=t.join(" ");let c=parseFloat(n)-parseFloat(x[e].discount.discountValue)+"";d=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${n} </del>
                    <ins style="text-decoration: none; color:${r.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${c}
                    </ins>`;let s=x[e].discount.discountValue;l=`<p style="font-size: ${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">${r.discountMessage} ${superAssistantUser2_shopifyCurrency} ${s}!</p>`}else if("%"===x[e].discount.discountType){let t=r.topMessage.split(" "),i=t.indexOf("{{discount}}");-1!==i&&t.splice(i,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${x[e].discount.discountValue}% </span>`),console.log(t.join(" ")),o=t.join(" ");let c=parseFloat(n)-parseFloat(x[e].discount.discountValue/100*parseFloat(n))+"";d=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${n} </del>
            <ins style="text-decoration: none; color:${r.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${c}
            </ins>`;let s=parseFloat(x[e].discount.discountValue/100*parseFloat(n))+"";l=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">${r.discountMessage} ${superAssistantUser2_shopifyCurrency} ${s}!</p>`}let s="";x[e].include_free_shipping&&(s=`<span
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
                >Free shipping included</span>`);let u=findImage(x[e].selectedProduct.variants[0].image_id,x[e].selectedProduct.images);console.log(u);let a={variantId:t,INDEX:e,discountPercentage:o,offerTime:"5:00",productName:i,freeShipping:s,optionsList:" ",discountedPrice:d,totalDiscount:l,productImage:u};c(a,"manual")}else if("autoPilot"===b.offerType){let e=k[0];if(console.log(e),"shopifyRecommendation"===b.autoPiltoType){async function t(){let t=`/recommendations/products.json?product_id=${e}&limit=3`;b.offers[0].limit_no_of_products.isSelected&&(t=`/recommendations/products.json?product_id=${e}&limit=${b.offers[0].limit_no_of_products.limit}`),await fetch(t).then(e=>e.json()).then(e=>{console.log(e);let t=e.products;for(let o=0;o<t.length;o++)if(t[o].available){_.push(t[o].id);let e=t[o].variants[0].id,i,n,d,l,s;if(n=`${t[o].title}-${t[o].variants[0].title}`,d=t[o].variants[0].price/100,"Discount"!==x[0].discount.type)i="Deal unlocked! You might need this too! ",l=`
              <ins style="text-decoration: none; color: ${r.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${d}
              </ins>`,s=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===x[0].discount.discountType){let e=r.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${x[0].discount.discountValue}</span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(x[0].discount.discountValue)+"";l=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${r.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=x[0].discount.discountValue;s=`<p style="font-size: ${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}else if("%"===x[0].discount.discountType){let e=r.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${x[0].discount.discountValue}% </span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(x[0].discount.discountValue/100*parseFloat(d))+"";l=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${r.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=parseFloat(x[0].discount.discountValue/100*parseFloat(d))+"";s=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}let u="";x[0].include_free_shipping&&(u=`<span
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
                >Free shipping included</span>`);let a="";a=null===t[o].variants[0].featured_image?`https://${t[o].featured_image.slice(2)}`:t[o].variants[0].featured_image.src;let p={variantId:e,INDEX:o,discountPercentage:i,offerTime:"5:00",productName:n,freeShipping:u,optionsList:" ",discountedPrice:l,totalDiscount:s,productImage:a};c(p,"autopilot")}})}t()}else if("sameProductForLess"===b.autoPiltoType){let e=s.items;for(let t=0;t<e.length;t++){_.push(e[t].id);let o=e[t].variant_id,i,n,d,l,s;if(n=`${e[t].title}`,d=e[t].price/100,"Discount"!==x[0].discount.type)i="Deal unlocked! You might need this too! ",l=`
              <ins style="text-decoration: none; color: ${r.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${d}
              </ins>`,s=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===x[0].discount.discountType){let e=r.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${x[0].discount.discountValue}</span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(x[0].discount.discountValue)+"";l=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${r.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=x[0].discount.discountValue;s=`<p style="font-size: ${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}else if("%"===x[0].discount.discountType){let e=r.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${r.PricetextSize};background:${r.PricebackGroundColor};color:${r.PricetextColor}">${x[0].discount.discountValue}% </span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(x[0].discount.discountValue/100*parseFloat(d))+"";l=`<del style="color: ${r.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${r.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=parseFloat(x[0].discount.discountValue/100*parseFloat(d))+"";s=`<p style="font-size:${r.discounttextSize}px;font-family:${r.discounttextFamily};color:${r.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}let u="";x[0].include_free_shipping&&(u=`<span
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
                >Free shipping included</span>`);let a=e[t].image,p={variantId:o,INDEX:t,discountPercentage:i,offerTime:"5:00",productName:n,freeShipping:u,optionsList:" ",discountedPrice:l,totalDiscount:s,productImage:a};c(p,"autopilot"),console.log("2")}}}if(console.log(_),console.log(x),0!=x.length){function t(){$(".mask").removeClass("active")}setTimeout(async()=>{await fetch("/cart.js").then(e=>e.json()).then(e=>{console.log(e);let t=e.items,i=[];t.forEach(e=>{i.push(e.variant_id)});let n=i.filter(e=>P.includes(e));if(console.log(i),console.log(P),console.log(0===n.length),console.log(n),0===n.length){let t=e,i=null,n=null,c=null,r=null,u=!0;if(b.funnelRules.set_start_date.isSelected&&(i=b.funnelRules.set_start_date.startDate),b.funnelRules.set_end_date.isSelected&&(n=b.funnelRules.set_end_date.endDate),null!==n&&null!==i){const e=e=>{let t=new Date(e),o=t.getDate(),i=t.getMonth()+1,n=t.getFullYear()-2e3;return 10>o&&(o="0"+o),10>i&&(i="0"+i),`${i}/${o}/${n}`};let t=e(i),o=e(n),d=e(new Date);u=function(e,t,o){var i,n,d;return i=Date.parse(e),n=Date.parse(t),d=Date.parse(o),!!(d<=n&&d>=i)}(t,o,d)}else if(null!==i){let e=new Date(i),t=new Date;console.log(i);var d=function(e,t){return!!(e.setHours(0,0,0,0)<=t.setHours(0,0,0,0))};u=d(e,t)}let a=!0;console.log(b.funnelRules.show_Only_for_Specific_CartValue.isSelected),b.funnelRules.show_Only_for_Specific_CartValue.isSelected&&(c=b.funnelRules.show_Only_for_Specific_CartValue.minCartValue,r=b.funnelRules.show_Only_for_Specific_CartValue.maxCartValue,a=c<=s.total_price/100&&s.total_price/100<r,console.log(c,r,a));let p=!0;if(console.log(_),console.log(b.funnelRules.skip_If_already_present_In_cart),b.funnelRules.skip_If_already_present_In_cart)for(let e=0,o;e<_.length;e++){o=_[e],console.log(o);for(let e=0;e<t.items.length;e++)if(t.items[e].product_id===o){console.log("already present in cart"),p=!1;break}}let f=!0,C=Shopify.country;if(b.funnelRules.specific_countries.isSelected){let e=b.funnelRules.specific_countries.selectedCountries;f=e.includes(C)}let y=!0;if(b.funnelRules.once_per_buyer){let e=localStorage.getItem("oncePerBuyer");null===e?y=!0:(y=!1,localStorage.removeItem("oncePerBuyer"))}if(console.log(u,a,p,f,y),console.log(u&&a&&p&&f&&y),u&&a&&p&&f&&y){async function e(){let e=await fetch(`${superAssistantUser2_hostedUrl}/api/analytics/addViews`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({funnelId:b._id})});e=await e.json(),console.log(e)}$(".mask").addClass("active");var l=document.querySelectorAll(".countdownTimer");l.forEach(e=>{o(300,e)}),e()}b.funnelRules.once_per_buyer&&localStorage.setItem("oncePerBuyer",!0)}})},2e3);let i=document.querySelectorAll(".close,.mask");i.forEach(e=>{e.onclick=()=>{t()}}),document.addEventListener("keyup",o=>{27==o.keyCode&&t()}),setTimeout(()=>{function e(e){t(o+=e),console.log("here",e)}function t(e){console.log("top");var t=document.getElementsByClassName("slide"),n;for(e>t.length&&(o=1),1>e&&(o=t.length),n=0;n<t.length;n++)t[n].style.display="none";t[o-1].style.display="block",console.log("bottom")}var o=1;t(o),document.querySelector(".prev").addEventListener("click",()=>{e(-1)}),document.querySelector(".next").addEventListener("click",()=>{e(1)})},3e3)}})}function o(){function e(e){for(var t=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=o.length,d=0;d<e;d++)t.push(o.charAt(Math.floor(Math.random()*n)));return`${superAssistantUser2_shopDomain.toUpperCase()}-`+t.join("")}function t(e,t){var o=e,i,n;setInterval(function(){i=parseInt(o/60,10),n=parseInt(o%60,10),i=10>i?"0"+i:i,n=10>n?"0"+n:n,t.textContent=i+":"+n,0>--o&&(o=0)},1e3)}async function o(e,t,o,i){console.log(g[e]),await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:i,id:o}]})}).then(e=>e.json()).then(async o=>{console.log(o);let i=g[e],n="";if("A-A"===t?n=i.downsellCondition.offerAccepted.offerAccepted_child:"D-A"==t&&(n=i.downsellCondition.offerDeclined.offerAccepted_child),n.isExists&&!n.skip_offer){let e,t,o,i,d;b.push(n.selectedProduct.id),t=`${n.selectedProduct.title}-${n.selectedProduct.variants[0].title}`,o=n.selectedProduct.variants[0].price;let l=n.selectedProduct.variants[0].id;if("Discount"!==n.discount.type)e="Deal unlocked! You might need this too! ",i=`
            <ins style="text-decoration: none; color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${o}
            </ins>`,d=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===n.discount.discountType){let t=s.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${n.discount.discountValue}</span>`),console.log(t.join(" ")),e=t.join(" ");let c=parseFloat(o)-parseFloat(n.discount.discountValue)+"";i=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
                    <ins style="text-decoration: none; color:${s.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${c}
                    </ins>`;let r=n.discount.discountValue;d=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">${s.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}else if("%"===n.discount.discountType){let t=s.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${n.discount.discountValue}% </span>`),console.log(t.join(" ")),e=t.join(" ");let c=parseFloat(o)-parseFloat(n.discount.discountValue/100*parseFloat(o))+"";i=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
            <ins style="text-decoration: none; color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${c}
            </ins>`;let r=parseFloat(n.discount.discountValue/100*parseFloat(o))+"";d=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">${s.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}let c="";n.include_free_shipping&&(c=`<span
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
                >Free shipping included</span>`);let r=findImage(n.selectedProduct.variants[0].image_id,n.selectedProduct.images);console.log(r);let u={discountPercentage:e,productName:t,freeShipping:c,optionsList:" ",discountedPrice:i,totalDiscount:d,productImage:r},a=`
      <div
  style="background-color:${s.backGroundColor}"
  id="upSell2Modal"
>
  <button id="upSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};background:${s.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${s.PricetextSize}px;
        background:${s.PricebackGroundColor};
        padding: 0.5em;
        color: ${s.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${s.productNameFamily};color:${s.productNameColor}; font-size: ${s.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${s.buttonTextSize}px;
          color: ${s.buttonTextColor};
          background: ${s.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild1_button"
        class="upSellChild2Close"
      >
        ${s.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${s.checkoutTextSize};
          color:${s.checkoutTextColor};
          background:${s.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild1_button"
        class="upSellChild2Close"
      >
        ${s.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${s.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;a=a.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,function(e){return u[e]});let p=document.createElement("div");p.id="upSell2Modal",p.className="modal",p.style.visibility="visible",p.style.opacity="1",p.style.height="40em",p.style.top="19%",p.style.borderRadius="11px",p.innerHTML=a,document.querySelector("body").appendChild(p),document.querySelector("#upSellModal2Close").addEventListener("click",()=>p.style.display="none"),document.querySelector("#upSellChild1_button").addEventListener("click",async()=>{let e=parseFloat(document.querySelector("#upSellChild1_quantity").value);await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:e,id:l}]})}).then(e=>e.json()).then(async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]};console.log(t),console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})})}),document.querySelector("#downSellChild1_button").addEventListener("click",async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})});let f=document.querySelectorAll(".upSellChild2Close");f.forEach(e=>{e.addEventListener("click",()=>{p.style.display="none"})}),document.addEventListener("keyup",t=>{27==t.keyCode&&(p.style.display="none")})}else n.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e);let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]};console.log(t),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))})}async function i(e,t){console.log(g[e]);let o=g[e],i="";if("A-D"===t?i=o.downsellCondition.offerAccepted.offerDeclined_child:"D-D"==t&&(i=o.downsellCondition.offerDeclined.offerDeclined_child),i.isExists&&!i.skip_offer){let e,t,o,n,d;b.push(i.selectedProduct.id),t=`${i.selectedProduct.title}-${i.selectedProduct.variants[0].title}`,o=i.selectedProduct.variants[0].price;let l=i.selectedProduct.variants[0].id;if("Discount"!==i.discount.type)e="Deal unlocked! You might need this too! ",n=`
            <ins style="text-decoration: none; color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${o}
            </ins>`,d=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===i.discount.discountType){let t=s.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${i.discount.discountValue}</span>`),console.log(t.join(" ")),e=t.join(" ");let c=parseFloat(o)-parseFloat(i.discount.discountValue)+"";n=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
                    <ins style="text-decoration: none; color:${s.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${c}
                    </ins>`;let r=i.discount.discountValue;d=`<p style="font-size: ${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}else if("%"===i.discount.discountType){let t=s.topMessage.split(" "),l=t.indexOf("{{discount}}");-1!==l&&t.splice(l,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${i.discount.discountValue}% </span>`),console.log(t.join(" ")),e=t.join(" ");let c=parseFloat(o)-parseFloat(i.discount.discountValue/100*parseFloat(o))+"";n=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${o} </del>
            <ins style="text-decoration: none; color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${c}
            </ins>`;let r=parseFloat(i.discount.discountValue/100*parseFloat(o))+"";d=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">${s.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}let c="";i.include_free_shipping&&(c=`<span
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
                >Free shipping included</span>`);let r=findImage(i.selectedProduct.variants[0].image_id,i.selectedProduct.images);console.log(r);let u={discountPercentage:e,productName:t,freeShipping:c,optionsList:" ",discountedPrice:n,totalDiscount:d,productImage:r},a=`
      <div
  style="background-color:${s.backGroundColor}"
  id="downSell2Modal"
>
  <button id="downSellModal2Close" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};background:${s.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${s.PricetextSize}px;
        background:${s.PricebackGroundColor};
        padding: 0.5em;
        color: ${s.PricetextColor};
        margin: 0;
      "
    >
      Hurry! You wouldn't have to miss this amazing offer!
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${s.productNameFamily};color:${s.productNameColor}; font-size: ${s.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${s.buttonTextSize}px;
          color: ${s.buttonTextColor};
          background: ${s.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="upSellChild2_button"
        class="downSellChild2Close"
      >
        ${s.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${s.checkoutTextSize};
          color:${s.checkoutTextColor};
          background:${s.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="downSellChild2_button"
        class="downSellChild2Close"
      >
        ${s.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${s.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;a=a.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList/gi,function(e){return u[e]});let p=document.createElement("div");p.id="downSell2Modal",p.className="modal",p.style.visibility="visible",p.style.opacity="1",p.style.height="40em",p.style.borderRadius="11px",p.innerHTML=a,document.querySelector("body").appendChild(p),document.querySelector("#downSellModal2Close").addEventListener("click",()=>p.style.display="none"),document.querySelector("#upSellChild2_button").addEventListener("click",async()=>{let e=parseFloat(document.querySelector("#upSellChild2_quantity").value);await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:e,id:l}]})}).then(e=>e.json()).then(async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{let t={username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]};console.log(t),console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})})}),document.querySelector("#downSellChild2_button").addEventListener("click",async()=>{await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e,k,superAssistantUser2_shopDomain),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})});let f=document.querySelectorAll(".downSellChild2Close");f.forEach(e=>{e.addEventListener("click",()=>{p.style.display="none"})}),document.addEventListener("keyup",t=>{27==t.keyCode&&(p.style.display="none")})}else i.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))}async function n(e,t,n){console.log(g[e]),$(".mask").removeClass("active"),console.log(n),await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:n,id:t}]})}).then(e=>e.json()).then(async t=>{console.log(t);let n=g[e],d=n.downsellCondition.offerAccepted;if(n.downsellCondition.offerAccepted.isExists&&!n.downsellCondition.offerAccepted.skip_offer){let t,n,l,c,r;b.push(d.selectedProduct.id),n=`${d.selectedProduct.title}-${d.selectedProduct.variants[0].title}`,l=d.selectedProduct.variants[0].price;let u=d.selectedProduct.variants[0].id;if("Discount"!==d.discount.type)t="Deal unlocked! You might need this too! ",c=`
            <ins style="text-decoration: none; color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${l}
            </ins>`,r=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===d.discount.discountType){let e=s.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${d.discount.discountValue}</span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(d.discount.discountValue)+"";c=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
                    <ins style="text-decoration: none; color:${s.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${i}
                    </ins>`;let n=d.discount.discountValue;r=`<p style="font-size: 0.9em">${s.discountMessage} ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}else if("%"===d.discount.discountType){let e=s.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${d.discount.discountValue}% </span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(d.discount.discountValue/100*parseFloat(l))+"";c=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
            <ins style="text-decoration: none; color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${i}
            </ins>`;let n=parseFloat(d.discount.discountValue/100*parseFloat(l))+"";r=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">${s.discountMessage} ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}let a="";d.include_free_shipping&&(a=`<span
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
                >Free shipping included</span>`);let p=findImage(d.selectedProduct.variants[0].image_id,d.selectedProduct.images);console.log(p);let f={variantId:u,INDEX:e,discountPercentage:t,productName:n,freeShipping:a,optionsList:" ",discountedPrice:c,totalDiscount:r,productImage:p},C=`
      <div
  style="background-color:${s.backGroundColor}"
  id="upSellModal"
>
  <button id="upSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};background:${s.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${s.PricetextSize}px;
        background:${s.PricebackGroundColor};
        padding: 0.5em;
        color: ${s.PricetextColor};
        margin: 0;
      "
    >
      Hurry! Offer will expire in <span id="countdownTimer">offerTime</span>
    </h4>
    <div>
      <h4 style="font-weight: 600;font-family:${s.productNameFamily};color:${s.productNameColor}; font-size: ${s.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center;">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${s.buttonTextSize}px;
          color: ${s.buttonTextColor};
          background: ${s.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openUpSellChild_button"
        class="upSellChildClose"
        onclick="openUpSellChild(INDEX,'A-A',variantId)"
      >
        ${s.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${s.checkoutTextSize};
          color:${s.checkoutTextColor};
          background:${s.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild_button"
        class="upSellChildClose"
        onclick="openDownSellChild(INDEX,'A-D')"
      >
        ${s.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${s.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;C=C.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX/gi,function(e){return f[e]});let y=document.createElement("div");y.id="upSellModal",y.className="modal",y.style.visibility="visible",y.style.opacity="1",y.style.height="39em",y.style.top="19%",y.style.borderRadius="11px",y.innerHTML=C,document.querySelector("body").appendChild(y),document.querySelector("#upSellModalClose").addEventListener("click",()=>y.style.display="none");let h=document.querySelectorAll(".upSellChildClose");h.forEach(e=>{e.addEventListener("click",()=>y.style.display="none")}),document.querySelector("#openUpSellChild_button").onclick=()=>{let e=parseFloat(document.querySelector("#upSell_child_quantity").value);o(f.INDEX,"A-A",f.variantId,e)},document.querySelector("#openDownSellChild_button").onclick=()=>{i(f.INDEX,"A-D")},document.addEventListener("keyup",t=>{27==t.keyCode&&(y.style.display="none")})}else n.downsellCondition.offerAccepted.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))})}async function d(e){console.log(g[e]),$(".mask").removeClass("active");let t=g[e],n=t.downsellCondition.offerDeclined;if(t.downsellCondition.offerDeclined.isExists&&!t.downsellCondition.offerDeclined.skip_offer){let t,d,l,c,r;b.push(n.selectedProduct.id),d=`${n.selectedProduct.title}-${n.selectedProduct.variants[0].title}`,l=n.selectedProduct.variants[0].price;let u=n.selectedProduct.variants[0].id;if("Discount"!==n.discount.type)t="Deal unlocked! You might need this too! ",c=`
            <ins style="text-decoration: none; color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${l}
            </ins>`,r=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===n.discount.discountType){let e=s.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${n.discount.discountValue}</span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(n.discount.discountValue)+"";c=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
                    <ins style="text-decoration: none; color:${s.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${i}
                    </ins>`;let d=n.discount.discountValue;r=`<p style="font-size: ${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">${s.discountMessage} ${superAssistantUser2_shopifyCurrency} ${d}!</p>`}else if("%"===n.discount.discountType){let e=s.topMessage.split(" "),o=e.indexOf("{{discount}}");-1!==o&&e.splice(o,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${n.discount.discountValue}% </span>`),console.log(e.join(" ")),t=e.join(" ");let i=parseFloat(l)-parseFloat(n.discount.discountValue/100*parseFloat(l))+"";c=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${l} </del>
            <ins style="text-decoration: none; color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${i}
            </ins>`;let d=parseFloat(n.discount.discountValue/100*parseFloat(l))+"";r=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">${s.discountMessage} ${superAssistantUser2_shopifyCurrency} ${d}!</p>`}let a="";n.include_free_shipping&&(a=`<span
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
                >Free shipping included</span>`);let p=findImage(n.selectedProduct.variants[0].image_id,n.selectedProduct.images);console.log(p);let f={variantId:u,INDEX:e,discountPercentage:t,productName:d,freeShipping:a,optionsList:" ",discountedPrice:c,totalDiscount:r,productImage:p},C=`
      <div
  style="background-color:${s.backGroundColor}"
  id="downSellModal"
>
  <button id="downSellModalClose" style="float: right;
    background: black;
    color: white;" role="button">X</button>

  <div style="padding: 1em; text-align: center">
    <p style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};background:${s.topMessagebackGroundColor} ">
      discountPercentage
    </p>
    <h4
      style="
        font-weight: 600;
        font-size: ${s.PricetextSize}px;
        background:${s.PricebackGroundColor};
        padding: 0.5em;
        color: ${s.PricetextColor};
        margin: 0;
      "
    >
      Hurry! Offer will expire in <span id="countdownTimer">offerTime</span>
    </h4>
    <div >
      <h4 style="font-weight: 600;font-family:${s.productNameFamily};color:${s.productNameColor}; font-size: ${s.productNameSize}px; padding: 0.5em; margin: 0">
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
        <label for="quantity" style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};">Quantity:</label>
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
    <div style="display: flex; flex-direction: column; gap: 1em;justify-content: center">
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${s.buttonTextSize}px;
          color: ${s.buttonTextColor};
          background: ${s.buttonbackGroundColor};
          cursor: pointer;
          border: 1px solid #cdd0d2;
          
        "
        id="openUpSellChild2_button"
        class="downSellChildClose"
        onclick="openUpSellChild(INDEX,'D-A',variantId)"
      >
        ${s.buttonText}
      </button>
      <button
        style="
          padding: 1em 2em;
          font-weight: 600;
          font-size: ${s.checkoutTextSize};
          color:${s.checkoutTextColor};
          background:${s.checkoutbackGroundColor} ; 
          cursor: pointer;
          border: 1px solid #cdd0d2;
        "
        id="openDownSellChild2_button"
        class="downSellChildClose"
        onclick="openDownSellChild(INDEX,'D-D')"

      >
        ${s.checkoutText}
      </button>
    </div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
      "
    >
      <img
        src=${popUpLogoUrl}
        alt=""
        style="width: 1.5em; height: 1.5em"
      />
      <p style="font-size: 0.9em;color:${s.textColor};">Powered By SuperAssistant</p>
    </div>
  </div>


    `;C=C.replace(/discountPercentage|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,function(e){return f[e]});let y=document.createElement("div");y.id="downSellModal",y.className="modal",y.style.visibility="visible",y.style.opacity="1",y.style.height="39em",y.style.top="19%",y.style.borderRadius="11px",y.innerHTML=C,document.querySelector("body").appendChild(y),document.querySelector("#downSellModalClose").addEventListener("click",()=>y.style.display="none");let h=document.querySelectorAll(".downSellChildClose");h.forEach(e=>{e.addEventListener("click",()=>y.style.display="none")}),document.querySelector("#openUpSellChild2_button").onclick=()=>{let e=parseFloat(document.querySelector("#upSell_child_quantity").value);o(f.INDEX,"D-A",f.variantId,e)},document.querySelector("#openDownSellChild2_button").onclick=()=>{i(f.INDEX,"D-D")},document.addEventListener("keyup",t=>{27==t.keyCode&&(y.style.display="none")})}else t.downsellCondition.offerDeclined.isExists||(await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e,k,superAssistantUser2_shopDomain),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})}))}function l(e,t){let o=`
  <div style="padding: 1em; text-align: center" background:${s.backGroundColor}>
        <p style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};background:${s.topMessagebackGroundColor} ">
          discountPercentage
        </p>
        <h4
          style="
            font-weight: 600;
            font-size: ${s.PricetextSize}px;
            background:${s.PricebackGroundColor};
            padding: 0.5em;
            color: ${s.PricetextColor};
            margin:0;
          "
        >
          Hurry! Offer will expire in <span id="countdownTimer" class="countdownTimer">offerTime</span>
        </h4>
        <div >
          <h4 style="font-weight: 600;font-family:${s.productNameFamily};color:${s.productNameColor}; font-size: ${s.productNameSize}px; padding: 0.5em;margin:0;">
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
            <label for="quantity" style="font-size:${s.textSize}px;color:${s.textColor};font-family:${s.textFamily};">Quantity:</label>
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
            gap: 1em;
            justify-content: center;
          "
        >
          <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${s.buttonTextSize}px;
                  color: ${s.buttonTextColor};
                  background: ${s.buttonbackGroundColor};
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openUpSellParent_Button-INDEX"
              >
                ${s.buttonText}
              </button>
              <button
                style="
                  padding: 1em 2em;
                  font-weight: 600;
                  font-size: ${s.checkoutTextSize};
                  color:${s.checkoutTextColor};
                  background:${s.checkoutbackGroundColor} ; 
                  cursor: pointer;
                  border: 1px solid #cdd0d2;
                "
                id="openDownSellParent_Button-INDEX"
              >
                ${s.checkoutText}
              </button>
        </div>
        <div style="display: flex; justify-content: center;align-items: center; padding-top: 1em">
          <img
            src=${popUpLogoUrl}
            alt=""
            style="width: 1.5em;height: 1.5em;color:${s.textColor}"
          />
          <p style="font-size: 0.9em;color:${s.textColor};">Powered By SuperAssistant</p>
        </div>
      </div>
          </div>
      </div>
  `;o=o.replace(/discountPercentage|offerTime|productName|discountedPrice|totalDiscount|freeShipping|productImage|optionsList|INDEX|variantId/gi,function(t){return e[t]}),console.log(o);let i=document.createElement("div");i.className="slide fade",i.innerHTML=o,f.appendChild(i),"manual"===t?(document.querySelector(`#openUpSellParent_Button-${e.INDEX}`).onclick=()=>{let t=parseFloat(document.querySelector(`#upSell_parent_quantity-${e.INDEX}`).value);n(e.INDEX,e.variantId,t)},document.querySelector(`#openDownSellParent_Button-${e.INDEX}`).onclick=()=>{d(e.INDEX)}):"autopilot"==t&&(document.querySelector(`#openUpSellParent_Button-${e.INDEX}`).onclick=async()=>{$(".mask").removeClass("active");let t=parseFloat(document.querySelector(`#upSell_parent_quantity-${e.INDEX}`).value);await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{quantity:t,id:e.variantId}]})}).then(e=>e.json()).then(async e=>{console.log(e),await fetch("/cart.js").then(e=>e.json()).then(async e=>{console.log(e),await fetch(customCheckoutUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:superAssistantUser2_shopDomain,funnel:k,newCart:e,oldCart:[]})}).then(e=>e.json()).then(e=>{console.log(e),window.location=e.url})})})},document.querySelector(`#openDownSellParent_Button-${e.INDEX}`).onclick=()=>{$(".mask").removeClass("active")})}let c=Shopify.checkout;console.log(superAssistantUser2);let s=superAssistantUser2.discountStyle[0];console.log(e(6));let r=e(6),u=document.createElement("div");u.role="dialog",u.className="mask";let a=document.createElement("div");a.className="modal",a.role="alert",a.id="superAssistantModal",a.style.borderRadius="10px",a.style.background=s.backGroundColor,a.style.height="37em";let p=document.createElement("button");p.className="close",p.role="button",p.innerText="X";let f=document.createElement("div");f.className="sliderBox";let C=document.createElement("a");C.className="prev",C.innerHTML="&#10094;";let y=document.createElement("a");y.className="next",y.innerHTML="&#10095;",f.appendChild(C),f.appendChild(y),a.appendChild(p),a.appendChild(f),document.querySelector("body").appendChild(u),document.querySelector("body").appendChild(a);let h=[],g=[],x=[],m=[],P=[];console.log(c);let S=[];c.line_items.forEach(e=>{S.push(e.product_id),P.push(e.variant_id)}),console.log(P),console.log(S),superAssistantUser2.funnels.forEach(e=>{"thankyou-page"===e.placement&&e.enable&&!e.isDeleted&&h.push(e)}),console.log(),console.log(h),h=h.sort((e,t)=>e.funnelRules.add_priority.priority-t.funnelRules.add_priority.priority),console.log(h);let k=null;for(let e=0;e<h.length;e++)if("all"===h[e].trigger.selectedOption){k=h[e],h[e].offers.forEach(e=>{g.push(e),x.push("all")});break}else if("specific-product"===h[e].trigger.selectedOption||"specific-collection"===h[e].trigger.selectedOption){let t=[];h[e].trigger.selectedProducts.forEach(e=>{t.push(e.id)}),console.log(t),console.log(S);let o=t.filter(e=>S.includes(e));if(console.log(o),console.log(0===o.length),0!==o.length){k=h[e],h[e].offers.forEach(o=>{g.push(o),x=t,h[e].trigger.excludedVariantIds.forEach(e=>{m.push(e)})});break}}console.log(g),console.log(k);let b=[];if(null!==k)if("addManually"===k.offerType)for(let e=0;e<g.length;e++){let t=g[e].selectedProduct.variants[0].id,o,i,n,d,c;if(b.push(g[e].selectedProduct.id),i=`${g[e].selectedProduct.title}-${g[e].selectedProduct.variants[0].title}`,n=g[e].selectedProduct.variants[0].price,"Discount"!==g[e].discount.type)o="Deal unlocked! You might need this too! ",d=`
            <ins style="text-decoration: none;  color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${n}
            </ins>`,c=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===g[e].discount.discountType){console.log(s.topMessage);let t=s.topMessage.split(" "),i=t.indexOf("{{discount}}");-1!==i&&t.splice(i,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${g[e].discount.discountValue}</span>`),console.log(t.join(" ")),o=t.join(" ");let l=parseFloat(n)-parseFloat(g[e].discount.discountValue)+"";d=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${n} </del>
                    <ins style="text-decoration: none; color:${s.newPriceColor} ; font-weight: 600">
                      ${superAssistantUser2_shopifyCurrency} ${l}
                    </ins>`;let r=g[e].discount.discountValue;c=`<p style="font-size: ${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">${s.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}else if("%"===g[e].discount.discountType){let t=s.topMessage.split(" "),i=t.indexOf("{{discount}}");-1!==i&&t.splice(i,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${g[e].discount.discountValue}% </span>`),console.log(t.join(" ")),o=t.join(" ");let l=parseFloat(n)-parseFloat(g[e].discount.discountValue/100*parseFloat(n))+"";d=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${n} </del>
            <ins style="text-decoration: none; color:${s.newPriceColor}; font-weight: 600">
              ${superAssistantUser2_shopifyCurrency} ${l}
            </ins>`;let r=parseFloat(g[e].discount.discountValue/100*parseFloat(n))+"";c=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">${s.discountMessage} ${superAssistantUser2_shopifyCurrency} ${r}!</p>`}let r="";g[e].include_free_shipping&&(r=`<span
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
                >Free shipping included</span>`);let u=findImage(g[e].selectedProduct.variants[0].image_id,g[e].selectedProduct.images);console.log(u);let a={variantId:t,INDEX:e,discountPercentage:o,offerTime:"5:00",productName:i,freeShipping:r,optionsList:" ",discountedPrice:d,totalDiscount:c,productImage:u};l(a,"manual")}else if("autoPilot"===k.offerType){let e=S[0];if(console.log(e),"shopifyRecommendation"===k.autoPiltoType){async function t(){let t=`/recommendations/products.json?product_id=${e}&limit=3`;k.offers[0].limit_no_of_products.isSelected&&(t=`/recommendations/products.json?product_id=${e}&limit=${k.offers[0].limit_no_of_products.limit}`),await fetch(t).then(e=>e.json()).then(e=>{console.log(e);let t=e.products;for(let o=0;o<t.length;o++)if(t[o].available){b.push(t[o].id);let e=t[o].variants[0].id,i,n,d,c,r;if(n=`${t[o].title}-${t[o].variants[0].title}`,d=t[o].variants[0].price/100,"Discount"!==g[0].discount.type)i="Deal unlocked! You might need this too! ",c=`
              <ins style="text-decoration: none; color: ${s.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${d}
              </ins>`,r=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===g[0].discount.discountType){let e=s.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${g[0].discount.discountValue}</span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(g[0].discount.discountValue)+"";c=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${s.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=g[0].discount.discountValue;r=`<p style="font-size: ${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}else if("%"===g[0].discount.discountType){let e=s.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${g[0].discount.discountValue}% </span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(g[0].discount.discountValue/100*parseFloat(d))+"";c=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${s.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=parseFloat(g[0].discount.discountValue/100*parseFloat(d))+"";r=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}let u="";g[0].include_free_shipping&&(u=`<span
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
                >Free shipping included</span>`);let a="";a=null===t[o].variants[0].featured_image?`https://${t[o].featured_image.slice(2)}`:t[o].variants[0].featured_image.src;let p={variantId:e,INDEX:o,discountPercentage:i,offerTime:"5:00",productName:n,freeShipping:u,optionsList:" ",discountedPrice:c,totalDiscount:r,productImage:a};l(p,"autopilot")}})}t()}else if("sameProductForLess"===k.autoPiltoType){console.log("sameProductForLess");let e=Shopify.checkout.line_items;for(let t=0;t<e.length;t++){b.push(e[t].id);let o=e[t].variant_id,i,n,d,c,r;if(n=`${e[t].title}-${e[t].variant_title}`,d=e[t].price,"Discount"!==g[0].discount.type)i="Deal unlocked! You might need this too! ",c=`
              <ins style="text-decoration: none; color: ${s.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${d}
              </ins>`,r=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">Quickly grab this amazing deal!</p>`;else if("INR"===g[0].discount.discountType){let e=s.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${superAssistantUser2_shopifyCurrency} ${g[0].discount.discountValue}</span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(g[0].discount.discountValue)+"";c=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${s.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=g[0].discount.discountValue;r=`<p style="font-size: ${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}else if("%"===g[0].discount.discountType){let e=s.topMessage.split(" "),t=e.indexOf("{{discount}}");-1!==t&&e.splice(t,1,`<span style="font-size:${s.PricetextSize};background:${s.PricebackGroundColor};color:${s.PricetextColor}">${g[0].discount.discountValue}% </span>`),console.log(e.join(" ")),i=e.join(" ");let o=parseFloat(d)-parseFloat(g[0].discount.discountValue/100*parseFloat(d))+"";c=`<del style="color: ${s.oldPriceColor}; font-weight: 600">${superAssistantUser2_shopifyCurrency} ${d} </del>
              <ins style="text-decoration: none; color: ${s.newPriceColor}; font-weight: 600">
                ${superAssistantUser2_shopifyCurrency} ${o}
              </ins>`;let n=parseFloat(g[0].discount.discountValue/100*parseFloat(d))+"";r=`<p style="font-size:${s.discounttextSize}px;font-family:${s.discounttextFamily};color:${s.discounttextColor}">You save ${superAssistantUser2_shopifyCurrency} ${n}!</p>`}let u="";g[0].include_free_shipping&&(u=`<span
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
                >Free shipping included</span>`);let a=e[t].image_url,p={variantId:o,INDEX:t,discountPercentage:i,offerTime:"5:00",productName:n,freeShipping:u,optionsList:" ",discountedPrice:c,totalDiscount:r,productImage:a};l(p,"autopilot")}}}if(console.log(b),console.log(g),0!=g.length){function o(){$(".mask").removeClass("active")}setTimeout(async()=>{await fetch("/cart.js").then(e=>e.json()).then(e=>{console.log(e);let o=c.line_items,i=[];o.forEach(e=>{i.push(e.variant_id)});let n=i.filter(e=>m.includes(e));if(console.log(i),console.log(m),console.log(0===n.length),console.log(n),0===n.length){let e=c,o=null,i=null,n=null,s=null,r=!0;if(k.funnelRules.set_start_date.isSelected&&(o=k.funnelRules.set_start_date.startDate),k.funnelRules.set_end_date.isSelected&&(i=k.funnelRules.set_end_date.endDate),null!==i&&null!==o){const e=e=>{let t=new Date(e),o=t.getDate(),i=t.getMonth()+1,n=t.getFullYear()-2e3;return 10>o&&(o="0"+o),10>i&&(i="0"+i),`${i}/${o}/${n}`};let t=e(o),n=e(i),d=e(new Date);r=function(e,t,o){var i,n,d;return i=Date.parse(e),n=Date.parse(t),d=Date.parse(o),!!(d<=n&&d>=i)}(t,n,d)}else if(null!==o){let e=new Date(o),t=new Date;console.log(o);var d=function(e,t){return!!(e.setHours(0,0,0,0)<=t.setHours(0,0,0,0))};r=d(e,t)}let u=!0;console.log(k.funnelRules.show_Only_for_Specific_CartValue.isSelected),k.funnelRules.show_Only_for_Specific_CartValue.isSelected&&(n=k.funnelRules.show_Only_for_Specific_CartValue.minCartValue,s=k.funnelRules.show_Only_for_Specific_CartValue.maxCartValue,u=n<=c.total_price/100&&c.total_price/100<s,console.log(n,s,u));let a=!0;if(console.log(b),console.log(k.funnelRules.skip_If_already_present_In_cart),k.funnelRules.skip_If_already_present_In_cart)for(let t=0,o;t<b.length;t++){o=b[t],console.log(o);for(let t=0;t<e.line_items.length;t++)if(e.line_items[t].product_id===o){console.log("already present in cart"),a=!1;break}}let p=!0,f=Shopify.country;if(k.funnelRules.specific_countries.isSelected){let e=k.funnelRules.specific_countries.selectedCountries;p=e.includes(f)}let C=!0;if(k.funnelRules.once_per_buyer){let e=localStorage.getItem("oncePerBuyer");null===e?(console.log("notstored"),C=!0):(console.log("stored"),C=!1,localStorage.removeItem("oncePerBuyer"))}if(console.log(r,u,a,p,C),console.log(r&&u&&a&&p&&C),r&&u&&a&&p&&C){async function e(){let e=await fetch(`${superAssistantUser2_hostedUrl}/api/analytics/addViews`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({funnelId:k._id})});e=await e.json(),console.log(e)}$(".mask").addClass("active");var l=document.querySelectorAll(".countdownTimer");l.forEach(e=>{t(300,e)}),e()}k.funnelRules.once_per_buyer&&localStorage.setItem("oncePerBuyer",!0)}})},1e3);let i=document.querySelectorAll(".close,.mask");i.forEach(e=>{e.onclick=()=>{o()}}),document.addEventListener("keyup",t=>{27==t.keyCode&&o()}),setTimeout(()=>{function e(e){t(o+=e),console.log("here",e)}function t(e){console.log("top");var t=document.getElementsByClassName("slide"),n;for(e>t.length&&(o=1),1>e&&(o=t.length),n=0;n<t.length;n++)t[n].style.display="none";t[o-1].style.display="block",console.log("bottom")}var o=1;t(o),document.querySelector(".prev").addEventListener("click",()=>{e(-1)}),document.querySelector(".next").addEventListener("click",()=>{e(1)})},2e3)}}(function(){var e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("type","text/css"),e.setAttribute("href","https://cdn.jsdelivr.net/gh/varuns1007/Hosted-Links/upSell-testing-3.css"),document.head.appendChild(e)})();let i=document.createElement("script");i.src="https://unpkg.com/axios/dist/axios.min.js",document.querySelector("body").appendChild(i);let n=document.createElement("script");n.src="https://code.jquery.com/jquery-3.4.0.js",document.querySelector("body").appendChild(n);const d=()=>!!(Shopify.checkout&&Shopify.checkout.created_at);let l=window.location.href.split("/");if(console.log(l),console.log(d()),d())console.log("thankyou page"),o();else for(let o=0;o<l.length;o++)"products"===l[o]?(console.log("productPage"),e()):"cart"===l[o]&&(console.log("cartPage"),t())}async function init(){try{let e=await fetch(`${superAssistantUser2_hostedUrl}/api/analytics/userData?shop=${superAssistantUser2_shopDomain}`);if(e=await e.json(),console.log(e),console.log(e.shop),superAssistantUser2=e.shop,console.log(superAssistantUser2.Upsellenable),superAssistantUser2.Upsellenable){console.log("%c%s","color: white;background:#45b3e0;font-weight:600;padding:0.3em"," \xF0\u0178\u017D\u2030UpSell Discounts by Super Assistant: ready"),start()}}catch(e){console.log(e),console.log("app not working")}}init();
