using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace 学生管理系统后台.Models
{
    public class Student
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
        public int isRemoved { get; set; } = 0;
    }
}