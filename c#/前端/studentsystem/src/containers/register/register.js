import React,{Component} from 'react'



//引入路由
//引入withRouter就可以使用react-router的三个对象history, location, match，，实现用js跳转路由的功能
import {NavLink} from 'react-router-dom'


//antd引入的样式
import { Form, Icon, Input, Button,message,Radio } from 'antd';


//导入ajax
import {reqRegister,reqCheckName} from '../../api/index.js'

//引入antd设置的自定义样式
import './register.css'
import '../Public/css/index.css'


//redux的一些操作
////connect真正连接 Redux 和 React
import {connect} from 'react-redux'



class RegisterFrom extends Component {
//检查用户名的方法（发送ajax校验）
CheckName=(rule, value, callback)=>{
  if(value===""||value===null){
    callback()
  }
  //发送ajax请求
  reqCheckName({name: value}).then(res=>{
      // console.log(res)
      if(res.data.Message!=="用户名没有被使用"){
        callback(res.data.Message);
      }
      callback();
  })
}


//检查输入的密码是否一致的验证
handleConfirmPassword = (rule, value, callback) => {
      const { getFieldValue } = this.props.form
      if (value && value !== getFieldValue('Password')) {
          callback('两次输入不一致！')
      }
      callback()
}




//点击提交触发的方法
handleSubmit = e => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      console.log("表单收集的内容是：",values)
      reqRegister(values).then(res=>{
        var msg=res.data.Message;
        if(msg==="添加成功"){
          //-----自动跳转到登陆页面
          message.success('注册成功,3秒后跳转到登陆页面',3,()=>{
            this.props.history.replace('/login')
          });
          return ;
        }
        message.error('注册失败');
      })
    }
  });
};

render() {
  const { getFieldDecorator } = this.props.form;
  return (
    <div id="components-form-demo-normal-login" className='register-background'>
    <Form onSubmit={this.handleSubmit} className="login-form" layout='horizontal'>
      {/*用户输入框*/}
      <Form.Item>
        {/*rule的第一个对象检验用户输是否为空，第二对象是自定义的校验回调函数*/}
      {/*多个判定需要在{require...},{validator: this.CheckName}*/}
        {getFieldDecorator('UserName', {
          rules: [{ required: true, message: '请输入用户名称'},{validator: this.CheckName}],
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
    {/*用户类型选择*/}
    <Form.Item label="选择角色">
        {getFieldDecorator('RoleId', {
          rules: [{ required: true, message: '请选择角色'}]
        })(
          <Radio.Group>
            <Radio value="1">管理员</Radio>
            <Radio value="2" autoFocus>普通用户</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      {/*登陆按钮和前往注册*/}
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" >注册</Button>
        <Button type="primary" className="login-form-button">
          <NavLink to="login">返回登陆页面</NavLink>
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}
}

const Register = Form.create({ name: 'normal_login' })(RegisterFrom);

/*connect真正连接 Redux 和 React ;接收上面 Provider 提供的 store 里面的 state 和 dispatch，传给一个构造函数，返回一个对象，以属性形式传给我们的容器组件。
*/
export default connect()(Register)

