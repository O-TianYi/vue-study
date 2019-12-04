/*
封装的ajax请求
 */
import axios from 'axios'

export default function ajax(url,data={},type='GET',id=null){//默认值
    if(type==='GET'||type==="delete"){
        //把data拆分成拼接到url上
        //如接受的数据为： data:{username: tom,password:123}
        //最终转化的效果：paramStr: username=tom&password=123
        let paramStr=''
        //keys()方法获取的是key的一个数组，即['username','password']
        Object.keys(data).forEach(key=>{
            paramStr+=key+'='+data[key]+'&'
        })
        if(paramStr){
            //因为上面的拼接之后会多一个&，所以要截掉该&
            paramStr=paramStr.substring(0,paramStr.length-1)
        }
        //axios发送get请求
        if(type==='delete'){
            return axios.delete(url+'?'+paramStr)
        }
        return axios.get(url+'?'+paramStr)
    }else if(type==="post"){
         //axios发送post请求
        return axios.post(url,data)
    }else if(type==="put"){
        let paramStr=''
        if(id){
            paramStr+='id='+id;
        }
        return axios.put(url+'?'+paramStr,data)
    }
}