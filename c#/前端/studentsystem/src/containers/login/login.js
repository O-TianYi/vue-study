import React,{Component} from 'react'


//引入ajax
import {setCookie,getCookie} from '../../api/token/cooike.js'

//引入路由
import {NavLink} from 'react-router-dom'


//antd引入的样式
import { Form, Icon, Input, Button, Checkbox,Carousel,message } from 'antd';
//import { createForm } from 'rc-form';

//引入antd必要的样式
import './login.css'
import '../Public/css/index.css'


//导入ajax
import {reqLogin} from '../../api/index.js'


//引入图片
import img1 from '../../assets/image/7.jpg'
import img2 from '../../assets/image/6.jpg'
import img3 from '../../assets/image/5.jpg'
import img4 from '../../assets/image/4.jpg'



//redux的一些操作
////connect真正连接 Redux 和 React
import {connect} from 'react-redux'



class LoginFrom extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('提交表单的内容是: ', values);
        //发送ajax请求
        reqLogin(values).then(response=>{
          console.log("返回的内容是：",response)
          if(response.data.Code===1){
            message.success("登陆成功,并把数据保存在了本地存储上了",1,()=>{
              setCookie('token',response.data.Token,1);
              localStorage.setItem('data',JSON.stringify(response.data));
              if(response.data.Data.RoleId===1){
                console.log('以保存token：'+getCookie('token')+",，，，，欢迎管理员登陆系统")
                this.props.history.replace('/main')
              }else{
                console.log('以保存token：'+getCookie('token')+"，，，，，并且把个人的信息保存到了本地存储")
                this.props.history.replace('/main1')
              }
            })
          }else{
            message.error("账号或者密码不存在，请前往注册",2)
          }
        })
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="components-form-demo-normal-login" className='login-background'>
      <Form onSubmit={this.handleSubmit} className="login-form" layout='horizontal'>
        {/*标题*/}
        <Form.Item>
            <Carousel autoplay>
              <div>
                <h3><img src={img1} alt=""/></h3>
              </div>
              <div>
                <h3><img src={img2} alt=""/></h3>
              </div>
              <div>
                <h3><img src={img3} alt=""/></h3>
              </div>
              <div>
                <h3><img src={img4} alt=""/></h3>
              </div>
          </Carousel>
        </Form.Item>
        {/*用户输入框*/}
        <Form.Item>
          {getFieldDecorator('UserName', {
            rules: [{ required: true, message: '请输入用户名称' }],
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
        {/*记住我*/}
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住</Checkbox>)}
          <NavLink className="login-form-forgot" to="/forget">忘记密码</NavLink>
          </Form.Item>
        {/*登陆按钮和前往注册*/}
          <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
          没有账号？<NavLink to="/register">去注册！</NavLink>
        </Form.Item>
      </Form>
      </div>
    );
  }
}


const Login = Form.create({ name: 'normal_login' })(LoginFrom);

export default connect(
)(Login)


