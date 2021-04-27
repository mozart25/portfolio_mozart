import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:3000/api/",
    baseURL: "https://portfolio-nodejs-mysql.herokuapp.com/api",

    headers: {
        "Content-type": "application/json"
    }
});