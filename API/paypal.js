import {API_URL} from "./index";

let baseUrl = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');

let clientId = 'AVcvSafKzE6p3y31oCZ1l3U6QMyIFgIN4_flQRW18t41NGqUyE0rcgYeafhBDLf3Td1nBuVfjey__be2';
let secretKey = 'EEXhhpblChd-PBdIrQVHuRtVlvGesmFKiACxtPvhRIhW7_bkKM7xh2mh_52FuldPLqVDRDq3qNkj1n9O';


let orderDetail = (price) => {
    return {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "items": [
                    {
                        "name": "Seeker Plan",
                        "description": "Seeker Plan for JOB",
                        "quantity": "1",
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": `${price}`
                        }
                    }
                ],
                "amount": {
                    "currency_code": "USD",
                    "value": `${price}`,
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": `${price}`
                        }
                    }
                }
            }
        ],
        "application_context": {
            "return_url": `${API_URL}/return`,
            "cancel_url": `${API_URL}/cancel`
        }
    }
}


const generateToken = () => {
    var headers = new Headers()
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + base64.encode(`${clientId}:${secretKey}`));

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const { access_token } = JSON.parse(result)
            resolve(access_token)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const createOrder = (token = '', price) => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(orderDetail(price))
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const capturePayment = (id, token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}







export default {
    generateToken,
    createOrder,
    capturePayment
}
