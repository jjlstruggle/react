import React, { Component } from 'react'
import './index.css'
import disc from '../../../src/assets/disc.png'
import playBar from '../../../src/assets/play-bar.png'
import { connect } from 'react-redux'
import axios from '../../share/share'
import { nanoid } from 'nanoid'

class Music extends Component {

    state = {
        musicLyric: [],
        nowTimeArr: []
    }

    componentDidMount = () => {
        axios.get(`/lyric?id=${this.props.music.musicId}`)
            .then(response => {
                let lyric, musicLyric = [], time_arr = [], nowTimeArr = [];
                if (response.data.lrc == undefined) {
                    lyric = ""
                } else {
                    lyric = response.data.lrc.lyric
                }
                if (lyric != "" && lyric != undefined) {
                    for (let i of lyric.split("\n")) {
                        let n = i.search(/]/)
                        if (i.substring(n + 1) == "") musicLyric.push("···")
                        else musicLyric.push(i.substring(n + 1))
                        let time = i.substring(1, n);
                        time_arr.push(time);
                    }
                    for (let a of time_arr) {
                        let Time = parseInt(a.substring(0, 2) * 60) + parseInt(a.substring(3, 5)) + parseFloat(a.substring(5, 9));
                        nowTimeArr.push(Time);
                    }
                    this.setState({
                        musicLyric,
                        nowTimeArr
                    })
                }
            })
    }

    componentDidUpdate = () => {
        const { nowTimeArr } = this.state
        let { audio } = this.props.audio.node
        let lines = 0;
        let lyricUl = document.querySelector('#lyrics-box>ul')
        let li_arr = document.querySelectorAll("#lyrics-box>ul>li")
        let style = () => {
            if (lines > 0) {
                li_arr[lines - 1].className = "originLyric"
            }
            li_arr[lines].className = "cLyric"
        }
        let scrolling = () => {
            lyricUl.scrollTop = 36 * (lines - 4);
        }
        audio.addEventListener('timeupdate', () => {
            let curTime = audio.currentTime;
            if (curTime >= nowTimeArr[lines]) {
                style()
                if (lines > 3) {
                    scrolling();
                }
                lines++
            }
        })
        audio.addEventListener('ended', () => {
            lyricUl.scrollTop = 0;
        })
    }

    render() {
        return (
            <div id="music-box" >
                <div id="music-left">
                    <div id="play-bar">
                        <img src={playBar} id="play-bar-img"/>
                    </div>
                    <div id="disc">
                        <div>
                            <img src={disc} />
                        </div>
                        <img src={this.props.music.coverImg} id="coverImg" />
                    </div>
                </div>
                <div id="music-center">
                    <div id="musicTitle">{this.props.music.name}</div>
                    <div id="singer">{this.props.music.author}-{this.props.music.album}</div>
                    <div id="lyrics-box">
                        <ul>
                            <div style={{ display: this.state.musicLyric.length === 0 ? "block" : "none" }}>纯音乐,请您欣赏</div>
                            {
                                this.state.musicLyric.map(item => {
                                    return <li key={nanoid()} className="originLyric">{item}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state =>
    ({
        music: state.playlist,
        audio: state.player
    }),
)(Music)