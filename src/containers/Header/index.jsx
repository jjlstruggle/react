import React, { Component } from 'react'
import './index.css'
import { connect } from 'react-redux'
import { loginPageState } from '../../redux/actions/login'
import { withRouter } from 'react-router-dom'

class Header extends Component {

    state = {
        uid:"",
        uName:"",
        uVip:0,
        uImg:""
    }

    loginPageState = () => {
        if (this.props.login === "close" && this.props.state === "logout") {
            this.props.loginPageState("open", {
                m: this.props.method,
            })
        } else if(this.props.login === "open"){
            this.props.loginPageState("close", {
                m: this.props.method,
            })
        }
    }

    go = () => {
        let { value } = this.search
        if (value !== "" || this.value !== undefined) {
            this.props.history.push(`/index/search?keyword=${value}`)
        }
    }

    componentDidUpdate = () =>{
        if(this.props.imf != undefined){
            const {imf} = this.props
            if(imf.uid != this.state.uid){
                this.setState({
                    uid:imf.uid,
                    uName:imf.uName,
                    uVip:imf.uVip,
                    uImg:imf.uImg
                })
            }
        }
        
    }

    render() {
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
                            this.state.uImg === "" ?  <i className="fa fa-user-circle" aria-hidden="true"></i> : <img src={this.state.uImg}/>
                        }
                        </div>
                        <div id="userId" className="curson">
                            <div id="idText" className="curson">{this.state.uName === "" ? "未登录" : this.state.uName}</div>
                            <div id="userData" className="curson">
                                <i className="fa fa-sort-desc"></i>
                            </div>
                        </div>
                        <div id="isVip" className="curson">{this.state.uVip == 0 ? "开通VIP" : "vip"+this.state.uVip}</div>
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

export default connect(
    state =>
    ({
        login: state.login.page,
        state: state.login.state,
        method: state.login.method,
        imf: state.login.imf

    }),
    { loginPageState }
)(withRouter(Header))