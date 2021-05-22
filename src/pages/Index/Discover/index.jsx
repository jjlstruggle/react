import React, { Component } from 'react'
import './index.css'
import {Route,Switch,Redirect} from 'react-router-dom'
import MyLink from '../../../components/MyLink'
import Character from './Character'
import Square from './Square'

export default class Discover extends Component {
	render() {
		return (
			<div id="discover-box">
				<div id="discover-top">
					<MyLink to="/index/discover/character" activeClassName="discover-active">
						<li className="curson" style={{marginLeft:"25px"}}>个性推荐</li>
					</MyLink>
					<MyLink to="/index/discover/square" activeClassName="discover-active">
						<li className="curson">歌单</li>
					</MyLink>
					<MyLink to="/b" activeClassName="discover-active">
						<li className="curson">主播电台</li>
					</MyLink>
					<MyLink to="/c" activeClassName="discover-active">
						<li className="curson">排行榜</li>
					</MyLink>
					<MyLink to="/d" activeClassName="discover-active">
						<li className="curson">歌手</li>
					</MyLink>
					<MyLink to="/e" activeClassName="discover-active">
						<li className="curson">最新音乐</li>
					</MyLink>
				</div>
				<div id="discover-bottom">
				<Switch>
                    <Route path="/index/discover/character" component={Character} />
					<Route path="/index/discover/square" component={Square}/>
					<Redirect to="/index/discover/character"/>
                </Switch>
				</div>
			</div>
		)
	}
}
