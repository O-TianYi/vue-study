using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class Mark:Base
    {
        public int SubjectId { get; set; }
        public int Code { get; set; }
        public int UserId { get; set; }
    }
}