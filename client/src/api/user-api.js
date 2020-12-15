import axios from 'axios';

export const userAPI = {
    async getUserInfo(token) {
        try {
            const { data } = await axios.get('/user/info', {
                headers: { Authorization: token }
            })
            return data
        } catch (err) {
            console.log(err)
        }
    },
    async addToCart(token, cart) {
        try {
            const { data, status } = await axios.patch('/user/addcart', { cart: cart }, {
                headers: { Authorization: token }
            })
            
            return { data, status }
        } catch (err) {
            return err.response
        }
    },
    async removeFromCart(token, cart) {
        try {
            const { data, status } = await axios.patch('/user/deletecart', { cart: cart }, {
                headers: { Authorization: token }
            })
            return { data, status }
        } catch (err) {
            return err.response
        }
    }
}