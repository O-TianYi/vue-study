import React,{Component} from 'react'

//cookie的操作
import {getCookie} from '../../api/token/cooike.js'

//redux部分
import {connect} from 'react-redux'


//antdUi引入的部分
import { Table,message } from 'antd';


class DelUser extends Component{


    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      //console.log("子路由接受到的数据",this.props.location)
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
        return;
      }
    }

    render(){
        return(
            <div>
              更新
            </div>
            )
    }
}


export default connect()(DelUser)