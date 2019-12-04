import React,{Component} from 'react'

//cookie的操作
import {getCookie} from '../../api/token/cooike.js'

//redux部分
import {connect} from 'react-redux'
import {queryAllSubjects} from '../../redux/action.js'


//antdUi引入的部分
import { Table,message } from 'antd';


class QueryAllSubjects extends Component{
    state={
      columns: [
        {
          title: '学科名称',
          dataIndex: 'subjectname',
          key: 'subjectname'
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
      ],
      data :[]//key,data
    }


    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      //console.log("子路由接受到的数据",this.props.location)
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
        return;
      }
      this.AjaxQueryAllSubjects();
    }


    AjaxQueryAllSubjects=()=>{
    this.props.queryAllSubjects()
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
  state=>({data: state.queryallsubjectsdata}),
  {queryAllSubjects}
)(QueryAllSubjects)