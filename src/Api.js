const API_BASE_URL = "https://api-sandbox.circle.com";
// const API_BASE_URL = "http://localhost:8800";

// console.log("hellow")
const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

const API_KEY = "QVBJX0tFWToxMWFlOWRjYmE5NTZlYTc2OWY4MWQ2NzYzMWFiMjQ3ZDplYmE3MGM3NDJmZDM3Y2Q2NTZkMjQ1NzVhZmQyMmU2NA=="
const CREATE_CARD_API = getApiUrl("/v1/cards");
const GET_PUB_KEY = getApiUrl("/v1/encryption/public");
const CREATE_PAYMENT_API = getApiUrl("/v1/payments");
const GET_PAYMENT_STATUS_PARAMS = getApiUrl("/v1/payments");
const TRANSFER_ASSET = getApiUrl("/v1/transfers");
const CREATE_WIRE_ACCOUNT = getApiUrl("/v1/businessAccount/banks/wires");
const GET_WIRE_ACC_STATUS_WITH_ID_PARAMS = getApiUrl("/v1/businessAccount/banks/wires");
const GET_CIRCLE_ACCOUNT_PRAMS = getApiUrl("/v1/businessAccount/banks/wires");
const CREATE_WIRE_MOCK_PAYMENT_API = getApiUrl("/v1/mocks/payments/wire");
const GET_WIRE_TRANSFER_STATUS_PARAMS = getApiUrl("/v1/transfers");
const CREATE_PAYOUT_WIRE = getApiUrl("/v1/businessAccount/payouts");
const GET_WIRE_PAYOUT_STATUS_WITH_ID_PARAMS = getApiUrl("/v1/businessAccount/payouts");


export {
    GET_WIRE_PAYOUT_STATUS_WITH_ID_PARAMS,
    CREATE_PAYOUT_WIRE,
    GET_WIRE_TRANSFER_STATUS_PARAMS,
    CREATE_WIRE_MOCK_PAYMENT_API,
    GET_CIRCLE_ACCOUNT_PRAMS,
    GET_WIRE_ACC_STATUS_WITH_ID_PARAMS,
    CREATE_WIRE_ACCOUNT,
    TRANSFER_ASSET,
    CREATE_CARD_API,
    GET_PAYMENT_STATUS_PARAMS,
    API_BASE_URL,
    API_KEY,
    GET_PUB_KEY,
    CREATE_PAYMENT_API

};
