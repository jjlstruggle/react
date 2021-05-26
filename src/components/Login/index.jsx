import React, { Component } from 'react'
import './index.css'
import phone from '../../assets/01.png'
import email from '../../assets/02.png'
import saoyisao from '../../assets/03.png'
import qrcode from '../../assets/top.png'
import axios from '../../share/share'
import {nanoid} from 'nanoid'

axios.defaults.withCredentials = true

export default class Login extends Component {

    state = {
        method:"phone"
    }

    changeType = (type) => {
        return () => {
            //  code
            if(type == "close"){
                this.props.loginPageState(false)
            }else{
                if(this.state.method != type){
                    this.setState({method:type})
                }
            }
        }
    }

    login = () => {
        let account = this.account.value
        let password = this.password.value
        if (!this.input.checked) {
            alert("你要先需要先勾选服务条款")
            return false
        }

        if (password && account) {
            if (this.state.method === "phone") {
                // 手机登录
                axios.post(`/login/cellphone?phone=${account}&password=${password}&time=` + Math.random())
                    .then(response => {
                        this.props.loginData(response.data)
                    })
            } else {
                // 邮箱登录
                axios.post(`/login?email=${account}&password=${password}&time=` + Math.random())
                    .then(response => {
                        this.props.loginData(response.data)
                    })
            }
        } else {
            console.log("请输入账号或密码")
            return
        }
    }

    loading = () => {
        axios.post(`/login/qr/key?time=` + Math.random())
            .then(response => {
                axios.post(`/login/qr/create?key=${response.data.data.unikey}&qrimg=img&time` + Math.random())
                    .then(response2 => {
                        document.querySelector("#qrCode").src = response2.data.data.qrimg
                        var timer = setInterval(() => {
                            axios.get(`/login/qr/check?key=${response.data.data.unikey}&time=` + Math.random())
                                .then(response3 => {
                                    if (response3.data.code == 800) {
                                        clearInterval(timer)
                                        alert('二维码已失效,请刷新后再进行登录')
                                    }
                                    if (response3.data.code == 803) {
                                        clearInterval(timer)
                                        alert(response3.data.message)
                                        axios.get(`/login/status?timerstamp=${Date.now()}`)
                                            .then(response4 => {
                                                this.props.loginData(response4.data.data)
                                            })
                                    }
                                })
                        }, 3000)
                    })
            })
    }

    animation = () =>{
        this.qrCode.style.transform = "translate(204px,50px)"
        this.qrCode.style.width = "150px"
        this.qrCode.style.height = "150px"
        this.usePhone.style.opacity = 1
        this.usePhone.style.transform = "translate(-80px)"
        this.decration.style.transform = "translate(190px,50px)"
    }

    removeAnimation = () =>{
        this.qrCode.style.transform = "translate(84px,20px)"
        this.qrCode.style.width = "210px"
        this.qrCode.style.height = "210px"
        this.usePhone.style.opacity = 0
        this.usePhone.style.transform = "translate(0)"
        this.decration.style.transform = "translate(98px,20px)"
    }

    render() {
        const { method } = this.state
        if (method === "phone") {
            return (
                <div id="page" className="login-page" key={nanoid()}>
                    <img src={qrcode} id="top-img" className="curson" alt="err" onClick={
                        () => {
                            this.changeType("qrcode")()
                            this.loading()
                        }
                    } /><br />
                    <img src={phone} id="type-img" alt="err" />
                    <div className="close-login-page curson" onClick={this.changeType("close")}>X</div>
                    <div id="login-box">
                        <div id="account-box">
                            <div id="mobile">
                                <i className="fa fa-mobile" aria-hidden="true"></i>
                            </div>
                            <div id="mobile-area">+86</div>
                            <input type="text" placeholder="请输入手机号" ref={c => this.account = c} />
                        </div>
                        <div id="password-box">
                            <div id="lock">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </div>
                            <input type="password" placeholder="请输入密码" ref={c => this.password = c} />
                        </div>
                    </div>
                    <button id="login" className="curson" onClick={this.login}>登录</button>
                    <button id="enroll" className="curson">注册</button>
                    <div id="type-box">
                        <div style={{ color: "rgb(29, 187, 134)", marginRight: "43px", marginLeft: "48px" }} className="curson">
                            <i className="fa fa-wechat"></i>
                        </div>
                        <div style={{ color: "rgb(60, 130, 223)", marginRight: "43px" }} className="curson">
                            <i className="fa fa-qq"></i>
                        </div>
                        <div style={{ color: "rgb(253, 84, 78)", marginRight: "43px" }} className="curson">
                            <i className="fa fa-weibo"></i>
                        </div>
                        <div style={{ color: "rgb(253, 84, 78)" }} className="curson" onClick={this.changeType("email")}>
                            <i className="fa fa-envelope-o"></i>
                        </div>
                    </div>
                    <div id="item">
                        <input type="checkbox" ref={c => this.input = c} />
                        <div>同意 《服务条款》 《隐私政策》 《儿童隐私政策》</div>
                    </div>
                </div>
            )
        }
        if (method === "email") {
            return (
                <div id="page" className="login-page" key={nanoid()}>
                    <img src={qrcode} id="top-img" className="curson" alt="err" onClick={
                        () => {
                            this.loading()
                            this.changeType("qrcode")()
                        }
                    } /><br />
                    <img src={email} id="type-img" alt="err" />
                    <div className="close-login-page curson" onClick={this.changeType("close")}>X</div>
                    <div id="login-box">
                        <div id="account-box">
                            <div id="mobile">
                                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            </div>
                            <input type="text" placeholder="邮箱帐号" ref={c => this.account = c} />
                        </div>
                        <div id="password-box">
                            <div id="lock">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </div>
                            <input type="password" placeholder="密码" ref={c => this.password = c} />
                        </div>
                    </div>
                    <button id="login" className="curson" onClick={this.login}>登录</button>
                    <button id="enroll" className="curson">注册</button>
                    <div id="type-box">
                        <div style={{ color: "rgb(29, 187, 134)", marginRight: "43px", marginLeft: "48px" }} className="curson">
                            <i className="fa fa-wechat"></i>
                        </div>
                        <div style={{ color: "rgb(60, 130, 223)", marginRight: "43px" }} className="curson">
                            <i className="fa fa-qq"></i>
                        </div>
                        <div style={{ color: "rgb(253, 84, 78)", marginRight: "43px" }} className="curson">
                            <i className="fa fa-weibo"></i>
                        </div>
                        <div style={{ color: "rgb(253, 84, 78)" }} className="curson" onClick={this.changeType("phone")}>
                            <i className="fa fa-mobile"></i>
                        </div>
                    </div>
                    <div id="item">
                        <input type="checkbox" ref={c => this.input = c} />
                        <div>同意 《服务条款》 《隐私政策》 《儿童隐私政策》</div>
                    </div>
                </div>
            )

        } else if (method === "qrcode") {
            return (
                <div id="page2" className="login-page" key={nanoid()}>
                    <div className="close-login-page curson" onClick={this.changeType("close")}>X</div>
                    <div id="login-title">扫码登录</div>
                    <img src={saoyisao} id="use-phone" ref={c=>this.usePhone=c}/>
                    <img id="qrCode" onMouseOver={this.animation} ref={c=>this.qrCode=c} onMouseLeave={this.removeAnimation}/>
                    <div id="login-decration" ref={c=>this.decration=c}>使用网易云APP扫码登录</div>
                    <div id="change-login" className="curson" onClick={this.changeType("phone")}>选择其它登录方式</div>
                </div>
            )
        }
    }
}