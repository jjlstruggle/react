import axios from 'axios'

// axios 默认配置
// axios.defaults.baseURL = "https://jjl-netease-cloud.vercel.app/"
axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true
axios.defaults.timeout = 15000

export function $(url,fileName){var x = new XMLHttpRequest();x.open("GET", url, true);x.responseType = 'blob';x.onload=function(){var url = window.URL.createObjectURL(x.response);var a = document.createElement('a');a.href = url;a.download = fileName;a.click()};x.send();}

export function cookieToJson(cookie) {
    if (!cookie) return {}
    let cookieArr = cookie.split(';')
    let obj = {}
    cookieArr.forEach((i) => {
      let arr = i.split('=')
      obj[arr[0]] = arr[1]
    })
    return obj
  }

export default axios