import axios from 'axios';

export const productsAPI = {
    async getProducts() {
        try {
            const { data } = await axios.get('/api/products')
            return data
        } catch (err) {
            console.log(err)
        }
    }
}