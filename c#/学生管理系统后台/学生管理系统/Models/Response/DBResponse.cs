using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models
{
    public class DBResponse
    { 
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int RoleId { get; set; }
        public object Auths { get; set; }
        public object Subjects { get; set; }
        public string MajorName { get; set; }
        public string ClassName { get; set; }
        public string GradeName { get; set; }
    }
}