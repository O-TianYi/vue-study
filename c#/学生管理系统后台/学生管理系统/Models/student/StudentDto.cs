using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IsRemoved { get; set; }
    }
}