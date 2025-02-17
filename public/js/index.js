const cart = document.querySelector("#cart");
const cart_div = document.querySelector(".cart-div");

cart.addEventListener("click", function() {
    cart_div.classList.toggle("hidden"); // Assuming you have a 'hidden' class for hiding the element
});


