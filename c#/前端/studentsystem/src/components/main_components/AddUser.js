import React,{Component} from 'react'

//cookie的操作
import {getCookie,exit} from '../../api/token/cooike.js'

export default class AddUser extends Component{
    state={
      data :[],
      columns :[
                {
                  title: 'ID',
                  dataIndex: 'key',
                },
                {
                  title: '姓名',
                  dataIndex: 'name',
                },
                {
                  title: '操作',
                  dataIndex: 'option',
                  render: (text, record, index) =>{
                    return <a href="###">Delete</a>
                  }
                }
              ],
    }
    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
      }
    }

    render(){
        return(
            <div>
            <h1>添加用户页面</h1>
            </div>
            )
    }
}