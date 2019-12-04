using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models
{
    public class TokenResponse
    {
        //public string Token { get; set; }
        public int Code { get; set; }
        public object Data { get; set; }
    }
}