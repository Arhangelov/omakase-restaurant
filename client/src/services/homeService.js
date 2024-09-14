const url = "https://omakase-sushi-api.vercel.app/";
// const url = "http://localhost:5000/";

export const getPopularSushi = async ({ ...popularProducts }) => {
    return fetch( url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( popularProducts ),
    }).then(res => res.json());
}