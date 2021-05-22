import React, { Component } from 'react'
import "./index.css"
import MyLink from '../../components/MyLink'
import { connect } from 'react-redux'
import { playerState } from '../../redux/actions/player.js'


class Player extends Component {

    state = {
        path: "/index"
    }

    getAudioState = () => {
        if (this.audio.src === "" || this.audio.src === undefined) return false
        this.audio.paused === true ? this.audio.play() : this.audio.pause()
        this.setState({})
    }

    changePage = () => {
        this.state.path === "/index" ? this.setState({ path: `/music` }) : this.setState({ path: "/index" })
    }

    componentDidMount = () => {
        this.props.playerState("audio", {
            audio: this.audio,
        })
        let audio = this.audio
        let now_process = document.querySelector("#now-process")
        let process = document.querySelector("#process")
        let voice_process = document.querySelector("#voice-process")
        let now_voice_process = document.querySelector("#now-voice-process")
        let spannode2 = document.querySelector("#now-voice-process>span")
        let onOff_i = document.querySelector("#on-off>div>i")
        let now_time = document.querySelector("#now-time")
        let body = document.querySelector("body")
        let spannode = document.querySelector("#now-process>span")
        audio.addEventListener('timeupdate', () => {
            let Mtime = parseInt(audio.currentTime / 60);
            let Stime = parseInt(audio.currentTime) - parseInt(audio.currentTime / 60) * 60;
            if (Stime < 10) {
                Stime = "0" + Stime;
            }
            if (Mtime < 10) {
                Mtime = "0" + Mtime;
            }
            now_time.innerText = (Mtime + ":" + Stime);
            now_process.style.width = 100 * audio.currentTime / audio.duration + "%";
        })
        audio.addEventListener('ended', () => {
            now_process.style.width = 0;
            onOff_i.className = "fa fa-play";
            now_time.innerText = "00:00"
            audio.pause();
        })
        function move(ev) {
            let x = ev.clientX
            let ox = process.offsetLeft + body.clientWidth/100 * 4.4
            if (x < ox) {
                audio.currentTime = 0;
            } else if ((x - ox) < process.clientWidth) {
                let width = process.clientWidth;
                audio.currentTime = (x-ox) / width * audio.duration;
                now_process.style.width = 100 * audio.currentTime / audio.duration + "%";
            } else if ((x - ox) > process.clientWidth) {
                audio.currentTime = audio.duration - 5;
            }
        }
        function yinliang(ev) {
            let x = ev.clientX
            let ox = voice_process.offsetLeft + body.clientWidth/100 * 31.1
            if (x < ox) {
                audio.volume = 0
                now_voice_process.style.width = 0
            } else if ((x - ox) < voice_process.clientWidth) {
                let width = voice_process.clientWidth;
                audio.volume = (x-ox) / width
                now_voice_process.style.width = (x-ox)/width*100 + "%"
            } else if ((x - ox) > voice_process.clientWidth) {
                audio.volume = 1
                now_voice_process.style.width = "100%"
            }
            
        }
        process.onmousedown = (ev) => {
            if (audio.src == "") {
                return false
            } else {
                if(ev.target===spannode) return false
                let x = ev.offsetX/process.clientWidth
                audio.currentTime = x * audio.duration
            }
            document.addEventListener('mousemove', move)
        }
        voice_process.onmousedown = (ev) => {
            if(ev.target === spannode2) return false
            let x = ev.offsetX/voice_process.clientWidth
            now_voice_process.style.width = x/voice_process.clientWidth*100  + "%"
            audio.volume = x 
            document.addEventListener('mousemove', yinliang)
        }
        document.onmouseup = () => {
            document.removeEventListener('mousemove', yinliang);
            document.removeEventListener('mousemove', move);
        }
    }

    render() {
        return (
            <div id="player-box">
                <audio ref={c => this.audio = c}>
                    当前浏览器不支持audio
		        </audio>
                {
                    this.props.music.coverImg === "" || this.props.music.coverImg === undefined ? (
                        <a id="changePage">
                            <img id="music-img" src={this.props.music.coverImg} alt="" style={{
                                opacity: this.props.music.coverImg === "" || this.props.music.coverImg === undefined ? 0 : 1
                            }} />
                        </a>
                    ) : (
                        <MyLink to={
                            this.state.path === "/index" ? (`/music?id=${this.props.music.musicId}`) : ("/index")
                        } onClick={this.changePage} id="changePage">
                            <img id="music-img" src={this.props.music.coverImg} alt="" />
                        </MyLink>
                    )
                }
                <div id="music-name">
                    <span className="curson">{this.props.music.name}</span>
                </div>
                <div id="singer-name">
                    <span className="curson">{this.props.music.author}</span>
                </div>
                <div id="play-style">
                    <i className="fa fa-random curson" id="suiji"></i>
                    {/* <i className="fa fa-exchange"></i>顺序
			<i className="fa fa-repeat"></i>列表循环
			<i className="fa fa-refresh"></i>单曲循环 */}
                </div>
                <div id="last-music">
                    <i className="fa fa-step-backward curson"></i>
                </div>
                <div id="on-off" className="curson" onClick={this.getAudioState}>
                    <div>
                        {
                            this.audio != undefined ?
                                (this.audio.paused === true ? (<i className="fa fa-play"></i>) : (<i className="fa fa-play/fa fa-pause"></i>))
                                : (<i className="fa fa-play"></i>)
                        }

                    </div>
                </div>
                <div id="next-music">
                    <i className="fa fa-step-forward curson"></i>
                </div>
                <div id="desklyrics" className="curson">词</div>
                <div id="now-time">00:00</div>
                <div id="process">
                    <span id="now-process">
                        <span></span>
                    </span>
                </div>
                <div id="time">
                    {
                        this.props.music.timer === "" || this.props.music.timer === undefined ? ("00:00") : (this.props.music.timer)
                    }
                </div>
                <div id="voice" className="curson">
                    <i className="fa fa-volume-off"></i>
                </div>
                <div id="voice-process">
                    <span id="now-voice-process">
                        <span></span>
                    </span>
                </div>
                <div id="music-list" className="curson">
                    <i className="fa fa-indent"></i>
                </div>
            </div>
        )
    }
}

export default connect(
    state =>
    ({
        music: state.playlist,
    }),
    { playerState }
)(Player)