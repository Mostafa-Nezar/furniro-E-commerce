import {createproduct,myproducts,likeitem,alertion} from "../main/products.js";
let products = JSON.parse(localStorage.getItem("myarrlike")) || myproducts
console.log(products);
products.forEach(e=>!e.size?e.size = "l":e.size)
products.forEach(e=>console.log(e.size))
let sizes = document.querySelectorAll(".size")
const stars = document.querySelectorAll('.stars input');
const ratingValue = document.getElementById('rating-value');
const vtwo =  document.querySelector(".v2")
document.addEventListener("DOMContentLoaded", () => {
    let productId = new URLSearchParams(window.location.search).get('id');
    if (productId && products) {
        let product = products.find(p => p.id == productId);
        if (product) {
            sizes.forEach((e)=>{
                e.addEventListener("click",()=>{
                    sizes.forEach((e)=>e.classList.remove("active"))
                    product.size = e.innerHTML
                    e.classList.add("active")
                    console.log(product.size);
                    localStorage.setItem("myarrlike",JSON.stringify(products))
                })
                e.classList.remove("active")
                if (e.innerHTML == product.size) {
                    e.classList.add("active")
                }
            })
            let views = localStorage.getItem(`page_view_count_${product.id}`);
            let rateviews = localStorage.getItem(`page_rate_view_count_${product.id}`);
            views = (views ? parseInt(views) + 1 : 1);
            localStorage.setItem(`page_view_count_${product.id}`, views);
            rateviews = (rateviews ? parseInt(rateviews) + 1 : 1);
            localStorage.setItem(`page_rate_view_count_${product.id}`, rateviews);
            window.onload = () =>{
                rateviews--;  
                localStorage.setItem(`page_rate_view_count_${product.id}`, rateviews);
            }
            let rateviewIncremented = false;  
            stars.forEach((e) => {
                e.addEventListener("click", () => {
                    if (!rateviewIncremented) { 
                        rateviews++;  
                        localStorage.setItem(`page_rate_view_count_${product.id}`, rateviews); 
                        rateviewIncremented = true;
                    }
                });
            }); 
            localStorage.setItem(`page_view_count_${product.id}`, views);
            
            localStorage.setItem(`page_rate_view_count_${product.id}`, rateviews);
                product.rateviews = rateviews;                
                product.views = views;
            localStorage.setItem("myarrlike", JSON.stringify(products))            
            document.getElementById("light").innerHTML = product.name;
            document.getElementById("product-image").src = "../" + product.image;
            document.querySelector(".key").innerHTML=product.key
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-description").textContent = product.describtion;
            document.getElementById("product-price").textContent = `Rs ${product.price},000.00`;
            document.querySelector(".plus").setAttribute("data-id", productId);
            document.querySelector(".minus").setAttribute("data-id", productId);
            document.querySelector(".one img").src="../" + product.image1
            document.querySelector(".two img").src="../" + product.image2
            document.querySelector(".three img").src="../" + product.image3
            document.querySelector(".four img").src="../" + product.image4
            document.querySelector(".comp").href = `../compare/compare.html?id=${productId}`
            const savedRating = localStorage.getItem(`rate${product.id}`)
            if (savedRating) {
                ratingValue.textContent = savedRating;
                vtwo.textContent = " " +  savedRating + " ";
                product.rate = savedRating                
                stars.forEach(star => {
                    if (star.value === savedRating) {
                        star.checked = true;
                    }
                });
            }
            let lastSelectedRating = null;
            stars.forEach((star) => {
                star.addEventListener('change', function() {
                    lastSelectedRating = this.value;
                    ratingValue.textContent = lastSelectedRating;
                    product.rate = lastSelectedRating
                    vtwo.textContent = " " + lastSelectedRating + " ";
                });
            });
            window.addEventListener('beforeunload', function() {
                if (lastSelectedRating !== null) {
                    let reviews = JSON.parse(localStorage.getItem(`reviews${product.id}`)) || [];
                    reviews.push(+lastSelectedRating);
                    localStorage.setItem(`reviews${product.id}`, JSON.stringify(reviews));
                    let reduced = reviews ? reviews.reduce((e, a) => e + a) : 0;
                    product.reviews = reduced
                    let averagerate  = +(product.reviews / product.rateviews).toFixed(2);
                    product.averagerate = averagerate;            
                    localStorage.setItem(`averagerate${product.id}`, averagerate );
                    localStorage.setItem(`reduced${product.id}`, reduced);
                    localStorage.setItem(`rate${product.id}`, product.rate);
                    localStorage.setItem("myarrlike",JSON.stringify(products))
                }
            });
            document.getElementById("add-to-cart").setAttribute("data-id",product.id)
        }
    }
    let suggestions = products
    const chunkSize = 5; 
    const startIndex = Math.floor((productId - 1) / chunkSize) * chunkSize;
    suggestions = suggestions.slice(startIndex, startIndex + chunkSize);    
    let listproduct = document.querySelector(".similar .row");
    createproduct(listproduct,suggestions.filter((e) => e.id != productId))
    localStorage.getItem("mails") ? likeitem(listproduct,suggestions.filter((e) => e.id != productId),products) : alertion();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart.find(p => p.productid == productId);
    if (cartItem) {
        document.querySelector(".q").textContent = cartItem.quantity;
        sizes.forEach((e)=>{
            e.addEventListener("click",()=>{
                cartItem.size = e.innerHTML
                console.log(cartItem);
                localStorage.setItem("cart",JSON.stringify(cart))
            })
        })
    }
    function updateCartQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItem = cart.find(p => p.productid == productId);

        if (cartItem) {
            document.querySelector(".q").textContent = cartItem.quantity;
        }
    }
    document.getElementById("add-to-cart").addEventListener("click", () => {
        updateProductQuantity(productId, 1);
    });
    document.querySelector(".plus").addEventListener("click", () => {
        updateProductQuantity(productId, 1);
    });
    document.querySelector(".minus").addEventListener("click", () => {
        updateProductQuantity(productId, -1);
    });
    function updateProductQuantity(productId, change) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItem = cart.find(p => p.productid == productId);
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity < 0) {
                cart = cart.filter(p => p.productid != productId);
            }
        } else if (change > 0) {
            cart.push({ productid: productId, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartQuantity(productId);
    }
});