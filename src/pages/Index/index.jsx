import React, { Component } from 'react'
import Header from '../../containers/Header'
import Body from '../../containers/Body'
import axios from '../../share/share'

export default class Index extends Component {

    state = {
        loginPage: false,
        loginState: false,
        userData: {
            avatar: "",
            uid: "",
            vip: 0,
            name: ""
        },
        shouldRender: true
    }

    loginPageState = (bool) => {
        this.setState({ loginPage: bool })
    }

    getUserData = (data) => {
        this.setState(
            {
                userData: data,
                loginState: true,
                loginPage: false
            }
        )
    }

    onRef = (ref) => {
        this.child = ref
    }

    componentDidMount = () =>{
        axios.get('/login/status')
        .then(res=>{
            if(!res.data.data.account || !res.data.data.profile){
                console.log("当前需登录")
            }else{
                this.child.loginData(res.data.data)
            }
        })
    }

    componentDidUpdate = () => {
        if (this.state.userData.uid !== "" && this.state.shouldRender) {
            this.child.getLoginData(this.state.userData.uid,this.state.userData.name)
            this.setState({shouldRender:false})
        }
    }

    render() {
        return (
            <div>
                <Header loginPageState={this.loginPageState} login={this.state} />
                <Body loginPageState={this.loginPageState} getUserData={this.getUserData} login={this.state} onRef={this.onRef} />
            </div>
        )
    }
}
