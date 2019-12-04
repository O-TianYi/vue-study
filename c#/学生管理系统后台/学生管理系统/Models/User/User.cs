using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class User: Base
    {
        //public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; } = 0;
        public int MajorId { get; set; } = 0;
        public int ClassId { get; set; } = 0;
    }
}