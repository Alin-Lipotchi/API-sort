const productsContainer = document.querySelector(".products");
const arr = [];
let productObject = {};
let isSorted = false;
let aux;
let productButton;

function renderProduct(product) {
    const { name, price, image, meatType } = product;
    arr.push(product);

    productsContainer.innerHTML += `<div class="product-card">` +
        `<img class="product-img" src="${image}" />` +
        `<p class="product-name">${name}</p>` +
        `<p class="product-meat-type">${meatType}</p>` +
        `<p class="product-price">${price} Lei</p>` +
        `<a class="product-button">Buy</a` +
        `</div>`;

    productButton = document.querySelectorAll(".product-button");
    productButton.forEach(e => e.addEventListener("click", saveProduct));
}

function loadProducts() {
    fetch("https://61e1cf593050a10017681ff5.mockapi.io/meat").
        then(response => response.json()).
        then(products => {
            products.forEach((product) => renderProduct(product))
        }).
        catch(error => console.error(error));
}

// Sort Functions

function sortAscending() {
    while(!isSorted) {
        isSorted = true;
        for(let i = 0; i < arr.length-1; i++)  {
            if(parseFloat(arr[i].price) > parseFloat(arr[i+1].price)) {
                isSorted = false;
                aux = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = aux;
            }
        }
    }

    isSorted = false;

    productsContainer.innerHTML = "";

    arr.forEach(e => {
        productsContainer.innerHTML += `<div class="product-card">` +
        `<img class="product-img" src="${e.image}" />` +
        `<p class="product-name">${e.name}</p>` +
        `<p class="product-meat-type">${e.meatType}</p>` +
        `<p class="product-price">${e.price} Lei</p>` +
        `<a class="product-button">Buy</a` +
        `</div>`;
        productButton = document.querySelectorAll(".product-button");
        productButton.forEach(e => e.addEventListener("click", saveProduct));
    });
} 

function sortDescending() {
    while(!isSorted) {
        isSorted = true;
        for(let i = 0; i < arr.length-1; i++)  {
            if(parseFloat(arr[i].price) < parseFloat(arr[i+1].price)) {
                isSorted = false;
                aux = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = aux;
            }
        }
    }

    isSorted = false;

    productsContainer.innerHTML = "";

    arr.forEach(e => {
        productsContainer.innerHTML += `<div class="product-card">` +
        `<img class="product-img" src="${e.image}" />` +
        `<p class="product-name">${e.name}</p>` +
        `<p class="product-meat-type">${e.meatType}</p>` +
        `<p class="product-price">${e.price} Lei</p>` +
        `<a class="product-button">Buy</a` +
        `</div>`;
        productButton = document.querySelectorAll(".product-button");
        productButton.forEach(e => e.addEventListener("click", saveProduct));
    });
} 

// Save product and show

function saveProduct() {
    productObject.image = this.parentElement.childNodes[0].currentSrc;
    productObject.name = this.parentElement.childNodes[1].innerHTML;
    productObject.meatType = this.parentElement.childNodes[2].innerHTML;
    productObject.price = this.parentElement.childNodes[3].innerHTML;
    console.log(productObject);

    document.querySelector("body").innerHTML += `<div class="main-product">` +
    `<div class="product-card">` +
    `<img class="product-img" src="${productObject.image}" />` +
    `<p class="product-name">${productObject.name}</p>` +
    `<p class="product-meat-type">${productObject.meatType}</p>` +
    `<p class="product-price">${productObject.price}</p>` +
    `<button class="close-card">X</button>` +
    `</div>` +
    `</div>`

    document.querySelector(".close-card").addEventListener("click", removeProduct);

    function  removeProduct() {
        document.querySelector(".main-product").style.display = "none";
    }

    console.log("execut");
}

// Event listeners for buttons

const loadButton = document.querySelector(`button[name="load"]`);
const ascButton = document.querySelector(`button[name="asc"]`);
const descButton = document.querySelector(`button[name="desc"]`);

loadButton.addEventListener("click", loadProducts);
ascButton.addEventListener("click", sortAscending);
descButton.addEventListener("click", sortDescending);