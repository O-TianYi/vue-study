using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace 学生管理系统.Models.Response
{
    public class OneAllSubjectResponse
    {
        public int UserId { get; set; }
        public object MajorSubjects { get; set; }
        public object ElectiveSubjects { get; set; }
    }
}