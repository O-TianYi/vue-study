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
} from './action-types.js'

import {
    reqQueryOne,
    reqQueryAll,
    reqPageQuery,
    reqQueryAllClasses,
    reqQueryAllGrades,
    reqQueryAllMajors,
    reqQueryAllSubjects,
    reqQueryAllElectiveSubject,
    reqQueryAllElectiveSubjectObj,
    reqQueryOneAllSubject
} from '../api/index'

//授权成功的同步action
const successObj=(user)=>({type:SUCCESS_OBJ,data:user})
//错误提示信息的同步action
const errorMsg=(msg)=>({type:ERROER_MSG,data:msg})
const successMsg=(msg)=>({type:SUCCESS_MSG,data:msg})

//查询所有
const queryAllSuccess=(data)=>({type:Query_All_Success,data:data})
const queryAllError=(data)=>({type:  Query_All_Error,data:data})

//查询单个信息
const queryOneSuccess=(data)=>({type:Query_One_Success,data:data})
const queryOneError=(data)=>({type:  Query_One_Error,data:data})

//查询所有班级
const queryAllClassesSuccess=(data)=>({type:Query_AllClasses_Success,data:data})
const queryAllClassesError=(data)=>({type:  Query_AllClasses_Error,data:data})


//查询所有年级
const queryAllGradesSuccess=(data)=>({type:Query_AllGrades_Success,data:data})
const queryAllGradesError=(data)=>({type:  Query_AllGrades_Error,data:data})

//查询所有专业
const queryAllMajorsSuccess=(data)=>({type:Query_AllMajors_Success,data:data})
const queryAllMajorsError=(data)=>({type:  Query_AllMajors_Error,data:data})

//查询所有必修学科
const queryAllSubjectsSuccess=(data)=>({type:Query_AllSubjects_Success,data:data})
const queryAllSubjectsError=(data)=>({type:  Query_AllSubjects_Error,data:data})

//分页查询
const queryPageQuerySuccess=(data)=>({type:Query_PageQuery_Success,data:data})
const queryPageQueryError=(data)=>({type:Query_PageQuery_Error,data:data})

//查询所有选修学科
const queryAllElectiveSubjectsSuccess=(data)=>({type:Query_AllElectiveSubjects_Success,data:data})
const queryAllElectiveSubjectsError=(data)=>({type:  Query_AllElectiveSubjects_Error,data:data})


//查询用户的所有学科（必修+选修）
const queryOneAllSubjectsSuccess=(data)=>({type:Query_OneAllSubjects_Success,data:data})
const queryOneAllSubjectsError=(data)=>({type:  Query_OneAllSubjects_Error,data:data})




//------------      查询部分开始   ---------------------//
export const queryAll =()=>{
    return async dispatch=>{
        //发送注册的异步ajax请求
        const response=await reqQueryAll()//reqRegister({username,password,type})
        const result =response.data
        if(result.Code===1){//成功
            //授权成功的同步action
            dispatch(queryAllSuccess(result))
        }else{//失败
            //错误提示信息的同步action
            dispatch(queryAllError(result))
        }
    }
}
export const queryOne =(obj)=>{
    const {Id}=obj
    return async dispatch=>{
        //发送注册的异步ajax请求
        const response=await reqQueryOne({Id})//reqRegister({username,password,type})
        const result =response.data
        console.log(result)
        if(result.Code===1){//成功
            //授权成功的同步action
            dispatch(queryOneSuccess(result))
        }else{//失败
            //错误提示信息的同步action
            dispatch(queryOneError(result))
        }
    }
}
export const pageQuery =(obj)=>{
    const {index,number}=obj
    return async dispatch=>{
        //发送注册的异步ajax请求
        const response=await reqPageQuery({index,number})//reqRegister({username,password,type})
        const result =response.data
        if(result.Code===1){//成功
            //授权成功的同步action
            dispatch(queryPageQuerySuccess(result))
        }else{//失败
            //错误提示信息的同步action
            dispatch(queryPageQueryError(result))
        }
    }
}
export const queryAllClasses =()=>{
    return async dispatch=>{
        //发送注册的异步ajax请求
        const response=await reqQueryAllClasses()//reqRegister({username,password,type})
        const result =response.data
        if(result.Code===1){//成功
            //授权成功的同步action
            dispatch(queryAllClassesSuccess(result))
        }else{//失败
            //错误提示信息的同步action
            dispatch(queryAllClassesError(result))
        }
    }
}
export const queryAllMajors =()=>{
    return async dispatch=>{
        //发送注册的异步ajax请求
        const response=await reqQueryAllMajors()//reqRegister({username,password,type})
        const result =response.data
        if(result.Code===1){//成功
            //授权成功的同步action
            dispatch(queryAllMajorsSuccess(result))
        }else{//失败
            //错误提示信息的同步action
            dispatch(queryAllMajorsError(result))
        }
    }
}
export const queryAllGrades =()=>{
    return async dispatch=>{
        //发送注册的异步ajax请求
        const response=await reqQueryAllGrades()//reqRegister({username,password,type})
        const result =response.data
        if(result.Code===1){//成功
            //授权成功的同步action
            dispatch(queryAllGradesSuccess(result))
        }else{//失败
            //错误提示信息的同步action
            dispatch(queryAllGradesError(result))
        }
    }
}
export const queryAllSubjects =()=>{
    return async dispatch=>{
        //发送注册的异步ajax请求
        const response=await reqQueryAllSubjects()//reqRegister({username,password,type})
        const result =response.data
        if(result.Code===1){//成功
            //授权成功的同步action
            dispatch(queryAllSubjectsSuccess(result))
        }else{//失败
            //错误提示信息的同步action
            dispatch(queryAllSubjectsError(result))
        }
    }
}

//查询所有选修的学科
export const queryAllElectiveSubjects =()=>{
    return async dispatch=>{
        const response=await reqQueryAllElectiveSubjectObj()
        const result =response.data
        if(result.Code===1){
            dispatch(queryAllElectiveSubjectsSuccess(result))
        }else{
            dispatch(queryAllElectiveSubjectsError(result))
        }
    }
}


//查询所有学科(选修+必修)
export const queryOneAllSubjects =(obj)=>{
    const {Id}=obj;
    return async dispatch=>{
        const response=await reqQueryOneAllSubject({Id})
        const result =response.data
        if(result.Code===1){
            dispatch(queryOneAllSubjectsSuccess(result))
        }else{
            dispatch(queryOneAllSubjectsError(result))
        }
    }
}
//------------      查询部分结束   ---------------------//






//-------     选修课的部分
export const queryElectiveAllSubjects =()=>{
    return async dispatch=>{
        //发送注册的异步ajax请求
        const response=await reqQueryAllElectiveSubject()//reqRegister({username,password,type})
        const result =response.data
        if(result.Code===1){//成功
            //授权成功的同步action
            dispatch(successObj(result))
        }else{//失败
            //错误提示信息的同步action
            dispatch(errorMsg(result.Message))
        }
    }
}
export const queryElectiveAllSubjectsObj =()=>{
    return async dispatch=>{
        //发送注册的异步ajax请求
        const response=await reqQueryAllElectiveSubjectObj()//reqRegister({username,password,type})
        const result =response.data
        if(result.Code===1){//成功
            //授权成功的同步action
            dispatch(successObj(result))
        }else{//失败
            //错误提示信息的同步action
            dispatch(errorMsg(result.Message))
        }
    }
}



