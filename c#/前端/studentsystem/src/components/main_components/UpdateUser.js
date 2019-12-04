import React,{Component} from 'react'

//cookie的操作
import {getCookie} from '../../api/token/cooike.js'

//redux部分
import {connect} from 'react-redux'
import {queryOne} from '../../redux/action.js'

//导入自定义样式
import '../../containers/register/register.css'

//导入ajax
import {reqUpdate} from '../../api/index.js'

//antdUi引入的部分
import { Form, Icon, Input, Button, Checkbox } from 'antd';


class UpdateUserFrom extends Component{

    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      //console.log("子路由接受到的数据",this.props.location)
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
        return;
      }
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
      this.AjaxQueryOne();
    };


    AjaxQueryOne=()=>{
      this.props.queryOne({Id:1})
      setTimeout(()=>{
        var msg=this.props.user.Message;
        if(msg!=="查询成功"){
          console.log("查询失败")
          return ;
        }
        console.log("查询成功")
      },2000)
    }

    render(){
      const {user}= this.props;
      const { getFieldDecorator } = this.props.form;
        return(
            <div id="components-form-demo-normal-login" className='register-background'>
            <Form onSubmit={this.handleSubmit} className="login-form" layout='horizontal'>
              {/*用户输入框*/}
              <Form.Item>
                {/*rule的第一个对象检验用户输是否为空，第二对象是自定义的校验回调函数*/}
              {/*多个判定需要在{require...},{validator: this.CheckName}*/}
                {getFieldDecorator('UserName', {
                  rules: [{ required: true, message: '请输入用户名称'}],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              {/*密码输入框*/}
              <Form.Item>
                {getFieldDecorator('Password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
            {/*再次密码输入框,,,,,,,自定义的回调函数,{
                          validator: this.handleConfirmPassword
                    }*/}
              <Form.Item>
                {getFieldDecorator('Password1', {
                  rules: [{ required: true, message: '请再次输入密码' },{validator: this.handleConfirmPassword}],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              {/*登陆按钮和前往注册*/}
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" >注册</Button>
              </Form.Item>
            </Form>
            </div>
            )
    }
}

const UpdateUser = Form.create({ name: 'normal_login' })(UpdateUserFrom);

export default connect(
  state=>({user: state.user}),
  {queryOne}
)(UpdateUser)