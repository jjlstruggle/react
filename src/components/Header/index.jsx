import React, { Component } from 'react'
import './index.css'
import { withRouter } from 'react-router-dom'

class Header extends Component {

    loginPageState = () => {
        if(!this.props.login.loginPage && !this.props.login.loginState){
            this.props.loginPageState(true)
        }
    }

    go = () => {
        let { value } = this.search
        if (value !== "" || this.value !== undefined) {
            this.props.history.push(`/index/search?keyword=${value}`)
        }
    }

    render() {
        const {userData} = this.props.login
        return (
            <div id="header-box">
                <div className="row">
                    <div id="top-left">
                        <div id="title">
                            <i className="fa fa-superpowers"></i>
                        </div>
                        <div id="title-name">Fake Cloud</div>
                    </div>
                    <div id="top-center">
                        <button id="last-method" className="curson">
                            <i className="fa fa-angle-left"></i>
                        </button>
                        <button id="next-method" className="curson">
                            <i className="fa fa-angle-right"></i>
                        </button>
                        <input type="text" id="search" placeholder="搜索" ref={c => this.search = c} />
                        <span id="search-img" className="curson" onClick={this.go}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </span>
                        <button id="listener" className="curson">
                            <i className="fa fa-microphone"></i>
                        </button>
                    </div>
                    <div id="top-right" onClick={this.loginPageState}>
                        <div id="userImg" className="curson">
                            {
                                 userData.avatar === "" ? <i className="fa fa-user-circle" aria-hidden="true"></i> : <img src={userData.avatar} />
                            }
                        </div>
                        <div id="userId" className="curson">
                            { <div id="idText" className="curson">{userData.name === "" ? "未登录" : userData.name}</div> }
                            <div id="userData" className="curson">
                                <i className="fa fa-sort-desc"></i>
                            </div>
                        </div>
                        { <div id="isVip" className="curson">{userData.vip === 0 ? "开通VIP" : "vip" + userData.vip}</div> }
                        <div id="view" className="curson">
                            <i className="fa fa-eye"></i>
                        </div>
                        <div id="set" className="curson">
                            <i className="fa fa-gear"></i>
                        </div>
                        <div id="envelope" className="curson">
                            <i className="fa fa-envelope-o"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)