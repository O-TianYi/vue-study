import React,{Component} from 'react'

//引入自定义的css
import './main1.css'


//cookie的操作
import {getCookie,exit} from '../../api/token/cooike.js'


//router部分
import {NavLink,Switch,Route,Redirect} from 'react-router-dom'

//导入嵌套路由
import QueryMessage from '../../components/main1_components/QueryMessage.js'
import QuerySubject from '../../components/main1_components/QuerySubject.js'
import SelectSubject from '../../components/main1_components/SelectSubject.js'
import SubjectTable from '../../components/main1_components/SubjectTable.js'
import Home from '../../components/main1_components/home.js'

//antd
import { Layout, Menu ,PageHeader, Button, Dropdown, Icon,message  } from 'antd';
const { Header, Content, Footer } = Layout;

export default class Main1 extends Component{
    state = {
      user: JSON.parse(localStorage.getItem('data')).Data
    };


    //如果cookie上没有存在token就返回登陆页面
    componentDidMount=()=>{
      var token=getCookie("token")
      if(token===""){
        this.props.history.replace('/login',null)
      }

    }

    exit=()=>{
      exit('token');
    }

    render(){
      const {user}=this.state;
        return(
          <div>
        {/*页头部分*/}
            <div
              style={{
                backgroundColor: 'skyblue',
                padding: 24,
              }}
            >
              <PageHeader
                ghost={false}
                title="学生管理系统"
                subTitle="学生版"
                extra={[
                  <label key="1">欢迎<span>{this.state.user.UserName}</span>登陆</label>,
                  <Button key="2" onClick={this.exit}>退出</Button>
                ]}
              >
              </PageHeader>
            </div>


            {/*主体部分*/}
            <div className="components-layout-demo-top">
              <Layout className="layout">
                <Header>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}
                >
                <Menu.Item key="1">
                  <NavLink rel="noopener noreferrer" to={{pathname:'/main1/home',state:user}}>
                      首页
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <Dropdown overlay={()=>
                    <Menu onClick={this.getSelected}>
                    <Menu.Item key='1'>
                      <NavLink rel="noopener noreferrer" to="/main1/querymessage">
                        查看自己的信息
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key='2'>
                      <NavLink rel="noopener noreferrer" to="/main1/querysubject">
                        查看自己的学科
                      </NavLink>
                    </Menu.Item>
                  </Menu>
                  }>
                    <a className="ant-dropdown-NavLink" href="##">
                      查询 <Icon type="down" />
                    </a>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item key="3">
                  <Dropdown overlay={()=>
                    <Menu onClick={this.getSelected}>
                    <Menu.Item key='3'>
                      <NavLink rel="noopener noreferrer" to="/main1/selectsubject">
                        选课
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key='4'>
                      <NavLink rel="noopener noreferrer" to="/main1/subjecttable">
                        课程表
                      </NavLink>
                    </Menu.Item>
                  </Menu>
                  }>
                    <a className="ant-dropdown-NavLink" href="##">
                      修改 <Icon type="down" />
                    </a>
                  </Dropdown>
                </Menu.Item>
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                  <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                      <Switch>
                        <Route path='/main1/querymessage'    component={QueryMessage} />
                        <Route path='/main1/querysubject'    component={QuerySubject} />
                        <Route path='/main1/selectsubject'    component={SelectSubject} />
                        <Route path='/main1/subjecttable'    component={SubjectTable} />
                        <Route path='/main1/home'    component={Home} />
                        <Redirect to='/main1/home' />
                    </Switch>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>学生管理系统</Footer>
            </Layout>
          </div>
        </div>
            )
    }
}





