setTimeout(() => {
  document.querySelectorAll(".innercontent img").forEach((e)=>e.style.height="316.85px")
  document.querySelectorAll(".sth").forEach((e)=>e.style.height="63.5833px")
  if (location.pathname == "/cart/cart.html") {
    document.querySelectorAll(".sth").forEach((e)=>e.style.height="74px")
  }
}, 500);
document.addEventListener("click", (e) => {
  let buttonclick = e.target;
   if (buttonclick.classList.contains("addbutton") || buttonclick.classList.contains("plus") || buttonclick.classList.contains("minus") || buttonclick.classList.contains("deleteitem") || buttonclick.classList.contains("addcart") || buttonclick.id == "add-to-cart") {
    setTimeout(() => {
    document.querySelectorAll(".sth").forEach((ee)=>{
      ee.style.height="63.5833px"
    })
    if (location.pathname == "/cart/cart.html") {
      document.querySelectorAll(".sth").forEach((ee)=>{
              ee.style.height="74px"
        })
    }
    }, 0);
   }
});
let scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.onscroll = function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrollToTopBtn.style.display = "block";
      } else {
          scrollToTopBtn.style.display = "none";
      }
  };
  scrollToTopBtn.onclick = function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  };
  if ((location.pathname == "/details/detail.html")) {
    document.querySelectorAll(".ph").forEach((e)=>{
      e.style.height = "61px"
      e.style.cursor = "pointer"
      e.addEventListener("click",(ee)=>{
          document.querySelector("#product-image").src= ee.target.getAttribute("src")
      })
  })
    document.addEventListener("click",()=>{document.querySelectorAll(".ph").forEach(e=>e.style.height = "61px")})
    document.addEventListener("DOMContentLoaded", () => {
      const projectLink = encodeURIComponent(window.location.href);
      const projectTitle = encodeURIComponent("Check out this project!");
      document.querySelectorAll(".share-icon").forEach(icon => {
          icon.addEventListener("click", () => {
              let shareUrl = "";
              if (icon.classList.contains("twitter")) {
                  shareUrl = `https://twitter.com/intent/tweet?url=${projectLink}&text=${projectTitle}`;
              } else if (icon.classList.contains("linkedin")) {
                  shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${projectLink}&title=${projectTitle}`;
              } else if (icon.classList.contains("facebook")) {
                  shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${projectLink}`;
              } else if (icon.classList.contains("whatsapp")) {
              let productId = new URLSearchParams(window.location.search).get('id');
                  const projectLink = `https://mostafa-nezar.github.io/details/detail.html?id=${productId}`;
                  shareUrl = `https://api.whatsapp.com/send?text=${projectLink}`;
              }
              if (shareUrl) {
                   window.open(shareUrl, "_blank", "width=600,height=400,left=500,top=50");
              }
          });
      });
  });
  }
// copy right 
let copyright = () =>{
  let date = new Date()
  document.getElementById("copyright").innerHTML=`<span>${date.getFullYear()}</span>`
  }
  //subscribe
  const subscriber = () => {
    const vali = document.querySelector(".vali");
    const sub = document.querySelector(".subscribe");
    const myemail = document.querySelector(".myemail");
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let arr = JSON.parse(localStorage.getItem("mails")) || [];
  
    // Display subscribed state if already subscribed
    if (arr.length > 0) {
        vali.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-PersonCheck">
                <circle cx="12" cy="7" r="5"/>
                <path d="M17 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"/>
                <path d="M17 16.5l1.5 1.5 2.5-3"/>
            </svg>
        `;
        sub.innerHTML = "Subscribed";
        myemail.disabled = true;
    }
  
    const handleSubscription = () => {
        const emailValue = myemail.value.trim();
        
        if (!emailregex.test(emailValue) || emailValue === "") {
            return; // Early return if the email is invalid
        }
  
        vali.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-PersonCheck">
                <circle cx="12" cy="7" r="5"/>
                <path d="M17 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"/>
                <path d="M17 16.5l1.5 1.5 2.5-3"/>
            </svg>
        `;
        sub.innerHTML = "Subscribed";
        
        arr.push({ mail: emailValue, liked: false });
        localStorage.setItem("mails", JSON.stringify(arr));
        myemail.value = "";
        myemail.disabled = true;
        location.reload()
    };
  
    sub.addEventListener("click", handleSubscription);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleSubscription();
        }
    });
  
    // Clear local storage and reload if already subscribed
    if (arr.length > 0) {
        sub.onclick = () => {
            localStorage.clear();
            location.reload();
        };
    }
  };
  
// like
function like() {
  const arr = JSON.parse(localStorage.getItem("mails")) || [];
  const likeButton = document.getElementById("heart");
  const likeSvg = document.querySelector(".likesvg .pathsvg");
  
  if (arr.length > 0) {
    const user = arr[0];
    
    // Initialize the button state based on the user's liked status
    if (user.liked) {
      likeButton.classList.add("red");
      likeSvg.setAttribute("fill", "currentColor");
    }

    // Handle click event on like button
    likeButton.addEventListener("click", () => {
      user.liked = !user.liked; // Toggle the liked status
      localStorage.setItem("mails", JSON.stringify(arr)); // Save updated liked status
      
      // Update button and SVG fill based on the new liked status
      const isLiked = likeButton.classList.toggle("red");
      likeSvg.setAttribute("fill", isLiked ? "currentColor" : "none");
      localStorage.setItem("color", isLiked ? "red" : "black");
      localStorage.setItem("fill", isLiked ? "currentColor" : "none");
    });

  } else {
    // Create and configure alert popup
    const alertPopup = document.createElement("div");
    alertPopup.innerHTML = "Not Subscribed!";
    alertPopup.classList.add("popup");
    document.body.appendChild(alertPopup);

    // Handle case where user is not subscribed
    likeButton.addEventListener("click", () => {
      alertPopup.classList.add("show");
      setTimeout(() => alertPopup.classList.remove("show"), 3000); // Hide after 3 seconds
    });
  }
}
subscriber()
copyright()
like()

document.querySelector(".myhome").addEventListener("click",(e)=>{
    e.preventDefault()  
    document.querySelector(".going").classList.add("hello")      
        e.target.classList.toggle("go")
        document.querySelector(".nxt").classList.add("go2")
        
    setTimeout(() => {
    location.assign("../index.html")
    }, 3000);
})
document.querySelectorAll(".icon-cart").forEach(e => {
    e.onclick = () => {
      document.querySelectorAll("#listcardparent").forEach(listCard => {
        listCard.classList.toggle("disp");
      });
      document.querySelectorAll(".page").forEach(page => {
        page.classList.toggle("darken");
      });
    };
  });

if (location.pathname != "/checkout/checkout.html") {
  document.querySelectorAll("*").forEach((e)=>{
    e.addEventListener("click",(ee)=>{    
    if ((!ee.target.parentElement.parentElement.classList.contains("icon-cart")) && (document.querySelector("#listcardparent").classList.contains("disp")) && !ee.target.classList.contains("dont")) {
        document.querySelector("#listcardparent").classList.remove("disp")
        document.querySelector(".page").classList.remove("darken")
      }
    })
  })
}
  window.addEventListener('load', () => {
    document.body.classList.remove('no-transition');
  });
  window.addEventListener('beforeunload', () => {
    document.body.classList.add('no-transition');
  });

  if ((location.pathname == "/index.html") || (location.pathname == "/") || (location.pathname == "/details/detail.html") || (location.pathname == "/shop/shop.html")) {
    setTimeout(() => {
      document.querySelectorAll(".sharep").forEach((e)=>{
        e.addEventListener("click",(ee)=>{
          ee.preventDefault()
          window.open("/share/share.html","_blank","width=600,height=400,left=500,top=50")
        })
      })
    }, 1000);
  }  