using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class Major:Base
    {
        public int MajorId { get; set; }
        public string MajorName { get; set; }
    }
}