import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL;

export const config = (callback) =>
    axios.get(url + '/boost')
        .then(res => {
            callback(res.data[0]);
        })
        .catch(error => {
            callback(false);
            console.log("erorr config", error);
        });


export const sendRequest = (data, callback) =>
    axios({
        method: "POST",
        data: data,
        url: url + "/create-request"
    }).then((res) => {
        console.log("result from sendRequst", res);
    })


export const getScores = (callback) =>
    axios.get(url + '/scores')
        .then(res => {
            console.log('scores:', res);
            callback(res.data)
        })
        .catch(error => {
            callback(false, error);
            console.log("erorr getScores", error);
        });


export const sendNewScore = (nickname, score, callback) =>
    axios({
        method: "POST",
        data: { nickname, score },
        url: url + "/new-score"
    }).then((res) => {
        console.log("result from sendNewScore", res);
        callback(res)
    }).catch(err => {
        console.log('err on sendNewScore:', err)
        callback(false, err)
    })