using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using 学生管理系统.Models;
using 学生管理系统.Service;
using 学生管理系统.Tools;

namespace 学生管理系统.Controllers
{
    //跨域问题
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    //添加用户时候，返回用户信息+添加成功信息
    [RoutePrefix(prefix: "student")]//路由前缀
    public class StudentController : ApiController
    {

        //测试jwt
        //加密过程
        [HttpGet]
        [Route(template: "test1")]
        public string Test1()
        {

            //返回一个token的字符串
            return Jwt.Encode(new Dictionary<string, object>(){    {"loginName","jwt数据"} }, Jwt.key);

        }


        //解密过程
        [HttpGet]
        [Route(template: "test2")]
        public Dictionary<string, object> Test2(string token)
        {
            //返回一个token的字符串
            return Jwt.Decode(token, Jwt.key);

        }

        //判断是否存在token过程
        [HttpGet]
        [Route(template: "test3")]
        public object  Test3()
        {
            //返回是否存在token
            Dictionary<string, object> num = Jwt.IsLogined(ControllerContext.Request.Headers);
            object value;
            if (num.TryGetValue("Message", out value))
            {
                return value;
            }
            else if(num.TryGetValue("loginName", out value))
            {
                return value+"可以调用接口";
            }
            return "未知错误";
        }



        //判断是否存在token过程
        [HttpGet]
        [Route(template: "test5")]
        public object Test5()
        {
            //没有就返回null，
            CookieHeaderValue cookie = ControllerContext.Request.Headers.GetCookies("token").FirstOrDefault();
            if (cookie == null)
            {
                return "cookie上不存在token";
            }
            string token= cookie.ToString().Split('=')[1];
            //返回是否存在token
            Dictionary<string, object> num = Jwt.IsLogined1(token);
            object value;
            if (num.TryGetValue("Message", out value))
            {
                return value;
            }
            else if (num.TryGetValue("loginName", out value))
            {
                return value + "可以调用接口";
            }
            return "未知错误";
        }


        //测试获取请求头的cookie属性
        [HttpGet]
        [Route(template: "test4")]
        public string Test4()
        {
            //两个测试都可以
            CookieHeaderValue cookie = ControllerContext.Request.Headers.GetCookies("token").FirstOrDefault();
            //var cookie = ControllerContext.Request.Headers.GetCookies().FirstOrDefault();
            return cookie.ToString().Split('=')[1];

        }


        //--------------------------------           增删改部分   ------------------------
        //注册功能接口
        [HttpPost]//没有使用restful风格，需要自己制定调用的类型处理
        [Route(template: "register")]//路由名称
        public IHttpActionResult Register(Student s)
        {
            string sql= "insert into students (name,password,isRemoved) values ( '" + s.Name + "','" + s.Password + "'," + s.IsRemoved + ")";
            StudentService serive = new StudentService();
            int num = serive.Insert_Delete_Update(sql);
            if (num >= 1)
            {
                return Ok(new Models.ResponseData() { Code = 001, Message = "添加成功！" });
            }
            return  Ok(new Models.ResponseData() { Code = 002, Message = "添加失败！" });
        }


        //假删除，，，更新功能接口,
        [HttpPut]
        [Route(template: "delete")]//路由名称
        public IHttpActionResult Delete(int Id)
        {
            CookieHeaderValue cookie = ControllerContext.Request.Headers.GetCookies("token").FirstOrDefault();
            if (cookie == null)
            {
                return Ok(new Models.ResponseData() { Code = 004, Message = "cookie上不存在token！" });
            }
            string token = cookie.ToString().Split('=')[1];
            //判断token的有效性和是否存在token
            Dictionary<string, object> isLogined = Jwt.IsLogined1(token);
            object value;
            if (isLogined.TryGetValue("Message", out value))
            {
                //返回token过期或者token被修改等信息
                return Ok(new Models.ResponseData() { Code = 003, Message = value.ToString() });
            }
            //token合法，，允许查询
            StudentService serive = new StudentService();
            //判断输入的id是否存在
            if (serive.is_exist_id(Id))
            {
                string sql = "update students set isRemoved = 1 where id=" + Id;
                int num = serive.Insert_Delete_Update(sql);
                if (num >= 1)
                {
                    return Ok(new Models.ResponseData() { Code = 001, Message = "删除成功！" });
                }
                return Ok(new Models.ResponseData() { Code = 002, Message = "删除失败！" });
            }
            return Ok(new Models.ResponseData() { Code = 003, Message = "id不存在！" });
        }



        //更新功能接口
        [HttpPut]
        [Route(template: "update")]//路由名称
        public IHttpActionResult Update(int Id, Student s)
        {

            CookieHeaderValue cookie = ControllerContext.Request.Headers.GetCookies("token").FirstOrDefault();
            if (cookie == null)
            {
                return Ok(new Models.ResponseData() { Code = 004, Message = "cookie上不存在token！" });
            }
            string token = cookie.ToString().Split('=')[1];
            //判断token的有效性和是否存在token
            Dictionary<string, object> isLogined = Jwt.IsLogined1(token);
            object value;
            if (isLogined.TryGetValue("Message", out value))
            {
                //返回token过期或者token被修改等信息
                return Ok(new Models.ResponseData() { Code = 003, Message = value.ToString() });
            }
            //token合法，，允许查询
            StudentService serive = new StudentService();
            //判断输入的id是否存在
            if (serive.is_exist_id(Id))
            {
                //如果id存在
                string sql = "update students set name='" + s.Name + "',password='" + s.Password + "' where id=" + Id;
                int num = serive.Insert_Delete_Update(sql);
                if (num >= 1)
                {
                    return Ok(new Models.ResponseData() { Code = 001, Message = "更新成功！" });
                }
                return Ok(new Models.ResponseData() { Code = 002, Message = "更新失败！" });
            }
            return Ok(new Models.ResponseData() { Code = 003, Message = "id不存在！" });
        }




        //--------------------------------           查询部分   ------------------------
        //查询所有学生信息
        [HttpGet]
        [Route(template: "query")]//路由名称
        public IHttpActionResult QueryAllStudents()
        {
            CookieHeaderValue cookie = ControllerContext.Request.Headers.GetCookies("token").FirstOrDefault();
            if (cookie == null)
            {
                return Ok(new Models.ResponseData() { Code = 004, Message = "cookie上不存在token！" });
            }
            string token = cookie.ToString().Split('=')[1];
            //判断token的有效性和是否存在token
            Dictionary<string, object> isLogined = Jwt.IsLogined1(token);
            object value;
            if (isLogined.TryGetValue("Message", out value))
            {
                //返回token过期或者token被修改等信息
                return Ok(new Models.ResponseData() { Code = 003, Message = value.ToString() });
            }
            //token合法，，允许查询
            StudentService serive = new StudentService();
            List<StudentDto> students =serive.QueryAll();
            if (students.Count() == 0)
            {
                return Ok(new Models.ResponseData() { Code = 002, Message = "查询失败！" });
            }
            return Ok(new Models.ResponseData() { Code = 001, Message = "查询成功！" ,Data=students});
        }



        //根据id查询用户
        [HttpGet]
        [Route(template: "queryfromid")]//路由名称
        public IHttpActionResult QueryFromId(int Id)
        {
            CookieHeaderValue cookie = ControllerContext.Request.Headers.GetCookies("token").FirstOrDefault();
            if (cookie == null)
            {
                return Ok(new Models.ResponseData() { Code = 004, Message = "cookie上不存在token！" });
            }
            string token = cookie.ToString().Split('=')[1];
            //判断token的有效性和是否存在token
            Dictionary<string, object> isLogined = Jwt.IsLogined1(token);
            object value;
            if (isLogined.TryGetValue("Message", out value))
            {
                //返回token过期或者token被修改等信息
                return Ok(new Models.ResponseData() { Code = 003, Message = value.ToString() });
            }
            //token合法，，允许查询
            StudentService serive = new StudentService();
            List<StudentDto> student = serive.QueryId(Id);
            if (student.Count() == 0)
            {
                return Ok(new Models.ResponseData() { Code = 002, Message = "查询失败！，无效id" });
            }
            return Ok(new Models.ResponseData() { Code = 001, Message = "查询成功！", Data = student });
        }



        //用户名是否被注册检查，，
        [HttpGet]
        [Route(template: "checkname")]//路由名称
        public IHttpActionResult CheckName(string Name)
        {
            StudentService serive = new StudentService();
            List<StudentDto> student = serive.query_name(Name);
            if (student.Count() == 0)
            {
                return Ok(new Models.ResponseData() { Code = 002, Message = "用户名可以使用！" });
            }
            return Ok(new Models.ResponseData() { Code = 001, Message = "用户名已被注册！", Data = student });

        }



        //登陆并且返回token做标记
        [HttpPost]
        [Route(template: "login")]
        public IHttpActionResult Login(Student s)
        {
            //生成一个token字符串
            string token= Jwt.Encode(new Dictionary<string, object>() { { "loginName", s.Name } }, Jwt.key);
            //正常查询数据库
            StudentService serive = new StudentService();
            List<StudentDto> student = serive.query_for_login(s);
            if(student.Count() == 0)
            {
                return Ok(new Models.ResponseData() { Code = 002, Message = "登陆失败！" });
            }
            return Ok(new Models.ResponseData() { Code = 001, Message = "登陆成功！", Data = student,Token=token});
        }



        //分页查询用户
        [HttpGet]
        [Route(template: "pagequery")]//路由名称
        public IHttpActionResult QueryPage(int index = 0, int number = 1)
        {
            CookieHeaderValue cookie = ControllerContext.Request.Headers.GetCookies("token").FirstOrDefault();
            if (cookie == null)
            {
                return Ok(new Models.ResponseData() { Code = 004, Message = "cookie上不存在token！" });
            }
            string token = cookie.ToString().Split('=')[1];
            //判断token的有效性和是否存在token
            Dictionary<string, object> isLogined = Jwt.IsLogined1(token);
            object value;
            if (isLogined.TryGetValue("Message", out value))
            {
                //返回token过期或者token被修改等信息
                return Ok(new Models.ResponseData() { Code = 003, Message = value.ToString() });
            }
            //token合法，，允许查询
            StudentService serive = new StudentService();
            List<StudentDto> studentList = serive.query_page(index , number);
            if (studentList == null)
            {
                return Ok(new Models.ResponseData() { Code = 002, Message = "查询失败，请检查输入" });
            }
            return Ok(new Models.ResponseData() { Code = 001, Message = "查询成功", Data = studentList });
        }




































    }
}
