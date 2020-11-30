import axios from 'axios';

export const authAPI = {
    async getAuth() {
        // try {
        //     const { data } = await axios.get('/user/login')
        //     return data
        // } catch (err) {
        //     console.log(err)
        // }
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
        // try {
        //     const { data } = await axios.get('/user/logout')
        //     return data
        // } catch (err) {
        //     console.log(err)
        // }
    }
}