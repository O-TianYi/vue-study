import React,{Component} from 'react'

//cookie的操作
import {getCookie} from '../../api/token/cooike.js'

//ajax
import {reqDelOneElectiveSubject} from '../../api/index.js'


//redux部分
import {connect} from 'react-redux'
import {queryOneAllSubjects} from '../../redux/action.js'


//antdUi引入的部分
import { Table,message,Modal, Button } from 'antd';


class SubjectTable extends Component{
    state={
      subjectname:'',
      index1:'',
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
              <a onClick={this.showModal}>删除</a>
            </span>
          ),
        },
      ]
    }


    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      //console.log("子路由接受到的数据",this.props.location)
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
        return;
      }
      this.AjaxQueryOneAllSubjects();
    }


    AjaxQueryOneAllSubjects=()=>{
      var userid=JSON.parse(localStorage.getItem('data')).Data.UserId;
      this.props.queryOneAllSubjects({Id: userid});
    }

    select=(record,index)=>{
      return {
         onClick: event => {
          var subjectname=record.subjectname;
          this.setState({index1:index,subjectname})
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
      message.success("没有完善的操作，比较复杂。")
      //console.log(e);
      // var userid=JSON.parse(localStorage.getItem('data')).Data.UserId;
      // var subjectid=this.state.subjectid;
      // reqDelOneElectiveSubject({UserId:userid,ElectiveSubjectId:subjectid}).then(res=>{
      //    if(res.data.Code===1){
      //       message.success("删除成功,但是没有实现ok之后删除该课表的功能，因为还有判断是否为必修，只有选修才可以进行删除操作",3)
      //       // this.props.data.map((val,index)=>{
      //       //     if(subjectname===val.subjectname){
      //       //       console.log(this.state.index1)
      //       //       this.props.data.splice(this.state.index1,1)
      //       //     }
      //       // })
      //    }
      //       message.success("删除失败，该课程为必修课",1)
      //   })
      this.setState({
        visible: false,
      });
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
              <Table columns={columns} dataSource={data} onRow={this.select}/>
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
  state=>({data: state.queryoneallsubjectsdata}),
  {queryOneAllSubjects}
)(SubjectTable)