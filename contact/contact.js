let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let strregex = /\D/
    // document.querySelectorAll(".contact").forEach((e)=>{
    // e.style=`pointer-events:none;`
    //           });
let submit = document.querySelector(".submit")
submit.addEventListener("click",()=>{
if (strregex.test(document.querySelector(".namefield").value) && emailregex.test(document.querySelector(".mailfield").value) ) {
  document.querySelector(".namefield").value=""
  document.querySelector(".mailfield").value=""
  document.querySelector(".namefield").setAttribute("disabled","disabled")
  document.querySelector(".mailfield").setAttribute("disabled","disabled")
  document.querySelectorAll(".contact").forEach((e)=>{
    e.style=``
    
              });
  location.replace("../index.html")
}
})