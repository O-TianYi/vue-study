import React,{Component} from 'react'

//cookie的操作
import {getCookie} from '../../api/token/cooike.js'

//ajax
import {reqAddOneElectiveSubject} from '../../api/index.js'

//redux部分
import {connect} from 'react-redux'
import {queryAllElectiveSubjects} from '../../redux/action.js'


//antdUi引入的部分
import { Table,message,Modal, Button } from 'antd';


class SelectSubject extends Component{
    state={
      visible: false,
      subjectname:'',
      subjectid:'',
      index1:'',
      columns: [
        {
          title: '课程ID',
          dataIndex: 'subjectid',
          key: 'subjectid'
        },
        {
          title: '课程名称',
          dataIndex: 'subjectname',
          key: 'subjectname'
        },
        {
          title: '开课时间',
          dataIndex: 'starttime',
          key: 'starttime'
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record,index) => (
            <span>
              <Button onClick={this.showModal}>选择{index}</Button>
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
      this.AjaxQueryAllElective();
    }


    AjaxQueryAllElective=()=>{
      this.props.queryAllElectiveSubjects()
    }


     select=(record,index)=>{
      return {
         onClick: event => {
          var subjectid=record.subjectid;
          console.log(index)
          var index1=index;
          this.setState({subjectname:record.subjectname,subjectid,index1:index})
         }
      }
    }


    //antd的模态框的方法
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
    handleOk = e => {
      //console.log(e);
      var userid=JSON.parse(localStorage.getItem('data')).Data.UserId;
      var subjectid=this.state.subjectid;
      reqAddOneElectiveSubject({UserId:userid,ElectiveSubjectId:subjectid}).then(res=>{
            if(res.data.Code===1){
              message.success("添加成功",1)
           }
              message.success("添加失败",1)
        })
      this.setState({
        visible: false,
      });
      this.props.data.map((value,index)=>{
        if(subjectid===value.subjectid){
          console.log(this.state.index1)
          this.props.data.splice(this.state.index1,1)
        }
      })
    };

    handleCancel = e => {
      //console.log(e);
      this.setState({
        visible: false,
      });
    };

    render(){
        const {columns,subjectname}=this.state;
        const {data}=this.props;
        return(
            <div>
              <Table columns={columns} dataSource={data} onRow={this.select} />
              <Modal
                title="你当前选择的学科名称"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <p>{subjectname}</p>
              </Modal>
            </div>
            )
    }
}


export default connect(
  state=>({data: state.queryallelectivesubjectsdata}),
  {queryAllElectiveSubjects}
)(SelectSubject)