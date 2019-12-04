using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class UserElective:Base
    {
        public int UserId { get; set; }
        public int ElectiveSubjectId { get; set; }
    }
}