using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class ElectiveSubject:Base
    {
        public int ElectiveSubjectId { get; set; }
        public string ElectiveName { get; set; }
    }
}