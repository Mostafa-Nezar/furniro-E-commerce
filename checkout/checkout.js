let customers = JSON.parse( localStorage.getItem("customers")) || []
const currentDate = new Date();
document.querySelector(".mybutton").onclick = (e) => {
    e.preventDefault();
    const form = document.getElementById('billing-form');
    if (form.checkValidity() && localStorage.getItem("cart")) {
        let obj = {};
        const inputs = document.getElementsByTagName("input");
        const properties = ["firstname", "secoundname", "comapny", "street", "city", "zip", "phone", "email", "additonal information"];
        properties.forEach((prop, index) => {
            obj[prop] = inputs[index].value;
        });
        obj["myz"] = JSON.parse(localStorage.getItem("finalreset"));
        localStorage.setItem("purchases", JSON.stringify(JSON.parse(localStorage.getItem("cart"))));
        let purchases = localStorage.getItem("purchases");
        obj["purchases"] = purchases;
        obj["time"] = new Date().toString();
        obj["pay"] = document.querySelector(".paymentmethod").innerHTML;
        let customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers.push(obj);
        localStorage.setItem("customers", JSON.stringify(customers));
        document.querySelector("#listcard").innerHTML = null;
        document.querySelector(".icon-cart span").innerHTML = 0;
        document.querySelector(".total span").innerHTML = "Rs 0,000,00";
        document.querySelector(".subtotal span").innerHTML = "Rs 0,000,00";
        localStorage.removeItem("cart");
        localStorage.removeItem("myarrlike");
        form.submit();
    } else {
        form.reportValidity();
    }
};
document.querySelectorAll(".mypayment").forEach((e)=>{
    e.style.cursor="pointer"
    e.previousElementSibling.style.cursor="pointer"
    e.addEventListener("click",(ee)=>{
    document.querySelector(".paymentmethod").innerHTML=ee.target.innerHTML
    document.querySelectorAll(".mytwospan").forEach((eee)=>{
        eee.innerHTML=`<svg style="margin-bottom: 2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8"/></svg>`
    })
    ee.target.previousElementSibling.innerHTML=`<svg style="margin-bottom: 2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2"/></svg>`
    console.log(ee.target.previousElementSibling);
    })
})
console.log((JSON.parse(localStorage.getItem("customers"))));