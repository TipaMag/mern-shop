import axios from 'axios';

export const userAPI = {
    async getUserInfo(token) {
        try {
            const { data } = await axios.get('/user/info', {headers: {Authorization: token}} )
            return data
        } catch (err) {
            console.log(err)
        }
    }
}