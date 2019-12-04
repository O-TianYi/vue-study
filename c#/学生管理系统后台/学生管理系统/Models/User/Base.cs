using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class Base
    {
        public int IsRemoved { get; set; } = 0;
        public DateTime CreateTime { get; set; } = DateTime.Now;
    }
}