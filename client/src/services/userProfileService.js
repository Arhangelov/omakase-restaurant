// const url = "https://omakase-sushi-api.vercel.app/profile";
const url = "http://localhost:5000/profile";

export const getPurchaseHistoryService = async ( userEmail ) => {
    return fetch( url + '/get-purchase-history', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ userEmail })
    }).then(res => res.json());
};

export const rePurchaseOrderService = async ( cart, totalPrice, userEmail ) => {
    return fetch( url + '/re-purchase-order', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ cart, totalPrice, userEmail })
    }).then(res => res.json());
};