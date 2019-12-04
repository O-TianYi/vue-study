using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.User
{
    public class Auth: Base
    {
        [Required]
        public int AuthId { get; set; }
        [Required]
        public string Action { get; set; }
    }
}