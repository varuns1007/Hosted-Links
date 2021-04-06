
// alert('heyy')
let axiosTag = document.createElement("script");
axiosTag.src = "https://unpkg.com/axios/dist/axios.min.js";
document.querySelector("body").appendChild(axiosTag);

let currentPage = window.location.href.split('/')
  console.log(currentPage);
let shopDomain = Shopify.shop.split(".")[0];
let productName = meta.product.variants[0].name.toLowerCase().split(" ").join('-')

for (let i = 0; i < currentPage.length; i++){
  if (currentPage[i] === 'product') {
    console.log('entered if');
    selectWidgetLocation()
  }
}
  function selectWidgetLocation() {
    let positionData;
    let parentDiv;
    var clicked = false;
    function updateShift(event) {
      if (event.shiftKey && !clicked) {
        event.target.classList.add("shift-pressed");
      } else {
        event.target.classList.remove("shift-pressed");
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
            '<div class="positionPopup" id="ulList"><ul><li onclick="position(`Above`,parentDiv)"><a href="#">Above Element</a> </li><li onclick="position(`Below`,parentDiv)"><a href="#">Below Element</a> </li></ul></div>'
          );

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
        .post("https://fc603c11d905.ngrok.io/widgetSave", {
          div: node,
          location: positionData,
        })
        .then((result) => {
          window.location = "http://localhost:3000/settings";
        })
        .catch((err) => console.log(err.data));
    }
  }