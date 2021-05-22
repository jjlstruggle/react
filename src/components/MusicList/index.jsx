import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
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
                        <div style={{ width: "200px", color: "rgb(155, 155, 155)" }}>总0首</div>
                        <div style={{ width: "150px" }}>收藏全部</div>
                        <div style={{ width: "40px" }}>清空</div>
                    </div>
                    <div id="list-body">
                        
                    </div>
                </div>
            </div>
        )
    }
}
