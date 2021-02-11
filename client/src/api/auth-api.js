import axios from 'axios';

export const authAPI = {
    async registration(user) {
        try {
            const result =  await axios.post('/user/register', { ...user })
            return result
        } catch (err) {
            return err.response
        }
    },
    async login(user) {
        try {
            const { data, status } = await axios.post('/user/login', { ...user })
            return { data, status }
        } catch (err) {
            return err.response
        }
    },
    async logout() {
        try {
            const result = await axios.get('/user/logout')
            return result
        } catch (err) {
            console.log(err)
        }
    },
    async getRefreshToken() {
        try {
            const result = await axios.get('/user/refresh_token')
            return result.data.accesToken
        } catch (err) {
            console.log(err)
        }
    },
}