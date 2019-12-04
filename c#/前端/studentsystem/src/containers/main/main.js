import React,{Component} from 'react'

//引入路由部分
//import {Link} from 'react-router-dom'


//引入自定义样式
import './main.css'

//引入ajax
import {getCookie,exit} from '../../api/token/cooike.js'

//router部分
import {NavLink,
  Link,Switch,Route,Redirect} from 'react-router-dom'

//引入嵌套路由部分
import Home from '../../components/main_components/Home.js'
import AddUser from '../../components/main_components/AddUser.js'
import QueryOne from '../../components/main_components/QueryOne.js'
import QueryAll from '../../components/main_components/QueryAll.js'
import PageQuery from '../../components/main_components/PageQuery.js'
import DelUser from '../../components/main_components/DelUser.js'
import UpdateUser from '../../components/main_components/UpdateUser.js'
import QueryAllClasses from '../../components/main_components/QueryAllClasses.js'
import QueryAllGrades from '../../components/main_components/QueryAllGrades.js'
import QueryAllMajors from '../../components/main_components/QueryAllMajors.js'
import QueryAllSubjects from '../../components/main_components/QueryAllSubjects.js'

//redux部分
import {connect} from 'react-redux'


//antdUi引入的部分
import { Layout, Menu, Icon,PageHeader,message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



class Main extends Component {
  state = {
    collapsed: false,
    selectedRowKeys: [],
    data:[]
  };

  //如果cookie上没有存在token就返回登陆页面
  componentDidMount=()=>{
    var token=getCookie("token")
    if(token===""){
      this.props.history.replace('/login',null)
    }
  }


//头部导航栏的脱出登陆修改信息功能
logout=()=>{
  exit('token');
}



//antd自带的方法
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };


  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const {selectedRowKeys,data} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
      <PageHeader title="学生管理系统" className='main-title' />


        {/*++++++++++++++++   头部部分开始    +++++++++++++++++*/}
        <Layout>
          <Header className="header" className='main-header'>
            <div className="logo" />
            <h2 style={{ float:'left'}} className='daohanglan'>欢迎使用</h2>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              className='daohanglan'
              style={{ lineHeight: '64px',float: 'right' }}
            >
              <Menu.Item key="1" className='buding'>有关我们</Menu.Item>
              <Menu.Item key="2" className='buding'>修改信息</Menu.Item>
              <Menu.Item key="3" className='buding'>
              <span onClick={this.logout}>退出系统</span>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
      {/*++++++++++++++++   头部部分开始    +++++++++++++++++*/}




      <Layout style={{ minHeight: '100vh' }} >
        {/*++++++++++++++++   侧边栏部分开始    +++++++++++++++++*/}
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme="light">
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            {/*不能展开的一栏*/}
            <Menu.Item key="1">
              <Icon type="user" />
              <span>管理员功能</span>
            </Menu.Item>
            {/*----增加功能----*/}
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="plus" />
                  <span >添加</span>
                </span>
              }
            >
              <Menu.Item key="2">
                <Link  to="/main/adduser">
                  <Icon type="user-add" />
                  <span>单个添加</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="usergroup-add" />
                <span>添加多个</span>
              </Menu.Item>
            </SubMenu>

           {/*----查询功能----*/}
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="search" />
                  <span>查询</span>
                </span>
              }
            >
              <Menu.Item key="4">
                <NavLink  to="/main/queryone">
                  <Icon type="zoom-in" />
                  <span>单个查询</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="5">
                <Link  to="/main/pagequery">
                  <Icon type="zoom-out" />
                  <span>分页查询</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link  to='/main/queryall'>
                  <Icon type="search" />
                  <span>查询所有</span>
                </Link>
              </Menu.Item>
            </SubMenu>


           {/*----删除功能----*/}
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="delete" />
                  <span>删除</span>
                </span>
              }
            >
              <Menu.Item key="7">
                <Link  to="/main/deluser">
                  <Icon type="user-delete" />
                  <span>单个删除(假删除)</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link  to="/main/updateuser">
                  <Icon type="usergroup-delete" />
                  <span>更新用户信息</span>
                </Link>
              </Menu.Item>
            </SubMenu>

          {/*查询其他表的部分*/}
          <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="search" />
                  <span>查询其他</span>
                </span>
              }
            >
              <Menu.Item key="9">
                <Link  to="/main/queryallclasses">
                  <Icon type="zoom-in" />
                  <span>查询所有班级</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link  to="/main/queryallgrades">
                  <Icon type="zoom-out" />
                  <span>查询所有年级</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link  to="/main/queryallsubjects">
                  <Icon type="search" />
                  <span>查询所有学科</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link  to="/main/queryallmajors">
                  <Icon type="search" />
                  <span>查询所有专业</span>
                </Link>
              </Menu.Item>
            </SubMenu>




          </Menu>
        </Sider>
      {/*++++++++++++++++   侧边栏部分结束    +++++++++++++++++*/}


     {/*++++++++++++++++   中间部分结束    +++++++++++++++++*/}
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          {/*表单显示部分开始*/}
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {/*路由显示的部分*/}
              <Switch>
                  <Route path='/main/adduser'    component={AddUser} />
                  <Route path='/main/queryone'    component={QueryOne} />
                  <Route path='/main/queryall'    component={QueryAll} />
                  <Route path='/main/pagequery'    component={PageQuery} />
                  <Route path='/main/deluser'    component={DelUser} />
                  <Route path='/main/updateuser'    component={UpdateUser} />
                  <Route path='/main/home'    component={Home} />
                  <Route path='/main/queryallclasses'    component={QueryAllClasses} />
                  <Route path='/main/queryallgrades'    component={QueryAllGrades} />
                  <Route path='/main/queryallmajors'    component={QueryAllMajors} />
                  <Route path='/main/queryallsubjects'    component={QueryAllSubjects} />
                  <Redirect to='/main/home' />
              </Switch>
          </div>
          {/*表单显示部分结束*/}
        </Content>
        <Footer style={{ textAlign: 'center' }}>学生管理系统</Footer>
      </Layout>
      {/*++++++++++++++++   中间部分结束    +++++++++++++++++*/}



      </Layout>

      </div>
    );
  }
}


export default connect()(Main)