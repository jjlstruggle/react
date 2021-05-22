import React, { Component } from 'react'
import './index.css'
import phone from '../../assets/01.png'
import email from '../../assets/02.png'
import saoyisao from '../../assets/03.png'
import qrcode from '../../assets/top.png'
import { connect } from 'react-redux'
import { loginPageState } from '../../redux/actions/login'
import axios from '../../share/share'

class Login extends Component {

    changeType = (type, method) => {
        return () => {
            this.props.loginPageState(type, method)
        }
    }

    login = () => {
        const { method } = this.props
        let account = this.account.value
        let password = this.password.value
        if (!this.input.checked) {
            alert("你要先需要先勾选服务条款")
            return false
        }

        if (password && account) {
            if (method === "phone") {
                // 手机登录
                axios.post(`/login/cellphone?phone=${account}&password=${password}&time=` + Math.random())
                    .then(response => {
                        this.loginData(response.data)
                    })
            } else {
                // 邮箱登录
                axios.post(`/login?email=${account}&password=${password}&time=` + Math.random())
                    .then(response => {
                        this.loginData(response.data)
                    })
            }
        } else {
            console.log("请输入账号或密码")
            return
        }
    }

    loading = () => {
        let timer
        axios.post(`/login/qr/key?time=` + Math.random())
            .then(response => {
                axios.post(`/login/qr/create?key=${response.data.data.unikey}&qrimg=img&time` + Math.random())
                    .then(response2 => {
                        document.querySelector("#qrCode").src = response2.data.data.qrimg
                        timer = setInterval(() => {
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
                                                this.loginData(response4.data.data)
                                            })
                                    }
                                })
                        }, 3000)
                    })
            })
    }

    loginData = data => {
        if (data.code == 400) {
            console.log("请输入有效的手机号")
            return
        } else if (data.code == 502) {
            console.log(data.msg)
            return
        } else if (data.code == 200) {
            // 登录成功
            this.changeType("login", {
                m: this.props.method,
                id: data.account.id,
                img: data.profile.avatarUrl,
                name: data.profile.nickname,
                vipType: data.profile.vipType
            })()
        } else if (data.code == undefined) {
            // pass
        } else {
            alert("请求超时,请稍后再登录")
        }
    }

    componentDidMount = () => {
        if (localStorage.cookie !== undefined || localStorage.cookie !== null) {
            axios({
                method: 'post',
                url: `/login/status`,
            })
                .then(res => {
                    this.loginData(res.data.data)
                })
        }
    }

    render() {
        const { method } = this.props
        if (method === "phone") {
            return (
                <div id="page" className="login-page">
                    <img src={qrcode} id="top-img" className="curson" alt="err" onClick={
                        () => {
                            this.loading()
                            this.changeType("open", {
                                m: "qrcode",
                            })()
                        }
                    } /><br />
                    <img src={phone} id="type-img" alt="err" />
                    <div className="close-login-page curson" onClick={this.changeType("close", {
                        m: "phone",
                        s: "logout"
                    })}>X</div>
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
                        <div style={{ color: "rgb(253, 84, 78)" }} className="curson" onClick={this.changeType("open", {
                            m: "email",
                        })}>
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
                <div id="page" className="login-page">
                    <img src={qrcode} id="top-img" className="curson" alt="err" onClick={
                        () => {
                            this.loading()
                            this.changeType("open", {
                                m: "qrcode",
                            })()
                        }
                    } /><br />
                    <img src={email} id="type-img" alt="err" />
                    <div className="close-login-page curson" onClick={this.changeType("close", {
                        m: "email",
                    })}>X</div>
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
                        <div style={{ color: "rgb(253, 84, 78)" }} className="curson" onClick={this.changeType("open", {
                            m: "phone",
                        })}>
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
                <div id="page2" className="login-page">
                    <div className="close-login-page curson" onClick={this.changeType("close", {
                        m: "qrcode",
                    })}>X</div>
                    <div id="login-title">扫码登录</div>
                    <img src="" id="use-phone" />
                    <img src="" id="qrCode" />
                    <div id="login-decration">使用网易云APP扫码登录</div>
                    <div id="change-login" className="curson" onClick={this.changeType("open", {
                        m: "phone",
                    })}>选择其它登录方式</div>
                </div>
            )
        }

    }
}


export default connect(
    state =>
    ({
        login: state.login.page,
        method: state.login.method,
        state: state.login.state
    }),
    { loginPageState }
)(Login)