const select_COD_button = () => {
    let all_Labels = document.querySelectorAll('label');
    
    let COD_Label=null;
    
    all_Labels.forEach((node) => {
        if (node.innerText === "Cash on Delivery (COD)") {
            COD_Label = node;
            return;
        }
    });
    
    console.log(COD_Label.attributes.for.value);
    if (COD_Label !== null) {
        let searchParameter = COD_Label.attributes.for.value;
        
        let inputTag_for_COD = document.querySelector(`[id=${searchParameter}]`);
        console.log("🚀 ~ file: checkout_testing.js ~ line 17 ~ inputTag_for_COD", inputTag_for_COD)
        
        if (inputTag_for_COD.checked) {
            alert("COD option selected");
            inputTag_for_COD.addEventListener("click", () =>
              alert("COD option selected")
            );
        } else {
            inputTag_for_COD.addEventListener('click',()=>alert('COD option selected'));
        }
    }
}

console.log("trying to run the code on checkout page");

if (typeof Checkout === "object") {
  if (typeof Checkout.$ === "function") {
      /* your super duper code in here, such as: */
      console.log("code ran successfully");
    select_COD_button();
  }
}
