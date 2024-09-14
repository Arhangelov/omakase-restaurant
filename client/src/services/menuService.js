const url = "https://omakase-sushi-api.vercel.app/menu";
// const url = "http://localhost:5000/menu";

export const getSushiType = async ( sushiType ) => {
    return fetch( url + `/${sushiType}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    }).then(res => res.json());
}

export const getProductDetails = async ( productId ) => {
    return fetch( url + `/details/${productId}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    }).then(res => res.json());
}