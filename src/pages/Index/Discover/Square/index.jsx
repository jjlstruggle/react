import React, { Component } from 'react'
import './index.css'
import axios from '../../../../share/share'
import { nanoid } from 'nanoid'
import MyLink from '../../../../components/MyLink'

export default class Square extends Component {

    state = {
        offset: 0,
        cat: "全部",
        playlistImforArr: [{
            id: "",
            name: "",
        }],
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        isFold: true,
        page: "",
        nowPage: 1
    }

    changeFold = (event) => {
        event.stopPropagation()
        const { isFold } = this.state
        this.setState({
            isFold: !isFold
        })
    }

    renderSquare = () => {
        const { offset, cat } = this.state
        axios.get(`/top/playlist?limit=35&offset=${offset}&cat=${cat}`)
            .then(response => {
                let page;
                if (response.data.total / 35 == 0) parseInt(page = response.data.total / 35)
                else page = parseInt(page = response.data.total / 35) + 1
                let playlistImforArr = response.data.playlists.map(data => {
                    return {
                        id: data.id,
                        name: data.name,
                        url: data.coverImgUrl
                    }
                })
                this.setState({
                    playlistImforArr,
                    page,
                    isFold: true
                })
            })
        axios.get("/playlist/catlist")
            .then(response => {
                let arr1 = []
                let arr2 = []
                let arr3 = []
                let arr4 = []
                let arr5 = []
                for (let item of response.data.sub) {
                    switch (item.category) {
                        case 0:
                            arr1.push(item.name)
                            break
                        case 1:
                            arr2.push(item.name)
                            break
                        case 2:
                            arr3.push(item.name)
                            break
                        case 3:
                            arr4.push(item.name)
                            break
                        case 4:
                            arr5.push(item.name)
                            break
                        default:
                            break
                    }
                }
                this.setState({
                    0: arr1,
                    1: arr2,
                    2: arr3,
                    3: arr4,
                    4: arr5
                })
            })
    }

    componentDidMount = () => {
        this.renderSquare()
        document.onclick = () => {
            const { isFold } = this.state
            if (!isFold) {
                this.setState({
                    isFold: true
                })
            }
        }
    }

    defaultPropagation = (event) => {
        event.stopPropagation()
    }

    getType = (event) => {
        let cat = event.target.innerText
        this.setState({
            cat
        })
        setTimeout(this.renderSquare, 500)
    }

    changePage = (method) => {
        return () => {
            const { offset, nowPage } = this.state
            if (method === "increment") {
                this.setState({
                    offset: offset + 35,
                    nowPage: nowPage + 1
                })
            } else if (method === "decrement") {
                this.setState({
                    offset: offset - 35,
                    nowPage: nowPage - 1
                })
            }
            setTimeout(this.renderSquare, 500)
        }
    }

    changePage2 = (event) => {
        if(event.target.innerText == "下一页 " || event.target.innerText == " 上一页" || event.target.innerText === "...") return 0
        let nowPage = event.target.innerText * 1
        let offset = (nowPage - 1) * 35
        this.setState({
            offset,
            nowPage
        })
        setTimeout(this.renderSquare, 500)
    }

    render() {
        const { cat, nowPage, page } = this.state
        return (
            <div id="max_box">
                <div id="top">
                    <span id="ch_result">{cat}</span>
                    <button id="choose" onClick={this.changeFold}>选择分类 ↓</button>
                    <div>热门</div>
                    <hr />
                </div>
                <div id="center">
                    <div id="catlist_box" style={{ display: this.state.isFold ? ("none") : ("block") }}>
                        <div id="top_cat" onClick={this.defaultPropagation}>
                            <button style={{ height: "25px", width: "80px", border: "1px solid #CCCCCC", marginLeft: "35px", marginTop: "20px" }} onClick={
                                () => {
                                    this.setState({ cat: "全部" })
                                    setTimeout(this.renderSquare, 500)
                                }
                            }>全部风格</button>
                        </div>
                        <div id="lf_cat">
                            <div style={{ height: "48px" }} className="default" onClick={this.defaultPropagation}>语种</div>
                            <div className="default" onClick={this.defaultPropagation}>风格</div>
                            <div className="default" onClick={this.defaultPropagation}>场景</div>
                            <div className="default" onClick={this.defaultPropagation}>情感</div>
                            <div className="default" onClick={this.defaultPropagation}>主题</div>
                        </div>
                        <div id="rt_cat">
                            <div style={{ height: "48px" }} onClick={this.defaultPropagation}>

                                {
                                    this.state[0].map(item => {
                                        return (
                                            <li key={nanoid()} className="default" onClick={this.getType}>{item}</li>
                                        )
                                    })
                                }

                            </div>
                            <div onClick={this.defaultPropagation}>
                                {
                                    this.state[1].map(item => {
                                        return (
                                            <li key={nanoid()} className="default" onClick={this.getType}>{item}</li>
                                        )
                                    })
                                }
                            </div>
                            <div onClick={this.defaultPropagation}>
                                {
                                    this.state[2].map(item => {
                                        return (
                                            <li key={nanoid()} className="default" onClick={this.getType}>{item}</li>
                                        )
                                    })
                                }
                            </div>
                            <div onClick={this.defaultPropagation}>
                                {
                                    this.state[3].map(item => {
                                        return (
                                            <li key={nanoid()} className="default" onClick={this.getType}>{item}</li>
                                        )
                                    })
                                }
                            </div>
                            <div onClick={this.defaultPropagation}>
                                {
                                    this.state[4].map(item => {
                                        return (
                                            <li key={nanoid()} className="default" onClick={this.getType}>{item}</li>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div id="playlist-box">
                        {
                            this.state.playlistImforArr.map(item => {
                                return (
                                    <div className="box" key={nanoid()}>
                                        <MyLink to={`/index/playlist?id=${item.id}`}>
                                            <img src={item.url} alt="" />
                                            <div>{item.name}</div>
                                        </MyLink>
                                    </div>
                                )
                            })
                        }
                        <h1 style={{ clear: "both" }}></h1>
                    </div>
                </div>
                <div id="foot">
                    {
                        nowPage > 5 ?
                            nowPage < page - 4 ?
                                (
                                    <ul style={{ textAlign: "center", height: "27px" }} onClick={this.changePage2}>
                                        <li style={{ width: "60px" }} onClick={this.changePage("decrement")}>
                                            <i className="fa fa-caret-left" style={{fontSize:"20px"}}></i> 上一页</li>
                                        <li>1</li>
                                        <li style={{ backgroundColor: "white" }}>...</li>
                                        <li>{nowPage - 3}</li>
                                        <li>{nowPage - 2}</li>
                                        <li>{nowPage - 1}</li>
                                        <li style={{ backgroundColor: " #C20C0C" }}>{nowPage}</li>
                                        <li>{nowPage + 1}</li>
                                        <li>{nowPage + 2}</li>
                                        <li style={{ backgroundColor: "white" }}>...</li>
                                        <li>{this.state.page}</li>
                                        <li style={{ width: "60px" }} onClick={this.changePage("increment")}>
                                            下一页 <i className="fa fa-caret-right" style={{fontSize:"20px"}}></i></li>
                                    </ul>
                                )
                                :
                                (
                                    <ul style={{ textAlign: "center", height: "27px" }} onClick={this.changePage2}>
                                        <li style={{ width: "60px" }} onClick={this.changePage("decrement")}>
                                            <i className="fa fa-caret-left" style={{fontSize:"20px"}}></i> 上一页</li>
                                        <li>1</li>
                                        <li style={{ backgroundColor: "white" }}>...</li>
                                        {nowPage === page - 8 ? (<li style={{ backgroundColor: " #C20C0C" }}>{page - 8}</li>) : (<li>{page - 8}</li>)}
                                        {nowPage === page - 7 ? (<li style={{ backgroundColor: " #C20C0C" }}>{page - 7}</li>) : (<li>{page - 7}</li>)}
                                        {nowPage === page - 6 ? (<li style={{ backgroundColor: " #C20C0C" }}>{page - 6}</li>) : (<li>{page - 6}</li>)}
                                        {nowPage === page - 5 ? (<li style={{ backgroundColor: " #C20C0C" }}>{page - 5}</li>) : (<li>{page - 5}</li>)}
                                        {nowPage === page - 4 ? (<li style={{ backgroundColor: " #C20C0C" }}>{page - 4}</li>) : (<li>{page - 4}</li>)}
                                        {nowPage === page - 3 ? (<li style={{ backgroundColor: " #C20C0C" }}>{page - 3}</li>) : (<li>{page - 3}</li>)}
                                        {nowPage === page - 2 ? (<li style={{ backgroundColor: " #C20C0C" }}>{page - 2}</li>) : (<li>{page - 2}</li>)}
                                        {nowPage === page - 1 ? (<li style={{ backgroundColor: " #C20C0C" }}>{page - 1}</li>) : (<li>{page - 1}</li>)}
                                        {nowPage === page ? (<li style={{ backgroundColor: " #C20C0C" }}>{page}</li>) : (<li>{page}</li>)}
                                        <li style={{ width: "60px" }} onClick={this.changePage("increment")}>
                                            下一页 <i className="fa fa-caret-right" style={{fontSize:"20px"}}></i></li>
                                    </ul>
                                )
                            :
                            (
                                <ul style={{ textAlign: "center", height: "27px" }} onClick={this.changePage2}>
                                    <li style={{ width: "60px" }} onClick={this.changePage("decrement")}>
                                        <i className="fa fa-caret-left" style={{fontSize:"20px"}}></i> 上一页</li>
                                    {nowPage === 1 ? (<li style={{ backgroundColor: " #C20C0C" }}>1</li>) : (<li>1</li>)}
                                    {nowPage === 2 ? (<li style={{ backgroundColor: " #C20C0C" }}>2</li>) : (<li>2</li>)}
                                    {nowPage === 3 ? (<li style={{ backgroundColor: " #C20C0C" }}>3</li>) : (<li>3</li>)}
                                    {nowPage === 4 ? (<li style={{ backgroundColor: " #C20C0C" }}>4</li>) : (<li>4</li>)}
                                    {nowPage === 5 ? (<li style={{ backgroundColor: " #C20C0C" }}>5</li>) : (<li>5</li>)}
                                    {nowPage === 6 ? (<li style={{ backgroundColor: " #C20C0C" }}>6</li>) : (<li>6</li>)}
                                    {nowPage === 7 ? (<li style={{ backgroundColor: " #C20C0C" }}>7</li>) : (<li>7</li>)}
                                    {nowPage === 8 ? (<li style={{ backgroundColor: " #C20C0C" }}>8</li>) : (<li>8</li>)}
                                    <li style={{ backgroundColor: "white" }}>...</li>
                                    <li>{page}</li>
                                    <li style={{ width: "60px" }} onClick={this.changePage("increment")}>
                                        下一页 <i className="fa fa-caret-right" style={{fontSize:"20px"}}></i></li>
                                </ul>
                            )
                    }
                </div>
            </div>
        )
    }
}
