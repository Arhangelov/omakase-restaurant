const url = "https://omakase-sushi-api.vercel.app/auth";
// const url = "http://localhost:5000/auth";


export const registerService = async ( newUser ) => {
    return fetch( url + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newUser })
    }).then(res => res.json());
}

export const loginService = async ( loginData ) => {
    return fetch( url + "/login" , {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ ...loginData })
    }).then(res => res.json());
}

export const logoutService = async () => {
    return fetch( url + "/logout", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    }).then(res => res.json());
}