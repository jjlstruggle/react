import React, { Component } from 'react'
import './App.css'
import Index from './pages/Index'
import Music from './pages/Music'
import {Route,Switch,Redirect} from 'react-router-dom'
import Player from './containers/Player'

export default class App extends Component {

  render() {
    return (
      <div>
        {/* 页面分为两面，第一页是索引页面，第二页是歌曲详情页 */}
          <Switch>
           <Route path="/index/discover/square" component={Index}/>
            <Route path="/index/discover/character" component={Index}/>
            <Route path="/index/playlist" component={Index}/>
            <Route path="/index/search" component={Index}/>
            <Route path="/music" component={Music}/>
            <Redirect to="/index/discover/character"/>
          </Switch>
          <Player/>
      </div>
    )
  }
}
