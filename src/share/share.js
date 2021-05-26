import axios from 'axios'
// axios 默认配置
axios.defaults.baseURL = "http://localhost:3000"
// axios.defaults.withCredentials = true
axios.defaults.timeout = 5000
export default axios

// 下载
export function $(url,fileName){var x = new XMLHttpRequest();x.open("GET", url, true);x.responseType = 'blob';x.onload=function(){var url = window.URL.createObjectURL(x.response);var a = document.createElement('a');a.href = url;a.download = fileName;a.click()};x.send();}


