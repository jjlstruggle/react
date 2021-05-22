import React, { Component } from 'react'
import './index.css'
import { connect } from 'react-redux'
import qs from 'querystring'
import axios, { $ } from '../../share/share'
import { nanoid } from 'nanoid'
import { playlistImfor } from '../../redux/actions/playlist.js'


class Playlist extends Component {

    state = {
        id: "",
        isUnfold: false,
        name: "",
        author: "",
        coverImg: "",
        decoration: "",
        tags: "",
        musicCount: "",
        playCount: "",
        commentCount: "",
        subscribedCount: "",
        trackCount: "",
        authorImg: "",
        musicImforArr: [
            {
                id: "",
                name: "",
                author: "",
                timer: "",
                album: "",
                url: "",
                coverImg: ""
            }
        ]
    }

    changeFold = () => {
        const { isUnfold } = this.state
        this.setState({
            isUnfold: !isUnfold
        })
    }

    send = index => {
        return () => {
            const { musicImforArr } = this.state
            this.props.playlistImfor("music", musicImforArr[index])
            let { audio } = this.props.music.node
            audio.src = musicImforArr[index].url
            audio.play()
        }
    }

    getPlaylistImf = (id) => {
        axios.get(`/playlist/detail?id=${id}`)
            .then(response => {
                let data = response.data.playlist
                let tags = data.tags;
                let newTags = tags.map((item, index) => {
                    if (index === tags.length - 1)
                        return item
                    return item + "/"
                })
                this.setState({
                    id: data.id,
                    name: data.name,
                    author: data.creator.nickname,
                    coverImg: data.coverImgUrl,
                    decoration: data.description,
                    tags: newTags,
                    musicCount: data.trackCount,
                    playCount: data.playCount,
                    commentCount: data.commentCount,
                    subscribedCount: data.subscribedCount,
                    trackCount: data.trackCount,
                    authorImg: data.creator.avatarUrl,
                })
                let musicIdArr = data.trackIds.map(item => {
                    return item.id
                })
                axios.get(`/song/detail?ids=${musicIdArr}`)
                    .then(response => {
                        let musicImforArr = response.data.songs.map(data => {
                            let Mtime = parseInt(parseInt(data.dt / 1000) / 60);
                            let Stime = parseInt(data.dt / 1000) - parseInt(parseInt(data.dt / 1000) / 60) * 60;
                            if (Stime < 10) {
                                Stime = "0" + Stime;
                            }
                            if (Mtime < 10) {
                                Mtime = "0" + Mtime;
                            }
                            let newAuthor = data.ar.map((item, index) => {
                                if (index === data.ar.length - 1) return item.name
                                return item.name + "/"
                            })
                            return {
                                id: data.id,
                                name: data.name,
                                author: newAuthor,
                                timer: Mtime + ":" + Stime,
                                album: data.al.name,
                                url: "",
                                coverImg: data.al.picUrl
                            }
                        })
                        axios.get(`/song/url?id=${musicIdArr}`)
                            .then(response => {
                                let urlArr = response.data.data.map(item => {
                                    return {
                                        url: item.url,
                                        id: item.id
                                    }
                                })
                                musicImforArr.map(item => {
                                    for (let i of urlArr) {
                                        if (i.id === item.id) {
                                            item.url = i.url
                                        }
                                    }
                                })
                                this.setState({
                                    musicImforArr
                                })
                            })

                    })
            })
    }

    componentDidUpdate = () => {
        let search = this.props.location.search
        const { id } = qs.parse(search.slice(1))
        if (id * 1 !== this.state.id) {
            this.getPlaylistImf(id)
        }
    }

    componentDidMount = () => {
        let search = this.props.location.search
        const { id } = qs.parse(search.slice(1))
        this.getPlaylistImf(id)
    }

    render() {
        const { subscribedCount, coverImg, authorImg, author, name, tags, trackCount, playCount } = this.state
        return (
            <div style={{ overflow: "auto", height: "100%", width: "1336px" }}>
                <div id="_head">
                    <img src={coverImg} alt="" id="playlist-img" />
                    <span id="playlist-title">{name}</span>
                    <img src={authorImg} alt="" id="creater-img" />
                    <span id="creater">{author}</span>
                    <button id="all" className="btn btn-default curson"><i className="fa fa-play"></i>&nbsp;&nbsp;播放全部&nbsp;&nbsp;<i className="fa fa-plus"></i></button>
                    <button id="collect" className="btn btn-default curson"><i className="fa fa-folder-o"></i>&nbsp;&nbsp;收藏
                    {
                            subscribedCount > 10000 ? ("(" + parseInt(subscribedCount / 10000) + "万)") : ((subscribedCount))

                        }&nbsp;&nbsp;</button>
                    <button id="share" className="btn btn-default curson"><i className="fa fa-external-link"></i>&nbsp;&nbsp;分享&nbsp;</button>
                    <button id="download" className="btn btn-default curson" onClick={
                        ()=>{
                            if(window.confirm("确认要下载吗？")){
                                this.state. musicImforArr.map(item=>{
                                    $(item.url,item.name)
                                })
                            }
                        }
                    }><i className="fa fa-download"></i>&nbsp;&nbsp;下载全部&nbsp;</button>
                    <span id="tag">标签:{tags}</span>
                    <span id="count">歌曲:{trackCount} 播放:{playCount}</span>
                    <div id="synopsisBox">
                        <span id="synopsis" style={{
                            overflow: this.state.isUnfold ? "auto" : "hidden",
                            whiteSpace: this.state.isUnfold ? "normal" : "nowrap",
                            textOverflow: this.state.isUnfold ? "clip" : "ellipsis",
                        }}>简介:{this.state.decoration}</span>
                        <i className={this.state.isUnfold ? "fa fa-caret-up curson" : "fa fa-caret-down curson"} id="sanjiao" onClick={this.changeFold}></i>
                    </div>
                </div>
                <div id="_body">
                    <div>
                        <ul>
                            <li>歌曲列表</li>
                            <li>评论({this.state.commentCount})</li>
                            <li>收藏者</li>
                        </ul>
                        <div id="music-index">
                            <div id="music-title">音乐标题</div>
                            <div id="music-singer">歌手</div>
                            <div id="music-playlist">专辑</div>
                            <div id="music-time">时长</div>
                        </div>
                        <div id="playlist-music-box">
                            {
                                this.state.musicImforArr.map((item, index) => {
                                    return (
                                        <div className="music-row" key={nanoid()} onDoubleClick={this.send(index)}>
                                            <div className='col1'>
                                                <i className='fa fa-heart-o'></i>
                                                <i className='fa fa-download' onClick={
                                                    () => {
                                                        if (window.confirm(`确定要下载${item.name}吗？`)) 
                                                        $(item.url, item.name)
                                                    }
                                                }></i>
                                            </div>
                                            <div className='col2'>
                                                {item.name}
                                            </div>
                                            <div className='col3'>
                                                {item.author}
                                            </div>
                                            <div className='col4'>
                                                {item.album}
                                            </div>
                                            <div className='col5'>
                                                {item.timer}
                                            </div>
                                        </div>
                                    )
                                })
                            }
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
        playlist: state.playlist,
        music: state.player
    }),
    { playlistImfor }
)(Playlist)