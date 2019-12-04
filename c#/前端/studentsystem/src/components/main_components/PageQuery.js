import React,{Component} from 'react'

//cookie的操作
import {getCookie,exit} from '../../api/token/cooike.js'

//redux部分
import {connect} from 'react-redux'
import {pageQuery} from '../../redux/action.js'


//antdUi引入的部分
import { Table,message} from 'antd';


class PageQuery extends Component{
    state={
      columns: [
        {
          title: '用户ID',
          dataIndex: 'userid',
          key: 'userid'
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
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
          title: '角色名称',
          dataIndex: 'rolename',
          key: 'rolename',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <a>Delete</a>
            </span>
          ),
        },
      ]
    }


    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
        return;
      }
      this.AjaxQuery();
    }


    AjaxQuery=()=>{
    this.props.pageQuery({index:1,number: 2})
  }


    render(){
        const {columns} =this.state;
        const {data}=this.props;
        return(
            <div>
              <Table columns={columns} dataSource={data} />
            </div>
            )
    }
}


export default connect(
  state=>({data: state.pagequery}),
  {pageQuery}
)(PageQuery)