import ajax from '../api/ajax.js'

// //箭头函数的写法，注册接口
// export const reqRegister=(user)=>ajax('/register',user,'POST')

// //登陆接口,参数可以直接写user，也可以下面这种形式
// export const reqLogin=({username,password})=>ajax('/login',
// {username,password},'POST')

//注册需要的两个请求
export const reqCheckName=(name)=>ajax('/api/user/checkname',name)
export const reqRegister=(user)=>ajax('/api/user/register',user,'post')

//登陆需要的两个请求
export const reqLogin=(user)=>ajax('/api/user/login',user,'post')

//查询部分
export const reqQueryAll=()=>ajax("/api/user/queryall")
export const reqQueryOne=(id)=>ajax("/api/user/queryfromid",id)
export const reqPageQuery=(index_number)=>ajax("/api/user/pagequery",index_number)

export const reqUpdate=(user,id)=>ajax("/api/user/update",user,"put",id)
export const reqDelete=(id)=>ajax("/api/user/delete",{},"put",id)

//查询其他表
export const reqQueryAllClasses=()=>ajax("/api/user/queryallclasses")
export const reqQueryAllMajors=()=>ajax("/api/user/queryallmajors")
export const reqQueryAllSubjects=()=>ajax("/api/user/queryallsubjects")
export const reqQueryAllGrades=()=>ajax("/api/user/queryallgrades")


//选修课部分
export const reqQueryAllElectiveSubject=()=>ajax("/api/user/queryallelectivesubjects")
export const reqQueryAllElectiveSubjectObj=()=>ajax("/api/user/queryallelectivesubjectsobj")
export const reqDelOneElectiveSubject=(obj)=>ajax("/api/user/deloneelectivesubject",obj,"put")
export const reqAddOneElectiveSubject=(obj)=>ajax("/api/user/addoneelectivesubject",obj,"post")

//所有学科
export const reqQueryOneAllSubject=(id)=>ajax("/api/user/queryoneallsubjects",id)