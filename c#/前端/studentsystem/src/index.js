import React from 'react'
import ReactDOM from 'react-dom'



//引入路由部分
//switch是只显示页面上的一个页面，不能同时共存
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'



//引入组件的部分
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'
import Main1 from './containers/main1/main1'
import Forget from './containers/forget/forget'
import Logout from './containers/logout/logout'


//引入redux的store连接
//react-redux仅有2个API，Provider和connect，Provider提供的是一个顶层容器的作用，实现store的上下文传递。connect真正连接 Redux 和 React
import {Provider} from 'react-redux'
import store from './redux/store.js'

ReactDOM.render(
    (
        //引入store
        //Provider提供的是一个顶层容器的作用，实现store的上下文传递。
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/register' component={Register} />
                    <Route path='/main'     component={Main} />
                    <Route path='/main1'     component={Main1} />
                    <Route path='/login'    component={Login} />
                    <Route path='/forget'    component={Forget} />
                    <Route path='/logout'    component={Logout} />
                    <Redirect to='/login'/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
    ,
document.getElementById('root'))