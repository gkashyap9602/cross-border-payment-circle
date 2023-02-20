const API_BASE_URL = "https://api-sandbox.circle.com";
// const API_BASE_URL = "http://localhost:8800";

// console.log("hellow")
const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

const API_KEY = "QVBJX0tFWToxMWFlOWRjYmE5NTZlYTc2OWY4MWQ2NzYzMWFiMjQ3ZDplYmE3MGM3NDJmZDM3Y2Q2NTZkMjQ1NzVhZmQyMmU2NA=="
const CREATE_CARD_API = getApiUrl("/v1/cards");
const GET_PUB_KEY = getApiUrl("/v1/encryption/public");
const CREATE_PAYMENT_API = getApiUrl("/v1/payments");


export {
    CREATE_CARD_API,
    API_BASE_URL,
    API_KEY,
    GET_PUB_KEY,
    CREATE_PAYMENT_API

};
