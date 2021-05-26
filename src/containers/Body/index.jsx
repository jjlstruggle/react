import React, { Component } from 'react'
import './index.css'
import { Route, Switch } from 'react-router-dom'
import MusicList from '../../components/MusicList'
import Login from '../Login'
import MyLink from '../../components/MyLink'
import Discover from '../../pages/Index/Discover'
import Playlist from '../Playlist'
import Search from '../Search'
import axios from '../../share/share'
import { nanoid } from 'nanoid'
import {connect} from 'react-redux'
import {playlistImfor} from '../../redux/actions/playlist'

class Body extends Component {

    state = {
        myPlaylist: [],
        collect: true,
        create: true,
    }

    loginPage = login => {
        if (!this.props.login.loginState && login) {
            return <Login loginPage={this.props.login.loginPage} loginPageState={this.props.loginPageState} getUserData={this.props.getUserData} loginData={this.loginData}/>
        } else {
            return false
        }
    }

    // $.get(url+"/recommend/resource",data=>{
    //     setTimeout(()=>{
    //         let img_arr = document.getElementById("child1").contentWindow.document.getElementById("child-body").contentWindow.window.$("#divBox img")
    //         let span_arr = document.getElementById("child1").contentWindow.document.getElementById("child-body").contentWindow.window.$("#divBox span")
    //         let a_arr = document.getElementById("child1").contentWindow.document.getElementById("child-body").contentWindow.window.$("#divBox a")
    //         for(let i = 0;i<img_arr.length;i++){
    //             img_arr[i].src = data.recommend[i].picUrl;
    //             span_arr[i].innerText = data.recommend[i].name
    //             a_arr[i].addEventListener('click',()=>{
    //                 localStorage.playlistId = data.recommend[i].id;
    //             })
    //         }
    //     },2000)
    // })

    componentDidMount = () =>{
        this.props.onRef(this)
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
            const {userId,nickname,avatarUrl,vipType} = data.profile
            this.props.getUserData({
                uid:userId,
                name:nickname,
                avatar:avatarUrl,
                vip:vipType
            })
        } else if (data.code == undefined) {
            // pass
        } else {
            alert("请求超时,请稍后再登录")
        }
    }

    getLoginData = (uid,name) => {
        axios.get(`/user/playlist?uid=${uid}`)
            .then(response => {
                let myPlaylist = response.data.playlist.map(item => {
                    let myName
                    if (item.name === name + "喜欢的音乐") myName = "我喜欢的音乐"
                    else myName = item.name
                    return {
                        id: item.id,
                        subscribed: item.subscribed,
                        name:myName
                    }
                })
                this.setState({
                    myPlaylist
                })
            })
    }

    fold = type => {
        return () => {
            if (type === "create") {
                this.setState({
                    create: !this.state.create
                })
            } else if (type === "collect") {
                this.setState({
                    collect: !this.state.collect
                })
            }
        }
    }

    render() {
        return (
            <div id="body-box">
                <div id="center-l">
                    <div id="left-tag">
                        <MyLink to="/index/discover/character">
                            <div style={{ backgroundColor: "rgb(255, 246, 247)", fontWeight: 600 }}>发现音乐</div>
                        </MyLink>
                        <MyLink to="/index/discover/character">
                            <div>视频</div>
                        </MyLink>
                        <MyLink to="/index/discover/character">
                            <div>朋友</div>
                        </MyLink>
                        <MyLink to="/index/discover/character">
                            <div>直播</div>
                        </MyLink>
                        <MyLink to="/index/discover/character">
                            <div>私人FM</div>
                        </MyLink>
                        <span style={{ display: "inline-block", fontSize: "13px", color: "rgb(166, 166, 166)", paddingLeft: "18px", marginTop: "13px", cursor: "default" }}>创建的歌单</span>
                        <span id="ml-get" className="curson" onClick={this.fold("create")}>
                            {this.state.create ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-right"></i>}
                        </span>
                        <span id="ml-creat" className="curson">
                            <i className="fa fa-plus"></i>
                        </span>
                    </div>
                    <div className="myList" id="myCreate">
                        {
                            this.state.myPlaylist.length !== 0 ?
                                this.state.myPlaylist.map(item => {
                                    if (!item.subscribed)
                                        return (
                                            <MyLink to={`/index/playlist?id=${item.id}`} key={nanoid()} style={{ display: this.state.create ? "block" : "none" }}>
                                                <div>
                                                    <i className="fa fa-music" aria-hidden="true"></i>
                                                    <span>{item.name}</span>
                                                </div>
                                            </MyLink>
                                        )
                                }) : ("")
                        }
                    </div>
                    <span style={{ display: "inline-block", fontSize: "13px", color: "rgb(166, 166, 166)", paddingLeft: "18px", marginTop: "13px", cursor: "default" }}>收藏的歌单</span>
                    <span id="ml-get2" className="curson" onClick={this.fold("collect")}>
                        {this.state.collect ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-right"></i>}
                    </span>
                    <div className="myList" id="myCollect">
                        {
                            this.state.myPlaylist.length !== 0 ?
                                this.state.myPlaylist.map(item => {
                                    if (item.subscribed)
                                        return (
                                            <MyLink to={`/index/playlist?id=${item.id}`} key={nanoid()} style={{ display: this.state.collect ? "block" : "none" }}>
                                                <div>
                                                    <i className="fa fa-music" aria-hidden="true"></i>
                                                    <span>{item.name}</span>
                                                </div>
                                            </MyLink>
                                        )
                                }) : ("")
                        }
                    </div>
                </div>
                {
                    this.loginPage(this.props.login.loginPage)
                }
                <Switch>
                    <Route path="/index/discover" component={Discover} />
                    <Route path="/index/playlist" component={Playlist} />
                    <Route path="/index/search" component={Search} />
                </Switch>
                {
                    this.props.page.musicList ? (<MusicList musicList={this.props.music.musicImf} playlistImfor={this.props.playlistImfor} music={this.props.node}/>) : ("")
                }
                
            </div>
        )
    }
}

export default connect(
    state =>
    ({
        music:state.musicList,
        node:state.player,
        page:state.music
    }),
    { playlistImfor }
)(Body)