using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class Grade : Base
    {
        public int GradeId { get; set; }
        public string GradeName { get; set; }
    }
}