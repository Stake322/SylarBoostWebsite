import axios from "axios";
const url = "http://localhost:3001"


export const config = (callback) => {
    axios.get(url + '/boost')
    .then(res => {
        callback(res.data[0]);
    })
    .catch(error=>{
        callback(false);
        console.log("erorr config", error);
    });
}

export const sendRequest=(data,callback) => {
    axios({
        method: "POST",
        data: data,
        url: url + "/create-request"
    }).then((res)=>{
        console.log("result from sendRequst", res);
    })
}