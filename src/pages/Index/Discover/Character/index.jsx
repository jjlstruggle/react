import React, { Component } from 'react'
import './index.css'
import { nanoid } from 'nanoid'
import axios from '../../../../share/share'
import Banner from '../../../../components/Banner';
import MyLink from '../../../../components/MyLink'

export default class Character extends Component {

	state = {
		recommend: [
			{
				id: "",
				url: "",
				name: "",
				playCount: ""
			}
		],
		exclusiveDelivery:[
			{
				name:"",
				url:""
			}
		]
	}

	componentDidMount = () => {
		/* 推荐歌单的实现(未登录) */
		axios.get("/personalized?limit=10")
			.then(response => {
				let recommend = response.data.result.map(data => {
					return {
						id: data.id,
						url: data.picUrl,
						name: data.name,
						playCount: data.playCount
					}
				})
				this.setState({
					recommend
				})
			})
		axios.get("/personalized/privatecontent")
		.then(response => {
			let exclusiveDelivery = response.data.result.map(data =>{
				return {
					url:data.picUrl,
					name:data.name
				}
			})
			this.setState({
				exclusiveDelivery
			})
		})
	}

	render() {
		const { recommend, exclusiveDelivery } = this.state
		return (
			<div id="center-r-foot">
				<Banner/>
				<div id="recommend">
					<h1><MyLink to="/index/discover/square">推荐歌单 <i className="fa fa-angle-right"></i></MyLink>
					</h1>
					<div id="divBox">
						{
							recommend.length === 0 ? ("") : (
								recommend.map(data => {
									return (
										<div key={nanoid()}>
											<MyLink to={`/index/playlist?id=${data.id}`}>
												<img src={data.url} alt="" />
												<span>{data.name}</span>
											</MyLink>
										</div>
									)
								})
							)
						}
					<h2 style={{clear:"both"}}></h2>
					</div>
					<div style={{ clear: "both" }}></div>
					<h1><a>独家放送 <i className="fa fa-angle-right"></i></a></h1>
					<div id="divBox2">
						{
							exclusiveDelivery.length === 0 ? ("") : (
								exclusiveDelivery.map(data=>{
									return (
										<div key={nanoid()}>
											<img src={data.url} alt="" />
											<span>{data.name}</span>
										</div>
									)
								})
							)
						}
					<h2 style={{clear:"both"}}></h2>
					</div>
				</div>
			</div>
		)
	}
}
