using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统后台.Models
{
    public class ResponseData
    {
        public int Code { get; set; } = 1;
        public object Data { get; set; }
        public string Message { get; set; } = "成功";
    }
}