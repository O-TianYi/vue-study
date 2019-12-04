using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class Class : Base
    {
        public int ClassId { get; set; }
        public string ClassName { get; set; }
        public int GradeId { get; set; }
    }
}