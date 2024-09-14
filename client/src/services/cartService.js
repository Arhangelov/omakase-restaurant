const url = "https://omakase-sushi-api.vercel.app/cart";
// const url = "http://localhost:5000/cart";

export const getCartService = async ( userEmail ) => {
    return fetch( url + '/get-cart', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ userEmail })
    }).then(res => res.json());
};

export const updateCartService = async ( sushiProduct, userEmail ) => {
    return fetch( url + '/update-cart', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ sushiProduct, userEmail })
    }).then(res => res.json());
};

export const deleteFromCartService = async ( sushiId, userEmail ) => {
    return fetch( url + '/delete-from-cart', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ sushiId, userEmail })
    }).then(res => res.json());
};

export const finishOrderService = async ( userEmail ) => {
    return fetch( url + '/finish-order', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ userEmail })
    }).then(res => res.json());
}