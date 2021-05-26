import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import './index.css'
import {connect} from 'react-redux';



class MusicList extends Component {

    send = index => {
        return () => {
            const { musicList } = this.props
            this.props.playlistImfor("music", musicList[index])
            let { audio } = this.props.music.node
            audio.src = musicList[index].url
            audio.play()
        }
    }

    render() {
        return (
            <div id="right-music-list">
                <div id="list-change">
                    <div>
                        <button>播放列表</button>
                        <button>历史记录</button>
                    </div>
                </div>
                <div id="list-content">
                    <div id="list-top">
                        <div style={{ width: "200px", color: "rgb(155, 155, 155)" }}>总{
                            this.props.musicList.length
                        }首</div>
                        <div style={{ width: "150px" }}>收藏全部</div>
                        <div style={{ width: "40px" }}>清空</div>
                    </div>
                    <div id="list-body">
                        {this.props.musicList.length === 0 ? (""):(
                            this.props.musicList.map((item,index)=>{
                                return (
                                    <div key={nanoid()} className="box-row" onDoubleClick={this.send(index)}>
                                        <div className="col-1">
                                        <i className="fa fa-music" aria-hidden="true"></i>  {item.name}</div>
                                        <div className="col-2">{item.author}</div>
                                        <div className="col-3">{item.timer}</div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state =>
    ({
        page:state.player
    }),
    {  }
)(MusicList)
