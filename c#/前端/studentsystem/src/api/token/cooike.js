export  function setCookie(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays===null) ? "" : ";expires="+exdate.toGMTString())
}


// 函数中的参数为 要获取的cookie键的名称。
export function getCookie(userName){
  if (document.cookie.length>0){
    var c_start=document.cookie.indexOf(userName+ "=");
    if (c_start!==-1){
        c_start=c_start + userName.length+1;
      var c_end=document.cookie.indexOf(";",c_start);
      if (c_end===-1){
          c_end=document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start,c_end));
    }
 }
return "";
}


export function DelCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
  var cval = getCookie(name);
  document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

export function exit(token) {
  DelCookie(token);
  window.location.replace("http://localhost:3000/login");
}