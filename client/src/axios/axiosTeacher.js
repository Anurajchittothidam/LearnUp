import axios from 'axios'


const axiosInstance=(tokenName)=>{

    const baseURL=import.meta.env.VITE_REACT_APP_BASE_URL
    const instance=axios.create({
        baseURL:baseURL,
        timeout:100000,
        headers:{
            'Content-Type' : 'application/json'
        }
    })
     // instance request interceptor 
    instance.interceptors.request.use((request)=>{
        const token = localStorage.getItem(tokenName)
        request.headers.authorization = `Bearer ${token}`
        return request 
    })

     // instance response interceptor
  instance.interceptors.response.use( response => response ,
    error => Promise.reject(error) 
    
    )

    return instance
}


export default axiosInstance