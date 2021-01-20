import axios from 'axios';

export const paymentsAPI = {
    async getPayments() {
        try {
            
        } catch (err) {
            
        }
    },
    async createPayment(token, cart, paymentID, address) {
        try {
            const result = await axios.post('/api/payment', {cart, paymentID, address}, {
                headers: { Authorization: token }
            })
            return result
        } catch (err) {
            console.log(err)
        }
    }
}