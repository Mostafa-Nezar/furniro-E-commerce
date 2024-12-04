import {createproduct, likeitem, myproducts, alertion} from "./main/products.js";
const limitedProducts = myproducts.slice(0, 8);
createproduct(document.getElementById("products-show"), limitedProducts);
 localStorage.getItem("mails") ? likeitem(document.getElementById("products-show"), limitedProducts, myproducts): alertion();