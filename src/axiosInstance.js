import * as axios from 'axios';


const getSCRF = async () =>
{
    const response = await axios.get('https://av.admtyumen.ru/get_csrf',{
        withCredentials: true
    })
    return response.data.csrf_token

}


export const axiosInstance = axios.create({
    baseURL : 'https://av.admtyumen.ru/api/',
    headers: {
        'x-csrf-token': getSCRF()
    }
});
