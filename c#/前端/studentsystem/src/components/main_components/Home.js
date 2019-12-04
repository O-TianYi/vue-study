import React,{Component} from 'react'

//cookie的操作
import {getCookie,exit} from '../../api/token/cooike.js'


export default class Home extends Component{
    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      console.log("保存在本地存储上的内容是：",this.props.location)
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
      }
    }

    render(){
        return(
            <div style={{algin:'center'}}>
            <h1>欢迎进入管理员的界面</h1>
            </div>
            )
    }
}