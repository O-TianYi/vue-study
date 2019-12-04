import React,{Component} from 'react'

//cookie的操作
import {getCookie} from '../../api/token/cooike.js'

//redux部分
import {connect} from 'react-redux'
import {queryAllClasses} from '../../redux/action.js'


//antdUi引入的部分
import { Table,message } from 'antd';


class QueryAllClasses extends Component{
    state={
      columns: [
        {
          title: '班级名称',
          dataIndex: 'classname',
          key: 'classname'
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
      this.AjaxQueryAllClasses();
    }


    AjaxQueryAllClasses=()=>{
    this.props.queryAllClasses()
  }


    render(){
        const {columns}=this.state;
        const {data}=this.props;
        return(
            <div>
              <Table columns={columns} dataSource={data} />
            </div>
            )
    }
}


export default connect(
  state=>({data: state.queryallclassesdata}),
  {queryAllClasses}
)(QueryAllClasses)