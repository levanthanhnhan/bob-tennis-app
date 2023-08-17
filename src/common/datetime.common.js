import CryptoJS from 'crypto-js';
const checksum_key = '2bdb1b8bdf94fd93e0c9ac8c6f4366fa91313f208620cbee302061ee35d8f89e'

class PayOS {
    createDataPay() {
        return {
            "orderCode": new Date().getTime,
            "amount": 1000,
            "description": "VQRIO124",
            "buyerName": "Le van thanh nhan",
            "buyerEmail": "buyer-email@gmail.com",
            "buyerPhone": "090xxxxxxx",
            "buyerAddress": "số nhà, đường, phường, tỉnh hoặc thành phố",
            "items": [
              {
                "name": "Iphone",
                "quantity": 1,
                "price": 1000
              }
            ],
            "cancelUrl": "https://your-cancel-url.com",
            "returnUrl": "https://your-success-url.com",
            "signature": "344f5a1ddc1b6ff0a87c9225087f46490361965da663f08039b91d65eaac1b7d"
          }
    }
}

export default new DateTime();