using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models
{
    public class ResponseData
    {
        public int Code { get; set; } = 001;//设置默认值
        public object Data { get; set; } 
        public string Message { get; set; } = "";
        public string Token { set; get; } = "";
    }
}