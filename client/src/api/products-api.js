import axios from 'axios'

export const productsAPI = {
    async getProducts() {
        try {
            const { data } = await axios.get('/api/products')
            return data
        } catch (err) {
            console.log(err)
        }
    },
    async createProduct(token, product) {
        try {
            let result = await axios.post('/api/products', { ...product }, {
                headers: { Authorization: token }
            })
            return result
        } catch (err) {
            return err.response
        }
    },
    async updateProduct(token, id, product) {
        try {
            const result = await axios.put(`/api/products/${id}`, {...product}, {
                headers: { Authorization: token }
            })
            return result
        } catch (err) {
            return err.response
        }
    },
    async deleteProduct(token, id) {
        try {
            const result = await axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })
            return result
        } catch (err) {
            return err.response
        }
    }
}

export const imageUploadAPI = {
    async uploadImage(token, formData) {
        try {
            const { data, status } = await axios.post('/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: token
                }
            })
            return { data, status }
        } catch (err) {
            return err.response
        }
    },
    async deleteImage(token, public_id) {
        try {
            const res = await axios.post('/api/destroy', { public_id }, {
                headers: {
                    Authorization: token
                }
            })
            return res
        } catch (err) {
            return err.response
        }
    }
}