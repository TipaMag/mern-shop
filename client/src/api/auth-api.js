import axios from 'axios';

export const authAPI = {
    async registration(user) {
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = '/'
        } catch (err) {
            return err.response.data.msg
        }
    },
    async login(user) {
        try {
            await axios.post('/user/login', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = '/'
        } catch (err) {
            return err.response.data.msg
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