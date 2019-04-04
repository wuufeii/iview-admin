import axios from 'axios'

var instance = axios.create();
var SERVER_URL = 'http://localhost:8081/api/v1';

/***axios请求拦截**/
instance.interceptors.request.use(function(config) {
	var token = sessionStorage.getItem("userToken");
	if(token != null && token != '' && typeof token != 'undefined') {
		config.headers['H-User-Token'] = token;
	}
	return config;
}, function(error) {});

/***axios响应拦截**/
instance.interceptors.response.use(function(response) {
	return response.data;
}, function(error) {});

export const serverAjaxReq = (url, reqData, fn) => {
	const sendData = {
		"appId": "appId",
		"signType": "signType",
		"sign": "sign",
		"reqTime": (new Date()).getTime(),
		"method": "method",
		reqData: reqData
	}
	instance.post(SERVER_URL + url, sendData).then(function(response) {
		if(typeof response == 'undefined') {
			fn('FAIL', '请求失败！');
		} else {
			if(response.rspCode == '00') {
				fn('SUCCESS', response.rspMessage, response.rspData)
			} else {
				fn('ERROR', response.rspMessage)
			}
		}
	}).catch(function(error) {
		console.log(error);
		fn('ERROR', '程序错误')
	});
}

export const downloadReq = (url, fileName) => {
	return axios.post(SERVER_URL + url, {
			appId: "appId",
			signType: "signType",
			sign: "sign",
			reqTime: new Date().getTime(),
			method: "method",
			reqData: {
				fileName: fileName
			}
		}, {
			responseType: "blob",
			headers: {
				"H-User-Token": sessionStorage.getItem("userToken")
			}
		})
}