import React,{Component} from 'react'

////cookie的操作
import {getCookie,exit} from '../../api/token/cooike.js'

//引入antd
import { Table } from 'antd';



export default class QuerySubject extends Component{
    state = {
      columns :[
          {
            title: '专业学科名称',
            dataIndex: 'subjectname',
            key: 'subjectname'
          }
        ],
      data :[],


    };

    componentDidMount=()=>{
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
        return;
      }
      let data=[];
      let tempdata=JSON.parse(localStorage.getItem('data')).Data.Subjects;
      console.log(JSON.parse(localStorage.getItem('data')).Data.Subjects)
      tempdata.map((value,index)=>{
        let tempObj={key: index,subjectname: value}
        data.push(tempObj)
        return data;
      })
      this.setState({data});
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

