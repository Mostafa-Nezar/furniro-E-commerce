document.addEventListener("DOMContentLoaded", () => {
    const myproducts = JSON.parse(localStorage.getItem("myarrlike")) || [];
    const stars = document.querySelectorAll('.stars input');
    const ratingValue = document.getElementById('rating-value');
    const views = document.querySelector(".views");
    const myrate = document.querySelector(".myrate");
    const ratingValue2 = document.getElementById('rating-value2');
    const views2 = document.querySelector(".views2");
    const myrate2 = document.querySelector(".myrate2");
    const elements = document.querySelectorAll('.myobj2');
    const elements2 = document.querySelectorAll('.myobj3');
    const myobj2 = JSON.parse(localStorage.getItem("myproduct2"));
    const vv = document.querySelectorAll(".stars2 label svg path");

    const objs = (obj, ele) => {
        const data = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'object') {
                Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                    data.push(nestedValue);
                });
            }
        });
        ele.forEach((element, index) => {
            if (index < data.length) {
                element.innerHTML = data[index];
            }
        });
    };

    if (myobj2) {
        myrate2.innerHTML = isNaN(myobj2.averagerate) ? 0 : myobj2.averagerate;

        vv.forEach((path, index) => {
            path.style.color = index < myobj2.averagerate ? "#FFC700" : "lightgray";
        });

        views2.innerHTML = localStorage.getItem(`page_view_count_${myobj2.id}`) || 0;
        document.getElementById("product-imagee").src = "../" + myobj2.image;
        document.getElementById("product-imagee").style.height = '177px';
        document.querySelector(".name2").innerHTML = myobj2.name;
        document.querySelector(".price2").innerHTML = `Rs ${myobj2.price},000.00`;
        document.querySelector(".dagain2").href = `../details/detail.html?id=${myobj2.id}`;
        
        document.querySelector(".addcopm2").setAttribute("data-id", myobj2.id);
        objs(myobj2, elements2);
    }

    let productId = new URLSearchParams(window.location.search).get('id');
    if (myproducts.length) {
        myproducts.forEach(item => {
            const li = document.createElement('li');
            li.setAttribute('data-id', item.id);
            li.innerHTML = item.name;
            li.id = "myli";
            document.getElementById('item-list').appendChild(li);
        });
    }

    document.addEventListener("click", (e) => {
        if (!e.target.classList.contains("deleteitem") && !e.target.classList.contains("addbutton")) {
            const productId2 = e.target.dataset.id;
            const product2 = myproducts.find(p => p.id == productId2);

            if (product2) {
                document.getElementById("product-imagee").src = "../" + product2.image;
                document.getElementById("product-imagee").style.height = '177px';
                document.querySelector(".name2").innerHTML = product2.name;
                document.querySelector(".price2").innerHTML = `Rs ${product2.price},000.00`;
                document.querySelector(".dagain2").href = `../details/detail.html?id=${productId2}`;
                document.querySelector(".addcopm2").setAttribute("data-id", product2.id);

                localStorage.setItem("myproduct2", JSON.stringify(product2));
                objs(product2, elements2);

                const savedRating2 = JSON.parse(localStorage.getItem(`rate${product2.id}`));
                if (savedRating2 !== null) {
                    ratingValue2.textContent = savedRating2;
                    product2.rate = savedRating2;
                    views2.innerHTML = product2.views;
                    vv.forEach((path, index) => {
                        path.style.color = index < product2.averagerate ? "#FFC700" : "lightgray";
                    });
                    myrate2.innerHTML = product2.averagerate;
                    localStorage.setItem("myarrlike", JSON.stringify(myproducts));
                } else {
                    ratingValue2.textContent = 0;
                    product2.rate = 0;
                    views2.innerHTML = 0;
                    myrate2.innerHTML = 0;
                    vv.forEach((path) => {
                        path.style.color = "lightgray";
                    });
                    localStorage.setItem("myarrlike", JSON.stringify(myproducts));
                }

                const stars2 = document.querySelectorAll(".stars2 input[type='radio']");
                stars2.forEach(star => {
                    star.checked = star.value == savedRating2;
                });
            }
        }
    });

    if (productId && myproducts.length) {
        let product = myproducts.find(p => p.id == productId);
        console.log(localStorage.getItem(`averagerate${product.id}`));
        console.log(product.averagerate);
        views.innerHTML = localStorage.getItem(`page_view_count_${product.id}`) || 0;
        if (product) {
            objs(product, elements);
            document.getElementById("product-image").src = "../" + product.image;
            document.querySelector(".name").innerHTML = product.name;
            document.querySelector(".price").innerHTML = `Rs ${product.price},000.00`;
            document.querySelector(".dagain").href = `../details/detail.html?id=${productId}`;
            document.querySelector(".addcopm1").setAttribute("data-id", product.id);

            views.innerHTML = product.views;

            let vv = document.querySelectorAll(".stars label svg path");
            vv.forEach((path, index) => {
                path.style.color = index < product.averagerate ? "#FFC700" : "lightgray";
            });
            myrate.innerHTML = isNaN(product.averagerate) ? 0 : product.averagerate;

            const savedRating = localStorage.getItem(`rate${product.id}`);
            if (savedRating) {
                ratingValue.textContent = savedRating;
                product.rate = savedRating;
                localStorage.setItem("myarrlike", JSON.stringify(myproducts));
                stars.forEach(star => {
                    if (star.value === savedRating) {
                        star.checked = true;
                    }
                });
            }

            stars.forEach((star) => {
                star.addEventListener('change', function () {
                    const selectedRating = star.value; 
                    ratingValue.textContent = selectedRating;
                    localStorage.setItem(`rate${product.id}`, selectedRating);
                    localStorage.setItem("myarrlike", JSON.stringify(myproducts));
                });
            });
        }
    }

    document.querySelector("#proudctsname").onclick = () => {
        document.querySelector("#item-list").classList.toggle("d-none");
        document.querySelector(".psedo").classList.toggle("d-none");
    };

    document.querySelector("*").addEventListener("click", (e) => {
        if (e.target.id !== "proudctsname" && e.target.id !== "myli") {
            document.querySelector("#item-list").classList.add("d-none");
            document.querySelector(".psedo").classList.add("d-none");
        }
    });
});