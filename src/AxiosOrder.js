import axios from "axios";


const Axios = axios.create({
    baseURL : "https://burger-sandwich-otlob.firebaseio.com"
})

export default Axios;



