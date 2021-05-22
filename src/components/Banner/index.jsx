import './index.css'
import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import axios from '../../share/share'

export default class Banner extends Component {

    state = {
		bannerImg: [],
	}

    componentDidMount = () => {
		/* 轮播图的实现 */
		axios.get("/banner")
			.then(response => {
				let bannerImg = response.data.banners.map(data => {
					return data.imageUrl
				})
				this.setState({
					bannerImg
				})
			})
	}


    componentDidUpdate = () => {
		let cImg = 1
		let img_arr = document.querySelectorAll("#bannar img")
		let li_arr = document.querySelectorAll("#bannar li")
		if (img_arr.length === 0) return 0
		let last = document.querySelector("#last-img")
		let next = document.querySelector("#next-img")
		img_arr[2].style.display = "inline-block"
		img_arr[img_arr.length - 1].className = "lImg"
		img_arr[0].className = "cImg"
		img_arr[1].className = "rImg"
		function banner() {
			for (let i of img_arr) {
				i.style.display = "none"
				i.className = "origin"
			}
			for(let j of li_arr){
				j.className = "originLi"
			}
			if (cImg == 0) {
				img_arr[cImg + 2].style.display = "inline-block"
				img_arr[img_arr.length - 1].className = "lImg"
				img_arr[cImg].className = "cImg"
				li_arr[cImg].className = "cLi"
				img_arr[cImg + 1].className = "rImg"
				cImg++
			} else if (cImg == img_arr.length - 1) {
				img_arr[1].style.display = "inline-block"
				img_arr[cImg - 1].className = "lImg"
				img_arr[cImg].className = "cImg"
				li_arr[cImg].className = "cLi"
				img_arr[0].className = "rImg"
				cImg = 0
			} else {
				if (cImg == img_arr.length - 2) {
					img_arr[0].style.display = "inline-block"
				} else {
					img_arr[cImg + 2].style.display = "inline-block"
				}
				img_arr[cImg - 1].className = "lImg"
				img_arr[cImg].className = "cImg"
				li_arr[cImg].className = "cLi"
				img_arr[cImg + 1].className = "rImg"
				cImg++
			}
		}
		let timer = setInterval(banner, 4500)
		last.onclick = () => {
			if (cImg == 1) {
				cImg = img_arr.length - 1;
			} else if (cImg == 0) {
				cImg = img_arr.length - 2;
			} else {
				cImg -= 2;
			}
			clearInterval(timer);
			banner();
			timer = setInterval(banner, 4500);
		}
		next.onclick = () => {
			if (cImg == img_arr.length - 1) {
				cImg = 0;
			}
			clearInterval(timer);
			banner();
			timer = setInterval(banner, 4500);
		}
		for(let i = 0;i<li_arr.length;i++){
			li_arr[i].addEventListener("mouseover",()=>{
				cImg = i;
				clearInterval(timer);
				banner();
				timer = setInterval(banner, 4500);
			})
		}
	}

    render() {
        const { bannerImg } = this.state
        return (
            <div id="bannar">
					<div id="last-img">
						<i className="fa fa-angle-left"></i>
					</div>
					<div id="next-img">
						<i className="fa fa-angle-right"></i>
					</div>
					{
						bannerImg.length === 0 ? ("") : (
							bannerImg.map((img) => {
								return <img src={img} alt="" key={nanoid()} className="origin" />
							})
						)
					}
					<ul>
						{
							bannerImg.length === 0 ? ("") : (
								bannerImg.map((img,index) => {
									if(index===0) return <li key={nanoid()} className="cLi"></li>
									return <li key={nanoid()} className="originLi"></li>
								})
								)
						}
					</ul>
				</div>
        )
    }
}
