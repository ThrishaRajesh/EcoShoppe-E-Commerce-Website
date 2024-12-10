$(document).ready(function() {
  // Splash screen and account modal display
  setTimeout(function() {
      $('#splashScreen').fadeOut(1000, function() {
          $('#accountModal').modal('show');
      });
  }, 2000);

   // Switch between account creation and login forms
   $('#switchButton').click(function() {
    $('#accountFields').toggle();
    $('#loginFields').toggle();
    $('#submitButton').text(function(i, text) {
        return text === 'Create Account' ? 'Login' : 'Create Account';
    });
    $('#switchButton').text(function(i, text) {
        return text === 'Switch to Login' ? 'Switch to Create Account' : 'Switch to Login';
    });
});
$(document).ready(function() {
// Handle account form submission
$('#accountForm').submit(function(e) {
  e.preventDefault();

  const isLogin = $('#submitButton').text() === 'Login';
  const url = isLogin ? '/login' : '/signup';
  const data = isLogin ? {
      email: $('#loginEmail').val(),
      password: $('#loginPassword').val()
  } : {
      name: $('#name').val(),
      email: $('#email').val(),
      password: $('#password').val()
  };

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
      if (result.success) {
          // Store userId and display it in console
          localStorage.setItem('userId', result.userId);
          console.log('UserID:', result.userId);
          alert(isLogin ? 'Login successful!' : 'Account created successfully!');
          $('#accountModal').modal('hide');
      } else {
          alert('Error: ' + result.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error: ' + error.message);  // Show error message
  });
});

  // Example function to handle signup/login response
function handleAuthResponse(response) {
  if (response.success) {
    localStorage.setItem('userId', response.userId); // Store user ID in localStorage
    alert('Account created successfully! You are now logged in.');
    $('#accountModal').modal('hide'); // Hide modal on success
  } else {
    alert('Error: ' + response.message);
  }
}

   // Search products based on user input
   function searchProducts() {
    let query = $('#searchInput').val().toLowerCase();
    $('#productCards .product-card').each(function() {
        let title = $(this).find('.card-title').text().toLowerCase();
        $(this).toggle(title.includes(query));
    });
}
$('#searchInput').on('input', searchProducts);

$(document).ready(function() {
  // Quantity controls
  $(document).on('click', '.btn-increase', function() {
    const quantityInput = $(this).siblings('.quantity-input');
    let quantity = parseInt(quantityInput.val());
    quantityInput.val(quantity + 1);
  });

  $(document).on('click', '.btn-decrease', function() {
    const quantityInput = $(this).siblings('.quantity-input');
    let quantity = parseInt(quantityInput.val());
    if (quantity > 1) {
      quantityInput.val(quantity - 1);
    }
  });

  $(document).on('click', '.add-to-cart-btn', function() {
    const userId = localStorage.getItem('userId');
    console.log('UserID retrieved:', userId);  // Debugging

    if (!userId) {
        alert('Create an account or log in to add products to your cart!');
        return;
    }

    const productCard = $(this).closest('.product-card');
    const productTitle = productCard.find('.card-title').text().trim();
    const productImage = productCard.find('.card-img-top').attr('src');
    const productPrice = productCard.find('.product-price').text().trim();
    const quantity = parseInt(productCard.find('.quantity-input').val());

    const productData = {
        title: productTitle,
        imageUrl: productImage,
        price: productPrice,
        quantity: quantity,
        userId: userId
    };

    console.log('Sending product data:', productData);  // Debugging

    fetch('/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.text())
    .then(result => {
        console.log('Server response:', result);  // Debugging
        alert(result);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    });
});
});

function addToCart(productId, productTitle, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product is already in the cart
    let existingProduct = cart.find(item => item.productId === productId);
    
    if (existingProduct) {
        // If the product already exists, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // Otherwise, add the product to the cart
        cart.push({ productId, productTitle, productPrice, quantity: 1 });
    }

    // Store the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert('Product added to cart!');
}

function displayCart() {
    // Retrieve the cart from localStorage, or initialize an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Displaying cart:', cart);

    let cartContainer = document.getElementById('productContainer');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Loop through the cart and display each item
    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.productTitle}</h3>
                <p>Price: $${item.productPrice}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
    });
}

window.onload = displayCart;

})
})  