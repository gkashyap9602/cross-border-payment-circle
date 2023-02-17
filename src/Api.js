const API_BASE_URL = "https://api-sandbox.circle.com";
// const API_BASE_URL = "http://localhost:8800";

// console.log("hellow")
const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

const API_KEY = "QVBJX0tFWTplMTkzOTM5NzU5MWEzNDVkNWIyYWRiNTJmZmE2MDNkZTphNTAzNDFhMzAyZjBjNDk2OTE2MmRhOTQ2MzgxMmExZA=="
const CARD_PAYMENT_API = getApiUrl("/v1/cards");


export {
    CARD_PAYMENT_API,
    API_KEY

};
