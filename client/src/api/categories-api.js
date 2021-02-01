import axios from 'axios'

export const categoriesAPI = {
    async getCategories() {
        try {
            const { data } = await axios.get('api/category')
            return data
        } catch (err) {
            console.log(err)
        }
    },
    async createCategory(token, name) {
        try {
            const result = await axios.post('api/category', { name }, {
                headers: { Authorization: token }
            })
            return result
        } catch (err) {
            console.log(err)
        }
    },
    async deleteCategory(token, id) {
        try {
            const result = await axios.delete(`api/category/${id}`, {
                headers: { Authorization: token }
            })
            return result
        } catch (err) {
            console.log(err)
        }
    },
    async editCategory(token, id, name) {
        try {
            const result = await axios.put(`api/category/${id}`, {name}, {
                headers: { Authorization: token }
            })
            return result
        } catch (err) {
            console.log(err)
        }
    }

}