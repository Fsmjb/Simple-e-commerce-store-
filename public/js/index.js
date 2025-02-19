const cart = document.querySelector("#cart");
const cart_div = document.querySelector(".cart-div");

cart.addEventListener("click", function() {
    cart_div.classList.toggle("hidden"); // Assuming you have a 'hidden' class for hiding the element
});



  function addtocart(id) {
    const url = '/addtocart'; 
  
    const data = {
      productId: id
    };


    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data) 
    })
    .then(response => response.json()) 
    .then(data => {
      console.log('Success:', data); 
      alert("Item added to cart!");
    })
    .catch((error) => {
      console.error('Error:', error); 
    });
  }


function remove(id){
  const url = '/removecart';

  const data = {
    productId : id
  }


  fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert("Item removed from cart!");
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function increase(id){
  const url = '/increase';

  const data = {
    productId : id
  }


  fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function decrease(id){
  const url = '/decrease';

  const data = {
    productId : id
  }


  fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}