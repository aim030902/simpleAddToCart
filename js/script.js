// window.addEventListener('DOMContentLoaded', () => {
    let products = [
        {
            "id": 1,
            "img": './img/1.PNG',
            "name": 'Salad Francisko',
            'price': 100_000
        },
        {
            "id": 2,
            "img": './img/2.PNG',
            "name": 'Salad Francisko',
            'price': 200_000
        },
        {
            "id": 3,
            "img": './img/3.PNG',
            "name": 'Salad Francisko',
            'price': 300_000
        },
        {
            "id": 4,
            "img": './img/4.PNG',
            "name": 'Salad Francisko',
            'price': 400_000
        },
        {
            "id": 5,
            "img": './img/5.PNG',
            "name": 'Salad Francisko',
            'price': 500_000
        },
        {
            "id": 6,
            "img": './img/6.PNG',
            "name": 'Salad Francisko',
            'price': 600_000
        },
    ];

    let cardProducts = [

    ]

    //  OPEN AND CLOSE SHOPPING

    const cartIcon = document.querySelector('.cart-icon');
    const checkOutPanel = document.querySelector('.check-out');
    const containers = document.querySelectorAll('.container');
    
    cartIcon.addEventListener('click', () => {
        checkOutPanel.style.right = 0;
        containers.forEach(container => {
            container.style.left = '0px'
        })
    }) 

    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        containers.forEach(container => {
            checkOutPanel.style.right = '-600px';
            container.style.left = '300px';
        })
    })

    //  =====================================================

    const cartItems = document.querySelector('.cart-items');

    function showCarts() {
        cartItems.innerHTML = '';
        products.forEach((product, i) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = 
            `
                <div class="id" style="display: none">${product.id}</div>
                <img src="${product.img}" alt="img">
                <div class="title">
                    <h3>${product.name}</h3>
                </div>
                <div class="price">
                    <p>${product.price}</p>
                </div>
                <button type="button" onclick="addToCart(${i})">Add To Card</button>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    showCarts();

    const carts = document.querySelectorAll('.cart-item');
    function addToCart(i) {
        const product = products[i];
        cardProducts.push(
            {
                id: product.id,
                img: product.img,
                name: product.name,
                price : product.price,
                quantity: 1          
            }
        );

        showCards();

        let cart = carts[i];
        let cartButton = cart.querySelector('button');
        
        cartButton.textContent = 'ADDED !';
        cartButton.style.background = 'white';
        cartButton.style.color = 'black';
        cartButton.style.cursor = 'auto';
        cartButton.setAttribute('disabled', '');
    }



    const cardItems = document.querySelector('.card-items');
    const total = document.querySelector('.total p');
    const cartQuantity = document.querySelector('.cart-icon span');
    function showCards() {
        let totalPrice = 0;
        let allQuantity = 0;
        cardItems.innerHTML = '';
        cardProducts.forEach((product, i) => {
            totalPrice += product.price;
            allQuantity += product.quantity;
            const cardItem = document.createElement('div');
            cardItem.classList.add('card-item');
            cardItem.innerHTML = 
            `
                <div class="id" style="display: none">${product.id}</div>
                <img src="${product.img}" alt="img">
                <h4 class="title">${product.name}</h4>
                <div class="price">
                    <p>${product.price}</p>
                </div>
                <div class="count">
                    <button type="button" class="minusBtn" onclick="changeQuantity(${product.quantity - 1}, ${i})">-</button>
                    <span>${product.quantity}</span>
                    <button type="button" class="plusBtn" onclick="changeQuantity(${product.quantity + 1}, ${i})">+</button>
                </div>
            `;

            cardItems.appendChild(cardItem);            
        });
        total.textContent = totalPrice;
        cartQuantity.textContent = allQuantity;
    }

    function changeQuantity(quantity, i) {

        if(quantity < 1) {
            carts.forEach(cart => {
                const cartId = cart.querySelector('.id').textContent;
                if(cartId == cardProducts[i].id) {
                    let button = cart.querySelector('button');
                    button.textContent = 'Add To Card';
                    button.style.background = 'blue';
                    button.style.color = 'white';
                    button.style.cursor = 'pointer';
                    button.removeAttribute('disabled');
                }
            })

            delete cardProducts[i];
        }
        else {
            cardProducts[i].quantity = quantity;
            carts.forEach(cart => {
                const cartId = cart.querySelector('.id').textContent;
                if(cartId == cardProducts[i].id) {
                    let priceContent = cart.querySelector('.price p').textContent; 
                    cardProducts[i].price = priceContent * quantity;
                }
            })
        }
        showCards(); 
    }



    function getProductById(id) {
        let result = null;
        products.forEach(product => {
            if(product.id == id) {
                result = product;
            }
        })
        return result;
    }

    function getCardProductById(id) {
        let result = null;
        cardProducts.forEach(card => {
            if(card.id == id) {
                result = card;
            }
        })
        return result;
    }





// })