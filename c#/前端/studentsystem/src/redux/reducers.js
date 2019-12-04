import {combineReducers} from 'redux'


import {
    SUCCESS_OBJ,
    ERROER_MSG,
    SUCCESS_MSG,
    Query_All_Success,
    Query_All_Error,
    Query_One_Success,
    Query_One_Error,
    Query_AllClasses_Success,
    Query_AllClasses_Error,
    Query_AllGrades_Success,
    Query_AllGrades_Error,
    Query_AllMajors_Success,
    Query_AllMajors_Error,
    Query_AllSubjects_Success,
    Query_AllSubjects_Error,
    Query_PageQuery_Success,
    Query_PageQuery_Error,
    Query_AllElectiveSubjects_Success,
    Query_AllElectiveSubjects_Error,
    Query_OneAllSubjects_Success,
    Query_OneAllSubjects_Error
}from './action-types'

//属性的定义根据后他返回的数据然后渲染到页面上需要的
const initUser={
    UserName:'',//用户
    Message:'',//错误提示信息
    Data:[],
    Token:''
}
//产生user状态的reducer
function user(state=initUser,action){
    switch(action.type){
        case SUCCESS_OBJ://data是user
            //下面取代该return action.data
            return {...action.data}//直接返回action.data的内容
            //以前的state被action.data取代以前state上有的key
        case ERROER_MSG://data是msg
            return  {...state,Message:action.data}
        case SUCCESS_MSG:
            return {...state,Message:action.data}//同名覆盖，没有添加属性，没有的按照init对象一样的值
        default:
            return state
    }
}

//查询所有用户
//action.data的是一个和postman测试的完全的对象{Code,Data,Message}
function queryalldata(state=[],action){
    switch(action.type){
        case Query_All_Success:
            let data=[];
            let tempdata=action.data.Data;
            tempdata.map((value,index)=>{
                if(value!=null){
                    let obj={key:index,username: value.UserName,userid: value.UserId,
                             classname: value.ClassName,gradename: value.GradeName,
                             majorname: value.MajorName,rolename: value.RoleName};
                    data.push(obj);
                }
            })
            return data;
        case Query_All_Error:
            return  state
        default:
            return state
    }
}

//查询所有班级
function queryallclassesdata(state=[],action){
    switch(action.type){
        case Query_AllClasses_Success:
            let data=[];
            let tempdata=action.data.Data;
            tempdata.map((value,index)=>{
                if(value!=null){
                    let obj={key:index,classname: value};
                    data.push(obj);
                }
            })
            return data;
        case Query_AllClasses_Error:
            return  state
        default:
            return state
    }
}
//查询所有年级
function queryallgradesdata(state=[],action){
    switch(action.type){
        case Query_AllGrades_Success:
            let data=[];
            let tempdata=action.data.Data;
            tempdata.map((value,index)=>{
                if(value!=null){
                    let obj={key:index,gradename: value};
                    data.push(obj);
                }
            })
            return data;
        case Query_AllGrades_Error:
            return  state
        default:
            return state
        }
}
//查询所有专业
function queryallmajorsdata(state=[],action){
    switch(action.type){
        case Query_AllMajors_Success:
            let data=[];
            let tempdata=action.data.Data;
            tempdata.map((value,index)=>{
                if(value!=null){
                    let obj={key:index,majorname: value};
                    data.push(obj);
                }
            })
            return data;
        case Query_AllMajors_Error:
            return state
        default:
            return state
        }
}
//查询所有必修学科
function queryallsubjectsdata(state=[],action){
    switch(action.type){
        case Query_AllSubjects_Success:
            let data=[];
            let tempdata=action.data.Data;
            tempdata.map((value,index)=>{
                if(value!=null){
                    let obj={key:index,subjectname: value};
                    data.push(obj);
                }
            })
            return data;
        case Query_AllSubjects_Error:
            return  state
        default:
            return state
    }
}

//分页查询
function pagequery(state=[],action){
    switch(action.type){
        case Query_PageQuery_Success:
            let data=[];
            let tempdata=action.data.Data;
            tempdata.map((value,index)=>{
                if(value!=null){
                    let obj={key:index,username: value.UserName,userid: value.UserId,
                             classname: value.ClassName,gradename: value.GradeName,
                             majorname: value.MajorName,rolename: value.RoleName};
                    data.push(obj);
                }
            })
            return data;
        case Query_PageQuery_Error:
            return  state
        default:
            return state
    }
}

//查询单人信息，初始值是一个空对象，返回是一个对象
function queryone(state={},action){
    switch(action.type){
        case Query_One_Success:
            return {...action.data.Data,loading: false}
        case Query_One_Error:
            return  {...state,loading: false,Code:2}
        default:
            return {...state,loading: true}
    }
}

//查询所有选修修学科
function queryallelectivesubjectsdata(state=[],action){
    switch(action.type){
        case Query_AllElectiveSubjects_Success:
            let data=[];
            let tempdata=action.data.Data;
            tempdata.map((value,index)=>{
                if(value!=null){
                    let obj={key:index,subjectid: value.ElectiveSubjectId,subjectname:value.ElectiveName,starttime: value.CreateTime};
                    data.push(obj);
                }
            })
            return data;
        case Query_AllElectiveSubjects_Error:
            return  state
        default:
            return state
    }
}


//查询所有学科(必修+选修)
function queryoneallsubjectsdata(state=[],action){
    switch(action.type){
        case Query_OneAllSubjects_Success:
            let data=[];
            let tempdata1=action.data.Data.MajorSubjects;
            let tempdata2=action.data.Data.ElectiveSubjects;
            tempdata1.map((value,index)=>{
                if(value!=null){
                    let obj={key:index,subjectname: value};
                    data.push(obj);
                }
            })
            tempdata2.map((value,index)=>{
                if(value!=null){
                    let obj={key:tempdata1.length+index,subjectname: value};
                    data.push(obj);
                }
            })
            return data;
        case Query_OneAllSubjects_Error:
            return  state
        default:
            return state
    }
}



export default combineReducers({
    user,queryalldata,queryallclassesdata,queryallgradesdata,
    queryallmajorsdata,queryallsubjectsdata,queryone,pagequery,
    queryallelectivesubjectsdata,queryoneallsubjectsdata
})
//向外暴露的状态结构：state{user:{}}
