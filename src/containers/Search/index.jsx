import React, { Component } from 'react'
import './index.css'
import { connect } from 'react-redux'
import qs from 'querystring'
import axios from '../../share/share'
import { playlistImfor } from '../../redux/actions/playlist.js'
import List from '../../components/List';
import { nanoid } from 'nanoid'

class Search extends Component {

    state = {
        offset: 0,
        type: "首单曲",
        Ntype: 1,
        songCount: "",
        keyword: "",
        pages: "",
        nowPage: 1,
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

    search = (keyword) => {
        axios.get(`/cloudsearch?keywords=${keyword}&limit=100&offset=${this.state.offset}&type=${this.state.Ntype}`)
            .then(response => {
                const { songCount, songs } = response.data.result
                let pages
                if (songCount % 100 == 0)
                    pages = parseInt(songCount / 100)
                else
                    pages = parseInt(songCount / 100) + 1
                let musicIdArr = []
                let musicImforArr = songs.map(data => {
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

                    musicIdArr.push(data.id)
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
                    })
                this.setState({ songCount, keyword, musicImforArr, pages })
            })
    }

    componentDidMount = () => {
        let search = this.props.location.search
        const { keyword } = qs.parse(search.slice(1))
        this.search(keyword)
    }

    componentDidUpdate = () => {
        let search = this.props.location.search
        const { keyword } = qs.parse(search.slice(1))
        if (keyword !== this.state.keyword) {
            this.search(keyword)
        }
    }

    changePage = method => {
        return () => {
            const { offset, nowPage } = this.state
            if (method === "increment") {
                this.setState({
                    offset: offset + 100,
                    nowPage: nowPage + 1
                })
            } else if (method === "decrement") {
                this.setState({
                    offset: offset - 100,
                    nowPage: nowPage - 1
                })
            }
            setTimeout(
                () => {
                    this.search(this.state.keyword)
                }
                , 500)
        }
    }

    changePage2 = event => {
        if (event.target.innerText == "下一页" || event.target.innerText == "上一页" || event.target.innerText === "...") return 0
        let nowPage = event.target.innerText * 1
        let offset = (nowPage - 1) * 100
        this.setState({
            offset, nowPage
        })
        setTimeout(
            () => {
                this.search(this.state.keyword)
            }
            , 500)
    }

    changeType = event => {
        let Ftype = event.target.innerText
        switch (Ftype) {
            case "单曲":
                let type1 = "首单曲"
                let Ntype1 = 1
                this.setState({
                    type:type1
                    ,
                    Ntype:Ntype1
                })
                // setTimeout(
                //     () => {
                //         this.search(this.state.keyword)
                //     }
                //     , 500)
                break;
            case "歌手":
                let type2 = "位歌手"
                let Ntype2 = 100
                this.setState({
                    type:type2
                    ,
                    Ntype:Ntype2
                })
                // setTimeout(
                //     () => {
                //         this.search(this.state.keyword)
                //     }
                //     , 500)
                break;
            case "专辑":
                let type3 = "张专辑"
                let Ntype3 = 10
                this.setState({
                    type:type3
                    ,
                    Ntype:Ntype3
                })
                // setTimeout(
                //     () => {
                //         this.search(this.state.keyword)
                //     }
                //     , 500)
                break;
            case "视频":
                let type4 = "个视频"
                let Ntype4 = 1014
                this.setState({
                    type:type4
                    ,
                    Ntype:Ntype4
                })
                // setTimeout(
                //     () => {
                //         this.search(this.state.keyword)
                //     }
                //     , 500)
                break;
            case "歌单":
                let type5 = "个歌单"
                let Ntype5 = 1000
                this.setState({
                    type:type5
                    ,
                    Ntype:Ntype5
                })
                // setTimeout(
                //     () => {
                //         this.search(this.state.keyword)
                //     }
                //     , 500)
                break;
            case "歌词":
                let type6 = "首歌词"
                let Ntype6 = 1009
                this.setState({
                    type:type6
                    ,
                    Ntype:Ntype6
                })
                // setTimeout(
                //     () => {
                //         this.search(this.state.keyword)
                //     }
                //     , 500)
                break;
            case "主播电台":
                let type7 = "个电台"
                let Ntype7 = 1009
                this.setState({
                    type:type7
                    ,
                    Ntype:Ntype7
                })
                // setTimeout(
                //     () => {
                //         this.search(this.state.keyword)
                //     }
                //     , 500)
                break;
            case "用户":
                let type8 = "位用户"
                let Ntype8 = 1004
                this.setState({
                    type:type8
                    ,
                    Ntype:Ntype8
                })
                // setTimeout(
                //     () => {
                //         this.search(this.state.keyword)
                //     }
                //     , 500)
                break;
            default:
                break;
        }
        // setTimeout(
        //     () => {
        //         this.search(this.state.keyword)
        //     }
        //     , 500)
    }

    send = index => {
        return () => {
            const { musicImforArr } = this.state
            this.props.playlistImfor("music", musicImforArr[index])
            let {audio} = this.props.music.node
            audio.src = musicImforArr[index].url
            audio.play()
        }
    }

    render() {
        const { nowPage, pages } = this.state
        return (
            <>
                <div id="search-top" onClick={this.changeType}>
                    <div id="search-count">找到{this.state.songCount}{this.state.type}</div>
                    <span className="search-type curson">单曲</span>
                    <span className="curson">歌手</span>
                    <span className="curson">专辑</span>
                    <span className="curson">视频</span>
                    <span className="curson">歌单</span>
                    <span className="curson">歌词</span>
                    <span className="curson">主播电台</span>
                    <span className="curson">用户</span>
                </div>
                <div id="search-center">
                    <div id="search-music-index" className="default">
                        <div id="music-title">音乐标题</div>
                        <div id="music-singer">歌手</div>
                        <div id="music-playlist">专辑</div>
                        <div id="music-time">时长</div>
                    </div>
                    <div id="search-music-box" className="default">
                        {
                            this.state.musicImforArr.map((item,index) => {
                                return (
                                    <List item={item} index={index} send={this.send} key={nanoid()}></List>
                                )
                            })
                        }
                        {
                            pages > 10 ? (
                                nowPage > 5 ?
                                    nowPage < pages - 4 ?
                                        (
                                            <ul id="offsetUl" onClick={this.changePage2}>
                                                <li style={{ width: "60px" }} onClick={this.changePage("decrement")}>上一页</li>
                                                <li>1</li>
                                                <li style={{ backgroundColor: "white" }}>...</li>
                                                <li>{nowPage - 3}</li>
                                                <li>{nowPage - 2}</li>
                                                <li>{nowPage - 1}</li>
                                                <li style={{ backgroundColor: " #C20C0C" }}>{nowPage}</li>
                                                <li>{nowPage + 1}</li>
                                                <li>{nowPage + 2}</li>
                                                <li style={{ backgroundColor: "white" }}>...</li>
                                                {pages===100?<li style={{width:"90px"}}>{pages}</li>:<li>{pages}</li>}
                                                <li style={{ width: "60px" }} onClick={this.changePage("increment")}>下一页</li>
                                            </ul>
                                        )
                                        :
                                        (
                                            <ul id="offsetUl" onClick={this.changePage2}>
                                                <li style={{ width: "60px" }} onClick={this.changePage("decrement")}>上一页</li>
                                                <li>1</li>
                                                <li style={{ backgroundColor: "white" }}>...</li>
                                                {nowPage === pages - 8 ? (<li style={{ backgroundColor: " #C20C0C" }}>{pages - 8}</li>) : (<li>{pages - 8}</li>)}
                                                {nowPage === pages - 7 ? (<li style={{ backgroundColor: " #C20C0C" }}>{pages - 7}</li>) : (<li>{pages - 7}</li>)}
                                                {nowPage === pages - 6 ? (<li style={{ backgroundColor: " #C20C0C" }}>{pages - 6}</li>) : (<li>{pages - 6}</li>)}
                                                {nowPage === pages - 5 ? (<li style={{ backgroundColor: " #C20C0C" }}>{pages - 5}</li>) : (<li>{pages - 5}</li>)}
                                                {nowPage === pages - 4 ? (<li style={{ backgroundColor: " #C20C0C" }}>{pages - 4}</li>) : (<li>{pages - 4}</li>)}
                                                {nowPage === pages - 3 ? (<li style={{ backgroundColor: " #C20C0C" }}>{pages - 3}</li>) : (<li>{pages - 3}</li>)}
                                                {nowPage === pages - 2 ? (<li style={{ backgroundColor: " #C20C0C" }}>{pages - 2}</li>) : (<li>{pages - 2}</li>)}
                                                {nowPage === pages - 1 ? (<li style={{ backgroundColor: " #C20C0C" }}>{pages - 1}</li>) : (<li>{pages - 1}</li>)}
                                                {nowPage === pages ? pages===100 ? <li style={{width:"90px",backgroundColor: " #C20C0C"}}>{pages}</li>:<li style={{backgroundColor: " #C20C0C"}}>{pages}</li>: (<li>{pages}</li>)}
                                                <li style={{ width: "60px" }} onClick={this.changePage("increment")}>下一页</li>
                                            </ul>
                                        )
                                    :
                                    (
                                        <ul id="offsetUl" onClick={this.changePage2}>
                                            <li style={{ width: "60px" }} onClick={this.changePage("decrement")}>上一页</li>
                                            {nowPage === 1 ? (<li style={{ backgroundColor: " #C20C0C" }}>1</li>) : (<li>1</li>)}
                                            {nowPage === 2 ? (<li style={{ backgroundColor: " #C20C0C" }}>2</li>) : (<li>2</li>)}
                                            {nowPage === 3 ? (<li style={{ backgroundColor: " #C20C0C" }}>3</li>) : (<li>3</li>)}
                                            {nowPage === 4 ? (<li style={{ backgroundColor: " #C20C0C" }}>4</li>) : (<li>4</li>)}
                                            {nowPage === 5 ? (<li style={{ backgroundColor: " #C20C0C" }}>5</li>) : (<li>5</li>)}
                                            {nowPage === 6 ? (<li style={{ backgroundColor: " #C20C0C" }}>6</li>) : (<li>6</li>)}
                                            {nowPage === 7 ? (<li style={{ backgroundColor: " #C20C0C" }}>7</li>) : (<li>7</li>)}
                                            {nowPage === 8 ? (<li style={{ backgroundColor: " #C20C0C" }}>8</li>) : (<li>8</li>)}
                                            <li style={{ backgroundColor: "white" }}>...</li>
                                            {pages===100?<li style={{width:"90px"}}>{pages}</li>:<li>{pages}</li>}
                                            <li style={{ width: "60px" }} onClick={this.changePage("increment")}>下一页</li>
                                        </ul>
                                    )
                            ) : (
                                <ul id="offsetUl" onClick={this.changePage2}>
                                    {nowPage === 1 ? (<li style={{ backgroundColor: " #C20C0C" }}>1</li>) : (<li>1</li>)}
                                    {pages >= 2 ? (nowPage === 1 ? (<li style={{ backgroundColor: " #C20C0C" }}>2</li>) : (<li>2</li>)) : ("")}
                                    {pages >= 3 ? (nowPage === 3 ? (<li style={{ backgroundColor: " #C20C0C" }}>3</li>) : (<li>3</li>)) : ("")}
                                    {pages >= 4 ? (nowPage === 4 ? (<li style={{ backgroundColor: " #C20C0C" }}>4</li>) : (<li>4</li>)) : ("")}
                                    {pages >= 5 ? (nowPage === 5 ? (<li style={{ backgroundColor: " #C20C0C" }}>5</li>) : (<li>5</li>)) : ("")}
                                    {pages >= 6 ? (nowPage === 6 ? (<li style={{ backgroundColor: " #C20C0C" }}>6</li>) : (<li>6</li>)) : ("")}
                                    {pages >= 7 ? (nowPage === 7 ? (<li style={{ backgroundColor: " #C20C0C" }}>7</li>) : (<li>7</li>)) : ("")}
                                    {pages >= 8 ? (nowPage === 8 ? (<li style={{ backgroundColor: " #C20C0C" }}>8</li>) : (<li>8</li>)) : ("")}
                                    {pages >= 9 ? (nowPage === 9 ? (<li style={{ backgroundColor: " #C20C0C" }}>9</li>) : (<li>9</li>)) : ("")}
                                    {pages >= 10 ? (nowPage === 10 ? (<li style={{ backgroundColor: " #C20C0C" }}>10</li>) : (<li>10</li>)) : ("")}
                                </ul>
                            )
                        }

                    </div>
                </div>
            </>
        )
    }
}
export default connect(
    state =>
    ({
        music: state.player
    }),
    { playlistImfor }
)(Search)
