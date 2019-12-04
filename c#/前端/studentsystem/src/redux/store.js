//非常固定的模块
//该模块为把redux与组件连接起来
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'//redux 异步 action 中间件
import {composeWithDevTools} from 'redux-devtools-extension'//可视化插件

import reducers from './reducers.js'

//向外暴露store对象
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))