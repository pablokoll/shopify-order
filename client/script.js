function capitalizeFirstLetter(sentence) {
    let words = '';
    if (sentence.split('_').length) {
        words = sentence.split('_').join(' ');
    }
    return words
        .split(' ')
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

function parseDate(dateString) {
    const date = new Date(dateString);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isPm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${month} ${day}, ${year} at ${hours}:${formattedMinutes} ${isPm}`;
}

function renderContainerHeader(title, active) {
    return `<div class="container-header">
                <h3 class="container-header-title">${capitalizeFirstLetter(
                    title,
                )}</h3><button class="toggle-button">
                    <svg class="button-arrow-down ${active ? 'hidden' : ''}" clip-rule="evenodd" fill-rule="evenodd"
                    stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                    d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
                    </svg>
                    <svg class="button-arrow-up ${!active ? 'hidden' : ''}"
                        clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z"/>
                    </svg>
                </button>
            </div>`;
}

function renderFulfillmentStatus(fulfillmentStatus) {
    return fulfillmentStatus ? capitalizeFirstLetter(fulfillmentStatus) : 'Unfulfilled';
}

function renderPhoneNumber(phone) {
    return phone ? phone : 'No phone number';
}

function renderItems(items) {
    return items
        .map(
            (item) =>
                `<div class="item">
                <div class="item-image-container">
                    <span class="item-quantity">${item.quantity}</span>
                    <img class="item-image" src='${item.image}'/>
                </div>
                <div class="item-content">
                    <h4>${item.title}</h4>
                    <span>€${item.price}</span>
                </div>
            </div>`,
        )
        .join('');
}

function renderOrderItems(items) {
    return `${renderContainerHeader('order items', true)}
            <div class="order-items">
            ${renderItems(items)}
            </div>`;
}

function renderOrderSummary(order) {
    return `${renderContainerHeader('order summary', true)}
            <div class="container-hidden-content-list">
                    <div>
                        <span>Subtotal</span>
                        <span>${order.line_items.length} items</span>
                        <span>€${order.current_subtotal_price}</span>
                    </div>
                    <div>
                        <span>Shipping</span>
                        <span>${
                            Number(order.total_shipping_price_set.shop_money.amount) > 0
                                ? `€${order.total_shipping_price_set.shop_money.amount}`
                                : 'Free'
                        }</span>
                    </div>
                    <div class="order-summary-total">
                        <span>Total</span>
                        <span>€${order.current_total_price}</span>
                    </div>
            </div>`;
}

function renderNotes() {
    return `${renderContainerHeader('notes')}
            <div class="container-hidden-content hidden">
            <p>Webmefy test</p>
            <a href="https://github.com/pablokoll" target="_blank">github/pablokoll</a>
            <a href="https://www.linkedin.com/in/pablo-koll/" target="_blank">linkedin/pablo-koll</a>
            </div>`;
}

function renderCustomerInfo(customer) {
    return `${renderContainerHeader('customer')}
            <div class="container-hidden-content hidden">
            <ul>
                <li>${customer.first_name} ${customer.last_name}</li>
                <li>${customer.email}</li>
                <li>${renderPhoneNumber(customer.phone)}</li>
            </ul>
            </div>`;
}

function renderContactInfo(order) {
    return `${renderContainerHeader('contact information')}
            <div class="container-hidden-content hidden">
                <ul>
                    <li>${order.contact_email}</li>
                    <li>${renderPhoneNumber(order.phone)}</li>
                </ul>
            </div>`;
}

function renderShippingInfo(shippingAddress) {
    return `${renderContainerHeader('shipping address')}
            <div class="container-hidden-content hidden">
            <ul>
                <li>${shippingAddress.name}</li>
                <li>${shippingAddress.address1}, ${shippingAddress.city}, ${
        shippingAddress.zip
    }</li>
                <li>${shippingAddress.province}, ${shippingAddress.country}</li>
                <li>${shippingAddress.country}</li>
                <li>${renderPhoneNumber(shippingAddress.phone)}</li>
            </ul>    
    </div>`;
}

function renderBillingInfo(billingAddress) {
    return `${renderContainerHeader('billing address')}
            <div class="container-hidden-content hidden">
            <ul>
                <li>${billingAddress.name}</li>
                <li>${billingAddress.address1}, ${billingAddress.city}, ${billingAddress.zip}</li>
                <li>${billingAddress.province}, ${billingAddress.country}</li>
                <li>${billingAddress.country}</li>
            </ul>    
    </div>`;
}

function displayOrderInfo(order) {
    //header
    const orderIdTitle = document.getElementById('order-id');
    orderIdTitle.innerText = `${orderIdTitle.innerText} ${order.name}`;

    const headerFinancialStatus = document.getElementById('header-financial-status');
    headerFinancialStatus.innerText = capitalizeFirstLetter(order.financial_status);

    const headerFulfillmentStatus = document.getElementById('header-fulfillment-status');
    headerFulfillmentStatus.innerText = renderFulfillmentStatus(order.fulfillment_status);
    const headerCreatedAt = document.getElementById('created-at');
    headerCreatedAt.innerText = `${parseDate(order.created_at)} from ${capitalizeFirstLetter(
        order.source_name,
    )}`;

    //article
    //section, order content, order items
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = renderOrderItems(order.line_items);

    //section, order content, order summary
    const orderSummaryContainer = document.getElementById('order-summary');
    orderSummaryContainer.innerHTML = renderOrderSummary(order);

    //aside
    const customerInfo = document.getElementById('customer-info');
    customerInfo.innerHTML = renderCustomerInfo(order.customer);

    const contactInfo = document.getElementById('contact-info');
    contactInfo.innerHTML = renderContactInfo(order);

    const shippingInfo = document.getElementById('shipping-info');
    shippingInfo.innerHTML = renderShippingInfo(order.shipping_address);

    const billingInfo = document.getElementById('billing-info');
    billingInfo.innerHTML = renderBillingInfo(order.billing_address);

    const notes = document.getElementById('notes');
    notes.innerHTML = renderNotes();
}

function toggleVisibility() {
    const buttons = document.querySelectorAll('.container-header .toggle-button');

    for (const button of buttons) {
        button.addEventListener('click', () => {
            const container = button.closest('.container');
            if (container) {
                const svgArrowDown = button.querySelector('.toggle-button > svg:nth-child(1)');

                const svgArrowUp = button.querySelector('.toggle-button > svg:nth-child(2)');

                const orderItemsDiv = container.querySelector('.container > div:nth-child(2)');
                if (orderItemsDiv) {
                    orderItemsDiv.classList.toggle('hidden');

                    svgArrowDown.classList.toggle('hidden');
                    svgArrowUp.classList.toggle('hidden');
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'http://localhost:3001/webmefy/data';

    fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Webmefy-Token': atob('V2VibWVmeXN1cGVyc2VjcmV0ZW50cnlsZXZlbHRva2Vu'),
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            displayOrderInfo(data.order);
            toggleVisibility();
        })
        .catch((error) => {
            const msg = `Error fetching data: ${error}`;
            console.error(msg);
            throw new Error(msg);
        });
});
