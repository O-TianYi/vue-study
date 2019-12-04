using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class Role: Base
    {
        [Required]
        public string RoleName { get; set; }
        [Required]
        public int AuthId { get; set; }
    }
}