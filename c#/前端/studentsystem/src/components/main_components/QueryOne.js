import React,{Component} from 'react'

//cookie的操作
import {getCookie,exit} from '../../api/token/cooike.js'


//redux部分
import {connect} from 'react-redux'
import {queryOne} from '../../redux/action.js'


//antd部分
import { Input, Skeleton, Switch, Card, Icon, Avatar,message } from 'antd';
const { Search } = Input;
const { Meta } = Card;

class QueryOne extends Component{
    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
      }
    }

    //搜索用户
    search=(value)=>{
      var v=parseInt(value);
      if(isNaN(v)){
        console.log("输入的内容必须是数字")
        return;
      }
      console.log(v)
      this.props.queryOne({Id:v})
    }




    render(){
      //const { loading } = this.state;
      const {data}=this.props;
        return(
            <div>
            <Search placeholder="输入搜索的用户ID" onSearch={this.search} style={{ width: 400 }} />
            <div>
                <Card
                  style={{ width: 400, marginTop: 16 }}
                  actions={[
                    <Icon type="setting" key="setting" />,
                    <Icon type="ellipsis" key="ellipsis" />,
                  ]}
                >
                  <Skeleton loading={data.loading} avatar active>
                    <Card title="学生信息" extra={<a href="##">更多</a>} style={{ width: 350 }}>
                    {data.Code==2?<div><p>查询失败</p></div>:
                      <div>
                        <p>姓名：{data.UserName}</p>
                        <p>专业名称：{data.MajorName}</p>
                        <p>班级名称：{data.ClassName}</p>
                        <p>班级名称：{data.GradeName}</p>
                        <p>角色名称：{data. RoleName}</p>
                      </div>
                  }
                    </Card>
                  </Skeleton>
                </Card>
              </div>

            </div>
            )
      }
}


export default connect(
  state=>({data: state.queryone}),
  {queryOne}
)(QueryOne)