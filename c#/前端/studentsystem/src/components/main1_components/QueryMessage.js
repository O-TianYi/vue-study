import React,{Component} from 'react'


//cookie的操作
import {getCookie,exit} from '../../api/token/cooike.js'


//引入antd
import { Table } from 'antd';



export default class QueryMessage extends Component{
    state = {
      columns :[
          {
            title: '用户名称',
            dataIndex: 'username',
            key: 'username'
          },
          {
            title: '专业名称',
            dataIndex: 'majorname',
            key: 'majorname',
          },
          {
            title: '班级名称',
            dataIndex: 'classname',
            key: 'classname',
          },
          {
            title: '年级名称',
            dataIndex: 'gradename',
            key: 'gradename',
          },
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="##">更新</a>
              </span>
            ),
          },
        ],

         data :[
          {
            key: '1',
            username: JSON.parse(localStorage.getItem('data')).Data.UserName,
            majorname:JSON.parse(localStorage.getItem('data')).Data.MajorName,
            classname:JSON.parse(localStorage.getItem('data')).Data.ClassName,
            gradename:JSON.parse(localStorage.getItem('data')).Data.GradeName
          }
        ],


    };

    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
      }
    }

    render(){
        const {columns,data}=this.state;
        return(
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            )
    }
}

